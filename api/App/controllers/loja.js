controller.loja = {
    init: function (events) {
        creait.get('loja', null, function (data) {
            events(data, function (content) {
                if (controller.carrinho.get() == null) {
                    $("#abrir_carrinho").css("display", "none");
                } else {
                    $("#abrir_carrinho").css("display", "flex");
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["loja"] == null)
            return null;
        return JSON.parse(window.localStorage["loja"]);
    },
    set: function (data) {
        window.localStorage["loja"] = JSON.stringify(data);
    }
};