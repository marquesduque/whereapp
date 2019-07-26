controller.qrcode = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["mapa"] == null)
            return null;
        return JSON.parse(window.localStorage["mapa"]);
    },
    set: function (data) {
        window.localStorage["mapa"] = JSON.stringify(data);
    }
};