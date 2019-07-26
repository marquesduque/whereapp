controller.consulta = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?login_id=' + login.id, null, function (data) {
            debugger;
            pedido.compra = data;
            events(pedido, function (content) {
            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}
