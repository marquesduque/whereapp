controller.addItem = {
    init: function (events, query) {
        events({}, function (content) {
            $('.responsavel_id').val(controller.login.get().id);
            $('input[type="file"]').each(function () {
                this.addEventListener("change", readFile2, false);
            });
            $('#foto').click(function () {
                $('#pega_foto').click();
            });

            var html = '<option value="" selected=""></option><option value="1">Pessoa</option><option value="2">Animal</option><option value="3">Objeto</option><option value="4">Veiculo</option><option value="5">Carga</option><option value="6" selected="">Outros</option>';
            $('#tipoI').html(html);

            if (query.finalidade == "doacao") {
                $("#tela_add").css("heigth", "calc(100% - 50px)");
                $("#tela_add").css("margin-top", "50px");
                $('.tabbar').css('display', 'none');

                $(".doacao").val("true");

                $("[value='1']").css("display", "none");
                $("[value='4']").css("display", "none");
                $("[value='5']").css("display", "none");
            }

            if (query.finalidade == "padrinho") {
                $("#tela_add").css("heigth", "calc(100% - 50px)");
                $("#tela_add").css("margin-top", "50px");
                $('.tabbar').css('display', 'none');

                $(".apadrinhar").val("true");

                $("[value='3']").css("display", "none");
                $("[value='4']").css("display", "none");
                $("[value='5']").css("display", "none");
            }
            
            if (query.tipo != undefined) {
                $("#li_tipo").css('display', 'none');
                $("#tipoI").val(query.tipo);
                $('.tipo_id').val(query.tipo);
                $('#' + query.tipo).css('display', 'block');

                $("#tela_add").css("heigth", "calc(100% - 50px)");
                $("#tela_add").css("margin-top", "50px");
                $('.tabbar').css('display', 'none');
            }

            $("#voltar_addItem").click(function () {
                if (query.finalidade == "doacao") {
                    creait.redirect('doacao', 'tipo=' + query.tipo);
                    controller.addItem.set(null);
                }
                else if (query.finalidade == "padrinho") {
                    creait.redirect('padrinho');
                    controller.addItem.set(null);
                }
                else if (query.tipo != undefined) {
                    creait.redirect('categoria');
                    controller.addItem.set(null);
                }
                else {
                    creait.redirect('meuItem');
                    controller.addItem.set(null);
                }
            });

            $('#tipoI').on('change', function () {
                $('form').css('display', 'none');
                $('#' + $('#tipoI').val()).css('display', 'block');
                $('.tipo_id').val($('#tipoI').val());
                $('#grupo').css('display', 'block');
            });

            if (controller.addItem.get() != null) {
                $("#tela_add").css("heigth", "calc(100% - 50px)");
                $("#tela_add").css("margin-top", "50px");
                $('.tabbar').css('display', 'none');

                $("#foto").css("background-image", "url(https://whereapp.creait.com.br/api/getPhoto?id=" + controller.addItem.get().id + "&tabela=item)");

                $('#excluir').css('display', 'flex');
                $("#li_tipo").css('display', 'none');
                $("#tipoI").val(controller.addItem.get().tipo);
                $('.tipo_id').val(controller.addItem.get().tipo);
                $('#' + controller.addItem.get().tipo).css('display', 'block');

                myApp.formFromJSON("#" + controller.addItem.get().tipo, {
                    id: controller.addItem.get().id,
                    responsavel_id: controller.login.get().id,
                    tipo_id: controller.addItem.get().tipo,
                    nome: controller.addItem.get().nome,
                    cpf: controller.addItem.get().cpf,
                    rg: controller.addItem.get().rg,
                    nascimento: controller.addItem.get().nascimento,
                    genero: controller.addItem.get().genero,
                    descricao: controller.addItem.get().descricao,
                    cor: controller.addItem.get().cor,
                    raca: controller.addItem.get().raca,
                    fabricante: controller.addItem.get().fabricante,
                    marca: controller.addItem.get().marca,
                    num_serie: controller.addItem.get().num_serie,
                    modelo: controller.addItem.get().modelo
                });
            }

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
                }
                else {
                    myApp.alert("Selecione um item", "");
                    return;
                }

                creait.post('item', myApp.formToJSON('#' + $('#tipoI').val()), function (data) {
                    var dados = controller.login.get();

                    if (controller.addItem.get() != null) {
                        for (i = 0; i < dados.meusitens.length; i++) {
                            if (dados.meusitens[i].id == data.itens[0].id) {
                                dados.meusitens[i].tipo = data.itens[0].tipo;
                                dados.meusitens[i].nome = data.itens[0].nome;
                                dados.meusitens[i].cor = data.itens[0].cor;
                                dados.meusitens[i].raca = data.itens[0].raca;
                                dados.meusitens[i].nascimento = data.itens[0].nascimento;
                                dados.meusitens[i].responsavel_id = data.itens[0].responsavel_id;
                                dados.meusitens[i].valor = data.itens[0].valor;
                                dados.meusitens[i].estoque = data.itens[0].estoque;
                                dados.meusitens[i].descricao = data.itens[0].descricao;
                                dados.meusitens[i].perdido = data.itens[0].perdido;
                                dados.meusitens[i].rastreador = data.itens[0].rastreador;
                                dados.meusitens[i].marca = data.itens[0].marca;
                                dados.meusitens[i].modelo = data.itens[0].modelo;
                                dados.meusitens[i].fabricante = data.itens[0].fabricante;
                                dados.meusitens[i].num_serie = data.itens[0].num_serie;

                                controller.login.set(dados);
                                controller.addItem.set(null);
                                creait.redirect('meuItem');
                                break;
                            }
                        }
                    }
                   
                    controller.addItem.set(null);
                    dados.meusitens.push(data.itens[0]);
                    controller.login.set(dados);
                    creait.redirect('meuItem');
                });
            });

            $("#excluir").click(function () {
                creait.post("excluirItem?id=" + controller.addItem.get().id, null, function (data) {
                    for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                        if (controller.login.get().meusitens[i].id == data) {
                            var d = controller.login.get();
                            d.meusitens.splice(i, 1);
                            controller.login.set(d);
                            creait.redirect("meuItem");

                            break;
                        }
                    }

                });
            });

            $("#pessoa_id").val(controller.login.get().id);

            $('#btn_salvar_grupo').click(function () {
                $('#nome_grupo').toggleInputError($('#nome_grupo').val() == '', 'Digite alguma obersarvação/descriçao');
                $('#descricao_grupo').toggleInputError($('#descricao_grupo').val() == '', 'Digite alguma obersarvação/descrição');
                if ($("#grupo .has-error").length == 0) {
                    creait.post('grupo', myApp.formToJSON('#grupo'), function (data) {
                        var dados = controller.login.get();

                        dados.grupos.push(data);
                        controller.login.set(dados);

                        creait.redirect('meuItem');
                    });
                }
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

function readFile2() {

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
                //$('#foto').css('background-image', 'url(data:image/jpeg;base64,' + imageURI + ')');

                //$('.photo').val(imageURI);
                $('.photo_itype').val('data:image/jpeg;base64');
                $(".photo").val(dataUrl.split(',')[1]);

                $("#foto").css('background-image', 'url(' + dataUrl + ')');

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