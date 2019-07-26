controller.ong = {
    init: function (events) {
        events(controller.ong.get(), function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["ong"] == null)
            return null;
        return JSON.parse(window.localStorage["ong"]);
    },
    set: function (data) {
        window.localStorage["ong"] = JSON.stringify(data);
    }
};