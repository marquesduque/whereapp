controller.responsavel_juridico = {
    init: function (events) {
        events({}, function (content) {
            $("#btn_responsavel_juridico").click(function () {
                creait.post('responsavel_juridico', myApp.formToJSON("#responsavel_juridico"), function (data) {
                    var login = controller.login.get();

                    login.responsavel_juridico.push(data);

                    myApp.params.modalButtonOk = "Sim";
                    myApp.params.modalButtonCancel = "Não";
                    myApp.confirm("Dejesa cadastar outro responsavel?", "",
                        function () {
                            console.log("Sim");
                            $("#input").val("");
                        },
                        function () {
                            console.log("Não");
                            creait.redirect("categoria");
                        }
                    );
                    myApp.params.modalButtonOk = "Ok";
                    myApp.params.modalButtonCancel = "Cancelar";
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["responsavel_juridico"] == null)
            return null;
        return JSON.parse(window.localStorage["responsavel_juridico"]);
    },
    set: function (data) {
        window.localStorage["responsavel_juridico"] = JSON.stringify(data);
    }
};