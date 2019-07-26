
controller.minhaConta = {
    init: function (events) {
        events(controller.loginE.get(), function (content) {
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
                    '<a href = "#" class = "link close-picker" onclick="creait.redirect(\'addItem\')">Cadastrar Item</a>' +
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
            $$("#btn_sign_up").click(function () {
                $('#nome_inpu').toggleInputError($('#nome_inpu').val() == '', 'Digite o Nome Fantasia');
                $('#rs_input').toggleInputError($('#rs_input').val() == '', 'Digite a Razão Social');
                $('#email_inpu').toggleInputError($('#email_inpu').val() == '', 'Digite o email');
                $('#password_inpu').toggleInputError($('#password_inpu').val() == '', 'Digite uma senha');
                $('#password_confirmar_inpu').toggleInputError($('#password_inpu').val() != $('#password_confirmar_inpu').val(), 'As senhas devem ser iguais');
                $('#cnpj_input').toggleInputError(validarCNPJ($('#cnpj_input').val()) == false, 'CNPJ Invalido');
                //$('#grupo_input').toggleInputError($('#grupo_input').val() == '', 'Digite o email');
                //$('#filial_input').toggleInputError($('#filial_input').val() == '', 'Digite o email');
                //$('#franqueador_input').toggleInputError($('#franqueador_input').val() == '', 'Digite o email');
                //$('#franqueado_input').toggleInputError($('#franqueado_input').val() == '', 'Digite o email');

                $('#cep_input').toggleInputError($('#cep_input').val() == '', 'Digite o CEP');
                $('#pais_input').toggleInputError($('#pais_input').val() == '', 'Digite o Pais');
                $('#picker_estados').toggleInputError($('#picker_estados').val() == '', 'Selecione o estado');
                $('#cidade').toggleInputError($('#cidade').val() == '', 'Digite a Cidade');
                $('#bairro_input').toggleInputError($('#bairro_input').val() == '', 'Digite o Bairro');
                $('#rua_input').toggleInputError($('#rua_input').val() == '', 'Digite a Rua');
                $('#numero_input').toggleInputError($('#numero_input').val() == '', 'Digite o Numero');
                if ($('formcadastro .has-error').length == 0) {
                    $('#complemento_input').val() == "" ? $('#complemento_input').val("nt") : $('#complemento_input').val();
                    creait.post('cadastroEmpresa', myApp.formToJSON("formcadastro"), function (data) {
                        if (data.error != null || data.error != undefined) {
                            myApp.alert("Ocorreu um erro. Tente novamente mais tarde", "Aviso!");
                            return;
                        }  else {
                            var login = controller.loginE.get();

                            login.id = data.id;
                            login.email = data.email;
                            login.senha = data.password;
                            login.nome = data.nome;
                            login.razao_social = data.razao_social;
                            login.cnpj = data.cnpj;
                            login.grupo = data.grupo;
                            login.filial = data.filial;
                            login.franqueador = data.franqueador;
                            login.franqueado = data.franqueado;
                            login.rua = data.rua;
                            login.numero = data.numero;
                            login.complemento = data.complemento;
                            login.bairro = data.bairro;
                            login.cep = data.cep;
                            login.cidade = data.cidade;
                            login.estado = data.estado;
                            login.pais = data.pais;
                            login.foto_itype = data.foto_itype;
                            login.foto = data.foto;
                            login.perfil_id = data.perfil_id;

                            controller.loginE.set(login);

                            if (controller.loginE.get().responsaveis.length == 0) {
                                creait.redirect('responsavel_obrigatorio');
                            } else {
                                creait.redirect('home');
                            }
                        }
                    });
                }
            });

            $('input[type="file"]').each(function () {
                this.addEventListener("change", readFile, false);
            });
        });
    }
};

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

//function validarCPF(cpf) {
//    cpf = cpf.replace(/[^\d]+/g, '');
//    if (cpf == '') return false;
//    // Elimina CPFs invalidos conhecidos	
//    if (cpf.length != 11 ||
//        cpf == "00000000000" ||
//        cpf == "11111111111" ||
//        cpf == "22222222222" ||
//        cpf == "33333333333" ||
//        cpf == "44444444444" ||
//        cpf == "55555555555" ||
//        cpf == "66666666666" ||
//        cpf == "77777777777" ||
//        cpf == "88888888888" ||
//        cpf == "99999999999")
//        return false;
//    // Valida 1o digito	
//    add = 0;
//    for (i = 0; i < 9; i++)
//        add += parseInt(cpf.charAt(i)) * (10 - i);
//    rev = 11 - (add % 11);
//    if (rev == 10 || rev == 11)
//        rev = 0;
//    if (rev != parseInt(cpf.charAt(9)))
//        return false;
//    // Valida 2o digito	
//    add = 0;
//    for (i = 0; i < 10; i++)
//        add += parseInt(cpf.charAt(i)) * (11 - i);
//    rev = 11 - (add % 11);
//    if (rev == 10 || rev == 11)
//        rev = 0;
//    if (rev != parseInt(cpf.charAt(10)))
//        return false;
//    return true;
//}

function readFile() {

    var control = this;
    if (this.files && this.files[0]) {
        var files = this.files[0];
        var FR = new FileReader();
        var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
        FR.onload = function (e) {

            var img = new Image();

            img.src = e.currentTarget.result;

            img.onload = function () {
                var MAX_WIDTH = img.width;
                var MAX_HEIGHT = img.height;

                var porcent = ((800 * 100) / img.height);
                MAX_WIDTH = img.width * (porcent / 100);
                MAX_HEIGHT = img.height * (porcent / 100);

                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(this, 0, 0, width, height);


                var dataUrl = canvas.toDataURL();
                $("#foto_str").val(dataUrl.split(',')[1]);

                $("#foto_usuario").css('background-image', 'url(' + dataUrl + ')');

            };

        };

        FR.readAsDataURL(this.files[0]);
    }
    else {
        $($(control).attr('source')).val('');
        alert("O arquivo é muito grande. Favor selecionar um arquivo com no máximo 5 mb");
    }

    if ((this.files[0].type != "image/jpeg") && (this.files[0].type != "image/png")) {
        $($(control).attr('source')).val('');
        alert("O Tipo de arquivo selecionado é inválido, selecione um formato válido (jpeg, png)");
    }

}

