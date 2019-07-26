controller.responsavel = {
    init: function (events) {
        events(controller.loginE.get(), function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["responsavel"] == null)
            return null;
        return JSON.parse(window.localStorage["responsavel"]);
    },
    set: function (data) {
        window.localStorage["responsavel"] = JSON.stringify(data);
    }
};
