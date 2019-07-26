controller.categoria = {
    init: function (events) {
        events({}, function (content) {

            if (controller.login.get().num_notificacao > 0) {
                $("#num_notificacao").html(controller.login.get().num_notificacao);
                $("#num_notificacao").css("display", "flex");
            } else {
                $("#num_notificacao").css("display", "none");
            }
            
            if (controller.carrinho.get() == null) {
                $('.views').removeClass('carrinho');
                $('#div_carrinho').css('display', 'none');
            } else {
                $('.views').addClass('carrinho');
                $('#div_carrinho').css('display', 'block');
            }

            if (localStorage.getItem('segundo_plano') == undefined) {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";
                myApp.confirm('Deseja habilitar o app há rodar em segundo plano para rastrear seu celular? Obs.: Você pode alterar esse configuracão depois no menu.', '',
                    function () {
                        cordova.plugins.backgroundMode.enable();
                        localStorage.setItem('segundo_plano', "0");
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }, function () {
                        cordova.plugins.backgroundMode.disable();
                        localStorage.setItem('segundo_plano', "1");
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            } else if (localStorage.getItem('segundo_plano') == "0") {
                cordova.plugins.backgroundMode.enable();
            } else {
                cordova.plugins.backgroundMode.disable();
            }
        });
    },
    get: function () {
        if (window.localStorage["categoria"] == null)
            return null;
        return JSON.parse(window.localStorage["categoria"]);
    },
    set: function (data) {
        window.localStorage["categoria"] = JSON.stringify(data);
    }
};