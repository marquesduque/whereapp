controller.login = {
    init: function (events) {
        events({}, function (content) {
            $$("#btn_login").click(function () {
                //creait.redirect('categoria');

                $('#email').toggleInputError($('#email').val() == '', 'Informe um email');
                $('#senha').toggleInputError($('#senha').val() == '', 'Informe uma senha');

                if (localStorage.getItem('pushToken') == null || localStorage.getItem('plataforma_id') == null) {
                    $('#push_id').val("");
                    $('#plataforma').val("");
                }
                else {
                    $('#push_id').val(localStorage.getItem('pushToken'));
                    $('#plataforma').val(localStorage.getItem('plataforma_id'));
                }

                if ($('formlogin .has-error').length == 0) {
                    creait.get('pessoas', myApp.formToJSON("formlogin"), function (data) {
                        //

                        if (data == null || data.length == 0 || data.error != null) {
                            creait.loader(false);
                            myApp.alert('Usuário ou senha inválido!', 'Oops ...');
                            return;
                        }
                        myApp.closePanel();

                        controller.login.set(data);

                        creait.redirect('categoria');

                        //if (controller.carrinho.get() != null) {
                        //    if (controller.endereco.get() == null) {
                        //        if (controller.layout.get().balcao && controller.layout.get().delivery) {
                        //            creait.redirect('endereco');
                        //        }
                        //        else if (controller.busca.get().balcao) {
                        //            creait.redirect('filial');
                        //        }
                        //        else {
                        //            creait.redirect('endereco');
                        //        }
                        //    }
                        //    else {
                        //        if (controller.cartao.get() == null && controller.pagamento.get() != null && controller.pagamento.get().transacao == 4) {
                        //            creait.redirect("cartao");
                        //        }
                        //        else if (controller.login.get().perfil_id == 5) {
                        //            creait.redirect("pagamento");
                        //        }
                        //        else if (controller.login.get().perfil_id == 6) {
                        //            creait.redirect("pagamento");
                        //        } else {
                        //            creait.redirect("pagamento");
                        //        }
                        //    }
                        //} else {
                        //    creait.redirect("categoria");
                        //}
                    });
                }
            });


            $$("#voltar_login").click(function () {
                if (localStorage.getItem("carrinho") != null) {
                    creait.redirect("pagamento");
                } else {
                    creait.redirect("index");
                }
            });


        });
    },
    get: function () {
        if (window.localStorage["login"] == null)
            return null;
        return JSON.parse(window.localStorage["login"]);
    },
    set: function (data) {
        window.localStorage["login"] = JSON.stringify(data);
    }

};