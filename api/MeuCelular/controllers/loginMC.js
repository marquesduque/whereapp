controller.loginMC = {
    init: function (events) {
        events({}, function (content) {
            window.localStorage.clear();

            //BUTTON DE LOGIN
            $('#btnLogin').click(function () {

                var listaCampos = $('#formLogin').find('.form-group input');

                for (var i = 0; i < listaCampos.length; i++) {

                    //CASO TENHA ALGUM CAMPO INCORRETO, PARA O PROCESSO
                    if ($(listaCampos[i]).prop('validationMessage') != "") {
                        return;
                    }

                }

                var dados = myApp.formToJSON('#formLogin');

                //AUTHEMTICA USUARIO
                creait.get("pessoas?email=" + dados.email + "&password=" + dados.password, null, function (data) {
                    if (data.error != null || data.error != undefined) {
                        myApp.alert("Ocorreu um erro. Tente novamente mais tarde", "Aviso!");
                        return;
                    } else if (data == 0) {
                        myApp.alert("Email ou senha incorreto!", "Aviso!");
                    } else {
                        controller.loginMC.set(data);

                        creait.redirect('home');
                    }
                });
            });

            $('#esqueciSenha').click(function () {
                creait.redirect('esqueciSenha');
            });

        });
    },
    get: function () {
        if (window.localStorage["dadosLogin"] == null)
            return null;
        return JSON.parse(window.localStorage["dadosLogin"]);
    },
    set: function (data) {
        window.localStorage["dadosLogin"] = JSON.stringify(data);
    }
};
