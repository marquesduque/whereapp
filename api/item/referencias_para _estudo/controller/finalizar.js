




controller.finalizar = {
    init: function (events) {
        var busca = controller.busca.get();
        busca.carrinho = controller.carrinho.get();
        events(busca, function (content) {
        });
    }
}
