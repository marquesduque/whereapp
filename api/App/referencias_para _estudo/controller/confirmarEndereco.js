controller.corfirmarEndereco = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["CEP"] == null)
            return null;
        return JSON.parse(window.localStorage["CEP"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["CEP"] = data;
        else
            window.localStorage["CEP"] = JSON.stringify(data);
    }
}