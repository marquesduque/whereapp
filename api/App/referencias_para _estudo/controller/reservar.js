
controller.reservar = {
    init: function (events) {
        events({}, function (content) {

            $$("#btn_sign_up").click(function () {

                $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Informe o seu nome');

                $('#email_input').toggleInputError($('#email_input').val() == '' || !creait.isEmail($('#email_input').val()), 'Email inválido');

                $('#telefone_input').toggleInputError($('#telefone_input').val() == '' || !creait.isPhone($('#telefone_input').val()), 'Informe o seu telefone');

                $('#password_input').toggleInputError($('#nome_input').val() == '' || $('#password_input').val().length < 6, 'A senha deve ter no minimo 6 caracteres');

                $('#password_confirmar_input').toggleInputError($('#password_input').val() != $('#password_confirmar_input').val(), 'A confirmação da senha esta errada');

                if ($('formcadastro .has-error').length == 0) {

                    creait.post('pessoas', myApp.formToJSON("formcadastro"), function (data) {

                        if (data.erro == null) {
                            controller.login.set(data)

                            if (controller.carrinho.get() != null) {
                                if (controller.endereco.get() == null) {
                                    if (controller.layout.get().balcao && controller.layout.get().delivery) {
                                        creait.redirect('endereco');
                                    }
                                    else if (controller.busca.get().balcao) {
                                        creait.redirect('filial');
                                    }
                                    else {
                                        creait.redirect('endereco');
                                    }
                                }
                                else {
                                    if (controller.cartao.get() == null && (controller.pagamento.get() != null && controller.pagamento.get().transacao == 4)) {
                                        creait.redirect("cartao");
                                    }
                                    else if (controller.login.get().perfil_id == 5) {
                                        creait.redirect("cliente");
                                    } else {
                                        creait.redirect("pagamento");
                                    }
                                }
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                        else {
                            myApp.alert(data.erro, "Atenção");
                        }
                    });
                }
            });
        });
    }
}

