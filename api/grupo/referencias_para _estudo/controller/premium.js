

controller.premium = {
    init: function (events, query) {

        creait.get('assinar', {}, function (data) {



            var cartao = {};
            cartao.cartao = data;
            cartao.url = controller.layout.get().url;

            events(cartao, function (content) {
                creait.loader(false);

                var cardtype = null;

                Payment.formatCardExpiry(document.querySelector('#expiracao_input'));
                Payment.formatCardCVC(document.querySelector('#cvv'));
                Payment.formatCardNumber(document.querySelector('#cardnumber_input'));

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
                    $('#documento').toggleInputError($('#documento').val() == '', 'CPF ou CNPJ inválido');

                    var json = myApp.formToJSON("formcartao");

                    if ($('formcartao .has-error').length == 0) {
                        if ($('input[type=checkbox]').is(':checked')) {
                            creait.loader(true, 'Estamos processando o pagamento');

                            creait.post('assinar', json, function (data) {

                                creait.loader(false);
                                if (data.id == "authorized") {
                                    data.cvv = null;
                                    localStorage.removeItem("filial_id");
                                    localStorage.removeItem("filiais");
                                    localStorage.removeItem("carrinho");
                                    localStorage.removeItem("adicionar");
                                    creait.redirect("bemvindo");
                                    setTimeout(function () {
                                        localStorage.removeItem("layout");
                                    }, 1000);
                                }
                                else {
                                    myApp.alert('Oops, ocorreu um erro', data.mensagem);
                                }
                            });
                        }
                        else {
                            myApp.alert('Você precisa aceitar os termos de uso para continuar', 'Atenção');
                        }
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
