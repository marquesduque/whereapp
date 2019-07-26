controller.produto = {
    init: function (events) {
        creait.get('item?responsavel_id=' + localStorage.getItem('loja_id'), null, function (data) {
            events(data, function (content) {

            });
        });
    },
    get: function () {
        if (window.localStorage["produto"] == null)
            return null;
        return JSON.parse(window.localStorage["produto"]);
    },
    set: function (data) {
        window.localStorage["produto"] = JSON.stringify(data);
    }
};