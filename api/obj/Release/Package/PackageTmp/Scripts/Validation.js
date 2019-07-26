$(document).ready(function () {
    //Validar campos cnpj ao ganhar foco
    $('#S_CNPJ').on('blur', function () {
        if ($(this).val().trim() != "") {
            if (!validarCNPJ($(this).val())) {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').html(messages.CampoCNPJ);
            }
            else {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').html("");
            }
        }
    });

    //Validar campos cpf ao ganhar foco
    $('#S_CPF').on('blur', function () {

        if ($(this).val().trim() != "") {
            if (!validarCPF($(this).val())) {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').html(messages.CampoCPF);
            }
            else {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').html("");
            }
        }
    });

    //Validar campos telefone ao ganhar foco
    $('input[mask=\'{"value":"(99)99999-9999"}\']').on('blur', function () {
        if ($(this).val().trim() != "") {
            if (!validarTelefone($(this).val())) {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').html(messages.CampoQuantidade);
            }
            else {
                $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-error');
                $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-valid');
                $('[data-valmsg-for="' + this.id + '"]').html("");
            }
        }
    });
});

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

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

function validarTelefone(tel) {
    if (tel == null)
    {
        return false;
    }

    var telefoneFormat = tel.replace("(", "");

    telefoneFormat = telefoneFormat.replace(")", "");
    telefoneFormat = telefoneFormat.replace("-", "");
    telefoneFormat = telefoneFormat.replace(/_/g, "");

    if (telefoneFormat.length >= 10 && telefoneFormat.length <= 11)
    {
        return true;
    }
    else
    {
        return false;
    }
}