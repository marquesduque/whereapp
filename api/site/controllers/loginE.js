controller.loginE = {
    init: function (events) {
        events({}, function (content) {
            //BUTTON DE LOGIN
            $('#btn_login').click(function () {
                
                $('#email').toggleInputError($('#email').val() == '', 'Digite o email');
                $('#senha').toggleInputError($('#senha').val() == '', 'Digite o email');

                if ($("#email").hasClass("has-error") == false || $("#senha").hasClass("has-error") == false) {
                    creait.get("loginEmpresa?email=" + $("#email").val() + "&password=" + $("#senha").val(), null, function (data) {
                        if (data.error != null || data.error != undefined) {
                            myApp.alert("Ocorreu um erro. Tente novamente mais tarde", "Aviso!");
                            return;
                        } else if (data == 0) {
                            myApp.alert("Email ou senha incorreto!", "Aviso!");
                        } else {
                            controller.loginE.set(data);

                            if (data.responsaveis.length == 0) {
                                creait.redirect('responsavel_obrigatorio');
                            } else {
                                creait.redirect('home');
                            }
                        }
                    });
                }
            });

            $("#btnCadastro").click(function () {
                creait.redirect("cadastro");
            });

            $('#esqueciSenha').click(function () {
                creait.redirect('esqueciSenha');
            });

        });
    },
    get: function () {
        if (window.localStorage["loginE"] == null)
            return null;
        return JSON.parse(window.localStorage["loginE"]);
    },
    set: function (data) {
        window.localStorage["loginE"] = JSON.stringify(data);
    }
};
