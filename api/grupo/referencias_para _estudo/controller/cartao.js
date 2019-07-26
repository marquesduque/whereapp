


controller.cartao = {
    init: function (events, query) {

        var cartao = {};
        cartao.login = controller.login.get();
        cartao.cartao = controller.cartao.get();
        debugger;
        creait.get('cartao', { pessoa_id: cartao.login.id },
            function (data) {
                if (data == null) {
                    cartao.cartao = {};
                    cartao.cartao.numero = '';
                    cartao.cartao.nome = '';
                    cartao.cartao.bandeira = '';
                    cartao.cartao.cvv = '';
                    cartao.cartao.expiracao = '';
                }
                else {
                    cartao.cartao = data;
                }

                events(cartao, function (content) {
                    creait.loader(false);

                    var cardtype = null;

                    Payment.formatCardExpiry(document.querySelector('#expiracao_input'));
                    Payment.formatCardCVC(document.querySelector('#cvv'));
                    Payment.formatCardNumber(document.querySelector('#cardnumber_input'));

                    $('.back.link').click(function () {
                        debugger;
                        if (query.horario == null) {
                            creait.redirect('carrinho');
                        }
                        else {
                            creait.redirect('horario', 'id=' + query.horario);
                        }
                    });

                    $$('#cardnumber_input').keyup(function () {
                        var card = $(this).val();
                        cardtype = Payment.fns.cardType(card);
                        $('[name="bandeira"]').val(cardtype);
                        $('#brand').attr('src', 'icons/bandeiras/' + cardtype + '.svg');
                        $('#brand').css('display', 'block');
                    });

                    $$("#btn_savar_cartao").click(function () {

                        $('#cardnumber_input').toggleInputError(!Payment.fns.validateCardNumber($('#cardnumber_input').val()), 'Cartão esta inválido');
                        $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Nome obrigatório');
                        $('#expiracao_input').toggleInputError(!($('#expiracao_input').val().split('/').length == 2 && Payment.fns.validateCardExpiry($('#expiracao_input').val().split('/')[0], $('#expiracao_input').val().split('/')[1])), 'Data inválida');
                        $('#cvv').toggleInputError(!Payment.fns.validateCardCVC($('#cvv').val()), 'CCV Inváligo');
                        $('#documento').toggleInputError($('#documento').val() == '', 'CPF ou CNPJ inválido use apenas números');

                        var json = myApp.formToJSON("formcartao");
                        json.pessoa_id = controller.login.get().id;
                        json.compra_id = query.compra;

                        if ($('formcartao .has-error').length == 0) {
                            creait.post('cartao', json, function (data) {
                                if (data.erro == null) {
                                    controller.cartao.set(data);

                                    if (query.atendimento != null) {
                                        creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar", "id=" + query.atendimento);
                                    }
                                    else if (query.horario != null) {
                                        creait.redirect("horario", "id=" + query.horario);
                                    }
                                    else {
                                        creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                                    }
                                }
                                else {
                                    creait.loader(false);
                                    myApp.alert(data.erro, 'Oops');
                                }
                            });
                        }

                    });
                });
            });


    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}