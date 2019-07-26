controller.grupo_item = {
    init: function (events) {
        creait.get("grupo?id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
            
            controller.grupo_item.set(data.convite);
            events(data, function (content) {
                $("a.perdido1").html("Encontrado");

                if (controller.grupo_item.get() == 1) {
                    $('#aceitarrecusar').css("display", "block");
                    $("#convidaitem").css("display", "none");
                }
                else {
                    $('#aceitarrecusar').css("display", "none");
                    $("#convidaitem").css("display", "block");
                }

                $("#qrgrupo").click(function () {
                    cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "grupo_" + $(this).attr("grupo_id"), function (success) {
                        alert("encode success: " + success);
                    }, function (fail) {
                        alert("encoding failed: " + fail);
                    });
                });

                $("#aceitar").click(function () {
                    creait.post("grupo?grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id + "&aceitar=a", null, function (data) {

                    });
                });

                $("#recusar").click(function () {
                    creait.post("grupo?grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
                        for (var i = 0; i < controller.login.get().grupos.length; i++) {
                            if (controller.login.get().grupos[i].id == data) {
                                var d = controller.login.get();
                                d.grupos.splice(i, 1);
                                controller.login.set(d);
                                creait.redirect('grupo');
                                creait.loader(false);

                                break;
                            }
                        }
                    });
                });

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
        });
    },
    get: function () {
        if (window.localStorage["grupo_item"] == null)
            return null;
        return JSON.parse(window.localStorage["grupo_item"]);
    },
    set: function (data) {
        window.localStorage["grupo_item"] = JSON.stringify(data);
    }
};

function convidar() {
    myApp.closeModal(".modal");
    myApp.prompt('Insira o email para enviarmos o convite!', '',
        function (value) {
            if (value == "") {
                myApp.alert("Digite o email do usuario que quer convidar", "Aviso!");
            }
            else {
                creait.post('convite?email=' + value + "&grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
                    if (data == 0) {
                        myApp.alert("E-mail não cadastrado no sistema", "Aviso!");
                    }
                    else if (data == 1) {
                        myApp.alert("Esta pessoa já faz parte do grupo", "Aviso!");
                    }
                    else {
                        myApp.alert("Convite enviado com sucesso!", "Aviso!");
                    }
                });
            }

        },
        function (value) {

        }
    );
}