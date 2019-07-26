controller.responsavel_adicionar = {
    init: function (events) {
        events({}, function (content) {
            $('#id_responsavel').val(0);
            if (controller.responsavel_adicionar.get() != null) {
                $('#id_responsavel').val(controller.responsavel_adicionar.get().id);
                $('#nome_inpu').val(controller.responsavel_adicionar.get().nome);
                $('#rg_input').val(controller.responsavel_adicionar.get().rg);
                $('#cpf_input').val(controller.responsavel_adicionar.get().cpf);
                $('#email_inpu').val(controller.responsavel_adicionar.get().email);
                $('#telefone_inpu').val(controller.responsavel_adicionar.get().telefone);
                $('#celular_inpu').val(controller.responsavel_adicionar.get().celular);
                $('#cargo_inpu').val(controller.responsavel_adicionar.get().cargo_posicao);
                $('#porcentagem_input').val(controller.responsavel_adicionar.get().porcentagem);
            }

            $('#btn_salvar').click(function () {
                $('#nome_inpu').toggleInputError($('#nome_inpu').val() == '', 'Digite o Nome');
                $('#rg_input').toggleInputError($('#rg_input').val() == '', 'Digite o RG');
                $('#cpf_input').toggleInputError(validarCPF($('#cpf_input').val()) == false, 'CPF Invalido');
                $('#email_inpu').toggleInputError($('#email_inpu').val() == '', 'Digite o Email');
                //$('#telefone_inpu').toggleInputError($('#telefone_inpu').val() == '', 'Digite o Telefone');
                $('#celular_inpu').toggleInputError($('#celular_inpu').val() == '', 'Digite o Celular');
                $('#cargo_inpu').toggleInputError($('#cargo_inpu').val() == '', 'Digite o Cargo / Posição');
                //$('#porcentagem_input').toggleInputError($('#porcentagem_input').val() == '', 'Digite o Nome Fantasia');

                if ($("formresponsavel .has-error").length == 0) {
                    creait.post('responsavel_juridico', myApp.formToJSON('formresponsavel'), function (data) {

                        var login = controller.loginE.get();
                        if (controller.responsavel_adicionar.get() == null) {
                            login.responsaveis.push(data);

                            controller.loginE.set(login);
                            controller.responsavel_adicionar.set(null);
                            creait.redirect('responsavel');
                        } else {
                            for (var i = 0; i < login.responsaveis.length; i++) {
                                if (login.responsaveis[i].id == controller.responsavel_adicionar.get().id) {
                                    login.responsaveis[i].id = data.id;
                                    login.responsaveis[i].nome = data.nome;
                                    login.responsaveis[i].email = data.email;
                                    login.responsaveis[i].cpf = data.cpf;
                                    login.responsaveis[i].rg = data.rg;
                                    login.responsaveis[i].telefone = data.telefone;
                                    login.responsaveis[i].celular = data.celular;
                                    login.responsaveis[i].cargo_posicao = data.cargo_posicao;
                                    login.responsaveis[i].porcentagem = data.porcentagem;
                                    login.responsaveis[i].pessoa_id = data.pessoa_id;

                                    controller.loginE.set(login);
                                    controller.responsavel_adicionar.set(null);
                                    creait.redirect('responsavel');

                                    break;
                                }
                            }
                        }
                        
                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["responsavel_adicionar"] == null)
            return null;
        return JSON.parse(window.localStorage["responsavel_adicionar"]);
    },
    set: function (data) {
        window.localStorage["responsavel_adicionar"] = JSON.stringify(data);
    }
};

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}
