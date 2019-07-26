controller.vendas = {
    init: function (events) {
        creait.get('vendaEmpresa?vendedor_id=' + controller.loginE.get().id, null, function (data) {
            events(data, function (content) {

            });
        });
    },
    get: function () {
        if (window.localStorage[""] == null)
            return null;
        return JSON.parse(window.localStorage[""]);
    },
    set: function (data) {
        window.localStorage[""] = JSON.stringify(data);
    }
};
