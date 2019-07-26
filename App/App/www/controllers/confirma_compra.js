controller.confirma_compra = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["confirma_compra"] == null)
            return null;
        return JSON.parse(window.localStorage["confirma_compra"]);
    },
    set: function (data) {
        window.localStorage["confirma_compra"] = JSON.stringify(data);
    }
};