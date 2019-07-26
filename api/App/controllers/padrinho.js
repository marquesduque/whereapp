controller.padrinho = {
    init: function (events) {
        creait.get('padrinho', null, function (data) {
            events(data, function (content) {

                $("#addItemPadrinho").click(function () {
                    creait.redirect('addItem', 'result=padrinho');
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["padrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["padrinho"]);
    },
    set: function (data) {
        window.localStorage["padrinho"] = JSON.stringify(data);
    }
};