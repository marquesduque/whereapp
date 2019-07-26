controller.adesao = {
    init: function (events) {
        events({}, function (content) {
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
                            $("#num_cartao_fp").val("");
                            $("#bandeira_fp").val("");
                            myApp.alert("Numero de cartão invalido", "");
                        },
                        complete: function (response) {
                        }
                    });
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#valor_mensal').toggleInputError($('#valor_mensal').val() == '', 'Informe o valor a ser cobrado mensalmente');
                $('#dia_da_cobraça').toggleInputError($('#dia_da_cobraça').val() == '', 'Informe o o dia da cobrança');

                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o nome impresso no cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o CPF do dono do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe a data de nascimento do dono do cartao');
                //$('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe um telefone para contato');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o Codigo de segurança');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe a data de validade do cartao');


                if ($("formcc .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formcc"));
                }

                //$('#cep_cobranca_fp').toggleInputError($('#cep_cobranca_fp').val() == '', 'Informe o cep');
                //$('#estado_cobranca_fp').toggleInputError($('#estado_cobranca_fp').val() == '', 'Informe o estado');
                //$('#cidade_cobranca_fp').toggleInputError($('#cidade_cobranca_fp').val() == '', 'Informe a cidade');
                //$('#bairro_cobranca_fp').toggleInputError($('#bairro_cobranca_fp').val() == '', 'Informe o bairro');
                //$('#rua_cobranca_fp').toggleInputError($('#rua_cobranca_fp').val() == '', 'Informe a rua');
                //$('#numero_cobranca_fp').toggleInputError($('#numero_cobranca_fp').val() == '', 'Informe o numero');
                //$('#complemento_cobranca_fp').toggleInputError($('#complemento_cobranca_fp').val() == '', 'Informe um complemento');

                //if ($("#pagamento_cc_fp .has-error").length == 0) {
                //    creait.loader(true);
                //    var hash;
                //    var card_token;
                //    PagSeguroDirectPayment.onSenderHashReady(function (response) {
                //        if (response.status == 'error') {
                //            creait.loader(false);
                //            myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                //            return;
                //        }
                //        hash = response.senderHash;
                //        PagSeguroDirectPayment.createCardToken({
                //            cardNumber: $("#num_cartao_fp").val(),
                //            brand: $("#bandeira_fp").val(),
                //            cvv: $("#cvv_fp").val(),
                //            expirationMonth: $("#exp_date_fp").val().split("/")[0],
                //            expirationYear: $("#exp_date_fp").val().split("/")[1],
                //            success: function (response) {
                //                card_token = response.card.token;
                //                var data = JSON.stringify({
                //                    "reference": controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                //                    "preApproval": {
                //                        "name": "Assinatura Mensal - pessoa: " + controller.login.get().id + " / " + controller.login.get().nome + " - item: " + controller.detalhe_padrinho.get().id + " - " + controller.detalhe_padrinho.get().nome,
                //                        "charge": "AUTO",
                //                        "period": "MONTHLY",
                //                        "amountPerPayment": parseFloat($("#valor_mensal").val()).toFixed(2),
                //                        "dayOfMonth": $("#dia_da_cobraça").val(),
                //                        "expiration": {
                //                            "value": 1000,
                //                            "unit": "YEARS"
                //                        }
                //                    }
                //                });

                //                $.ajax({
                //                    type: 'POST',
                //                    url: "https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/request?email=diretoria@ifdcontroladoria.com.br&token=5CDF0EAD4BCB4D35BCB76D7E44F21B5B",
                //                    headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                //                    contentType: 'application/json;charset=ISO-8859-1;',
                //                    data: data,
                //                    success: function (response) {
                //                        var data1 = JSON.stringify({
                //                            plan: response.code,
                //                            reference: controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                //                            sender: {
                //                                name: controller.login.get().nome,
                //                                email: controller.login.get().email,
                //                                hash: hash,
                //                                phone: {
                //                                    areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                //                                    number: controller.login.get().telefone.split("(")[1].split(")")[0]
                //                                },
                //                                address: {
                //                                    street: $("#rua_cobranca_fp").val(),
                //                                    number: $("#numero_cobranca_fp").val(),
                //                                    complement: $("#complemento_cobranca_fp").val(),
                //                                    district: $("#bairro_cobranca_fp").val(),
                //                                    postalCode: $("#cep_cobranca_fp").val(),
                //                                    city: $("#cidade_cobranca_fp").val(),
                //                                    state: $("#estado_cobranca_fp").val(),
                //                                    country: "BRA"
                //                                },
                //                                documents: [{
                //                                    type: "CPF",
                //                                    value: controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "")
                //                                }]
                //                            },
                //                            paymentMethod: {
                //                                type: "creditCard",
                //                                creditCard: {
                //                                    token: card_token,
                //                                    holder: {
                //                                        name: $("#nome_cc_fp").val(),
                //                                        birthDate: $("#data_nasc_cc_fp").val(),
                //                                        documents: [{
                //                                            type: "CPF",
                //                                            value: $("#cpf_cc_fp").val()
                //                                        }],
                //                                        phone: {
                //                                            areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                //                                            number: controller.login.get().telefone.split("(")[1].split(")")[0]
                //                                        }
                //                                    }
                //                                }
                //                            }
                //                        });

                //                        //servico aqui
                //                        $.ajax({
                //                            type: 'POST',
                //                            url: "https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=diretoria@ifdcontroladoria.com.br&token=5CDF0EAD4BCB4D35BCB76D7E44F21B5B",
                //                            headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                //                            contentType: 'application/json;charset=ISO-8859-1;',
                //                            data: data1,
                //                            success: function (response) {
                //                                creait.post('assinatura?pessoa_id=' + controller.login.get().id + "&item_id=" + controller.detalhe_padrinho.get().id + "&codigo_assinatura=" + response.code + "&valor_assinatura=" + $("valor_mensal").val(), null, function (data) {
                //                                    myApp.alert('Apadrinhamento concluido com sucesso', '', function () {
                //                                        creait.redirect('categoria');
                //                                    });
                //                                });
                //                            },
                //                            error: function (e) {
                //                                debugger;
                //                            }
                //                        });
                //                    },
                //                    error: function (e) {
                //                        myApp.aler("Ocorreu um erro, tente novamente mais tarde.", "");
                //                    }
                //                });
                //            },
                //            error: function (response) {
                //                creait.loader(false);
                //                myApp.alert("Cartão de Crédito Inválido", "Aviso!");
                //                return;
                //            },
                //            complete: function (response) {
                //                // Callback para todas chamadas.
                //            }
                //        });
                //    });
                //}
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