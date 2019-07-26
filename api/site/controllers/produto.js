controller.produto = {
    init: function (events) {
        events(controller.loginE.get(), function (content) {

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
