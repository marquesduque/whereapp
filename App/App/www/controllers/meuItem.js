controller.meuItem = {
    init: function (events) {
        events(controller.login.get(), function (content) {

            $("a.perdido1").html("Encontrado");


            $(".item_perdido").click(function () {
                if ($(".item_perdido").hasClass("perdido1")) {
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
                } else {
                    creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=0", null, function (data) {
                        for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                            if (controller.login.get().meusitens[i].id == data) {
                                var d = controller.login.get();
                                d.meusitens[i].perdido = 1;
                                controller.login.set(d);
                                myApp.views[0].router.refreshPage();
                                creait.loader(false);

                                break;
                            }
                        }
                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["meuItem"] == null)
            return null;
        return JSON.parse(window.localStorage["meuItem"]);
    },
    set: function (data) {
        window.localStorage["meuItem"] = JSON.stringify(data);
    }
};