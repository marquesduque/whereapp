
controller.perfil = {
    init: function (events) {
        events({}, function (content) {
            if (controller.login.get() != null) {
                $('#nomePerfil').val(controller.login.get().nome);
                $('#emailPerfil').val(controller.login.get().email);
                $('#telefonePerfil').val(controller.login.get().phone);
                $('#enderecoPerfil').val(controller.login.get().endereco);
                $('#numeroPerfil').val(controller.login.get().numero);
                $('#complementoPerfil').val(controller.login.get().complemento);
                $('#idPerfil').val(controller.login.get().id);

            }

            $$("#btn_att").click(function () {
                creait.post('pessoas', myApp.formToJSON("formatt"), function (data) {

                    controller.login.set(data);
                    alert('atualizado com sucesso')
                });
            });

        });
    }
}