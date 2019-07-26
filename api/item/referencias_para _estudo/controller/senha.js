

controller.senha = {
    init: function (events, query) {
        events({}, function (content) {
            $('#btn_alterarsenha').click(function () {
                if ($('#lembrar_senha').val() == $('#lembar_senha_confirmar').val() || $('#lembrar_senha').val() != "" && $('#lembar_senha_confirmar').val() != "") {
                    creait.post('lembrar?token=' + query.token + '&senha=' + $('#lembrar_senha').val(), null, function (data) {
                        creait.redirect('login');
                    });
                }
                else {
                    myApp.alert('A confirmação da senha está errada');
                }
            });
        });
    }
}