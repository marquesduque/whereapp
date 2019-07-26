controller.forma_pagamento = {
    init: function (events) {
        events({}, function (content) {


            if (localStorage.getItem('ong') == "1") {
                $("#pagar_b_fp").css("display", "none");
                $("#pagar_cc1_fp").css("background-color", "#CCCCCC");
                $("#pagamento_cc_fp").css("display", "block");}
            else {
                $("#pagar_b_fp").css("display", "flex");
                $("#pagar_cc1_fp").css("background-color", "#FFFFFF");
                $("#pagamento_cc_fp").css("display", "none");
            }

            $("#voltar_fp").click(function () {
                if (localStorage.getItem('ong') == "1") {
                    localStorage.setItem('ong', '0');

                    controller.carrinho.set(null);
                    if (controller.carrinhoEspera.get() != null) {
                        controller.carrinho.set(controller.carrinhoEspera.get());
                        controller.carrinhoEspera.set(null);
                    }
                    
                    creait.redirect('doacao');
                } else {
                    $("#voltar_fp").click(function () {
                        creait.redirect('categoria');
                    });
                }
            });


            $("#pagar_cc_fp").click(function () {
                $("#pagamento_cc_fp").css("display", "block");
                $("#pagamento_b_fp").css("display", "none");

                $("#pagar_cc1_fp").css("background-color", "#CCCCCC");
                $("#pagar_b1_fp").css("background-color", "#FFFFFF");
            });

            $("#pagar_b_fp").click(function () {
                $("#pagamento_b_fp").css("display", "block");
                $("#pagamento_cc_fp").css("display", "none");

                $("#pagar_b1_fp").css("background-color", "#CCCCCC");
                $("#pagar_cc1_fp").css("background-color", "#FFFFFF");
            });

            var picker = myApp.picker({
                input: '#estado_cobranca_fp',
                rotateEffect: true,
                cols: [
                    {
                        values: ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
                    }
                ],
                toolbarTemplate:
                    '<div class = "toolbar">' +
                    '<div class = "toolbar-inner">' +
                    '<div class = "left">' +
                    '<a href = "#" class = "link close-picker"></a>' +
                    '</div>' +
                    '<div class = "center"></div>' +
                    '<div class = "">' +
                    '<a href = "#" class = "link close-picker">Done</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onClose: function () {
                },
                onOpen: function () {
                }
            });

            $('#picker_estados').click(function () {
                picker.open();
            });

            $("#num_cartao_fp").on("blur", function () {
                
                $.get('/api/pagseguro', null, function (data) {
                    PagSeguroDirectPayment.setSessionId(data);

                    PagSeguroDirectPayment.getBrand({
                        cardBin: $("#num_cartao_fp").val(),
                        success: function (response) {
                            $("#img_bandeira_fp").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                            $("#bandeira_fp").val(response.brand.name);
                            $("#img_bandeira_fp").parent().css("display", "block");
                        },
                        error: function (response) {
                            $("#img_bandeira_fp").parent().css("display", "none");
                            $("#bandeira_fp").val("");
                            $("#num_cartao_fp").val("");
                            myApp.alert("Numero de cartão invalido", "");
                        },
                        complete: function (response) {
                        }
                    });
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o nome impresso no cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o CPF do dono do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe a data de nascimento do dono do cartao');
                $('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe um telefone para contato');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o Codigo de segurança');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe a data de validade do cartao');

                var carrinho = controller.carrinho.get();
                carrinho.tipo = "credito";
                controller.carrinho.set(carrinho);

                if ($("formcc .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formcc"));
                }
            });

            //boleto
            $("#finalizar_b_fp").click(function () {
                var carrinho = controller.carrinho.get();
                carrinho.tipo = "boleto";
                controller.carrinho.set(carrinho);

                if ($("formb .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formb"));
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["forma_pagamento"] == null)
            return null;
        return JSON.parse(window.localStorage["forma_pagamento"]);
    },
    set: function (data) {
        window.localStorage["forma_pagamento"] = JSON.stringify(data);
    }
};