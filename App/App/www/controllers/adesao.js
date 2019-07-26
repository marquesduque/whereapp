controller.adesao = {
    init: function (events) {
        events({}, function (content) {
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

                if ($("formad .has-error").length == 0) {
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
                                var data = JSON.stringify({
                                    "reference": controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                                    "preApproval": {
                                        "name": "Assinatura Mensal - pessoa: " + controller.login.get().id + " / " + controller.login.get().nome + " - item: " + controller.detalhe_padrinho.get().id + " - " + controller.detalhe_padrinho.get().nome,
                                        "charge": "AUTO",
                                        "period": "MONTHLY",
                                        "amountPerPayment": parseFloat($("#valor_mensal").val()).toFixed(2),
                                        "dayOfMonth": $("#dia_da_cobraça").val(),
                                        "expiration": {
                                            "value": 1000,
                                            "unit": "YEARS"
                                        }
                                    }
                                });

                                $.ajax({
                                    type: 'POST',
                                    url: "https://ws.pagseguro.uol.com.br/pre-approvals/request?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                                    headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                                    contentType: 'application/json;charset=ISO-8859-1;',
                                    data: data,
                                    success: function (response) {
                                        var data1 = JSON.stringify({
                                            plan: response.code,
                                            reference: controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                                            sender: {
                                                name: controller.login.get().nome,
                                                email: controller.login.get().email,
                                                hash: hash,
                                                phone: {
                                                    areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                                                    number: controller.login.get().telefone.split("(")[1].split(")")[0]
                                                },
                                                address: {
                                                    street: $("#rua_cobranca_fp").val(),
                                                    number: $("#numero_cobranca_fp").val(),
                                                    complement: $("#complemento_cobranca_fp").val(),
                                                    district: $("#bairro_cobranca_fp").val(),
                                                    postalCode: $("#cep_cobranca_fp").val(),
                                                    city: $("#cidade_cobranca_fp").val(),
                                                    state: $("#estado_cobranca_fp").val(),
                                                    country: "BRA"
                                                },
                                                documents: [{
                                                    type: "CPF",
                                                    value: controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "")
                                                }]
                                            },
                                            paymentMethod: {
                                                type: "creditCard",
                                                creditCard: {
                                                    token: card_token,
                                                    holder: {
                                                        name: $("#nome_cc_fp").val(),
                                                        birthDate: $("#data_nasc_cc_fp").val(),
                                                        documents: [{
                                                            type: "CPF",
                                                            value: $("#cpf_cc_fp").val()
                                                        }],
                                                        phone: {
                                                            areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                                                            number: controller.login.get().telefone.split("(")[1].split(")")[0]
                                                        }
                                                    }
                                                }
                                            }
                                        });

                                        //servico aqui
                                        $.ajax({
                                            type: 'POST',
                                            url: "https://ws.pagseguro.uol.com.br/pre-approvals?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                                            headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                                            contentType: 'application/json;charset=ISO-8859-1;',
                                            data: data1,
                                            success: function (response) {
                                                creait.post('assinatura?pessoa_id=' + controller.login.get().id + "&item_id=" + controller.detalhe_padrinho.get().id + "&codigo_assinatura=" + response.code + "&valor_assinatura=" + $("valor_mensal").val(), null, function (data) {
                                                    myApp.alert('Apadrinhamento concluido com sucesso', '', function () {
                                                        creait.redirect('categoria');
                                                    });
                                                });
                                            },
                                            error: function (e) {
                                                debugger;
                                            }
                                        });
                                    },
                                    error: function (e) {
                                        myApp.aler("Ocorreu um erro, tente novamente mais tarde.", "");
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