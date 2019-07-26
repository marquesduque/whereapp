
controller.lembrar = {
    init: function (events) {
        events({}, function (content) {
            $('#btn_lembrar').click(function () {


                $('#txt_lembrar').toggleInputError($('#txt_lembrar').val() == '', 'Informe um email');

                if ($('#txt_lembrar.has-error').length == 0) {
                    creait.get('lembrar?email=' + $('#txt_lembrar').val(), null, function (data) {
                        myApp.alert(data.message);
                    });
                }
            });
        });
    }
}