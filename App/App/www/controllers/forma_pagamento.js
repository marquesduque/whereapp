controller.forma_pagamento = {
    init: function (events) {
        events({}, function (content) {

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
                var cardBin = "";
                for (var i = 0; i <= 5; i++) {
                    cardBin += $("#num_cartao_fp").val()[i];
                }
                PagSeguroDirectPayment.getBrand({
                    cardBin: cardBin,
                    success: function (response) {
                        $("#img_bandeira_fp").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                        $("#bandeira_fp").val(response.brand.name);
                    },
                    error: function (response) {
                    },
                    complete: function (response) {
                    }
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o numero do cartao');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe o numero do cartao');

                $('#cep_cobranca_fp').toggleInputError($('#cep_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#estado_cobranca_fp').toggleInputError($('#estado_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#cidade_cobranca_fp').toggleInputError($('#cidade_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#bairro_cobranca_fp').toggleInputError($('#bairro_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#rua_cobranca_fp').toggleInputError($('#rua_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#numero_cobranca_fp').toggleInputError($('#numero_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#complemento_cobranca_fp').toggleInputError($('#complemento_cobranca_fp').val() == '', 'Informe o numero do cartao');

                if ($("formcc .has-error").length == 0) {
                    creait.loader(true);
                    var hash;
                    var card_token;
                    PagSeguroDirectPayment.onSenderHashReady(function (response) {
                        if (response.status == 'error') {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                            return;
                        }
                        hash = response.senderHash;
                        PagSeguroDirectPayment.createCardToken({
                            cardNumber: $("#num_cartao_fp").val(),
                            brand: $("#bandeira_fp").val(),
                            cvv: $("#cvv_fp").val(),
                            expirationMonth: $("#exp_date_fp").val().split("/")[0],
                            expirationYear: $("#exp_date_fp").val().split("/")[1],
                            success: function (response) {
                                card_token = response.card.token;

                                var item = "&";
                                var shipping = "&shippingAddressRequired=false";
                                var item_id = "";
                                var quantidade = "";
                                var delivery = "false";
                                var balcao = "true";

                                if (controller.carrinho.get().endereco_bool == "1") {
                                    shipping = "&shippingAddressRequired=true&shippingAddressStreet=" + controller.carrinho.get().rua_entrega + "&shippingAddressNumber=" + controller.carrinho.get().numero_entrega + "&shippingAddressComplement=" + controller.carrinho.get().complemento_entrega + "&shippingAddressDistrict=" + controller.carrinho.get().bairro_entrega + "&shippingAddressPostalCode=" + controller.carrinho.get().cep_entrega + "&shippingAddressCity=" + controller.carrinho.get().cidade_entrega + "&shippingAddressState=" + controller.carrinho.get().estado_entrega + "&shippingAddressCountry=BRA&shippingType=1&shippingCost=0.00";
                                }

                                for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                                    item += "itemId" + (i + 1) + "=" + controller.carrinho.get().itens[i].id + "&itemDescription" + (i + 1) + "=" + controller.carrinho.get().itens[i].nome + " - " + controller.carrinho.get().itens[i].descricao + "&itemAmount" + (i + 1) + "=" + controller.carrinho.get().itens[i].valor + "&itemQuantity" + (i + 1) + "=" + parseInt(controller.carrinho.get().itens[i].qtde) + "&";
                                    item_id += "&item_id=" + controller.carrinho.get().itens[i].id;
                                    quantidade += controller.carrinho.get().itens[i].quantidade;
                                }

                                //---PROD
                                var data = "paymentMode=default&paymentMethod=creditCard&currency=brl&extraAmount=0.00" + item + "senderName=" + controller.login.get().nome + "&senderCpf=" + controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "") + "&senderAreaCode=" + controller.login.get().telefone.split("(")[1].split(")")[0] + "&senderPhone=" + controller.login.get().telefone.split(" ")[1].replace("-", "") + "&senderEmail=" + controller.login.get().email + "&senderHash=" + hash + shipping + "&creditCardToken=" + card_token + "&installmentQuantity=1&installmentValue=" + controller.carrinho.get().valor_total + "&noInterestInstallmentQuantity=2&&creditCardHolderName=" + $("#nome_cc_fp").val() + "&creditCardHolderCPF=" + $("#cpf_cc_fp").val().replace("-", "").replace(".", "").replace(".", "") + "&creditCardHolderBirthDate=" + $("#data_nasc_cc_fp").val() + "&creditCardHolderAreaCode=" + $("#telefone_cc_fp").val().split("(")[1].split(")")[0] + "&creditCardHolderPhone=" + $("#telefone_cc_fp").val().split(" ")[1].replace("-", "") + "&billingAddressStreet=" + $("#rua_cobranca_fp").val() + "&billingAddressNumber=" + $("#numero_cobranca_fp").val() + "&billingAddressComplement=" + $("#complemento_cobranca_fp").val() + "&billingAddressDistrict=" + $("#bairro_cobranca_fp").val() + "&billingAddressPostalCode=" + $("#cep_cobranca_fp").val() + "&billingAddressCity=" + $("#cidade_cobranca_fp").val() + "&billingAddressState=" + $("#estado_cobranca_fp").val() + "&billingAddressCountry=BRA";
                                $.ajax({
                                    type: 'post',
                                    url: "https://ws.pagseguro.uol.com.br/v2/transactions?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                    contenttype: 'application/x-www-form-urlencoded; charset=utf-8',
                                    data: data,
                                    success: function (response) {
                                        creait.post('compra?comprador_id=' + controller.login.get().id + "&vendedor_id=" + controller.carrinho.get().id + "&total=" + controller.carrinho.get().valor_total + "&delivery=" + delivery + "&balcao=" + balcao + "&boleto_url=" + $(response).find("paymentLink").html() + item_id + quantidade, null, function (data) {
                                            creait.loader(false);
                                            controller.carrinho.set(null);
                                            $('#div_carrinho').css('display', 'none');
                                            creait.redirect("confirma_compra");
                                        });
                                    },
                                    error: function (e) {
                                        creait.loader(false);
                                        myApp.alert("Ocorreu um erro ao tentar finalizar a compra. Tente novamente mais tarde.", "");
                                    }
                                });
                            },
                            error: function (response) {
                                creait.loader(false);
                                myApp.alert("Cartão de Crédito Inválido", "Aviso!");
                                return;
                            },
                            complete: function (response) {
                                // Callback para todas chamadas.
                            }
                        });
                    });
                }
            });

            //boleto
            $("#finalizar_b_fp").click(function () {
                creait.loader(true);
                var hash;
                var card_token;
                PagSeguroDirectPayment.onSenderHashReady(function (response) {
                    if (response.status == 'error') {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                        return;
                    }
                    hash = response.senderHash;

                    var item = "&";
                    var shipping = "&shippingAddressRequired=false";
                    var item_id = "";
                    var quantidade = "";
                    var delivery = "false";
                    var balcao = "true";

                    if (controller.carrinho.get().endereco_bool == "1") {
                        delivery = "true";
                        balcao = "false";
                        shipping = "&shippingAddressRequired=true&shippingAddressStreet=" + controller.carrinho.get().rua_entrega + "&shippingAddressNumber=" + controller.carrinho.get().numero_entrega + "&shippingAddressComplement=" + controller.carrinho.get().complemento_entrega + "&shippingAddressDistrict=" + controller.carrinho.get().bairro_entrega + "&shippingAddressPostalCode=" + controller.carrinho.get().cep_entrega + "&shippingAddressCity=" + controller.carrinho.get().cidade_entrega + "&shippingAddressState=" + controller.carrinho.get().estado_entrega + "&shippingAddressCountry=BRA&shippingType=1&shippingCost=0.00";
                    }

                    for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                        item += "itemId" + (i + 1) + "=" + controller.carrinho.get().itens[i].id + "&itemDescription" + (i + 1) + "=" + controller.carrinho.get().itens[i].nome + " - " + controller.carrinho.get().itens[i].descricao + "&itemAmount" + (i + 1) + "=" + parseFloat(controller.carrinho.get().itens[i].valor).toFixed(2) + "&itemQuantity" + (i + 1) + "=" + parseInt(controller.carrinho.get().itens[i].qtde) + "&";
                        item_id += "&item_id=" + controller.carrinho.get().itens[i].id;
                        quantidade += controller.carrinho.get().itens[i].quantidade;
                    }

                    //---PROD
                    var data = "paymentMode=default&paymentMethod=boleto&currency=BRL&extraAmount=0.00" + item + "senderName=" + controller.login.get().nome + "&senderCPF=" + controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "") + "&senderAreaCode=" + controller.login.get().telefone.split("(")[1].split(")")[0] + "&senderPhone=" + controller.login.get().telefone.split(" ")[1].replace("-", "") + "&senderEmail=" + controller.login.get().email + "&senderHash=" + hash + shipping;
                    $.ajax({
                        type: 'POST',
                        url: "https://ws.pagseguro.uol.com.br/v2/transactions?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        data: data,
                        success: function (response) {
                            creait.post('compra?comprador_id=' + controller.login.get().id + "&vendedor_id=" + controller.carrinho.get().loja_id + "&total=" + controller.carrinho.get().valor_total + "&delivery=" + delivery + "&balcao=" + balcao + "&boleto_url=" + $(response).find("paymentLink").html() + item_id + quantidade, null, function (data) {
                                creait.loader(false);
                                controller.carrinho.set(null);
                                $('#div_carrinho').css('display', 'none');
                                creait.redirect("confirma_compra");

                            });
                        },
                        error: function (e) {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro ao tentar finalizar a compra. Tente novamente mais tarde.", "");
                        }
                    });
                });
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