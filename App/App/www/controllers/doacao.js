controller.doacao = {
    init: function (events) {
        creait.get("doacao?pessoa_id=" + controller.login.get().id, null, function (data) {
            events(data, function (content) {
                $("#div_carrinho").css("display", "none");
            });
        });
    },
    get: function () {
        if (window.localStorage["doacao"] == null)
            return null;
        return JSON.parse(window.localStorage["doacao"]);
    },
    set: function (data) {
        window.localStorage["doacao"] = JSON.stringify(data);
    }
};