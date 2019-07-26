controller.perdido = {
    init: function (events) {
        var data = {
            itens: []
        };
        for (var i = 0; i < controller.login.get().meusitens.length; i++) {
            if (controller.login.get().meusitens[i].perdido == 1) {
                data.itens.push(controller.login.get().meusitens[i]);
            }
        }
        events(data, function (content) {
            $(".item_perdido").click(function () {
                creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=1", null, function (data) {
                    for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                        if (controller.login.get().meusitens[i].id == data) {
                            var d = controller.login.get();
                            d.meusitens[i].perdido = 0;
                            controller.login.set(d);
                            myApp.views[0].router.refreshPage();
                            creait.loader(false);

                            break;
                        }
                    }
                });
            })
        });
    },
    get: function () {
        if (window.localStorage["perdido"] == null)
            return null;
        return JSON.parse(window.localStorage["perdido"]);
    },
    set: function (data) {
        window.localStorage["perdido"] = JSON.stringify(data);
    }
};