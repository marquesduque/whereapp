
controller.entrar = {
    init: function (events) {
        events({}, function (content) {

            $("#fileqrcode").change(function () {
                var input = this;
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        qrcode.decode(e.target.result);
                        qrcode.callback = function (decodedDATA) {
                            $('[name="email"]').val(decodedDATA);
                            $('#btn_entrar_mesa').click();
                        };
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            });

            $('#btn_entrar_mesa').click(function () {

                creait.loader(true, 'BUSCANDO CARDÁPIO');
                creait.get('pessoas', myApp.formToJSON("form_entrar_mesa"), function (data) {
                    debugger;
                    myApp.closePanel();

                    creait.loader(false);
                    if (data == null || data.length == 0 || data.error != null) {

                        myApp.alert('Esta mesa não existe', 'Oops ...');
                        return;
                    }

                    myApp.closePanel();
                    controller.login.set(data[0]);
                    creait.redirect('categoria');
                });
            });

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