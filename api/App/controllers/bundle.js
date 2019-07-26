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
                    
                    $('#rua').toggleInputError($('#rua').val() == '', 'Informe a rua');
                    $('#numero').toggleInputError($('#numero').val() == '', 'Informe o numero');
                    $('#complemento').toggleInputError($('#complemento').val() == '', 'Informe um complemento');
                    $('#bairro').toggleInputError($('#bairro').val() == '', 'Informe o bairro');
                    $('#cep').toggleInputError($('#cep').val() == '', 'Informe o cep');
                    $('#cidade').toggleInputError($('#cidade').val() == '', 'Informe a cidade');
                    $('#estado').toggleInputError($('#estado').val() == '', 'Selecione o estado');

                    if ($("#endereco_novo .has-error").length == 0) {
                        carrinho.endereco_bool = true;
                        carrinho.rua_entrega = $("#rua").val();
                        carrinho.numero_entrega = $("#numero").val();
                        carrinho.complemento_entrega = $("#complemento").val();
                        carrinho.bairro_entrega = $("#bairro").val();
                        carrinho.cep_entrega = $("#cep").val().replace("-", "");
                        carrinho.cidade_entrega = $("#cidade").val();
                        carrinho.estado_entrega = $("#estado").val();
                    } else {
                        return;
                    }
                    
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
controller.adesao = {
    init: function (events) {
        events({}, function (content) {
            $("#num_cartao_fp").on("blur", function () {

                $.get('/api/pagseguro', null, function (data) {
                    PagSeguroDirectPayment.setSessionId(data);
                    PagSeguroDirectPayment.getBrand({
                        cardBin: $("#num_cartao_fp").val(),
                        success: function (response) {
                            $("#img_bandeira_fp").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                            $("#bandeira_fp").val(response.brand.name);
                            $("#img_bandeira_fp").parent().css("display", "block");
                        },
                        error: function (response) {
                            $("#img_bandeira_fp").parent().css("display", "none");
                            $("#num_cartao_fp").val("");
                            $("#bandeira_fp").val("");
                            myApp.alert("Numero de cartão invalido", "");
                        },
                        complete: function (response) {
                        }
                    });
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#valor_mensal').toggleInputError($('#valor_mensal').val() == '', 'Informe o valor a ser cobrado mensalmente');
                $('#dia_da_cobraça').toggleInputError($('#dia_da_cobraça').val() == '', 'Informe o o dia da cobrança');

                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o nome impresso no cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o CPF do dono do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe a data de nascimento do dono do cartao');
                //$('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe um telefone para contato');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o Codigo de segurança');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe a data de validade do cartao');


                if ($("formcc .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formcc"));
                }

                //$('#cep_cobranca_fp').toggleInputError($('#cep_cobranca_fp').val() == '', 'Informe o cep');
                //$('#estado_cobranca_fp').toggleInputError($('#estado_cobranca_fp').val() == '', 'Informe o estado');
                //$('#cidade_cobranca_fp').toggleInputError($('#cidade_cobranca_fp').val() == '', 'Informe a cidade');
                //$('#bairro_cobranca_fp').toggleInputError($('#bairro_cobranca_fp').val() == '', 'Informe o bairro');
                //$('#rua_cobranca_fp').toggleInputError($('#rua_cobranca_fp').val() == '', 'Informe a rua');
                //$('#numero_cobranca_fp').toggleInputError($('#numero_cobranca_fp').val() == '', 'Informe o numero');
                //$('#complemento_cobranca_fp').toggleInputError($('#complemento_cobranca_fp').val() == '', 'Informe um complemento');

                //if ($("#pagamento_cc_fp .has-error").length == 0) {
                //    creait.loader(true);
                //    var hash;
                //    var card_token;
                //    PagSeguroDirectPayment.onSenderHashReady(function (response) {
                //        if (response.status == 'error') {
                //            creait.loader(false);
                //            myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                //            return;
                //        }
                //        hash = response.senderHash;
                //        PagSeguroDirectPayment.createCardToken({
                //            cardNumber: $("#num_cartao_fp").val(),
                //            brand: $("#bandeira_fp").val(),
                //            cvv: $("#cvv_fp").val(),
                //            expirationMonth: $("#exp_date_fp").val().split("/")[0],
                //            expirationYear: $("#exp_date_fp").val().split("/")[1],
                //            success: function (response) {
                //                card_token = response.card.token;
                //                var data = JSON.stringify({
                //                    "reference": controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                //                    "preApproval": {
                //                        "name": "Assinatura Mensal - pessoa: " + controller.login.get().id + " / " + controller.login.get().nome + " - item: " + controller.detalhe_padrinho.get().id + " - " + controller.detalhe_padrinho.get().nome,
                //                        "charge": "AUTO",
                //                        "period": "MONTHLY",
                //                        "amountPerPayment": parseFloat($("#valor_mensal").val()).toFixed(2),
                //                        "dayOfMonth": $("#dia_da_cobraça").val(),
                //                        "expiration": {
                //                            "value": 1000,
                //                            "unit": "YEARS"
                //                        }
                //                    }
                //                });

                //                $.ajax({
                //                    type: 'POST',
                //                    url: "https://ws.sandbox.pagseguro.uol.com.br/pre-approvals/request?email=diretoria@ifdcontroladoria.com.br&token=5CDF0EAD4BCB4D35BCB76D7E44F21B5B",
                //                    headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                //                    contentType: 'application/json;charset=ISO-8859-1;',
                //                    data: data,
                //                    success: function (response) {
                //                        var data1 = JSON.stringify({
                //                            plan: response.code,
                //                            reference: controller.login.get().id + " - " + controller.detalhe_padrinho.get().id,
                //                            sender: {
                //                                name: controller.login.get().nome,
                //                                email: controller.login.get().email,
                //                                hash: hash,
                //                                phone: {
                //                                    areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                //                                    number: controller.login.get().telefone.split("(")[1].split(")")[0]
                //                                },
                //                                address: {
                //                                    street: $("#rua_cobranca_fp").val(),
                //                                    number: $("#numero_cobranca_fp").val(),
                //                                    complement: $("#complemento_cobranca_fp").val(),
                //                                    district: $("#bairro_cobranca_fp").val(),
                //                                    postalCode: $("#cep_cobranca_fp").val(),
                //                                    city: $("#cidade_cobranca_fp").val(),
                //                                    state: $("#estado_cobranca_fp").val(),
                //                                    country: "BRA"
                //                                },
                //                                documents: [{
                //                                    type: "CPF",
                //                                    value: controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "")
                //                                }]
                //                            },
                //                            paymentMethod: {
                //                                type: "creditCard",
                //                                creditCard: {
                //                                    token: card_token,
                //                                    holder: {
                //                                        name: $("#nome_cc_fp").val(),
                //                                        birthDate: $("#data_nasc_cc_fp").val(),
                //                                        documents: [{
                //                                            type: "CPF",
                //                                            value: $("#cpf_cc_fp").val()
                //                                        }],
                //                                        phone: {
                //                                            areaCode: controller.login.get().telefone.split("(")[1].split(")")[0],
                //                                            number: controller.login.get().telefone.split("(")[1].split(")")[0]
                //                                        }
                //                                    }
                //                                }
                //                            }
                //                        });

                //                        //servico aqui
                //                        $.ajax({
                //                            type: 'POST',
                //                            url: "https://ws.sandbox.pagseguro.uol.com.br/pre-approvals?email=diretoria@ifdcontroladoria.com.br&token=5CDF0EAD4BCB4D35BCB76D7E44F21B5B",
                //                            headers: { 'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1' },
                //                            contentType: 'application/json;charset=ISO-8859-1;',
                //                            data: data1,
                //                            success: function (response) {
                //                                creait.post('assinatura?pessoa_id=' + controller.login.get().id + "&item_id=" + controller.detalhe_padrinho.get().id + "&codigo_assinatura=" + response.code + "&valor_assinatura=" + $("valor_mensal").val(), null, function (data) {
                //                                    myApp.alert('Apadrinhamento concluido com sucesso', '', function () {
                //                                        creait.redirect('categoria');
                //                                    });
                //                                });
                //                            },
                //                            error: function (e) {
                //                                debugger;
                //                            }
                //                        });
                //                    },
                //                    error: function (e) {
                //                        myApp.aler("Ocorreu um erro, tente novamente mais tarde.", "");
                //                    }
                //                });
                //            },
                //            error: function (response) {
                //                creait.loader(false);
                //                myApp.alert("Cartão de Crédito Inválido", "Aviso!");
                //                return;
                //            },
                //            complete: function (response) {
                //                // Callback para todas chamadas.
                //            }
                //        });
                //    });
                //}
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
                    return;
                }
                else {
                    adicionar.estoque = parseInt(adicionar.estoque) - parseInt($("#qtde_adicionar").html());
                    controller.adicionar.set(adicionar);

                    if (carrinho == null) {
                        var data = {
                            nome: "",
                            cpf: "",
                            email: "",
                            hash: "",
                            card_token: "",
                            expiracao: "",
                            data_nascimento: "",
                            telefone: "",
                            tipo: "",
                            valor_total: parseFloat(controller.adicionar.get().valor) * parseFloat($("#qtde_adicionar").html()),
                            loja_id: controller.adicionar.get().responsavel_id,
                            endereco_bool: false,
                            rua_entrega: "",
                            numero_entrega: "",
                            complemento_entrega: "",
                            bairro_entrega: "",
                            cep_entrega: "",
                            cidade_entrega: "",
                            estado_entrega: "",
                            rua: controller.login.get().rua,
                            numero: controller.login.get().numero,
                            complemento: controller.login.get().complemento == null ? "nt" : controller.login.get().complemento,
                            bairro: controller.login.get().bairro,
                            cep: controller.login.get().cep.replace("-", ""),
                            cidade: controller.login.get().cidade,
                            estado: controller.login.get().estado,
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
                    
                    creait.redirect('produto');
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
            $('input[type="file"]').each(function () {
                this.addEventListener("change", readFile1, false);
            });

            $('#foto_usuario').click(function () {
                $('#pega_foto').click();
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

                $('#cep_input').toggleInputError(($("#cep_input").val()) == "", 'Informe o seu CEP');
                $('#pais_input').toggleInputError(($("#pais_input").val()) == "", 'Informe o pais');
                $('#picker_estados').toggleInputError(($("#picker_estados").val()) == "", 'Selecione um estado');
                $('#cidade').toggleInputError(($("#cidade").val()) == "", 'Informe a cidade');
                $('#bairro_input').toggleInputError(($("#bairro_input").val()) == "", 'Informe o bairro');
                $('#rua_input').toggleInputError(($("#rua_input").val()) == "", 'Informe a rua');
                $('#numero_input').toggleInputError(($("#numero_input").val()) == "", 'Informe o numero');
                
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

function readFile1() {

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
controller.carrinho = {
    init: function (events) {
        events(controller.carrinho.get(), function (content) {

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
                creait.redirect('endereco_entrega');
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
                $("#numero_not").html(controller.login.get().num_notificacao);
                $("#numero_not").css("display", "flex");
            } else {
                $("#numero_not").css("display", "none");
            }

            $(".imagem_divisor").css("height", $(".imagem_divisor").innerWidth());
            

            if (controller.login.get().notificacoes.length == 0) {
                $('#nao_tem_mensagem').css('display', 'flex');
                $('#notificacoes').css('display', 'none');
            } else {
                $('#nao_tem_mensagem').css('display', 'none');
                $('#notificacoes').css('display', 'block');

                var html = '';
                for (var i = 0; i <= controller.login.get().notificacoes.length; i++) {
                    if (i == controller.login.get().notificacoes.length) {
                        $('#notificacoes').html(html);
                    } else {
                        html +=
                            '<li class="produtoli grid-item-m swipeout notify" mensagem="' + controller.login.get().notificacoes[i].mensagem + '" notificacao_id="' + controller.login.get().notificacoes[i].id + '" style="position: relative;">' +
                            '   <div class="lido' + controller.login.get().notificacoes[i].lido + '"></div>' +
                            '   <div class="item-title-row">' +
                            '       <div class="titulo_produto item-title" style="text-align: right;">' + controller.login.get().notificacoes[i].data + '</div>' +
                            '       <div style="padding: 0px 10px; text-align: left;">' + controller.login.get().notificacoes[i].mensagem_previa + '</div>' +
                            '   </div>' +
                            '   <div style="clear:both"></div>' +
                            '</li>';
                    }
                }
            }

            $(".notify").click(function () {
                var notificacao_id = $(this).attr("notificacao_id");
                var mensagem = $(this).attr("mensagem");
                myApp.alert(mensagem, "", function () {
                    $.ajax({
                        url: "/api/notificacao?notificacao_id=" + notificacao_id,
                        method: 'POST',
                        dataType: 'json',
                        async: true,
                        success: function (data) {
                            var d = controller.login.get();
                            for (var i = 0; i < d.notificacoes.length; i++) {
                                if (d.notificacoes[i].id == notificacao_id) {
                                    d.notificacoes[i].lido = 1;
                                    d.num_notificacao -= 1;

                                    controller.login.set(d);
                                    break;
                                }
                            }
                            myApp.views[0].router.refreshPage();
                        }, error: function (e) {
                            console.log(e);
                        }
                    });
                });
            });
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

                var doador_id = $(this).attr("doador_id");
                var item_id = $(this).attr("item_id");

                myApp.confirm("Para que a adoção seja confirmada, seus dados para contato serão compartilhados com o doador! Você concorda com isso?", "Deseja finalizar?",
                        function () {
                            creait.post("doacao?pessoa_id=" + controller.contato_doador.get().id_doador + "&doador_id=" + doador_id + "&item_id=" + item_id, null, function () {
                            creait.loader(false);
                            myApp.alert("Dados compartilhados com sucesso, agora é só aguardar o doador entrar em contato!", "");
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

            $("#voltar_doacao").click(function () {
                creait.redirect("doacao", "tipo=" + controller.contato_doador.get().tipo);
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
    init: function (events, query) {
        creait.get("doacao?pessoa_id=" + controller.login.get().id + "&tipo_id=" + query.tipo, null, function (data) {
            localStorage.setItem("num_doacao", data.adocaos.length);
            localStorage.setItem("num_ong", data.ongs.length);

            events(data, function (content) {
                
                if (query.tipo == 1) {
                    $("#doar_ong").css("display", "block");
                    $("#adocao").css("display", "none");
                    $("#addItemDoacao").css("display", "none");

                    if (localStorage.getItem("num_ong") == 0) {
                        $("#nao_tem_ong").css("display", "flex");
                    } else {
                        $("#nao_tem_ong").css("display", "none");
                    }
                }
                else {
                    $("#doar_ong").css("display", "none");
                    $("#adocao").css("display", "block");

                    if (localStorage.getItem("num_doacao") == 0) {
                        $("#nao_tem_doacao").css("display", "flex");
                    } else {
                        $("#nao_tem_doacao").css("display", "none");
                    }
                }

                $("#addItemDoacao").click(function () {
                    creait.redirect('addItem', 'tipo=' + query.tipo + "&finalidade=doacao");
                });
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


            if (localStorage.getItem('ong') == "1") {
                $("#pagar_b_fp").css("display", "none");
                $("#pagar_cc1_fp").css("background-color", "#CCCCCC");
                $("#pagamento_cc_fp").css("display", "block");}
            else {
                $("#pagar_b_fp").css("display", "flex");
                $("#pagar_cc1_fp").css("background-color", "#FFFFFF");
                $("#pagamento_cc_fp").css("display", "none");
            }

            $("#voltar_fp").click(function () {
                if (localStorage.getItem('ong') == "1") {
                    localStorage.setItem('ong', '0');

                    controller.carrinho.set(null);
                    if (controller.carrinhoEspera.get() != null) {
                        controller.carrinho.set(controller.carrinhoEspera.get());
                        controller.carrinhoEspera.set(null);
                    }
                    
                    creait.redirect('doacao');
                } else {
                    $("#voltar_fp").click(function () {
                        creait.redirect('categoria');
                    });
                }
            });


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
                
                $.get('/api/pagseguro', null, function (data) {
                    PagSeguroDirectPayment.setSessionId(data);

                    PagSeguroDirectPayment.getBrand({
                        cardBin: $("#num_cartao_fp").val(),
                        success: function (response) {
                            $("#img_bandeira_fp").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                            $("#bandeira_fp").val(response.brand.name);
                            $("#img_bandeira_fp").parent().css("display", "block");
                        },
                        error: function (response) {
                            $("#img_bandeira_fp").parent().css("display", "none");
                            $("#bandeira_fp").val("");
                            $("#num_cartao_fp").val("");
                            myApp.alert("Numero de cartão invalido", "");
                        },
                        complete: function (response) {
                        }
                    });
                });
            });

            //cartao credito
            $("#finalizar_cc_fp").click(function () {
                $('#nome_cc_fp').toggleInputError($('#nome_cc_fp').val() == '', 'Informe o nome impresso no cartao');
                $('#cpf_cc_fp').toggleInputError($('#cpf_cc_fp').val() == '', 'Informe o CPF do dono do cartao');
                $('#data_nasc_cc_fp').toggleInputError($('#data_nasc_cc_fp').val() == '', 'Informe a data de nascimento do dono do cartao');
                $('#telefone_cc_fp').toggleInputError($('#telefone_cc_fp').val() == '', 'Informe um telefone para contato');
                $('#num_cartao_fp').toggleInputError($('#num_cartao_fp').val() == '', 'Informe o numero do cartao');
                $('#cvv_fp').toggleInputError($('#cvv_fp').val() == '', 'Informe o Codigo de segurança');
                $('#exp_date_fp').toggleInputError($('#exp_date_fp').val() == '', 'Informe a data de validade do cartao');

                var carrinho = controller.carrinho.get();
                carrinho.tipo = "credito";
                controller.carrinho.set(carrinho);

                if ($("formcc .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formcc"));
                }
            });

            //boleto
            $("#finalizar_b_fp").click(function () {
                var carrinho = controller.carrinho.get();
                carrinho.tipo = "boleto";
                controller.carrinho.set(carrinho);

                if ($("formb .has-error").length == 0) {
                    pagseguro.plano(myApp.formToJSON("formb"));
                }
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
controller.item = {
    init: function (events) {
        events({}, function (content) {
            
        });
    },
    get: function () {
        if (window.localStorage["item"] == null)
            return null;
        return JSON.parse(window.localStorage["item"]);
    },
    set: function (data) {
        window.localStorage["item"] = JSON.stringify(data);
    }
};
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
                if (controller.carrinho.get() == null) {
                    $("#abrir_carrinho").css("display", "none");
                } else {
                    $("#abrir_carrinho").css("display", "flex");
                }
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
controller.meuItem = {
    init: function (events) {
        events(controller.login.get(), function (content) {

            $("a.perdido1").html("Encontrado");

            $("#addItem").click(function () {
                creait.redirect('addItem');
            });

            $(".opt_grupo").click(function () {
                localStorage.setItem("grupo_id", $(this).attr("grupo_id"));
                creait.redirect("grupo_item");
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
            $("#btn_pagar_ong").click(function () {
                creait.get('pagSeguro', null, function (data) {
                    PagSeguroDirectPayment.setSessionId(data);

                    var v = $("#valor_ad").val() == "" ? $('.itens:checked').val() : $("#valor_ad").val();
                    var a = "Doação para a ONG - " + controller.ong.get().nome + " no valor de : " + v + " reais";

                    $("#titulo_doacao_ong").html(a);
                    $("#valor_doacao_ong").val(v);

                    PagSeguroDirectPayment.getPaymentMethods({
                        amount: parseFloat(parseFloat(v).toFixed(2)),
                        success: function (response) {
                            controller.boleto.set(response.paymentMethods.BOLETO.options);
                            controller.credito.set(response.paymentMethods.CREDIT_CARD.options);
                            controller.debito.set(response.paymentMethods.ONLINE_DEBIT.options);
                            
                            var d = {
                                valor_total: parseFloat(v),
                                loja_id: controller.ong.get().id,
                                endereco_bool: 0,
                                rua_entrega: "",
                                numero_entrega: "",
                                complemento_entrega: "",
                                bairro_entrega: "",
                                cep_entrega: "",
                                cidade_entrega: "",
                                estado_entrega: "",
                                itens: [{
                                    id: 35,
                                    nome: "Doação",
                                    qtde: 1,
                                    descricao: a,
                                    valor: parseFloat(v)
                                }]
                            };

                            if (controller.carrinho.get() != null) {
                                controller.carrinhoEspera.set(controller.carrinho.get);
                                controller.carrinho.set(null);
                                controller.carrinho.set(d);
                            } else {
                                controller.carrinho.set(d);
                            }
                            localStorage.setItem('ong', '1');
                            creait.redirect('forma_pagamento');
                            creait.loader(false);
                            creait.redirect('forma_pagamento');
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
                });
            });
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

                $("#addItemPadrinho").click(function () {
                    creait.redirect('addItem', 'result=padrinho');
                });
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

            $('input[type="file"]').each(function () {
                this.addEventListener("change", readFile3, false);
            });

            $('#foto_usuario').click(function () {
                $('#pega_foto').click();
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

function readFile3() {

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

controller.carrinhoEspera = {
    get: function () {
        if (localStorage.getItem("carrinhoEspera") == null) {
            return null;
        }
        return JSON.parse(localStorage["carrinhoEspera"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["carrinhoEspera"] = JSON.stringify(data);
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