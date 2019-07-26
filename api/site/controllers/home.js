controller.home = {
    init: function (events) {
        events({}, function (content) {
            
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
