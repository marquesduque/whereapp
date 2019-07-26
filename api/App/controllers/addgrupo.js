controller.addgrupo = {
    init: function (events) {
        events({}, function (content) {

            $("#pessoa_id").val(controller.login.get().id);

            $('#btn_salvar_grupo').click(function () {
                $('#nome_grupo').toggleInputError($('#nome_grupo').val() == '', 'Digite alguma obersarvação/descriçao');
                $('#descricao_grupo').toggleInputError($('#descricao_grupo').val() == '', 'Digite alguma obersarvação/descrição');
                if ($("#grupo .has-error").length == 0) {
                    creait.post('grupo', myApp.formToJSON('#grupo'), function (data) {
                        var dados = controller.login.get();

                        dados.grupos.push(data);
                        controller.login.set(dados);

                        creait.redirect('grupo');
                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["addgrupo"] == null)
            return null;
        return JSON.parse(window.localStorage["addgrupo"]);
    },
    set: function (data) {
        window.localStorage["addgrupo"] = JSON.stringify(data);
    }
};