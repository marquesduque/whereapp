controller.detalhe_padrinho = {
    init: function (events) {
        events(controller.detalhe_padrinho.get(), function (content) {
            
            $("#btn_apadrinhar").click(function () {
                creait.redirect('adesao');
            });
        });
    },
    get: function () {
        if (window.localStorage["detalhe_padrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["detalhe_padrinho"]);
    },
    set: function (data) {
        window.localStorage["detalhe_padrinho"] = JSON.stringify(data);
    }
};