controller.grupo = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            $(".opt_grupo").click(function () {
                localStorage.setItem("grupo_id", $(this).attr("grupo_id"));
                creait.redirect("grupo_item");
            });

            $(".sair_grupo").click(function () {
                creait.post("grupo?grupo_id=" + $(this).attr("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {

                    for (var i = 0; i < controller.login.get().grupos.length; i++) {
                        if (controller.login.get().grupos[i].id == data) {
                            var d = controller.login.get();
                            d.grupos.splice(i, 1);
                            controller.login.set(d);
                            myApp.views[0].router.refreshPage();
                            creait.loader(false);

                            break;
                        }
                    }

                });
                
            });
        });
    },
    get: function () {
        if (window.localStorage["grupo"] == null)
            return null;
        return JSON.parse(window.localStorage["grupo"]);
    },
    set: function (data) {
        window.localStorage["grupo"] = JSON.stringify(data);
    }
};