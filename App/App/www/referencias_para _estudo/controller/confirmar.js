
controller.confirmar = {
    init: function (events, query) {
        var endereco = controller.endereco.get();
        events(endereco, function (content) {
            if (endereco.cpf != null && endereco.cpf != '') {
                $('.iscpf').click()
            }
            $('#btn_complementoendereco').click(function () {

                $('#confirmar_complemento').toggleInputError(!$('#ckb_complemento').is(':checked') && $('#confirmar_complemento').val().trim() == '', 'Informe o complemento');
                if ($('#ckb_complemento').is(':checked')) {
                    $('formatte .has-error').removeClass('has-error');
                }
                if ($('formatte .has-error').length == 0) {
                    endereco.cpf = $('#confirmar_cpf input').val();
                    endereco.complement = $('#confirmar_complemento').val();
                    controller.endereco.set(endereco);
                    creait.redirect('confirmarPedido');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["enderecoprovisorio"] == null)
            return null;
        return JSON.parse(window.localStorage["enderecoprovisorio"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["enderecoprovisorio"] = data;
        else
            window.localStorage["enderecoprovisorio"] = JSON.stringify(data);
    }
}