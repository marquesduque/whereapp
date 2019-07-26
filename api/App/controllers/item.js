controller.item = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["item"] == null)
            return null;
        return JSON.parse(window.localStorage["item"]);
    },
    set: function (data) {
        window.localStorage["item"] = JSON.stringify(data);
    }
};