controller.carrinho = {
    init: function (events) {
        events(controller.carrinho.get(), function (content) {
            $('.views').removeClass('carrinho');
            $('#div_carrinho').css('display', 'none');

            $("#excluir_item").click(function () {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";
                var item_id = $(this).attr("item_id");
                myApp.confirm("Deseja excluir item do carrinho?", "",
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                        for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                            if (item_id == controller.carrinho.get().itens[i].id) {
                                var d = controller.carrinho.get();
                                d.itens.splice(i, 1);
                                if (d.itens.length == 0) {
                                    controller.carrinho.set(null);
                                    creait.redirect("categoria");
                                } else {
                                    d.valor_total = d.valor_total - (d.itens[i].valor * d.itens[i].qtde);
                                    controller.carrinho.set(d);
                                    myApp.views[0].router.refreshPage();

                                    break;
                                }
                            }
                        }
                    },
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            });

            $('#avancar_compra').click(function () {
                //Produçao
                creait.loader(true);
                var data = {
                    email: "diretoria@ifdcontroladoria.com.br",
                    token: "336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda"
                };

                $$.ajax({
                    url: 'https://ws.pagseguro.uol.com.br/v2/sessions',
                    method: 'POST',
                    dataType: 'xml',
                    data: data,
                    asyc: true,
                    success: function (data) {
                        PagSeguroDirectPayment.setSessionId(data.split("<id>")[1].split("</id>")[0]);

                        PagSeguroDirectPayment.getPaymentMethods({
                            amount: parseFloat(controller.carrinho.get().total),
                            success: function (response) {
                                controller.boleto.set(response.paymentMethods.BOLETO.options);
                                controller.credito.set(response.paymentMethods.CREDIT_CARD.options);
                                controller.debito.set(response.paymentMethods.ONLINE_DEBIT.options);
                                creait.loader(false);
                                creait.redirect('endereco_entrega');
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
                    }, error: function (a, b, c) {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro tente novamente mais tarde!", "");
                    }
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["carrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["carrinho"]);
    },
    set: function (data) {
        window.localStorage["carrinho"] = JSON.stringify(data);
    }
};