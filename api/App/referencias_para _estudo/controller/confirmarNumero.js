
controller.corfirmarNumero = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["endereco"] == null)
            return null;
        return JSON.parse(window.localStorage["endereco"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["endereco"] = data;
        else
            window.localStorage["endereco"] = JSON.stringify(data);
    }
}
