  

controller.filial = {
    init: function (events) {
        //controller.layout.get().caracteristicas.filter(function (a, b) { return produto.caracteristicas.filter(function (b, c) { return b.id == a.id; }).length > 0; });

        events(controller.layout.get(), function (content) {
            $('.redirecionar_categoria').click(function () {
                controller.filial.set(JSON.parse($(this).attr('data')));
                controller.endereco.set({ retirada: 'RETIRAR NA LOJA' });
                if (controller.login.get() != null) {
                    if (controller.login.get().perfil_id == 5 && controller.carrinho.get() != null) {
                        creait.redirect('confirmarPedido');
                    } else {
                        creait.redirect('categoria');
                    }

                } else {
                    creait.redirect('categoria');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["filial_id"] == null)
            return null;
        return JSON.parse(window.localStorage["filial_id"]);
    },
    set: function (data) {

        if (data == null)
            window.localStorage["filial_id"] = data;
        else
            window.localStorage["filial_id"] = JSON.stringify(data);
    }
}