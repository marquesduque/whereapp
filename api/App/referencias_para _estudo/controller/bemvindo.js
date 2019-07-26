
controller.bemvindo = {
    init: function (events, query) {
        var layout = controller.layout.get();
        events(layout, function (content) {
            $('#iniciar').click(function () {
                localStorage.clear();
                window.top.location.href = "/";
            });
        });

    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}