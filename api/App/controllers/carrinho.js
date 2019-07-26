controller.carrinho = {
    init: function (events) {
        events(controller.carrinho.get(), function (content) {

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
                creait.redirect('endereco_entrega');
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