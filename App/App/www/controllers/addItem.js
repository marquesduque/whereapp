controller.addItem = {
    init: function (events) {
        events({}, function (content) {
            $('.responsavel_id').val(controller.login.get().id);

            $('#foto').click(function () {
                myApp.alert(
                    "<div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openCam(); myApp.closeModal(\".modal\");'>Tirar Foto</div><div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openLibra(); myApp.closeModal(\".modal\");'>Escolher da Biblioteca</div>",
                    "Escolha uma das opções a baixo!"
                );
            });

            var html = '<option value="" selected=""></option><option value="1">Pessoa</option><option value="2">Animal</option><option value="3">Objeto</option><option value="4">Veiculo</option><option value="5">Carga</option><option value="6" selected="">Outros</option>';
            $('#tipoI').html(html);


            $('#tipoI').on('change', function () {
                $('form').css('display', 'none');
                $('#' + $('#tipoI').val()).css('display', 'block');
                $('.tipo_id').val($('#tipoI').val());
            });

            $('#btn_cadastra_item').click(function () {
                $("[name='doacao']").val($("[name='doacao_slc']:checked").val());
                $("[name='apadrinhar']").val($("[name='apadrinhar_slc']:checked").val());
                if ($('#tipoI').val() == 1) {
                    $('#nome_1').toggleInputError($('#nome_1').val() == '', 'Informe o nome');
                    $('#rg_1').toggleInputError($('#rg_1').val() == '', 'Informe o RG');
                    $('#nasc_1').toggleInputError($('#nasc_1').val() == '', 'Informe o Data de Nascimento');
                    $('#desc_1').toggleInputError($('#desc_1').val() == '', 'Digite alguma observação');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                }
                else if ($('#tipoI').val() == 2) {
                    $('#nome_2').toggleInputError($('#nome_2').val() == '', 'Informe o nome');
                    $('#cor_2').toggleInputError($('#cor_2').val() == '', 'Informe a Cor');
                    $('#raca_2').toggleInputError($('#raca_2').val() == '', 'Informe a raça');
                    $('#desc_2').toggleInputError($('#desc_2').val() == '', 'Digite alguma obersarvação/descriçao');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                }
                else if ($('#tipoI').val() == 3) {
                    $('#nome_3').toggleInputError($('#nome_3').val() == '', 'Informe o nome');
                    $('#fabri_3').toggleInputError($('#fabri_3').val() == '', 'Informe o fabricante');
                    $('#marca_3').toggleInputError($('#marca_3').val() == '', 'Informe a marca');
                    $('#cor_3').toggleInputError($('#cor_3').val() == '', 'Informe a cor');
                    $('#desc_3').toggleInputError($('#desc_3').val() == '', 'Digite alguma obersarvação/descriçao');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                }
                else if ($('#tipoI').val() == 4) {
                    $('#nome_4').toggleInputError($('#nome_4').val() == '', 'Informe a Placa');
                    $('#fabri_4').toggleInputError($('#fabri_4').val() == '', 'Informe o fabricante');
                    $('#marca_4').toggleInputError($('#marca_4').val() == '', 'Informe a marca');
                    $('#cor_4').toggleInputError($('#cor_4').val() == '', 'Informe a cor');
                    $('#modelo_4').toggleInputError($('#modelo_4').val() == '', 'Informe o modelo');
                    $('#desc_4').toggleInputError($('#desc_4').val() == '', 'Digite alguma obersarvação/descriçao');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                }
                else if ($('#tipoI').val() == 5) {
                    $('#nome_5').toggleInputError($('#nome_5').val() == '', 'Informe o seu nome');
                    $('#desc_5').toggleInputError($('#desc_5').val() == '', 'Digite alguma obersarvação/descriçao');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                }
                else if ($('#tipoI').val() == 6) {
                    $('#nome_6').toggleInputError($('#nome_6').val() == '', 'Informe o seu nome');
                    $('#desc_6').toggleInputError($('#desc_6').val() == '', 'Digite alguma obersarvação/descriçao');

                    if ($("#" + $('#tipoI').val() + " .has-error").length > 0) {
                        return;
                    }
                } else {
                    myApp.alert("Selecione um item", "");
                    return;
                }

                creait.post('item', myApp.formToJSON('#' + $('#tipoI').val()), function (data) {
                    var dados = controller.login.get();

                    dados.meusitens.push(data.itens[0]);
                    controller.login.set(dados);
                    creait.redirect('meuItem');
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["addItem"] == null)
            return null;
        return JSON.parse(window.localStorage["addItem"]);
    },
    set: function (data) {
        window.localStorage["addItem"] = JSON.stringify(data);
    }
};

function openCam() {
    navigator.camera.getPicture(onSuc, onFai, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        PopoverArrowDirection: 1
    });
}

function openLibra() {
    navigator.camera.getPicture(onSuc, onFai, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        PopoverArrowDirection: 1
    });
}

function onSuc(imageURI) {
    $('#foto').css('background-image', 'url(data:image/jpeg;base64,' + imageURI + ')');

    $('.photo').val(imageURI);
    $('.photo_itype').val('data:image/jpeg;base64');

}

function onFai(message) {
    console.log('Failed because: ' + message);
}
