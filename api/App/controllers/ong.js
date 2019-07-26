controller.ong = {
    init: function (events) {
        events(controller.ong.get(), function (content) {
            $("#btn_pagar_ong").click(function () {
                creait.get('pagSeguro', null, function (data) {
                    PagSeguroDirectPayment.setSessionId(data);

                    var v = $("#valor_ad").val() == "" ? $('.itens:checked').val() : $("#valor_ad").val();
                    var a = "Doação para a ONG - " + controller.ong.get().nome + " no valor de : " + v + " reais";

                    $("#titulo_doacao_ong").html(a);
                    $("#valor_doacao_ong").val(v);

                    PagSeguroDirectPayment.getPaymentMethods({
                        amount: parseFloat(parseFloat(v).toFixed(2)),
                        success: function (response) {
                            controller.boleto.set(response.paymentMethods.BOLETO.options);
                            controller.credito.set(response.paymentMethods.CREDIT_CARD.options);
                            controller.debito.set(response.paymentMethods.ONLINE_DEBIT.options);
                            
                            var d = {
                                valor_total: parseFloat(v),
                                loja_id: controller.ong.get().id,
                                endereco_bool: 0,
                                rua_entrega: "",
                                numero_entrega: "",
                                complemento_entrega: "",
                                bairro_entrega: "",
                                cep_entrega: "",
                                cidade_entrega: "",
                                estado_entrega: "",
                                itens: [{
                                    id: 35,
                                    nome: "Doação",
                                    qtde: 1,
                                    descricao: a,
                                    valor: parseFloat(v)
                                }]
                            };

                            if (controller.carrinho.get() != null) {
                                controller.carrinhoEspera.set(controller.carrinho.get);
                                controller.carrinho.set(null);
                                controller.carrinho.set(d);
                            } else {
                                controller.carrinho.set(d);
                            }
                            localStorage.setItem('ong', '1');
                            creait.redirect('forma_pagamento');
                            creait.loader(false);
                            creait.redirect('forma_pagamento');
                        },
                        error: function (response) {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro tente novamente mais tarde!", "");
                            debugger;
                            // Callback para chamadas que falharam.
                        },
                        complete: function (response) {
                            debugger;
                            // Callback para todas chamadas.
                        }
                    });
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["ong"] == null)
            return null;
        return JSON.parse(window.localStorage["ong"]);
    },
    set: function (data) {
        window.localStorage["ong"] = JSON.stringify(data);
    }
};