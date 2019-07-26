controller.confirma_compra = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["confirma_compra"] == null)
            return null;
        return JSON.parse(window.localStorage["confirma_compra"]);
    },
    set: function (data) {
        window.localStorage["confirma_compra"] = JSON.stringify(data);
    }
};
controller.endereco_entrega = {
    init: function (events) {
        events({}, function (content) {
            $(".endereco_entrega").click(function () {
                if ($(this).attr("valor") == 0) {
                    $("#endereco_novo").css("display", "block");
                    $('#estado').val(controller.login.get().estado);
                    $('#cidade').val(controller.login.get().cidade);
                    $('#bairro').val(controller.login.get().bairro);
                    $('#rua').val(controller.login.get().rua);
                    $('#numero').val(controller.login.get().numero);
                    $('#cep').val(controller.login.get().cep);
                    $('#complemento').val(controller.login.get().complemento);
                } else if ($(this).attr("valor") == 1) {
                    $("#endereco_novo").css("display", "block");
                    $('#estado').val("");
                    $('#cidade').val("");
                    $('#bairro').val("");
                    $('#rua').val("");
                    $('#numero').val("");
                    $('#cep').val("");
                    $('#complemento').val("");
                } else {
                    $("#endereco_novo").css("display", "none");
                }
            });

            $("#ir_forma_pagamento").click(function () {
                var carrinho = controller.carrinho.get();

                if ($("#endereco_novo").css("display") == "block") {
                    if ($("#rua").val() == "") {
                        myApp.alert("Informe a rua", "");
                        return;
                    }
                    if ($("#numero").val() == "") {
                        myApp.alert("Informe o numero", "");
                        return;
                    }
                    if ($("#complemento").val() == "") {
                        myApp.alert("Informe o complemento", "");
                        return;
                    }
                    if ($("#bairro").val() == "") {
                        myApp.alert("Informe o bairro", "");
                        return;
                    }
                    if ($("#cep").val() == "") {
                        myApp.alert("Imforme o CEP", "");
                        return;
                    }
                    if ($("#cidade").val() == "") {
                        myApp.alert("Informe a cidade", "");
                        return;
                    }
                    if ($("#estado").val() == "") {
                        myApp.alert("Informe o estado", "");
                        return;
                    }
                    carrinho.endereco_bool = 1;
                    carrinho.rua_entrega = $("#rua").val();
                    carrinho.numero_entrega = $("#numero").val();
                    carrinho.complemento_entrega = $("#complemento").val();
                    carrinho.bairro_entrega = $("#bairro").val();
                    carrinho.cep_entrega = $("#cep").val().replace("-","");
                    carrinho.cidade_entrega = $("#cidade").val();
                    carrinho.estado_entrega = $("#estado").val();
                }

                controller.carrinho.set(carrinho);

                creait.redirect('forma_pagamento');
            });
        });
    },
    get: function () {
        if (window.localStorage["endereco_entrega"] == null)
            return null;
        return JSON.parse(window.localStorage["endereco_entrega"]);
    },
    set: function (data) {
        window.localStorage["endereco_entrega"] = JSON.stringify(data);
    }
};
controller.detalhe_padrinho = {
    init: function (events) {
        events(controller.detalhe_padrinho.get(), function (content) {
            
            $("#btn_apadrinhar").click(function () {
                creait.redirect('adesao');
            });
        });
    },
    get: function () {
        if (window.localStorage["detalhe_padrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["detalhe_padrinho"]);
    },
    set: function (data) {
        window.localStorage["detalhe_padrinho"] = JSON.stringify(data);
    }
};
controller.addgrupo = {
    init: function (events) {
        events({}, function (content) {

            $("#pessoa_id").val(controller.login.get().id);

            $('#btn_salvar_grupo').click(function () {
                $('#nome_grupo').toggleInputError($('#nome_grupo').val() == '', 'Digite alguma obersarvação/descriçao');
                $('#descricao_grupo').toggleInputError($('#descricao_grupo').val() == '', 'Digite alguma obersarvação/descrição');
                if ($("#grupo").length == 0) {
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

controller.additemgrupo = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            

            $('#btn_cadastra_item_grupo').click(function () {
                var item_id = '';

                $('.itens').each(function (i) {
                    if (($('.itens')[i].checked) == true) {
                        item_id += "&item_id=" + $($('.itens')[i]).val();
                    }
                });

                creait.post('item?grupo_id=' + localStorage.getItem("grupo_id") + item_id, null, function (data) {
                    var dados = controller.login.get();

                    for (var i = 0; i < dados.grupos.length; i++) {
                        if (dados.grupos[i].id == localStorage.getItem("grupo_id")) {
                            dados.grupos[i].itens.push(data);
                            controller.login.set(dados);
                            break;
                        }
                    }
                    creait.redirect('grupo_item');
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["additemgrupo"] == null)
            return null;
        return JSON.parse(window.localStorage["additemgrupo"]);
    },
    set: function (data) {
        window.localStorage["additemgrupo"] = JSON.stringify(data);
    }
};
controller.adicionar = {
    init: function (events) {
        events(controller.adicionar.get(), function (content) {

            $('.menos_adicionar').click(function () {
                if ($("#qtde_adicionar").html() > 1) {
                    var adicionar = controller.adicionar.get();
                    var qtd = parseInt($("#qtde_adicionar").html()) - 1;
                    $("#qtde_adicionar").html(qtd);
                    adicionar.estoque = parseInt(adicionar.estoque) + 1;

                    controller.adicionar.set(adicionar);
                }
            });

            $('.mais_adicionar').click(function () {
                if ($("#qtde_adicionar").html() == controller.adicionar.get().estoque) {
                    myApp.alert("Quantidade maxima de produtos em estoque atingido", "...");
                }
                else {
                    var adicionar = controller.adicionar.get();
                    var qtd = parseInt($("#qtde_adicionar").html()) + 1;
                    $("#qtde_adicionar").html(qtd);
                    adicionar.estoque = parseInt(adicionar.estoque) - 1;

                    controller.adicionar.set(adicionar);
                }
            });

            $("#btn_adicionar").click(function () {
                var carrinho = controller.carrinho.get();
                var adicionar = controller.adicionar.get();

                if (adicionar.estoque == 0) {
                    myApp.alert("Este produto está fora de estoque.", "");
                }
                else {
                    adicionar.estoque = parseInt(adicionar.estoque) - parseInt($("#qtde_adicionar").html());
                    controller.adicionar.set(adicionar);

                    if (carrinho == null) {
                        var data = {
                            valor_total: parseFloat(controller.adicionar.get().valor) * parseFloat($("#qtde_adicionar").html()),
                            loja_id: controller.adicionar.get().responsavel_id,
                            endereco_bool: 0,
                            rua_entrega: "",
                            numero_entrega: "",
                            complemento_entrega: "",
                            bairro_entrega: "",
                            cep_entrega: "",
                            cidade_entrega: "",
                            estado_entrega: "",
                            itens: [{
                                id: controller.adicionar.get().id,
                                nome: controller.adicionar.get().nome,
                                qtde: parseInt($("#qtde_adicionar").html()),
                                descricao: controller.adicionar.get().descricao,
                                valor: controller.adicionar.get().valor
                            }]
                        };

                        data.valor_total = data.valor_total.toFixed(2);
                        controller.carrinho.set(data);

                        myApp.alert("Item adicionado com sucesso!", "...");
                    }
                    else {
                        carrinho.valor_total = (parseFloat(controller.adicionar.get().valor) * parseFloat($("#qtde_adicionar").html())) + parseFloat(carrinho.valor_total);
                        carrinho.valor_total = carrinho.valor_total.toFixed(2);

                        for (var i = 0; i <= carrinho.itens.length; i++) {
                            if (i == carrinho.itens.length) {
                                carrinho.itens.push({
                                    id: controller.adicionar.get().id,
                                    nome: controller.adicionar.get().nome,
                                    qtde: parseInt($("#qtde_adicionar").html()),
                                    descricao: controller.adicionar.get().descricao,
                                    valor: controller.adicionar.get().valor,
                                    foto: controller.adicionar.get().foto,
                                    foto_itype: controller.adicionar.get().foto_itype
                                });

                                break;
                            }
                            else if (carrinho.itens[i].id == controller.adicionar.get().id) {
                                var qtd = parseInt(carrinho.itens[i].qtde) + parseInt($("#qtde_adicionar").html());
                                carrinho.itens[i].qtde = qtd;

                                break;
                            }
                        }
                        controller.carrinho.set(carrinho);

                        myApp.alert("Item adicionado com sucesso!", "...");
                    }

                    $('#div_carrinho').css('display', 'block');

                    $('.views').addClass('carrinho');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["adicionar"] == null)
            return null;
        return JSON.parse(window.localStorage["adicionar"]);
    },
    set: function (data) {
        window.localStorage["adicionar"] = JSON.stringify(data);
    }
};
controller.cadastrarRastreador = {
    init: function (events) {
        events({}, function (content) {
            var picker = myApp.picker({
                input: '#picker_item',
                rotateEffect: true,
                cols: [
                    {
                        values: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
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
            $('#picker_item').click(function () {
                picker.open();
            });
        });
    },
    get: function () {
        if (window.localStorage["cadastrarRastreador"] == null)
            return null;
        return JSON.parse(window.localStorage["cadastrarRastreador"]);
    },
    set: function (data) {
        window.localStorage["cadastrarRastreador"] = JSON.stringify(data);
    }
};

controller.cadastro = {
    init: function (events) {
        events({}, function (content) {
            $('#foto_usuario').click(function () {
                myApp.alert(
                    "<div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openCamera(); myApp.closeModal(\".modal\");'>Tirar Foto</div><div style='color:#2196f3; text-align:left; font-size:20px;' onclick='openLibrary(); myApp.closeModal(\".modal\");'>Escolher da Biblioteca</div>",
                    "Escolha uma das opções a baixo!"
                );
            });

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

            $$("#btn_sign_up").click(function () {
                
                $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Informe o seu nome');
                $('#rg_input').toggleInputError($('#rg_input').val() == '', 'Informe o seu RG');
                $('#celular_input').toggleInputError($('#celular_input').val() == '', 'Informe o seu Celular');
                $('#dataN_input').toggleInputError($('#dataN_input').val() == '', 'Informe a sua Data de Nascimento');

                $('#email_input').toggleInputError($('#email_input').val() == '' || !creait.isEmail($('#email_input').val()), 'Email inválido');
                $('#password_input').toggleInputError($('#nome_input').val() == '' || $('#password_input').val().length < 6, 'A senha deve ter no minimo 6 caracteres');

                $('#password_confirmar_input').toggleInputError($('#password_input').val() != $('#password_confirmar_input').val(), 'A confirmação da senha esta errada');
                $('#cpf_input').toggleInputError($('#cpf_input').val() == '', 'Informe o seu CPF');
                $('#cpf_input').toggleInputError(validarCPF($("#cpf_input").val()) == false, 'CPF Inválido');

                $('#cep_input').toggleInputError(validarCPF($("#cep_input").val()) == false, 'Informe o seu CEP');
                $('#pais_input').toggleInputError(validarCPF($("#pais_input").val()) == false, 'Informe o pais');
                $('#picker_estados').toggleInputError(validarCPF($("#picker_estados").val()) == false, 'Selecione um estado');
                $('#cidade').toggleInputError(validarCPF($("#cidade").val()) == false, 'Informe a cidade');
                $('#bairro_input').toggleInputError(validarCPF($("#bairro_input").val()) == false, 'Informe o bairro');
                $('#rua_input').toggleInputError(validarCPF($("#rua_input").val()) == false, 'Informe a rua');
                $('#numero_input').toggleInputError(validarCPF($("#numero_input").val()) == false, 'Informe o numero');
                
                $('#pushC').val(pushToken);
                $('#platC').val(plataforma);
                
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


controller.carrinho = {
    init: function (events) {
        events(controller.carrinho.get(), function (content) {
            $('.views').removeClass('carrinho');
            $('#div_carrinho').css('display', 'none');

            $("#excluir_item").click(function () {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";
                var item_id = $(this).attr("item_id");
                myApp.confirm("Deseja excluir item do carrinho?", "",
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                        for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                            if (item_id == controller.carrinho.get().itens[i].id) {
                                var d = controller.carrinho.get();
                                d.itens.splice(i, 1);
                                if (d.itens.length == 0) {
                                    controller.carrinho.set(null);
                                    creait.redirect("categoria");
                                } else {
                                    d.valor_total = d.valor_total - (d.itens[i].valor * d.itens[i].qtde);
                                    controller.carrinho.set(d);
                                    myApp.views[0].router.refreshPage();

                                    break;
                                }
                            }
                        }
                    },
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            });

            $('#avancar_compra').click(function () {
                //Produçao
                creait.loader(true);
                var data = {
                    email: "diretoria@ifdcontroladoria.com.br",
                    token: "336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda"
                };

                $$.ajax({
                    url: 'https://ws.pagseguro.uol.com.br/v2/sessions',
                    method: 'POST',
                    dataType: 'xml',
                    data: data,
                    asyc: true,
                    success: function (data) {
                        PagSeguroDirectPayment.setSessionId(data.split("<id>")[1].split("</id>")[0]);

                        PagSeguroDirectPayment.getPaymentMethods({
                            amount: parseFloat(controller.carrinho.get().total),
                            success: function (response) {
                                controller.boleto.set(response.paymentMethods.BOLETO.options);
                                controller.credito.set(response.paymentMethods.CREDIT_CARD.options);
                                controller.debito.set(response.paymentMethods.ONLINE_DEBIT.options);
                                creait.loader(false);
                                creait.redirect('endereco_entrega');
                            },
                            error: function (response) {
                                creait.loader(false);
                                myApp.alert("Ocorreu um erro tente novamente mais tarde!", "");
                                debugger;
                                // Callback para chamadas que falharam.
                            },
                            complete: function (response) {
                                debugger;
                                // Callback para todas chamadas.
                            }
                        });
                    }, error: function (a, b, c) {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro tente novamente mais tarde!", "");
                    }
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["carrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["carrinho"]);
    },
    set: function (data) {
        window.localStorage["carrinho"] = JSON.stringify(data);
    }
};
controller.categoria = {
    init: function (events) {
        events({}, function (content) {

            if (controller.login.get().num_notificacao > 0) {
                $("#num_notificacao").html(controller.login.get().num_notificacao);
                $("#num_notificacao").css("display", "flex");
            } else {
                $("#num_notificacao").css("display", "none");
            }
            
            if (controller.carrinho.get() == null) {
                $('.views').removeClass('carrinho');
                $('#div_carrinho').css('display', 'none');
            } else {
                $('.views').addClass('carrinho');
                $('#div_carrinho').css('display', 'block');
            }

            if (localStorage.getItem('segundo_plano') == undefined) {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";
                myApp.confirm('Deseja habilitar o app há rodar em segundo plano para rastrear seu celular? Obs.: Você pode alterar esse configuracão depois no menu.', '',
                    function () {
                        cordova.plugins.backgroundMode.enable();
                        localStorage.setItem('segundo_plano', "0");
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }, function () {
                        cordova.plugins.backgroundMode.disable();
                        localStorage.setItem('segundo_plano', "1");
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            } else if (localStorage.getItem('segundo_plano') == "0") {
                cordova.plugins.backgroundMode.enable();
            } else {
                cordova.plugins.backgroundMode.disable();
            }
        });
    },
    get: function () {
        if (window.localStorage["categoria"] == null)
            return null;
        return JSON.parse(window.localStorage["categoria"]);
    },
    set: function (data) {
        window.localStorage["categoria"] = JSON.stringify(data);
    }
};
controller.contato_doador = {
    init: function (events) {
        events(controller.contato_doador.get(), function (content) {
            $("#btn_adotar").click(function () {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";
                myApp.confirm("Para que a adoção seja confirmada, seus dados para contato serão compartilhados com o doador!", "Deseja finalizar?",
                    function () {
                        creait.post("doacao?pessoa_id=" + controller.contato_doador.get().id_doador + "&doador_id=" + $(this).attr("doador_id") + "&item_id=" + $(this).attr("item_id"), null, function () {
                            creait.loader(false);
                            myApp.alert("Dados compartilhados com sucesso, agorqa é só aguardar o doador entrar em contato!", "");
                            creait.redirect("categoria");
                        });

                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    },
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            });
        });
    },
    get: function () {
        if (window.localStorage["contato_doador"] == null)
            return null;
        return JSON.parse(window.localStorage["contato_doador"]);
    },
    set: function (data) {
        window.localStorage["contato_doador"] = JSON.stringify(data);
    }
};
controller.doacao = {
    init: function (events) {
        creait.get("doacao?pessoa_id=" + controller.login.get().id, null, function (data) {
            events(data, function (content) {
                $("#div_carrinho").css("display", "none");
            });
        });
    },
    get: function () {
        if (window.localStorage["doacao"] == null)
            return null;
        return JSON.parse(window.localStorage["doacao"]);
    },
    set: function (data) {
        window.localStorage["doacao"] = JSON.stringify(data);
    }
};
controller.forma_pagamento = {
    init: function (events) {
        events({}, function (content) {

            $("#pagar_cc_fp").click(function () {
                $("#pagamento_cc_fp").css("display", "block");
                $("#pagamento_b_fp").css("display", "none");

                $("#pagar_cc1_fp").css("background-color", "#CCCCCC");
                $("#pagar_b1_fp").css("background-color", "#FFFFFF");
            });

            $("#pagar_b_fp").click(function () {
                $("#pagamento_b_fp").css("display", "block");
                $("#pagamento_cc_fp").css("display", "none");

                $("#pagar_b1_fp").css("background-color", "#CCCCCC");
                $("#pagar_cc1_fp").css("background-color", "#FFFFFF");
            });

            var picker = myApp.picker({
                input: '#estado_cobranca_fp',
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

            $("#num_cartao_fp").on("blur", function () {
                var cardBin = "";
                for (var i = 0; i <= 5; i++) {
                    cardBin += $("#num_cartao_fp").val()[i];
                }
                PagSeguroDirectPayment.getBrand({
                    cardBin: cardBin,
                    success: function (response) {
                        $("#img_bandeira_fp").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                        $("#bandeira_fp").val(response.brand.name);
                    },
                    error: function (response) {
                    },
                    complete: function (response) {
                    }
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe o numero do cartao');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o numero do cartao');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe o numero do cartao');

                $('#cep_cobranca_fp').toggleInputError($('#cep_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#estado_cobranca_fp').toggleInputError($('#estado_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#cidade_cobranca_fp').toggleInputError($('#cidade_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#bairro_cobranca_fp').toggleInputError($('#bairro_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#rua_cobranca_fp').toggleInputError($('#rua_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#numero_cobranca_fp').toggleInputError($('#numero_cobranca_fp').val() == '', 'Informe o numero do cartao');
                $('#complemento_cobranca_fp').toggleInputError($('#complemento_cobranca_fp').val() == '', 'Informe o numero do cartao');

                if ($("formcc .has-error").length == 0) {
                    creait.loader(true);
                    var hash;
                    var card_token;
                    PagSeguroDirectPayment.onSenderHashReady(function (response) {
                        if (response.status == 'error') {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                            return;
                        }
                        hash = response.senderHash;
                        PagSeguroDirectPayment.createCardToken({
                            cardNumber: $("#num_cartao_fp").val(),
                            brand: $("#bandeira_fp").val(),
                            cvv: $("#cvv_fp").val(),
                            expirationMonth: $("#exp_date_fp").val().split("/")[0],
                            expirationYear: $("#exp_date_fp").val().split("/")[1],
                            success: function (response) {
                                card_token = response.card.token;

                                var item = "&";
                                var shipping = "&shippingAddressRequired=false";
                                var item_id = "";
                                var quantidade = "";
                                var delivery = "false";
                                var balcao = "true";

                                if (controller.carrinho.get().endereco_bool == "1") {
                                    shipping = "&shippingAddressRequired=true&shippingAddressStreet=" + controller.carrinho.get().rua_entrega + "&shippingAddressNumber=" + controller.carrinho.get().numero_entrega + "&shippingAddressComplement=" + controller.carrinho.get().complemento_entrega + "&shippingAddressDistrict=" + controller.carrinho.get().bairro_entrega + "&shippingAddressPostalCode=" + controller.carrinho.get().cep_entrega + "&shippingAddressCity=" + controller.carrinho.get().cidade_entrega + "&shippingAddressState=" + controller.carrinho.get().estado_entrega + "&shippingAddressCountry=BRA&shippingType=1&shippingCost=0.00";
                                }

                                for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                                    item += "itemId" + (i + 1) + "=" + controller.carrinho.get().itens[i].id + "&itemDescription" + (i + 1) + "=" + controller.carrinho.get().itens[i].nome + " - " + controller.carrinho.get().itens[i].descricao + "&itemAmount" + (i + 1) + "=" + controller.carrinho.get().itens[i].valor + "&itemQuantity" + (i + 1) + "=" + parseInt(controller.carrinho.get().itens[i].qtde) + "&";
                                    item_id += "&item_id=" + controller.carrinho.get().itens[i].id;
                                    quantidade += controller.carrinho.get().itens[i].quantidade;
                                }

                                //---PROD
                                var data = "paymentMode=default&paymentMethod=creditCard&currency=brl&extraAmount=0.00" + item + "senderName=" + controller.login.get().nome + "&senderCpf=" + controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "") + "&senderAreaCode=" + controller.login.get().telefone.split("(")[1].split(")")[0] + "&senderPhone=" + controller.login.get().telefone.split(" ")[1].replace("-", "") + "&senderEmail=" + controller.login.get().email + "&senderHash=" + hash + shipping + "&creditCardToken=" + card_token + "&installmentQuantity=1&installmentValue=" + controller.carrinho.get().valor_total + "&noInterestInstallmentQuantity=2&&creditCardHolderName=" + $("#nome_cc_fp").val() + "&creditCardHolderCPF=" + $("#cpf_cc_fp").val().replace("-", "").replace(".", "").replace(".", "") + "&creditCardHolderBirthDate=" + $("#data_nasc_cc_fp").val() + "&creditCardHolderAreaCode=" + $("#telefone_cc_fp").val().split("(")[1].split(")")[0] + "&creditCardHolderPhone=" + $("#telefone_cc_fp").val().split(" ")[1].replace("-", "") + "&billingAddressStreet=" + $("#rua_cobranca_fp").val() + "&billingAddressNumber=" + $("#numero_cobranca_fp").val() + "&billingAddressComplement=" + $("#complemento_cobranca_fp").val() + "&billingAddressDistrict=" + $("#bairro_cobranca_fp").val() + "&billingAddressPostalCode=" + $("#cep_cobranca_fp").val() + "&billingAddressCity=" + $("#cidade_cobranca_fp").val() + "&billingAddressState=" + $("#estado_cobranca_fp").val() + "&billingAddressCountry=BRA";
                                $.ajax({
                                    type: 'post',
                                    url: "https://ws.pagseguro.uol.com.br/v2/transactions?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                    contenttype: 'application/x-www-form-urlencoded; charset=utf-8',
                                    data: data,
                                    success: function (response) {
                                        creait.post('compra?comprador_id=' + controller.login.get().id + "&vendedor_id=" + controller.carrinho.get().id + "&total=" + controller.carrinho.get().valor_total + "&delivery=" + delivery + "&balcao=" + balcao + "&boleto_url=" + $(response).find("paymentLink").html() + item_id + quantidade, null, function (data) {
                                            creait.loader(false);
                                            controller.carrinho.set(null);
                                            $('#div_carrinho').css('display', 'none');
                                            creait.redirect("confirma_compra");
                                        });
                                    },
                                    error: function (e) {
                                        creait.loader(false);
                                        myApp.alert("Ocorreu um erro ao tentar finalizar a compra. Tente novamente mais tarde.", "");
                                    }
                                });
                            },
                            error: function (response) {
                                creait.loader(false);
                                myApp.alert("Cartão de Crédito Inválido", "Aviso!");
                                return;
                            },
                            complete: function (response) {
                                // Callback para todas chamadas.
                            }
                        });
                    });
                }
            });

            //boleto
            $("#finalizar_b_fp").click(function () {
                creait.loader(true);
                var hash;
                var card_token;
                PagSeguroDirectPayment.onSenderHashReady(function (response) {
                    if (response.status == 'error') {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                        return;
                    }
                    hash = response.senderHash;

                    var item = "&";
                    var shipping = "&shippingAddressRequired=false";
                    var item_id = "";
                    var quantidade = "";
                    var delivery = "false";
                    var balcao = "true";

                    if (controller.carrinho.get().endereco_bool == "1") {
                        delivery = "true";
                        balcao = "false";
                        shipping = "&shippingAddressRequired=true&shippingAddressStreet=" + controller.carrinho.get().rua_entrega + "&shippingAddressNumber=" + controller.carrinho.get().numero_entrega + "&shippingAddressComplement=" + controller.carrinho.get().complemento_entrega + "&shippingAddressDistrict=" + controller.carrinho.get().bairro_entrega + "&shippingAddressPostalCode=" + controller.carrinho.get().cep_entrega + "&shippingAddressCity=" + controller.carrinho.get().cidade_entrega + "&shippingAddressState=" + controller.carrinho.get().estado_entrega + "&shippingAddressCountry=BRA&shippingType=1&shippingCost=0.00";
                    }

                    for (var i = 0; i < controller.carrinho.get().itens.length; i++) {
                        item += "itemId" + (i + 1) + "=" + controller.carrinho.get().itens[i].id + "&itemDescription" + (i + 1) + "=" + controller.carrinho.get().itens[i].nome + " - " + controller.carrinho.get().itens[i].descricao + "&itemAmount" + (i + 1) + "=" + parseFloat(controller.carrinho.get().itens[i].valor).toFixed(2) + "&itemQuantity" + (i + 1) + "=" + parseInt(controller.carrinho.get().itens[i].qtde) + "&";
                        item_id += "&item_id=" + controller.carrinho.get().itens[i].id;
                        quantidade += controller.carrinho.get().itens[i].quantidade;
                    }

                    //---PROD
                    var data = "paymentMode=default&paymentMethod=boleto&currency=BRL&extraAmount=0.00" + item + "senderName=" + controller.login.get().nome + "&senderCPF=" + controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "") + "&senderAreaCode=" + controller.login.get().telefone.split("(")[1].split(")")[0] + "&senderPhone=" + controller.login.get().telefone.split(" ")[1].replace("-", "") + "&senderEmail=" + controller.login.get().email + "&senderHash=" + hash + shipping;
                    $.ajax({
                        type: 'POST',
                        url: "https://ws.pagseguro.uol.com.br/v2/transactions?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        data: data,
                        success: function (response) {
                            creait.post('compra?comprador_id=' + controller.login.get().id + "&vendedor_id=" + controller.carrinho.get().loja_id + "&total=" + controller.carrinho.get().valor_total + "&delivery=" + delivery + "&balcao=" + balcao + "&boleto_url=" + $(response).find("paymentLink").html() + item_id + quantidade, null, function (data) {
                                creait.loader(false);
                                controller.carrinho.set(null);
                                $('#div_carrinho').css('display', 'none');
                                creait.redirect("confirma_compra");

                            });
                        },
                        error: function (e) {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro ao tentar finalizar a compra. Tente novamente mais tarde.", "");
                        }
                    });
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["forma_pagamento"] == null)
            return null;
        return JSON.parse(window.localStorage["forma_pagamento"]);
    },
    set: function (data) {
        window.localStorage["forma_pagamento"] = JSON.stringify(data);
    }
};
controller.grupo = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            $(".opt_grupo").click(function () {
                localStorage.setItem("grupo_id", $(this).attr("grupo_id"));
                creait.redirect("grupo_item");
            });

            $(".sair_grupo").click(function () {
                creait.post("grupo?grupo_id=" + $(this).attr("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {

                    for (var i = 0; i < controller.login.get().grupos.length; i++) {
                        if (controller.login.get().grupos[i].id == data) {
                            var d = controller.login.get();
                            d.grupos.splice(i, 1);
                            controller.login.set(d);
                            myApp.views[0].router.refreshPage();
                            creait.loader(false);

                            break;
                        }
                    }

                });
                
            });
        });
    },
    get: function () {
        if (window.localStorage["grupo"] == null)
            return null;
        return JSON.parse(window.localStorage["grupo"]);
    },
    set: function (data) {
        window.localStorage["grupo"] = JSON.stringify(data);
    }
};
controller.grupo_item = {
    init: function (events) {
        creait.get("grupo?id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
            
            controller.grupo_item.set(data.convite);
            events(data, function (content) {
                $("a.perdido1").html("Encontrado");

                if (controller.grupo_item.get() == 1) {
                    $('#aceitarrecusar').css("display", "block");
                    $("#convidaitem").css("display", "none");
                }
                else {
                    $('#aceitarrecusar').css("display", "none");
                    $("#convidaitem").css("display", "block");
                }

                $("#qrgrupo").click(function () {
                    cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "grupo_" + $(this).attr("grupo_id"), function (success) {
                        alert("encode success: " + success);
                    }, function (fail) {
                        alert("encoding failed: " + fail);
                    });
                });

                $("#aceitar").click(function () {
                    creait.post("grupo?grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id + "&aceitar=a", null, function (data) {

                    });
                });

                $("#recusar").click(function () {
                    creait.post("grupo?grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
                        for (var i = 0; i < controller.login.get().grupos.length; i++) {
                            if (controller.login.get().grupos[i].id == data) {
                                var d = controller.login.get();
                                d.grupos.splice(i, 1);
                                controller.login.set(d);
                                creait.redirect('grupo');
                                creait.loader(false);

                                break;
                            }
                        }
                    });
                });

                $(".item_perdido").click(function () {
                    if ($(".item_perdido").hasClass("perdido1")) {
                        creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=1", null, function (data) {
                            for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                                if (controller.login.get().meusitens[i].id == data) {
                                    var d = controller.login.get();
                                    d.meusitens[i].perdido = 0;
                                    controller.login.set(d);
                                    myApp.views[0].router.refreshPage();
                                    creait.loader(false);

                                    break;
                                }
                            }
                        });
                    } else {
                        creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=0", null, function (data) {
                            for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                                if (controller.login.get().meusitens[i].id == data) {
                                    var d = controller.login.get();
                                    d.meusitens[i].perdido = 1;
                                    controller.login.set(d);
                                    myApp.views[0].router.refreshPage();
                                    creait.loader(false);

                                    break;
                                }
                            }
                        });
                    }
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["grupo_item"] == null)
            return null;
        return JSON.parse(window.localStorage["grupo_item"]);
    },
    set: function (data) {
        window.localStorage["grupo_item"] = JSON.stringify(data);
    }
};

function convidar() {
    myApp.closeModal(".modal");
    myApp.prompt('Insira o email para enviarmos o convite!', '',
        function (value) {
            if (value == "") {
                myApp.alert("Digite o email do usuario que quer convidar", "Aviso!");
            }
            else {
                creait.post('convite?email=' + value + "&grupo_id=" + localStorage.getItem("grupo_id") + "&pessoa_id=" + controller.login.get().id, null, function (data) {
                    if (data == 0) {
                        myApp.alert("E-mail não cadastrado no sistema", "Aviso!");
                    }
                    else if (data == 1) {
                        myApp.alert("Esta pessoa já faz parte do grupo", "Aviso!");
                    }
                    else {
                        myApp.alert("Convite enviado com sucesso!", "Aviso!");
                    }
                });
            }

        },
        function (value) {

        }
    );
}
controller.itemRastrear = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            $(".abrir_mapa").click(function () {
                var dados = [];

                for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                    //if (controller.login.get().meusitens[i].rastreador == 1) {
                        if (controller.login.get().meusitens[i].id == $(this).attr("item_id")) {
                            dados.push({
                                nome: controller.login.get().meusitens[i].nome,
                                foto: "https://whereapp.creait.com.br/api/getPhoto?id=" + $(this).attr("item_id") + "&tabela=item"
                            });
                            controller.mapa.set(dados[0]);
                            break;
                        }
                    //}
                }

                creait.redirect('mapa');
            });
        });
    },
    get: function () {
        if (window.localStorage["itemRastrear"] == null)
            return null;
        return JSON.parse(window.localStorage["itemRastrear"]);
    },
    set: function (data) {
        window.localStorage["itemRastrear"] = JSON.stringify(data);
    }
};

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
controller.login = {
    init: function (events) {
        events({}, function (content) {
            $$("#btn_login").click(function () {
                //creait.redirect('categoria');

                $('#email').toggleInputError($('#email').val() == '', 'Informe um email');
                $('#senha').toggleInputError($('#senha').val() == '', 'Informe uma senha');

                if (localStorage.getItem('pushToken') == null || localStorage.getItem('plataforma_id') == null) {
                    $('#push_id').val("");
                    $('#plataforma').val("");
                }
                else {
                    $('#push_id').val(localStorage.getItem('pushToken'));
                    $('#plataforma').val(localStorage.getItem('plataforma_id'));
                }

                if ($('formlogin .has-error').length == 0) {
                    creait.get('pessoas', myApp.formToJSON("formlogin"), function (data) {
                        //

                        if (data == null || data.length == 0 || data.error != null || data == 0) {
                            creait.loader(false);
                            myApp.alert('Usuário ou senha inválido!', 'Oops ...');
                            return;
                        }
                        myApp.closePanel();

                        controller.login.set(data);

                        creait.redirect('categoria');
                        
                    });
                }
            });


            $$("#voltar_login").click(function () {
                if (localStorage.getItem("carrinho") != null) {
                    creait.redirect("pagamento");
                } else {
                    creait.redirect("index");
                }
            });


        });
    },
    get: function () {
        if (window.localStorage["login"] == null)
            return null;
        return JSON.parse(window.localStorage["login"]);
    },
    set: function (data) {
        window.localStorage["login"] = JSON.stringify(data);
    }

};
controller.loja = {
    init: function (events) {
        creait.get('loja', null, function (data) {
            events(data, function (content) {

            });
        });
    },
    get: function () {
        if (window.localStorage["loja"] == null)
            return null;
        return JSON.parse(window.localStorage["loja"]);
    },
    set: function (data) {
        window.localStorage["loja"] = JSON.stringify(data);
    }
};
controller.mapa = {
    init: function (events, query) {
        events({}, function (content) {

            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -23.652500, lng: -46.862847 },
                zoom: 16,
                clickableIcons: false
            });

            var marker = new google.maps.Marker({
                position: { lat: -23.652500, lng: -46.862847 },
                map: map
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            var contentString = '<div id="content" style="width: 130px;">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<span id="firstHeading" class="firstHeading" style="font-weight: bolder">' + controller.mapa.get().nome + '</span>' +
                '<div id="bodyContent" style="background-image: url(' + controller.mapa.get().foto+')">' +
                '</div>' +
                '<div>' +
                '<button style="width: 100%; border-radius: 8px; background-color: #0a7995; border-color: #086077;" onclick="launchnavigator.navigate([' + "-23.647181" + ',' + "-46.847690" + ']);">Abrir GPS</button>' + 
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
        });
    },
    get: function () {
        if (window.localStorage["mapa"] == null)
            return null;
        return JSON.parse(window.localStorage["mapa"]);
    },
    set: function (data) {
        window.localStorage["mapa"] = JSON.stringify(data);
    }
};
controller.notificacao = {
    init: function (events) {
        creait.get("notificacao?pessoa_id=" + controller.login.get().id, null, function (data) {
            events(data, function (content) {
                $(".notify").click(function () {
                    var notificacao_id = $(this).attr("notificacao_id");
                    var mensagem = $(this).attr("mensagem");
                    myApp.alert(mensagem, "", function () {
                        $.ajax({
                            url: "https://whereapp.creait.com.br/api/notificacao?notificacao_id=" + notificacao_id,
                            method: 'POST',
                            dataType: 'json',
                            async: true,
                            success: function (data) {
                                myApp.views[0].router.refreshPage();
                                var d = controller.login.get();
                                d.num_notificacao -= 1;
                                controller.login.set(d);
                            }, error: function (e) {
                                console.log(e);
                            }
                        });
                    });
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["meuItem"] == null)
            return null;
        return JSON.parse(window.localStorage["meuItem"]);
    },
    set: function (data) {
        window.localStorage["meuItem"] = JSON.stringify(data);
    }
};
controller.meuItem = {
    init: function (events) {
        events(controller.login.get(), function (content) {

            $("a.perdido1").html("Encontrado");


            $(".item_perdido").click(function () {
                if ($(".item_perdido").hasClass("perdido1")) {
                    creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=1", null, function (data) {
                        for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                            if (controller.login.get().meusitens[i].id == data) {
                                var d = controller.login.get();
                                d.meusitens[i].perdido = 0;
                                controller.login.set(d);
                                myApp.views[0].router.refreshPage();
                                creait.loader(false);

                                break;
                            }
                        }
                    });
                } else {
                    creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=0", null, function (data) {
                        for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                            if (controller.login.get().meusitens[i].id == data) {
                                var d = controller.login.get();
                                d.meusitens[i].perdido = 1;
                                controller.login.set(d);
                                myApp.views[0].router.refreshPage();
                                creait.loader(false);

                                break;
                            }
                        }
                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["meuItem"] == null)
            return null;
        return JSON.parse(window.localStorage["meuItem"]);
    },
    set: function (data) {
        window.localStorage["meuItem"] = JSON.stringify(data);
    }
};
controller.ong = {
    init: function (events) {
        events(controller.ong.get(), function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["ong"] == null)
            return null;
        return JSON.parse(window.localStorage["ong"]);
    },
    set: function (data) {
        window.localStorage["ong"] = JSON.stringify(data);
    }
};
controller.padrinho = {
    init: function (events) {
        creait.get('padrinho', null, function (data) {
            events(data, function (content) {
                $("#div_carrinho").css("display", "none");
            });
        });
    },
    get: function () {
        if (window.localStorage["padrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["padrinho"]);
    },
    set: function (data) {
        window.localStorage["padrinho"] = JSON.stringify(data);
    }
};
controller.perdido = {
    init: function (events) {
        var data = {
            itens: []
        };
        for (var i = 0; i < controller.login.get().meusitens.length; i++) {
            if (controller.login.get().meusitens[i].perdido == 1) {
                data.itens.push(controller.login.get().meusitens[i]);
            }
        }
        events(data, function (content) {
            $(".item_perdido").click(function () {
                creait.post("perdido?item_id=" + $(this).attr("item_id") + "&flag=1", null, function (data) {
                    for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                        if (controller.login.get().meusitens[i].id == data) {
                            var d = controller.login.get();
                            d.meusitens[i].perdido = 0;
                            controller.login.set(d);
                            myApp.views[0].router.refreshPage();
                            creait.loader(false);

                            break;
                        }
                    }
                });
            })
        });
    },
    get: function () {
        if (window.localStorage["perdido"] == null)
            return null;
        return JSON.parse(window.localStorage["perdido"]);
    },
    set: function (data) {
        window.localStorage["perdido"] = JSON.stringify(data);
    }
};

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


controller.produto = {
    init: function (events) {
        creait.get('item?responsavel_id=' + localStorage.getItem('loja_id'), null, function (data) {
            events(data, function (content) {

            });
        });
    },
    get: function () {
        if (window.localStorage["produto"] == null)
            return null;
        return JSON.parse(window.localStorage["produto"]);
    },
    set: function (data) {
        window.localStorage["produto"] = JSON.stringify(data);
    }
};
controller.qrcode = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["mapa"] == null)
            return null;
        return JSON.parse(window.localStorage["mapa"]);
    },
    set: function (data) {
        window.localStorage["mapa"] = JSON.stringify(data);
    }
};
controller.responsavel_juridico = {
    init: function (events) {
        events({}, function (content) {
            $("#btn_responsavel_juridico").click(function () {
                creait.post('responsavel_juridico', myApp.formToJSON("#responsavel_juridico"), function (data) {
                    var login = controller.login.get();

                    login.responsavel_juridico.push(data);

                    myApp.params.modalButtonOk = "Sim";
                    myApp.params.modalButtonCancel = "Não";
                    myApp.confirm("Dejesa cadastar outro responsavel?", "",
                        function () {
                            console.log("Sim");
                            $("#input").val("");
                        },
                        function () {
                            console.log("Não");
                            creait.redirect("categoria");
                        }
                    );
                    myApp.params.modalButtonOk = "Ok";
                    myApp.params.modalButtonCancel = "Cancelar";
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["responsavel_juridico"] == null)
            return null;
        return JSON.parse(window.localStorage["responsavel_juridico"]);
    },
    set: function (data) {
        window.localStorage["responsavel_juridico"] = JSON.stringify(data);
    }
};
controller.tipo = {
    get: function () {
        if (localStorage.getItem("tipo") == null) {
            return null;
        }
        return JSON.parse(localStorage["tipo"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["tipo"] = JSON.stringify(data);
        //controller.layout.private = data;
    },
    private: null
}

controller.layout = {
    get: function () {
        if (localStorage.getItem("layout") == null) {
            return null;
        }
        return JSON.parse(localStorage["layout"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["layout"] = JSON.stringify(data);
        //controller.layout.private = data;
    },
    private: null
};

controller.busca = {
    init: function (events) {
        events({}, function (content) {
            $$("#btn_search").click(function () {
                buscar_cep();
            });

            $$("#pac-input").keyup(function () {
                if (this.value.length == 8) {
                    buscar_cep();
                }
            });

            function buscar_cep() {
                var valor = $('#pac-input').val();
                var cep = valor.replace(/\D/g, '');

                if (cep != "") {
                    var validacep = /^[0-9]{8}$/;
                    if (validacep.test(cep)) {
                        $.ajax({
                            type: "GET",
                            url: 'http://viacep.com.br/ws/' + cep + '/json',
                            dataType: 'json',
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                $('#enderecos').text(result.logradouro + ' - ' + result.bairro + ' - ' + result.localidade);
                                $('#numero').val(result.complemento);
                                $('#pac-input').val(result.cep);
                                $('#cidade').val(result.localidade);
                            },
                            error: function (a, b, c) {
                                $('html').html(a.responseText)
                            }
                        });
                        $('#modal_endereco').css("display", "block");

                    } else {
                        myApp.alert('CEP invalido!', 'Atenção!');
                    }
                }
            }

            $$("#btn_search_gps").click(function () {
                //
                if (controller.busca.get() == null) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((
                            function successFunction(position) {
                                var latlng = [];
                                var lat = position.coords.latitude;
                                var lng = position.coords.longitude;

                                latlng[0] = lat;
                                latlng[1] = lng;
                                controller.corfirmarEndereco.set(latlng);

                                //
                                $.ajax({
                                    type: "GET",
                                    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng,
                                    dataType: 'json',
                                    contentType: false,
                                    processData: false,
                                    success: function (result) {
                                        $('#enderecos').text(result.results[0].address_components[1].short_name);
                                        $('#numero').val(result.results[0].address_components[0].long_name);
                                        $('#pac-input').val(result.results[0].address_components[7].long_name);
                                        $('#cidade').val(result.results[0].address_components[5].long_name);
                                    },
                                    error: function (a, b, c) {
                                        //
                                    }
                                });
                                $('#modal_endereco').css("display", "block");
                                //creait.get('busca?lat=' + lat + '&lng=' + lng, null, function (data) {
                                //    if (data == "erro")
                                //        creait.redirect("erroEndereco");
                                //    else
                                //        creait.redirect("categoria");
                                //});
                            }), (
                                function errorFunction(position) {
                                    console.log('Erro ao encontrar a possição');
                                }));
                    } else {
                        alert('Parece que Geolocation, que é necessário para esta página, não está ativado em seu navegador. Use um navegador que o suporte.');
                    }
                }
                else {
                    creait.redirect("categoria");
                }
            });

            $$("#btn_voltar").click(function () {

                $('#modal_endereco').css("display", "none");

            });

            $$("#btn_confimar").click(function () {

                var endereco = {};
                endereco.number = $('#numero').val();
                if (endereco.number == "") {
                    myApp.alert("Preencha o numero!", "Atenção!", function () {
                    });
                } else {
                    myApp.showPreloader('Buscando Cardápio');
                    $('#modal_endereco').css("display", "none");
                    endereco.active = true;
                    endereco.cep = $('#pac-input').val();
                    endereco.street = $('#enderecos').html();
                    endereco.complement = $('#complemento').val();
                    endereco.city = $('#cidade').val();
                    endereco.lat = $('#lat').val();
                    endereco.lng = $('#lng').val();

                    if (controller.login.get() == null) {
                        controller.endereco.set(endereco);
                    } else {

                        endereco.pessoa_id = controller.login.get().id;
                        creait.post('endereco', endereco, function (data) {

                        });
                    }

                    creait.redirect("categoria");
                }
            });
        });
    },
    get: function () {
        if (controller.busca.memory == null) {
            if (window.localStorage["filiais"] == null)
                return null;
            return JSON.parse(window.localStorage["filiais"]);
        }
        else {
            return controller.busca.memory;
        }
    },
    set: function (data) {
        debugger;
        try {
            if (data == null) {
                window.localStorage["filiais"] = data;
            }
            else {
                window.localStorage["filiais"] = JSON.stringify(data);
            }
            controller.busca.memory = null;
        }
        catch(ex)
        {

            if (data == null) {
                controller.busca.memory = data;
            }
            else {

                controller.busca.memory = data;
            }
        }
    },
    memory: null
}

controller.erroEndereco = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["CEP"] == null)
            return null;
        return JSON.parse(window.localStorage["CEP"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["CEP"] = data;
        else
            window.localStorage["CEP"] = JSON.stringify(data);
    }
};

controller.index = {
    init: function (events) {
        creait.get('filiais', null, function (data) {
            events(data, function (content) {
                if (controller.login.get() == null) {
                    creait.redirect("categoria");
                }
            });
        });
    }
}

controller.boleto = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["boleto"] == null)
            return null;
        return JSON.parse(window.localStorage["boleto"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["boleto"] = data;
        else
            window.localStorage["boleto"] = JSON.stringify(data);
    }
};

controller.credito = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["credito"] == null)
            return null;
        return JSON.parse(window.localStorage["credito"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["credito"] = data;
        else
            window.localStorage["credito"] = JSON.stringify(data);
    }
};

controller.debito = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["debito"] == null)
            return null;
        return JSON.parse(window.localStorage["debito"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["debito"] = data;
        else
            window.localStorage["debito"] = JSON.stringify(data);
    }
};

$(window).resize(function () {
    window.resizeTo(425, 660);
});