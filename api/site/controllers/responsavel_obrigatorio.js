controller.responsavel_obrigatorio = {
    init: function (events) {
        events({}, function (content) {
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
                        login.responsaveis.push(data);

                        controller.loginE.set(login);

                        creait.redirect('home');
                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage[""] == null)
            return null;
        return JSON.parse(window.localStorage[""]);
    },
    set: function (data) {
        window.localStorage[""] = JSON.stringify(data);
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