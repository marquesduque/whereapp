
controller.perfil = {
    init: function (events) {
        events(controller.login.get(), function (content) {

            var picker = myApp.picker({
                input: '#picker_estados',
                rotateEffect: true,
                cols: [
                    {
                        values: ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
                    }
                ],
                toolbarTemplate:
                '<div class = "toolbar">' +
                '<div class = "toolbar-inner">' +
                '<div class = "left">' +
                '<a href = "#" class = "link close-picker"></a>' +
                '</div>' +
                '<div class = "center"></div>' +
                '<div class = "">' +
                '<a href = "#" class = "link close-picker">Done</a>' +
                '</div>' +
                '</div>' +
                '</div>',
                onClose: function () {
                },
                onOpen: function () {
                }
            });
            $('#picker_estados').click(function () {
                picker.open();
            });

            $('#foto_usuario').click(function () {
                myApp.alert(
                    "<div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openCamera(); myApp.closeModal(\".modal\");'>Tirar Foto</div><div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openLibrary(); myApp.closeModal(\".modal\");'>Escolher da Biblioteca</div>",
                    "Escolha uma das opções a baixo!"
                );
            });

            $$("#btn_sign_up").click(function () {

                $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Informe o seu nome');
                $('#rg_input').toggleInputError($('#rg_input').val() == '', 'Informe o seu RG');
                $('#celular_input').toggleInputError($('#celular_input').val() == '', 'Informe o seu Celular');
                $('#dataN_input').toggleInputError($('#dataN_input').val() == '', 'Informe a sua Data de Nascimento');

                $('#email_input').toggleInputError($('#email_input').val() == '' || !creait.isEmail($('#email_input').val()), 'Email inválido');
                $('#password_input').toggleInputError($('#nome_input').val() == '' || $('#password_input').val().length < 6, 'A senha deve ter no minimo 6 caracteres');

                $('#password_confirmar_input').toggleInputError($('#password_input').val() != $('#password_confirmar_input').val(), 'A confirmação da senha esta errada');
                $('#cpf_input').toggleInputError(validarCPF($("#cpf_input").val()) == false, 'CPF Inválido');

                $('#cep_input').toggleInputError($("#cep_input").val() == false, 'Informe o seu CEP');
                $('#pais_input').toggleInputError($("#pais_input").val() == false, 'Informe o pais');
                $('#picker_estados').toggleInputError($("#picker_estados").val() == false, 'Selecione o estado');
                $('#cidade').toggleInputError($("#cidade").val() == false, 'Informe a cidade');
                $('#bairro_input').toggleInputError($("#bairro_input").val() == false, 'Informe o bairro');
                $('#rua_input').toggleInputError($("#rua_input").val() == false, 'Inform a rua');
                $('#numero_input').toggleInputError($("#numero_input").val() == false, 'Informe o numero');
                $('#password_sa').toggleInputError($("#password_sa").val() != controller.login.get().senha, 'Senha Incorreta');
                $('#password_sn').toggleInputError($("#password_sn").val() != $("#password_csn").val(), 'As senhas não coincidem');

                $('#pushC').val(pushToken);
                $('#platC').val(plataforma);

                if ($("#senha_antiga").val() != "") {
                    if ($('#password_sa').val() == controller.login.get().senha) {
                        if ($("#password_sn").val() == $("#password_sn").val() && $("#password_sn").val() != ""){
                            $("#senha").val($("#password_sn").val());
                        }
                    }
                }

                if ($('formcadastro .has-error').length == 0) {
                    $("#complemento_input").val() == "" ? $("#complemento_input").val("nt") : $("#complemento_input").val();
                    creait.post('pessoas', myApp.formToJSON("formcadastro"), function (data) {

                        if (data.erro == null) {
                            controller.login.set(data);
                            creait.redirect("categoria");
                        }
                        else {
                            myApp.alert(data.erro, "Atenção");
                            creait.loader(false);
                        }
                    });
                }
            });
        });
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

function openCamera() {
    navigator.camera.getPicture(onSulpess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        PopoverArrowDirection: 1
    });
}

function openLibrary() {
    navigator.camera.getPicture(onSulpess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        PopoverArrowDirection: 1
    });
}

function onSulpess(imageURI) {
    $('#foto_usuario').css('background-image', 'url(data:image/jpeg;base64,' + imageURI + ')');

    $('#foto_str').val(imageURI);
    $('#foto_itype').val('data:image/jpeg;base64');

}

function onFail(message) {
    console.log('Failed because: ' + message);
}

