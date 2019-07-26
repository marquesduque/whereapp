controller.trabalhar = {
    init: function (events) {

        creait.get('tipos', {}, function (result) {
            debugger;
            events({
                tipos: result
            }, function (content) {


                $$("#btn_trabalhar").click(function () {

                    var form = myApp.formToJSON("formtrabalhar");

                    $('[name="nome"]').toggleInputError(form.nome == '', 'Informe o seu nome');
                    $('[name="photo"]').toggleInputError(form.photo_itype == '', 'Obrigatório');
                    $('[name="comprovante"]').toggleInputError(form.comprovante_itype == '', 'Obrigatório');
                    $('[name="antecedentes"]').toggleInputError(form.antecedente_itype == '', 'Obrigatório');
                    $('[name="BankCode"]').toggleInputError(form.BankCode == '', 'Informe o seu banco');
                    $('[name="especialidade_id"]').toggleInputError(form.especialidade_id == '', 'Informe sua especialidade');

                    $('[name="rg_image"]').toggleInputError(form.rg_image_itype == '', 'Obrigatório');
                    $('[name="email"]').toggleInputError(form.email == '', 'Informe o seu email profissional');
                    $('[name="tel"]').toggleInputError(form.tel == '', 'Informe um telefone');
                    $('[name="birthday"]').toggleInputError(form.birthday == '', 'Informe a data de nascimento');
                    $('[name="cpf"]').toggleInputError(form.cpf == '', 'Informe o numero do seu cpf');
                    $('[name="rg"]').toggleInputError(form.rg == '', 'Informe o numero do seu rg');
                    $('[name="phone"]').toggleInputError(form.phone == '', 'Informe seu telefone');
                    $('[name="password"]').toggleInputError(form.password == '', 'Informe uma senha');

                    $('#aceite').toggleInputError($('#aceite:checked').length == 0, 'Para continuar você precisa aceitar os termos de uso');

                    debugger;

                    if ($('formtrabalhar .has-error').length == 0) {
                        form.comissao = 10;
                        creait.post('trabalhar', form, function (data) {

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
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }

}