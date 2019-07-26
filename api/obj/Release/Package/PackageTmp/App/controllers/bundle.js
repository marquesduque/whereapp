controller.formulario = {
    init: function (events, query) {

        if (query.id == null) {
            query.id = controller.login.get().id;
        }
        creait.get('formulario', { id: query.id }, function (data) {
            debugger;
            events({  grupos: data }, function (content) {


                $('[pergunta_id] input').change(function () {
                    debugger;
                    creait.post('formulario', { pergunta_id: $(this).closest('[pergunta_id]').attr('pergunta_id'), valor: ($(this).is(':checked') ? 'Sim' : 'Não') , pessoa_id: query.id, autor_id: controller.login.get().id }, function (data) {
                        creait.loader(false);
                    });
                    creait.loader(false);
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}

controller.acompanhamento = {
    init: function (events, query) {
        var perfil = controller.login.get();
        var lst = [];
        var compra_id = query.compra_id;


        creait.get('acompanhamento?id=' + compra_id, null, function (data) {
            debugger;   
            events(data, function (content) {
                debugger;
                setInterval(function () {
                    $('.page-on-center').attr('loader', 'false');
                    myApp.mainView.refreshPage();
                }, 120000);

                if (data.cancelamento != null) {
                    $('.bg-acompanhamento').html('<div class="label_status">PEDIDO<br>CANCELADO</div>');
                }
                else {
                    if (data.preparo != null) {
                        $('#pedido_recebido').html(data.recebido.toString().substring(16, 11));
                        $($('#pedido_recebido').parent().find('div')[0]).addClass('acompanhamento-success');
                        $($('#saiu_para_entrega').parent().find('div')[0]).addClass('acompanhamento-warning');
                    }
                    else {
                        $('#pedido_recebido').parent().hide();
                        $('#saiu_para_entrega').parent().hide();
                        $('#pedido_entregue').parent().hide();
                    }
                    if (data.finalizado != null) {
                        $('.label_status').html("PEDIDO<br>CONFIRMADO");
                        $('#saiu_para_entrega').html(data.preparo.toString().substring(16, 11));
                        $($('#saiu_para_entrega').parent().find('div')[0]).removeClass('acompanhamento-warning');
                        $($('#saiu_para_entrega').parent().find('div')[0]).addClass('acompanhamento-success');
                        $($('#pedido_entregue').parent().find('div')[0]).addClass('acompanhamento-warning');
                    }
                    else {
                        $('#pedido_entregue').parent().hide();
                    }
                    if (data.entregue != null) {
                        $('#pedido_entregue').html(data.finalizado.toString().substring(16, 11));
                        $($('#pedido_entregue').parent().find('div')[0]).removeClass('acompanhamento-warning');
                        $($('#pedido_entregue').parent().find('div')[0]).addClass('acompanhamento-success');
                    }
                    else {
                    }
                }
                if (data.valor_frete != null) {
                    data.total = data.total + data.valor_frete;
                }
                $('#total_acompanhamento').html((data.total).formatMoney(2));

                $('#repetir_pedido').click(function () {
                    //creait.get("pedido?repetir_id=" + data.id,null, function (item) {
                    //    creait.redirect('acompanhamento', 'compra_id='+item.id);
                    //});
                    controller.carrinho.set(null);
                    var carrinho = { produtos: [] };
                    $(data.pedido).each(function (index, item) {
                        debugger;

                        var local_montagem = {
                            montagem_id: null,
                            produtos: []
                        };
                        debugger;
                        adicionar_value = item.produto;
                        adicionar_value.montagens = [];
                        adicionar_value.icone = "/api/produto?produto_id=" + adicionar_value.id;
                        var total = item.preco;
                        $(adicionar_value.complemento).each(function (a, complemento) {
                            complemento.selecionado = true;
                            if (complemento.selecionado == true) {
                                if (complemento.preco == null) {
                                    complemento.preco = 0;
                                }

                                if (adicionar_value.agrupamento == null) {
                                    adicionar_value.agrupamento = '';
                                    adicionar_value.agrupamentoid = '';
                                }

                                adicionar_value.agrupamento += ' + ' + complemento.produto.nome;
                                adicionar_value.agrupamentoid += complemento.id + ',';

                                adicionar_value.redirect_adicionar = 'montagem';

                                total += complemento.preco;
                                debugger;
                                local_montagem.produtos.push({ preco: complemento.produto.preco, produto_id: complemento.id, external_id: complemento.external_id, nome: complemento.nome });
                            }
                            complemento.selecionado = false;
                        });
                        if (adicionar_value.complemento.length == 0) {
                            adicionar_value.agrupamento = adicionar_value.descricao;
                        }
                        if (local_montagem.produtos.length > 0) {
                            adicionar_value.montagens.push(local_montagem);
                        }
                        adicionar_value.nome = item.produto.nome;

                        adicionar_value.agenda_id = [];
                        adicionar_value.quantidade = 1;
                        adicionar_value.valor = (item.preco).formatMoney(2);
                        adicionar_value.total = (total).formatMoney(2);
                        adicionar_value.preco = item.preco;
                        adicionar_value.produto_id = item.id;

                        carrinho.produtos.push(adicionar_value);
                        controller.carrinho.set(carrinho);
                    });
                    creait.redirect('carrinho');
                })

                data.horario = data.horario[0];

                if (data.horario.numero == null) {
                    $('#endereco').html('PRODUTO RETIRADO NA LOJA')
                    $('#pedido_entregue').closest('.col-33').hide();
                    var itens = $('.bg-acompanhamento .col-33');
                    itens.removeClass('col-33');
                    itens.addClass('col-50');
                    $(itens[1]).find('.label-acompanhamento').text('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('.iconecommerce-truck-4').addClass('iconecommerce-box');
                    $(itens[1]).find('.acompanhamento-line').hide();

                }
                else {
                    $('#endereco').html('<i class="flaticon-location-pin"></i>' + '  ' + data.horario.endereco + (data.horario.numero == null ? '' : ', ' + data.horario.numero) + (data.horario.complemento == null ? "" : ' - ' + data.horario.complemento) + " - Frete: " + ((data.valor_frete == null || data.valor_frete == 0) ? 'Grátis' : (data.valor_frete).formatMoney(2)));
                }
                if (data.horario.agenda_id != null) {
                    $('.transportando').html('ATENDIMENTO');
                    $('.entregue').html('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('iconecommerce-truck-4').removeClass('glyph-icon').addClass('icon-user-check');
                    $('.iconecommerce-box').removeClass('iconecommerce-box').removeClass('glyph-icon').addClass('icon-aid-kit');
                }
                $('#pedido').html(data.horario.hora_date + '<br><span style="font-size:12px;    letter-spacing: 2.7px;">PEDIDO ' + compra_id + '</span>');
            });
        });
    }
}


controller.adicionar = {
    init: function (events, query) {
        debugger;



        if (controller.login.get() != null && controller.login.get().produto_id != null) {
            controller.carrinho.set(null);
            controller.endereco.set(null);
        }
        if (query.regiao == null && controller.login.get() != null && controller.login.get().filial_id != null) {
            query.regiao = controller.login.get().filial_id;
        }

        if ((controller.busca.get() == null && query.regiao == null) || ((controller.adicionar.get() == null || controller.adicionar.get().nome == null) && query.id == null)) {

            return "categoria";
        }
        else if (controller.busca.get() == null && query.regiao != null) {
            var filiais = controller.layout.get().filiais;
            var filial_proxima = null;
            $(filiais).each(function (a, b) {
                debugger;
                if (b.id == query.regiao) {
                    filial_proxima = b;
                }
            });
            controller.filial.set(filial_proxima);

            controller.categoria.init(function () {
                busca_produto();
            });
        }
        else {
            busca_produto();
        }
        function busca_produto() {
            adicionar_produto_memoria(query);

            var item = controller.adicionar.get();

            if (item.quantidade == null) {
                item.quantidade = 1;
            }

            item.total = (item.quantidade * item.preco).formatMoney(2);
            if (controller.login.get() != null && controller.login.get().perfil_id == 5 && item.id != null) {
                creait.get("estoque?pessoa_id=" + controller.login.get().id + "&produto_id=" + item.id, null, function (data) {
                    bind(item, data)
                });
            }
            else {
                bind(item, null);
            }
        }
        function bind(item, estoque) {

            debugger;
            if (item.redirect_adicionar == 'montagem') {
                item.redirect_id = item.id;
            }
            else {
                item.redirect_id = item.categoria_id;
            }

            if (estoque != null && estoque.length > 0) {
                item.estoque = estoque[0].quantidade;
            }
            else {
                item.estoque = null;
            }
            if (item.periodo != null) {
                item.periodo = item.periodo.split(',');
            }
            events(item, function (content) {

                if (controller.login.get() != null && (controller.login.get().perfil_id == 6)) {
                    $('#fechar').remove();
                }
                else {
                    $('#btn_edit').remove();
                }
                if (item.montagem == null) {
                    $('#fechar').remove();
                }

                $('.og_url').attr('content', window.location.href)
                $('.og_title').attr('content', item.nome);
                $('.og_description').attr('content', item.descricao);
                $('.og_image').attr('content', item.icone);

                if (controller.login.get() != null && controller.comanda.get() != null && controller.login.get().perfil_id == 5 && controller.comanda.get().mesa == controller.login.get().cpf) {

                    $('#comanda').val(controller.comanda.get().comanda);
                }

                $('#comanda').focus(function () {
                    $(this).val('');
                });

                if (item.agenda_id != null && item.agenda_id > 0) {
                    creait.get('horarios', {
                        agenda_id: item.agenda_id
                    }, function (data) {

                        var result = new Date();
                        result.setDate(result.getDate() + 1);
                        creait.loader(false);
                        var amanha = [];
                        amanha.push(result);
                        var calendarDefault = myApp.calendar({
                            input: "#demo-calendar-disabled",
                            dateFormat: 'Agendar para DD, dd/mm/yyyy',
                            closeOnSelect: true,
                            toolbarCloseText: 'AGENDAR',
                            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
                            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                            weekHeader: true,
                            monthNames: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Deze'],
                            minDate: new Date(),
                            maxDate: new Date().addMinutes(129600),
                            value: amanha,
                            onOpen: function () {
                                //if (horarios.Manhã.length > 0)
                                //    horarios.Manhã = [];
                                //if (horarios.Tarde.length > 0)
                                //    horarios.Tarde = [];
                                //if (horarios.Noite.length > 0)
                                //    horarios.Noite = [];
                            },
                            onChange: function (a, b, c) {

                                if (a.opened == true || a.container == null) {
                                    var days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
                                    var week = days[b[0].getDay()];

                                    var duracao = item.duracao;
                                    if (duracao != null && duracao != 0) {
                                        $('.periodo').html('Periodo<br>' + duracao + ' min');
                                        $('#periodo').val(duracao);
                                    }
                                    else {
                                        duracao = parseInt($($('.tag_periodo')[0]).attr('periodo'), 10);
                                        $('.periodo').html('Periodo<br>' + (duracao / 60) + ' horas');
                                        $('#periodo').val(duracao);
                                    }

                                    var data_inicio = new Date(b[0].toDateString() + ' ' + data[week + '_inicio']);
                                    var data_fim = new Date(b[0].toDateString() + ' ' + data[week + '_fim']);

                                    $('.tag_periodo').click(function () {
                                        $('.tag_periodo').removeClass('active');
                                        $(this).addClass('active');

                                        duracao = parseInt($(this).attr('periodo'), 10);
                                        $('.periodo').html('Periodo<br>' + (duracao / 60) + ' horas');
                                        $('#periodo').val(duracao);

                                        bind_horario();
                                    });
                                    bind_horario();
                                    if ($('#tag_hora .tag_hora').length == 0) {

                                        $('#tag_hora').html('<div class="erro_horario">Não existe horário disponivel para a data selecionada.</div>');

                                        $('#demo-calendar-disabled').click();
                                        $('.picker-header').html('<div class="erro_horario_bar">NÃO EXISTE HORÁRIO DISPONÍVEL<br>SELECIONE OUTRA DATA</div>');

                                    }
                                    else {
                                        $('.picker-header').html('<div class="alert_horario_bar">SELECIONE UMA DATA PARA<BR>AGENDAR UM HORÁRIO</div>');
                                    }

                                    function bind_horario() {
                                        $('.lstperiodo').show();
                                        item.quantidade = (duracao / 60);
                                        item.total = (item.preco * item.quantidade).formatMoney(2);
                                        $$('#total').html(item.total);

                                        $('#tag_hora').html('');
                                        for (var i = data_inicio; i < data_fim; i = i.addMinutes(duracao > 60 ? 60 : duracao)) {
                                            var products = { length: 0 };
                                            if (controller.carrinho.get() != null) {
                                                products = $(controller.carrinho.get().produtos).filter(function (d, e) {
                                                    var h1 = new Date(e.horario1);
                                                    return (h1 >= i && h1 <= i.addMinutes(duracao));
                                                });
                                            }
                                            if (products.length == 0) {
                                                products = $(data.horario).filter(function (d, e) {
                                                    var h1 = new Date(e.horario1);
                                                    return (h1 >= i && h1 <= i.addMinutes(e.duracao));
                                                });
                                            }
                                            if (i.addMinutes(duracao - 1) < data_fim && products.length == 0) {
                                                var tag = $('<div class="tag_hora" data="' + i.toString() + '" >' + i.toLocaleTimeString().substring(0, 5) + ' às ' + i.addMinutes(duracao).toLocaleTimeString().substring(0, 5) + '<div>');
                                                tag.click(function () {
                                                    $('.tag_hora.active').removeClass('active');
                                                    $(this).addClass('active');
                                                    item.horario1 = new Date($(this).attr('data'));
                                                });

                                                $('#tag_hora').append(tag);
                                            }
                                        }
                                        $('#tag_hora').append('<div style="clear:both"></div>');

                                        if ($('#tag_hora .tag_hora').length == 0) {
                                            $('#tag_hora').html('<div class="erro_horario">Não existe horário disponivel para a data selecionada.</div>');
                                        }
                                    }
                                }
                                else {
                                    $('.picker-header').html('<div class="alert_horario_bar">SELECIONE UMA DATA PARA<BR>AGENDAR UM HORÁRIO</div>');
                                }
                            },
                            onClose: function () {
                                //if ($('#picker-dia').val() != "") {
                                //    creait.get("horario?id=" + $('#picker-quadra').attr("name") + "&dia=" + $('#picker-dia').val().split(", ")[1] + " 01:00:00&dia_semana=" + $('#picker-dia').val().split(", ")[0], null, function (data) {
                                //        for (var i = 0; i < data.horarioM.length; i++) {
                                //            horarios.Manhã.push(data.horarioM[i].hora);
                                //        }
                                //        for (var i = 0; i < data.horarioT.length; i++) {
                                //            horarios.Tarde.push(data.horarioT[i].hora);
                                //        }
                                //        for (var i = 0; i < data.horarioN.length; i++) {
                                //            horarios.Noite.push(data.horarioN[i].hora);
                                //        }
                                //        $('#picker-horario').show();
                                //    });
                                //}
                            },
                            toolbarTemplate:
                                '<div class = "toolbar calendar-custom-toolbar">' +
                                '<div class = "toolbar-inner">' +
                                '<div class = "left">' +
                                '<a href = "#" class = "link icon-only picker-calendar-prev-month"><i class = "icon icon-prev"></i></a>' +
                                '</div>' +
                                '<div class = "center">' +
                                '<span class="current-month-value"></span>' +
                                '</div > ' +
                                '<div class = "">' +
                                '<a href = "#" class = "link icon-only picker-calendar-next-month"><i class = "icon icon-next"></i></a>' +
                                '</div>' +
                                //'<div class = "left">' +
                                //'<a href = "#" class = "link icon-only picker-calendar-prev-year"><i class = "icon icon-prev"></i></a>' +
                                //'</div>' +
                                //'<div class = "center">' +
                                //'<span class="current-year-value"></span>' +
                                //'</div > ' +
                                //'<div class = "">' +
                                //'<a href = "#" class = "link icon-only picker-calendar-next-year"><i class = "icon icon-next"></i></a>' +
                                //'</div>' +
                                '</div>' +
                                '</div>'
                        });
                    });
                }

                if (item.icone == '') {
                    $(".background_produto").addClass("background_produto_hide");
                }

                $('#unidade').click(function () {
                    myApp.modal({
                        title: "Qual o peso em " + item.unidade + "?",
                        text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="tel" mask="money" inputmode="numeric" pattern="[0-9]*" placeholder="0,000" />',
                        buttons: [
                            {
                                text: 'Cancelar',
                                onClick: function () {
                                }
                            },
                            {
                                text: 'Continuar',
                                onClick: function () {
                                    var quantidade = parseFloat($('.modal_money').val().replace(',', '.'));
                                    debugger;
                                    if (isNaN(quantidade) || quantidade <= 0) {
                                        myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                            $('#unidade').click();
                                        });
                                    }
                                    else {
                                        item.quantidade = parseInt($('.modal_money').val().replace('.', ''), 10);
                                        item.total = (item.preco * quantidade).formatMoney(2);
                                        $$('#total').html(item.total);
                                        $$('#quantidade').html($('.modal_money').val());
                                    }
                                }
                            }
                        ]
                    });
                    creait.bind_peso('.modal_money');
                    return;
                });

                if (item.quantidade == 1) {
                    $('#unidade').click();
                }

                $$('#btn_adicionar').click(function () {

                    if (item.agenda_id != null && item.agenda_id > 0) {
                        if ($('.tag_hora.active').length == 0) {
                            myApp.alert("Para continuar selecione um horário", "Atenção");
                            return;
                        }
                    }

                    adicionar();

                    if (controller.login.get() == null || controller.login.get().produto_id == null) {
                        creait.redirect('categoria');
                    }
                    else {
                        creait.redirect('cliente');
                    }

                });


                creait.redirect('produto', 'id=' + item.categoria_id);

                $$('#adicionar').click(function () {
                    if (item.quantidade == item.estoque) {
                        myApp.alert("Quantidade no estoque atingido!", "Aviso!");
                    } else {
                        item.quantidade += 1;
                        item.total = (item.preco * item.quantidade).formatMoney(2);
                        $$('#total').html(item.total);
                        $$('#quantidade').html(item.quantidade);
                    }
                });
                $$('#remover').click(function () {
                    if (item.quantidade > 1) {
                        item.quantidade -= 1;
                        item.total = (item.preco * item.quantidade).formatMoney(2);
                        if (item.quantidade < 1) {
                            item.quantidade = 1;
                        }
                        $$('#total').html(item.total);
                        $$('#quantidade').html(item.quantidade);
                    }
                });

                function adicionar() {
                    creait.loader(true);
                    if (item.agenda_id != null && item.agenda_id > 0) {
                        item.data = $('#demo-calendar-disabled').val().split(', ')[1] + " " + $('.tag_hora.active').text() + ":00";
                        item.agrupamentoid = item.data;
                        item.agrupamento = "Dia: " + $('#demo-calendar-disabled').val().split(', ')[1] + "<br>HORÁRIO: das " + $('.tag_hora.active').text();
                    }

                    if (controller.carrinho.get() == null) {

                        //if (item.agrupamentoid != null) {
                        //    var agrupamento = item.agrupamentoid.split(',');

                        //    for (var k = 0; k < (agrupamento.length - 1); k++) {
                        //        for (var j = 0; j < item.montagem.length; j++) {
                        //            for (var i = 0; i < item.montagem[j].complemento.length; i++) {

                        //                if (item.montagem[j].complemento[i].id == agrupamento[k]) {
                        //                    item.montagem[j].complemento[i].selecionado = true;
                        //                }
                        //                else {
                        //                    item.montagem[j].complemento.splice(i, 1);
                        //                }
                        //            }
                        //        }
                        //    }
                        //}


                        item.total = (item.preco * item.quantidade).formatMoney(2);
                        item.observacao = $('#observacao').val();
                        item.comanda = $('#comanda').val();

                        var carrinho = { produtos: [] };
                        carrinho.produtos.push(item);
                        controller.carrinho.set(carrinho);
                    }
                    else {
                        var carrinho = controller.carrinho.get();
                        var product = $(carrinho.produtos).filter(function (a, b) {
                            debugger;
                            return (item.unidade == null || item.unidade == '') && (b.id == parseInt(item.id, 10) && b.agrupamentoid == item.agrupamentoid && b.comanda == $('#comanda').val())
                        })[0];

                        item.observacao = $('#observacao').val();
                        item.comanda = $('#comanda').val();

                        if (item.unidade == null || item.unidade == '') {
                            if (product != null) {
                                product.quantidade = product.quantidade + item.quantidade;
                                product.total = (product.quantidade * product.preco).formatMoney(2);
                            }
                            else {
                                item.total = (item.preco * item.quantidade).formatMoney(2);
                                carrinho.produtos.push(item);
                            }
                        }
                        else {
                            item.total = (item.preco * creait.convert_int_peso(item.quantidade)).formatMoney(2);
                            carrinho.produtos.push(item);
                        }
                        controller.carrinho.set(carrinho);
                    }

                    controller.comanda.set({
                        comanda: item.comanda,
                        mesa: (controller.login.get() == null ? "" : controller.login.get().cpf)
                    });
                }
            });

        }
    },
    get: function () {
        if (controller.adicionar.memory == null)
            return {};
        return JSON.parse(controller.adicionar.memory);
    },
    set: function (data) {
        controller.adicionar.memory = JSON.stringify(data);
    },
    memory: null
}
controller.comanda = {
    get: function () {
        if (window.localStorage["comanda"] == null)
            return null;
        return JSON.parse(window.localStorage["comanda"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["comanda"] = data;
        else
            window.localStorage["comanda"] = JSON.stringify(data);
    }
}
controller.agenda = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?login_id=' + login.id, null, function (data) {

            pedido.compra = data;
            events(pedido, function (content) {
            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}

controller.avaliacao = {
    init: function (events, query) {
        
        events({}, function (content) {
            var star = 3;
            $('.icon-star-full').click(function () {
                star = parseInt($(this).attr('value'), 10);
                $('.icon-star-full').removeClass('activestar');
                for (var i = star; i > 0; i--) {
                    $('.icon-star-full[value="' + i + '"]').addClass('activestar');
                }
            });

            $('#avaliar').click(function () {
                debugger;
                creait.get('produto?estrela=' + $($('.activestar').get().reverse()[0]).attr('value') + '&horario_id=' + query.id, null, function (data) {
                    creait.redirect('horario', 'id=' + query.id);
                });
            });
        });
    },
    get: function () {
        return memory;
    },
    set: function (data) {
        memory = data;
    },
    memory: null
}


controller.bemvindo = {
    init: function (events, query) {
        var layout = controller.layout.get();
        events(layout, function (content) {
            $('#iniciar').click(function () {
                localStorage.clear();
                window.top.location.href = "/";
            });
        });

    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}

controller.cadastro = {
    init: function (events) {
        events({}, function (content) {

            $$("#btn_sign_up").click(function () {

                $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Informe o seu nome');

                $('#email_input').toggleInputError($('#email_input').val() == '' || !creait.isEmail($('#email_input').val()), 'Email inválido');

                if (localStorage.getItem('pushToken') == null || localStorage.getItem('plataforma_id') == null) {
                    $('#pushC').val("");
                    $('#platC').val("");
                }
                else {
                    $('#pushC').val(localStorage.getItem('pushToken'));
                    $('#platC').val(localStorage.getItem('plataforma_id'));
                }

                //$('#genero').toggleInputError(($('[name="genero"]:checked').val() == null), 'Informe o seu genero');

                //$('#telefone_input').toggleInputError($('#telefone_input').val() == '' || !creait.isPhone($('#telefone_input').val()), 'Informe o seu telefone');

                $('#password_input').toggleInputError($('#nome_input').val() == '' || $('#password_input').val().length < 6, 'A senha deve ter no minimo 6 caracteres');

                $('#password_confirmar_input').toggleInputError($('#password_input').val() != $('#password_confirmar_input').val(), 'A confirmação da senha esta errada');

                if ($('#aceite').length > 0) {
                    $('#aceite').toggleInputError($('#aceite:checked').length == 0, 'Para continuar você precisa aceitar os termos de uso');
                }
                if ($('formcadastro .has-error').length == 0) {

                    creait.post('pessoas', myApp.formToJSON("formcadastro"), function (data) {

                        if (data.erro == null) {
                            controller.login.set(data)

                            if (controller.carrinho.get() != null) {
                                if (controller.endereco.get() == null) {
                                    if (controller.layout.get().balcao && controller.layout.get().delivery) {
                                        creait.redirect('endereco');
                                    }
                                    else if (controller.busca.get().balcao) {
                                        creait.redirect('filial');
                                    }
                                    else {
                                        creait.redirect('endereco');
                                    }
                                }
                                else {
                                    if (controller.cartao.get() == null && (controller.pagamento.get() != null && controller.pagamento.get().transacao == 4)) {
                                        creait.redirect("cartao");
                                    }
                                    else if (controller.login.get().perfil_id == 5) {
                                        creait.redirect("cliente");
                                    } else {
                                        creait.redirect("pagamento");
                                    }
                                }
                            } else {
                                creait.redirect("categoria");
                            }
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
}


controller.carrinho = {
    init: function (events) {
        if (controller.carrinho.get() == null) {
            setTimeout(function () {
                window.location = "/";
            }, 1000);
            return;
        }
        else {
            var carrinho = controller.carrinho.get();
            controller.carrinho.change(carrinho);

            var comandas = []
            $(carrinho.produtos).each(function (index_p, item_p) {
                debugger;

                var comanda = $(comandas).filter(function (a, b) { return b.numero == item_p.comanda })[0];
                if (comanda == null) {
                    comanda = { numero: item_p.comanda, label_numero: ((item_p.comanda == '' || item_p.comanda == null) ? 'ITEM(S) ADICIONADO(S)' : 'REFERÊNCIA ' + item_p.comanda), produtos: [] };
                    if (item_p.comanda == '') {
                        comandas.unshift(comanda);
                    }
                    else {
                        comandas.push(comanda);
                    }
                }
                comanda.produtos.push(item_p);
            });
            carrinho.comandas = comandas;

            events(carrinho, function (content) {

                $('.unidade').click(function (control) {
                    var control = this;
                    var produto = $(carrinho.produtos).filter(function (a, b) { return b.id == $(control).closest('[produto_id]').attr('produto_id') && (b.agrupamentoid == null ? "" : b.agrupamentoid) == $(control).closest('[agrupamentoid]').attr('agrupamentoid') })[0];
                    myApp.modal({
                        title: "Qual o peso em " + produto.unidade + "?",
                        text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="tel" mask="money" inputmode="numeric" pattern="[0-9]*" placeholder="0,000" />',
                        buttons: [
                            {
                                text: 'Cancelar',
                                onClick: function () {
                                }
                            },
                            {
                                text: 'Continuar',
                                onClick: function () {
                                    var quantidade = parseFloat($('.modal_money').val().replace(',', '.'));
                                    debugger;
                                    if (isNaN(quantidade) || quantidade <= 0) {
                                        myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                            $('#unidade').click();
                                        });
                                    }
                                    else {
                                        produto.quantidade = parseInt($('.modal_money').val().replace('.', ''), 10);
                                        produto.total = (produto.preco * quantidade).formatMoney(2);
                                        controller.carrinho.set(carrinho);
                                        
                                        $(control).closest('[produto_id]').find('.quantidade_carrinho').html($('.modal_money').val());
                                        $(control).closest('[produto_id]').find('.total_carrinho').html(produto.total);

                                        var totais = {};
                                        controller.carrinho.change(totais);
                                        if (totais.carrinho_total != null) {
                                            $('#total').html((totais.carrinho_total).formatMoney(2));
                                        }
                                    }
                                }
                            }
                        ]
                    });
                    creait.bind_peso('.modal_money');
                    return;
                });

                $('.labelcomprar').click(function () {
                    debugger;
                    var totais = {};
                    controller.carrinho.change(totais);
                    if (controller.filial.get().minimo != null && totais.carrinho_total <= controller.filial.get().minimo) {
                        myApp.alert('O valor minimo para finalizar a compra é de ' + controller.filial.get().minimo.formatMoney(2), 'Valor Mínimo');
                    }
                    else if (controller.login.get() != null && controller.login.get().perfil_id == 3) {
                        finalizar_compra();
                    }
                    else if (controller.login.get() != null && controller.login.get().perfil_id == 5 && controller.login.get().external_id != null) {
                        finalizar_compra();
                    }
                    else {
                        debugger;

                        if (controller.layout.get().NotPremium) {
                            creait.redirect('premium');
                        }
                        else {
                            var filial_proxima = controller.filial.get();
                            if (
                                (
                                    filial_proxima['seg1'] == null && filial_proxima['seg2'] == null && filial_proxima['seg3'] == null && filial_proxima['seg4'] == null &&
                                    filial_proxima['ter1'] == null && filial_proxima['ter2'] == null && filial_proxima['ter3'] == null && filial_proxima['ter4'] == null &&
                                    filial_proxima['qua1'] == null && filial_proxima['qua2'] == null && filial_proxima['qua3'] == null && filial_proxima['qua4'] == null &&
                                    filial_proxima['qui1'] == null && filial_proxima['qui2'] == null && filial_proxima['qui3'] == null && filial_proxima['qui4'] == null &&
                                    filial_proxima['sex1'] == null && filial_proxima['sex2'] == null && filial_proxima['sex3'] == null && filial_proxima['sex4'] == null &&
                                    filial_proxima['sab1'] == null && filial_proxima['sab2'] == null && filial_proxima['sab3'] == null && filial_proxima['sab4'] == null &&
                                    filial_proxima['dom1'] == null && filial_proxima['dom2'] == null && filial_proxima['dom3'] == null && filial_proxima['dom4'] == null
                                )
                                ||
                                (
                                    (
                                        (
                                            controller.filial.get()[getWeek() + '1'] != null &&
                                            controller.filial.get()[getWeek() + '2'] != null
                                        )
                                        ||
                                        (
                                            controller.filial.get()[getWeek() + '3'] != null &&
                                            controller.filial.get()[getWeek() + '4'] != null
                                        )
                                    )
                                    &&
                                    (
                                        (
                                            new Date(new Date().toDateString() + ' ' + controller.filial.get()[getWeek() + '1']).getTime() <= new Date().getTime() &&
                                            new Date(new Date().toDateString() + ' ' + controller.filial.get()[getWeek() + '2']).getTime() >= new Date().getTime()
                                        )
                                        ||
                                        (
                                            new Date(new Date().toDateString() + ' ' + controller.filial.get()[getWeek() + '3']).getTime() <= new Date().getTime() &&
                                            new Date(new Date().toDateString() + ' ' + controller.filial.get()[getWeek() + '4']).getTime() >= new Date().getTime()
                                        )
                                    )
                                )
                            ) {

                                if (controller.endereco.get() != null) {
                                    if (controller.login.get() == null) {
                                        creait.redirect('login');
                                    }
                                    else {
                                        creait.redirect('pagamento');
                                    }
                                } else {
                                    if (controller.login.get() == null) {
                                        creait.redirect('endereco', 'to=login');
                                    }
                                    else {
                                        creait.redirect('endereco', 'to=pagamento');
                                    }
                                }

                            }
                            else {
                                myApp.alert('Estamos fechados no momento', 'Oops');
                            }
                        }
                    }
                });

                $('.adicionar').click(function (control) {
                    var control = this;
                    var produto = $(carrinho.produtos).filter(function (a, b) { return b.id == $(control).closest('[produto_id]').attr('produto_id') && (b.agrupamentoid == null ? "" : b.agrupamentoid) == $(control).closest('[agrupamentoid]').attr('agrupamentoid') })[0];
                    if (produto.estoque != null && produto.quantidade >= produto.estoque) {
                        myApp.alert("Quantidade no estoque atingido!", "Aviso!");
                    } else {
                        produto.quantidade += 1;
                        produto.total = (produto.preco * produto.quantidade).formatMoney(2);
                        controller.carrinho.set(carrinho);
                    }

                    $(control).closest('[produto_id]').find('.quantidade_carrinho').html(produto.quantidade);
                    $(control).closest('[produto_id]').find('.total_carrinho').html(produto.total);

                    var totais = {};
                    controller.carrinho.change(totais);
                    if (totais.carrinho_total != null) {
                        $('#total').html((totais.carrinho_total).formatMoney(2))
                    }
                });

                $('.remover_tudo').click(function () {
                    remover(this, true);
                });
                $('.remover').click(function () {
                    remover(this);
                });

                function remover(control, tudo) {

                    var produto = $(carrinho.produtos).filter(function (a, b) { return b.id == $(control).closest('[produto_id]').attr('produto_id') && (b.agrupamentoid == null ? "" : b.agrupamentoid) == $(control).closest('[agrupamentoid]').attr('agrupamentoid') })[0];

                    produto.quantidade -= 1;
                    if (produto.quantidade < 1 || tudo) {

                        myApp.confirm('Deseja excluir o item do carrinho?', 'Atenção!',
                            function () {

                                var produtos = [];
                                $(carrinho.produtos).each(function (produto_index, produto_item) {

                                    if (produto_item.id != produto.id || produto_item.agrupamentoid != produto.agrupamentoid) {
                                        produtos.push(produto_item);
                                    }
                                });
                                carrinho.produtos = produtos;
                                controller.carrinho.set(carrinho);
                                $(control).closest('[produto_id]').remove();

                                var totais = {};
                                controller.carrinho.change(totais);
                                if (totais.carrinho_total != null) {
                                    $('#total').html((totais.carrinho_total).formatMoney(2))
                                }


                                if (carrinho.carrinho_quantidade == 0)
                                    window.localStorage.removeItem('carrinho');

                                if (carrinho.produtos.length == 0) {
                                    if (controller.login.get() == null || controller.login.get().produto_id == null) {
                                        creait.redirect('categoria');
                                    }
                                    else {
                                        creait.redirect("adicionar", "id=" + controller.login.get().produto_id + "&regiao=" + controller.filial.get().id);
                                    }
                                }
                                else {
                                    $("[quantidade]:contains('0')").closest('[produto_id]').remove();
                                }


                                return;
                            },
                            function () {
                                produto.quantidade = 1;
                                produto.total = produto.preco * produto.quantidade;
                                controller.carrinho.set(carrinho);

                                $(control).closest('[produto_id]').find('.quantidade_carrinho').html(produto.quantidade);
                                $(control).closest('[produto_id]').find('.total_carrinho').html((produto.quantidade * produto.preco).formatMoney(2));

                                var totais = {};
                                controller.carrinho.change(totais);
                                $('#total').html((totais.carrinho_total).formatMoney(2))
                                return;
                            }
                        );
                    }
                    else {
                        produto.total = (produto.preco * produto.quantidade).formatMoney(2);
                        controller.carrinho.set(carrinho);

                        $(control).closest('[produto_id]').find('.quantidade_carrinho').html(produto.quantidade);
                        $(control).closest('[produto_id]').find('.total_carrinho').html(produto.total);

                        var totais = {};
                        controller.carrinho.change(totais);
                        $('#total').html((totais.carrinho_total).formatMoney(2))
                    }
                }
            });
        }
    },
    change: function (ent) {
        var total = 0;
        var quantidade = 0;


        if (controller.carrinho.get() != null) {

            var arr = controller.carrinho.get();
            if (arr.produtos.length == 0) {
                controller.carrinho.set(null);
                $('.panel_carrinho').hide();
                $('[data-page="categoria"]').removeClass('carrinho_open');
            }
            else {
                $('[data-page="categoria"]').addClass('carrinho_open');
                $('.panel_carrinho').show();
                $(arr.produtos).each(function (index, item) {

                    debugger;
                    if (item.unidade == null || item.unidade == '') {
                        total = total + (item.quantidade * item.preco);
                        quantidade = quantidade + item.quantidade;
                        item.total = (item.quantidade * item.preco).formatMoney(2);
                    }
                    else {
                        total = total + (creait.convert_int_peso(item.quantidade) * item.preco);
                        quantidade = quantidade + 1;
                        item.total = (creait.convert_int_peso(item.quantidade) * item.preco).formatMoney(2);
                    }
                });

                debugger;
                controller.carrinho.set(arr);
                ent.carrinho_total = total;
                ent.carrinho_quantidade = quantidade;
            }
        }
        else {
            $('.panel_carrinho').hide();
            $('[data-page="categoria"]').removeClass('carrinho_open');
        }
    },
    //get: function () {
    //    return controller.carrinho.memory;
    //},
    //set: function (data) {
    //        controller.carrinho.memory = data;
    //},
    get: function () {
        if (window.localStorage["carrinho"] == null)
            return null;
        return JSON.parse(window.localStorage["carrinho"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["carrinho"] = data;
        else
            window.localStorage["carrinho"] = JSON.stringify(data);
    },
    memory: null
}



controller.cartao = {
    init: function (events, query) {

        var cartao = {};
        cartao.login = controller.login.get();
        cartao.cartao = controller.cartao.get();
        debugger;
        creait.get('cartao', { pessoa_id: cartao.login.id },
            function (data) {
                if (data == null) {
                    cartao.cartao = {};
                    cartao.cartao.numero = '';
                    cartao.cartao.nome = '';
                    cartao.cartao.bandeira = '';
                    cartao.cartao.cvv = '';
                    cartao.cartao.expiracao = '';
                }
                else {
                    cartao.cartao = data;
                }

                events(cartao, function (content) {
                    creait.loader(false);

                    var cardtype = null;

                    Payment.formatCardExpiry(document.querySelector('#expiracao_input'));
                    Payment.formatCardCVC(document.querySelector('#cvv'));
                    Payment.formatCardNumber(document.querySelector('#cardnumber_input'));

                    $('.back.link').click(function () {
                        debugger;
                        if (query.horario == null) {
                            creait.redirect('carrinho');
                        }
                        else {
                            creait.redirect('horario', 'id=' + query.horario);
                        }
                    });

                    $$('#cardnumber_input').keyup(function () {
                        var card = $(this).val();
                        cardtype = Payment.fns.cardType(card);
                        $('[name="bandeira"]').val(cardtype);
                        $('#brand').attr('src', 'icons/bandeiras/' + cardtype + '.svg');
                        $('#brand').css('display', 'block');
                    });

                    $$("#btn_savar_cartao").click(function () {

                        $('#cardnumber_input').toggleInputError(!Payment.fns.validateCardNumber($('#cardnumber_input').val()), 'Cartão esta inválido');
                        $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Nome obrigatório');
                        $('#expiracao_input').toggleInputError(!($('#expiracao_input').val().split('/').length == 2 && Payment.fns.validateCardExpiry($('#expiracao_input').val().split('/')[0], $('#expiracao_input').val().split('/')[1])), 'Data inválida');
                        $('#cvv').toggleInputError(!Payment.fns.validateCardCVC($('#cvv').val()), 'CCV Inváligo');
                        $('#documento').toggleInputError($('#documento').val() == '', 'CPF ou CNPJ inválido use apenas números');

                        var json = myApp.formToJSON("formcartao");
                        json.pessoa_id = controller.login.get().id;
                        json.compra_id = query.compra;

                        if ($('formcartao .has-error').length == 0) {
                            creait.post('cartao', json, function (data) {
                                if (data.erro == null) {
                                    controller.cartao.set(data);

                                    if (query.atendimento != null) {
                                        creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar", "id=" + query.atendimento);
                                    }
                                    else if (query.horario != null) {
                                        creait.redirect("horario", "id=" + query.horario);
                                    }
                                    else {
                                        creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                                    }
                                }
                                else {
                                    creait.loader(false);
                                    myApp.alert(data.erro, 'Oops');
                                }
                            });
                        }

                    });
                });
            });


    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}
controller.categoria = {
    navbartop: true,
    init: function (events) {
        var filial_proxima = controller.filial.get();

        $('.loader_off').hide();
        creait.loader(true);
        myApp.hidePreloader();

        if (filial_proxima.versao == null) {
            filial_proxima.versao = controller.busca.get().versao;
            controller.filial.set(filial_proxima);
        }

        if (controller.busca.get() == null || filial_proxima.id != controller.busca.get().id || controller.busca.get().versao != filial_proxima.versao) {

            $$.ajax({
                url: "json/" + window.location.host.split('.')[0].replace(':', '') + '_' + filial_proxima.id + '_' + (filial_proxima.versao == null ? "" : filial_proxima.versao) + '.json', method: 'GET', dataType: 'json', success: function (data) {

                    debugger;
                    controller.busca.set(data);
                    var filial = data;
                    controller.carrinho.change(filial);

                    if (controller.login.get() != null) {
                        data.login = controller.login.get();
                    }
                    else {
                        data.login = { nome: '' };
                    }
                    bind(filial);
                }, error: function (a, b, c) {
                    creait.get('filiais?id=' + filial_proxima.id, null, function (data) {

                        debugger;
                        controller.busca.set(data);
                        var filial = data;
                        controller.carrinho.change(filial);

                        if (controller.login.get() != null) {
                            data.login = controller.login.get();
                        }
                        else {
                            data.login = { nome: '' };
                        }
                        bind(filial);
                    });
                }
            });

        }
        else {
            var data = controller.busca.get();

            if (controller.login.get() != null) {
                data.login = controller.login.get();
            }
            else {
                data.login = { nome: '' };
            }
            bind(data);
        }

        function bind(filial) {
            filial.navbartop = true;

            if (controller.carrinho.get() != null) {
                filial.navbartop = false;
            }
        

            if (
                filial_proxima['seg1'] == null && filial_proxima['seg2'] == null && filial_proxima['seg3'] == null && filial_proxima['seg4'] == null &&
                filial_proxima['ter1'] == null && filial_proxima['ter2'] == null && filial_proxima['ter3'] == null && filial_proxima['ter4'] == null &&
                filial_proxima['qua1'] == null && filial_proxima['qua2'] == null && filial_proxima['qua3'] == null && filial_proxima['qua4'] == null &&
                filial_proxima['qui1'] == null && filial_proxima['qui2'] == null && filial_proxima['qui3'] == null && filial_proxima['qui4'] == null &&
                filial_proxima['sex1'] == null && filial_proxima['sex2'] == null && filial_proxima['sex3'] == null && filial_proxima['sex4'] == null &&
                filial_proxima['sab1'] == null && filial_proxima['sab2'] == null && filial_proxima['sab3'] == null && filial_proxima['sab4'] == null &&
                filial_proxima['dom1'] == null && filial_proxima['dom2'] == null && filial_proxima['dom3'] == null && filial_proxima['dom4'] == null
            ) {
                filial.aberto = 'aberto';
                filial.lblaberto = 'Aberto no momento';
                filial.is_aberto = true;
                filial.navbartop = false;
            }
            else if (filial_proxima[getWeek() + '1'] == null && filial_proxima[getWeek() + '2'] == null && filial_proxima[getWeek() + '3'] == null && filial_proxima[getWeek() + '4'] == null) {

                filial.aberto = 'fechado';
                filial.lblaberto = 'Fechado no momento';
                filial.is_aberto = false;
                filial.horario_abertura = 'NÃO ABRIREMOS HOJE';
            }
            else if (((new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '1']).getTime() <= new Date().getTime() &&
                new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '2']).getTime() >= new Date().getTime()) ||
                (new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '3']).getTime() <= new Date().getTime() &&
                    new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '4']).getTime() >= new Date().getTime()))) {
                filial.aberto = 'aberto';
                filial.lblaberto = 'Aberto no momento';
                filial.is_aberto = true;
                filial.navbartop = false;
            }
            else {
                filial.aberto = 'fechado';
                filial.lblaberto = 'Fechado no momento';
                filial.is_aberto = false;


                if ((new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '1']).getTime() <= new Date().getTime() &&
                    new Date(new Date().toDateString() + ' ' + filial_proxima[getWeek() + '2']).getTime() >= new Date().getTime())) {
                    filial.horario_abertura = filial_proxima[getWeek() + '3'].substring(0, 4);
                }
                else {
                    if (filial_proxima[getWeek() + '1'] == null) {
                        filial.horario_abertura = 'Abrimos as ' + filial_proxima[getWeek() + '3'].substring(0, 5);
                    }
                    else {
                        filial.horario_abertura = 'Abrimos as ' + filial_proxima[getWeek() + '1'].substring(0, 5);
                    }
                }
            }

            debugger;

            filial.url_phone = '';
            if (filial.celular != null && filial.celular != "") {
                if (controller.layout.get().whatsapp_message == null || controller.layout.get().whatsapp_message == "") {
                    filial.url_phone = 'https://api.whatsapp.com/send?phone=' + filial.celular.replace("+", "").replace("-", "") + '&text=' + 'Olha%20s%C3%B3%20que%20legal%20o%20aplicativo%20da%20' + encodeURI(filial.nome) + '%20http%3A%2F%2F' + encodeURI(window.location.host) + '%2Fapp';
                }
                else {
                    filial.url_phone = 'https://api.whatsapp.com/send?phone=' + filial.celular.replace("+", "").replace("-", "") + '&text=' + encodeURI(controller.layout.get().whatsapp_message);
                }

                if (filial.celular.indexOf('+55') > -1) {
                    var tel = filial.celular.replace("+", "").replace("-", "").slice(4);
                    if (tel.length == 9) {
                        tel = tel.slice(0, 5) + '-' + tel.slice(5, 9);
                    }
                    else {
                        tel = tel.slice(0, 4) + '-' + tel.slice(4, 8);
                    }
                    filial.celular = "(" + filial.celular.replace("+", "").slice(2, 4) + ") " + tel;
                }
            }
            else if (filial.telefone != null && filial.telefone != "") {

                if (filial.telefone.indexOf('+55') > -1) {
                    var tel = filial.telefone.replace("+", "").replace("-", "").slice(4);
                    if (tel.length == 9) {
                        tel = tel.slice(0, 5) + '-' + tel.slice(5, 9);
                    }
                    else {
                        tel = tel.slice(0, 4) + '-' + tel.slice(4, 8);
                    }
                    filial.celular = "(" + filial.telefone.replace("+", "").slice(2, 4) + ") " + tel;
                }
                filial.url_phone = 'tel:' + filial.telefone.replace("+", "").replace("-", "");
            }
            filial.place_id = controller.layout.get().place_id;
            controller.carrinho.change(filial);
            filial.categoria_count = filial.tipos.length;
            if (true) {
                filial.categoria_count = filial.categoria_count;
            }
            filial.url = window.location.host;
            filial.tempo = controller.filial.get().tempo;

            if (biblioteca.get("isAgenda") == true || controller.endereco.get() == null || controller.endereco.get().valor == null) {
                filial.valor_entrega = biblioteca.get('frete');
            }
            else {
                filial.valor_entrega = biblioteca.get('frete') + ' ' + controller.endereco.get().valor.toUpperCase();
            }

            filial.tipos_length = filial.tipos.length;
            filial.mesa = (controller.login.get() != null && (controller.login.get().perfil_id == 5));
            filial.caracteristicas = controller.layout.get().caracteristicas;
            events(filial, function (content) {

                $('.produtoli[caracteristicas]').show();
                $('.produtoli[caracteristicas]').each(function (index, item) {
                    if (controller.layout.get().length > 0) {
                        var add = false;
                        $(controller.layout.get().caracteristicas).each(function (ci1, c1) {
                            if ($(item).attr('caracteristicas') != "") {
                                $($(item).attr('caracteristicas').split(',')).each(function (ci2, c2) {
                                    if (c1.id == c2) {
                                        add = c1.selecionado;
                                    }
                                });
                            }
                        });
                        if (!add) {
                            $(item).hide();
                        }
                    }
                });
                $('[filtrar_caracteristica]').click(function () {
                    debugger;
                    var json = JSON.parse($(this).attr('filtrar_caracteristica'));
                    var layout = controller.layout.get();
                    $(layout.caracteristicas).each(function (index, item) {
                        if (item.id == json) {
                            item.selecionado = !item.selecionado;
                        }
                    });
                    controller.layout.set(layout);
                    $('.modal-overlay-visible').click();
                    myApp.mainView.refreshPage();
                });


                if (
                    filial_proxima['seg1'] == null && filial_proxima['seg2'] == null && filial_proxima['seg3'] == null && filial_proxima['seg4'] == null &&
                    filial_proxima['ter1'] == null && filial_proxima['ter2'] == null && filial_proxima['ter3'] == null && filial_proxima['ter4'] == null &&
                    filial_proxima['qua1'] == null && filial_proxima['qua2'] == null && filial_proxima['qua3'] == null && filial_proxima['qua4'] == null &&
                    filial_proxima['qui1'] == null && filial_proxima['qui2'] == null && filial_proxima['qui3'] == null && filial_proxima['qui4'] == null &&
                    filial_proxima['sex1'] == null && filial_proxima['sex2'] == null && filial_proxima['sex3'] == null && filial_proxima['sex4'] == null &&
                    filial_proxima['sab1'] == null && filial_proxima['sab2'] == null && filial_proxima['sab3'] == null && filial_proxima['sab4'] == null &&
                    filial_proxima['dom1'] == null && filial_proxima['dom2'] == null && filial_proxima['dom3'] == null && filial_proxima['dom4'] == null
                ) {
                    $('.navbartop').remove();
                }


                if (!filial.navbartop) {
                    $('.navbartop').hide();
                    $('.cardapio').click();
                }



                $('.produtoli:visible').click(function () {
                    creait.redirect($(this).attr('link'), 'id=' + $(this).attr('produto_id') + '&regiao=' + controller.busca.get().id);
                });

                if (controller.login.get() != null && (controller.login.get().perfil_id == 1 || controller.login.get().perfil_id == 4)) {
                    $('#whatsapp').click(function () {
                        myApp.prompt("Escolha a mensagem padrão", "Whatsapp",
                            function (message) {
                                creait.post('whatsapp', { message: message }, function () {
                                    var layout = controller.layout.get();
                                    layout.whatsapp_message = message;
                                    controller.layout.set(layout);
                                });
                            }, function () {
                            });
                        $('input.modal-text-input').val(controller.layout.get().whatsapp_message);
                    });
                    $('#whatsapp').removeAttr('href');
                    $('#whatsapp').removeAttr('target');
                }

                creait.loader(false);

                if (filial.place_id < 60000) {
                    $('.facebook_page').hide();
                }


                //if (controller.login.get() == null) {
                //$('.categoria_menu').hide();
                //    $('[data-page="categoria"]').removeClass('menu_open');
                //}
                //else {
                //$('[data-page="categoria"]').addClass('menu_open');
                //}

                //if (controller.login.get() == null) {
                //    $('.open-panel').hide();
                //}


                if (controller.carrinho.get() == null) {
                    $('.panel_carrinho').hide();
                    $('[data-page="categoria"]').removeClass('carrinho_open');
                }
                else {
                    $('[data-page="categoria"]').addClass('carrinho_open');
                }

                if (controller.login.get() == null || (controller.login.get().perfil_id != 1 && controller.login.get().perfil_id != 4)) {
                    $('#novo_tipo').hide();
                    $('.swipeout').removeClass('swipeout');
                    $('.swipeout-actions-right').remove();
                }

                $('[categoria_id]').click(function () {
                    if ($(this).closest('.swipeout-opened').length == 0) {
                        var control = this;
                        var categoria_id = parseInt($(control).attr('categoria_id'), 10);;
                        controller.produto.set($(controller.busca.get().tipos).filter(function (a, b) { return a.id == categoria_id; })[0]);
                        creait.redirect('produto', 'id=' + categoria_id);
                    }
                });

                var endereco = controller.endereco.get();

                if (endereco != null) {
                    if (endereco.retirada == null) {
                        $('#endereco').html(endereco.street + ', ' + endereco.number);
                    }
                    else {
                        $('#endereco').html(endereco.retirada);
                    }
                } else {
                    $('#endereco').html(biblioteca.get('entrega'));
                }
                if (controller.login.get() != null && controller.login.get().perfil_id == 3) {

                    $('.icologin').hide();
                    $('.link.open-panel.background-creait').removeClass('open-panel');
                    $('.icon-earth').hide();
                    $('.tempo_medio').html('<div style="padding-right:10px">' + controller.login.get().nome + '</div>');

                    $('.mesaid').html(controller.login.get().nome);

                    $('.conta').click(function () {
                        creait.redirect('mesa', 'id=' + controller.login.get().cpf);
                    });
                }
                else if (controller.login.get() != null && controller.login.get().perfil_id == 5) {


                    $('.mesaid').html(controller.cliente.get().nome);

                    $('.conta').click(function () {
                        creait.redirect('mesa', 'id=' + controller.cliente.get().cpf);
                    });
                }
                else if (filial.tempo == null || controller.layout.get().frete_produto == true) {
                    $('.tempo_medio').html('');
                }

                $('.endereco_link').click(function () {

                    if (controller.login.get() != null && controller.login.get().perfil_id == 3) {
                        creait.redirect('mesa', "id=" + controller.login.get().id);
                    }
                    else if (controller.layout.get().balcao || controller.busca.get().balcao) {
                        $('.link.open-panel').click();
                    }
                    else if (controller.layout.get().balcao && controller.layout.get().delivery) {
                        window.location = '/';
                    }
                    else if (controller.busca.get().delivery) {

                        creait.redirect('endereco');
                    }
                    else {
                        creait.redirect('endereco');
                    }
                });

                $('#linkFb').click(function () {
                    if (!inIframe()) {
                        window.open($('#linkFb').attr('linkFb'), '_blank');
                    } else {
                        var obj = {
                            linkFb: $('#linkFb').attr('linkFb')
                        };
                        parent.postMessage(JSON.stringify({ key: 'storage', data: obj }), '*');
                    }
                });

                setTimeout(function () {
                    creait.resize();
                }, 2000);
            });
        }




    }
}

controller.cliente = {
    init: function (events) {
        events({}, function (content) {


            $("#proximo").click(function () {

                debugger;
                var post = myApp.formToJSON("formconfir");

                $('[name="email"]').toggleInputError(post.email.replace(/ /g, '') == "", 'O email é obrigatório');
                $('[name="nome"]').toggleInputError(post.nome.replace(/ /g, '') == "", 'O nome é obrigatório');

                if (post.phone.replace(/ /g, '') == "" &&
                    post.cpf.replace(/ /g, '') == "") {
                    $('[name="phone"]').toggleInputError(post.phone.replace(/ /g, '') == "", 'O telefone é obrigatório');
                    $('[name="phone"]').toggleInputError(post.phone.replace(/ /g, '').length != 10 &&
                        post.phone.replace(/ /g, '').length != 11, 'Telefone inválido');
                }

                if ($('formconfir .has-error').length == 0) {
                    creait.post('confirmarcliente', post, function (data) {
                        controller.cliente.set(data);
                        if ($('#endereco_cliente').is(':visible')) {
                            creait.redirect("categoria");
                        }
                        else {
                            creait.redirect("endereco");
                        }
                    });
                }
            });

            $("#buscar").click(function () {
                if ($("#dados").val() == "" || $("#dados").val() == null) {
                    myApp.alert('Digite o Email, CPF ou Telefone do Cliente', 'Atenção!');
                }
                else {
                    creait.get('confirmarcliente?busca=' + $("#dados").val(), null, function (data) {

                        if (data != "0") {
                            //if ($("#dados").val().length == 14) {
                            //    $(".pessoaJ").css("display", "block");
                            //}
                            //else {
                            //    $(".pessoaJ").css("display", "none");
                            //}
                            debugger;

                            $('[name="id"]').val(data.id);
                            if (data.nome != null && data.nome.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #nome').val(data.nome);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #nome').attr('disabled', 'disabled');
                                }
                            }
                            if (data.email != null && data.email.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #email').val(data.email);

                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #email').attr('disabled', 'disabled');
                                }
                            }
                            if (data.cpf != null && data.cpf.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #cpf').val(data.cpf);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #cpf').attr('disabled', 'disabled');
                                }
                            }
                            if (data.rg != null && data.rg.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #rg').val(data.rg);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #rg').attr('disabled', 'disabled');
                                }
                            }
                            if (data.telefone != null && data.telefone.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #telefone').val(data.telefone);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #telefone').attr('disabled', 'disabled');
                                }
                            }
                            if (data.cnpj != null && data.cnpj.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #cnpj').val(data.cnpj);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #cnpj').attr('disabled', 'disabled');
                                }
                            }
                            if (data.razao_social != null && data.razao_social.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #razao_social').val(data.razao_social);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #razao_social').attr('disabled', 'disabled');
                                }
                            }

                            if (data.cnpj != null || data.cnpj != "" || data.razao_social != null || data.razao_social != "") {
                                $('[data-page="confirmarCliente"] #pj').click();
                            }
                            var endereco = {
                                adr_address: "",
                                cep: data.cep,
                                city: data.cidade,
                                country: data.pais,
                                delivery: true,
                                district: data.bairro,
                                formatted_address: "",
                                lat: data.lat,
                                lng: data.lng,
                                number: data.numero,
                                state: data.estado,
                                street: data.endereco,
                                valor: data.valor
                            }
                            if (endereco.street != "") {
                                $('#endereco_cliente').show();
                                $('#endereco_cliente').html(endereco.street + ", " + endereco.number + (endereco.bairro == null ? "" : " - " + endereco.bairro));
                                $('#endereco_cliente').unbind('click');
                                $('#endereco_cliente').click(function () {
                                    controller.cliente.set(data);
                                    creait.redirect("endereco");
                                });
                            }
                            else {

                                $('#endereco_cliente').hide();
                            }

                            controller.endereco.set(endereco);
                            debugger;
                            var filiais = controller.layout.get().filiais;
                            var filial_proxima = null;
                            $(filiais).each(function (a, b) {
                                if (data.filial_id == b.id) {
                                    filial_proxima = b;
                                }
                            });
                            controller.filial.set(filial_proxima);


                        } else {
                            $('[name="id"]').val('');
                            myApp.alert('Este usuário não possui cadastro', 'Atenção!');

                            $('[data-page="confirmarCliente"] #cpf').val("");
                            $('[data-page="confirmarCliente"] #telefone').val("");
                            $('[data-page="confirmarCliente"] #nome').val("");
                            $('[data-page="confirmarCliente"] #email').val("");
                            $('[data-page="confirmarCliente"] #rg').val("");
                            $('[data-page="confirmarCliente"] #cnpj').val("");
                            $('[data-page="confirmarCliente"] #razao_social').val("");
                            $('#endereco_cliente').hide();
                            $('#endereco_cliente').html('');
                            if ($('[data-page="confirmarCliente"] #dados').val().indexOf('@') != -1) {
                                $('[data-page="confirmarCliente"] #email').val($('[data-page="confirmarCliente"] #dados').val());
                            }
                            else if ($('[data-page="confirmarCliente"] #dados').val().indexOf(')') != -1) {
                                $('[data-page="confirmarCliente"] #telefone').val($('[data-page="confirmarCliente"] #dados').val());
                            }
                        }
                        $(".dadosCli").fadeIn(3000);
                        creait.loader(false);
                    });
                }
            });


            if (controller.cliente.get() != null) {
                $("#dados").val(controller.cliente.get().email);
                $("#buscar").click();
            }
        });
    },
    get: function () {
        if (window.localStorage["cliente"] == null)
            return null;
        return JSON.parse(window.localStorage["cliente"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cliente"] = data;
        else
            window.localStorage["cliente"] = JSON.stringify(data);
    }
}
controller.configuracao = {
    init: function (events) {

        events({}, function (content) {
            $.get('/api/configuracao', null, function (config) {

                $(config.theme).each(function (index, item) {

                    var paleta = $(paleta_html(item));
                    $(paleta).click(function () {

                        $("[name='primary_color']").val(item.primary_color);
                        $("[name='primary_font_color']").val(item.primary_font_color);
                        $("[name='secondary_color']").val(item.secondary_color);
                        $("[name='secondary_font_color']").val(item.secondary_font_color);
                        $("[name='textbox_color']").val(item.textbox_color);
                        $("[name='textbox_font_color']").val(item.textbox_font_color);
                        $("[name='border_color']").val(item.border_color);
                        $("[name='bg_color']").val(item.border_color);
                        $("[name='font_light_color']").val(item.border_color);
                        $("[name='light_color']").val(item.light_color);
                        $("[name='dark_color']").val(item.dark_color);
                        $("[name='font_color']").val(item.font_color);

                        theme(item);

                        $('.paleta_default').html(paleta.clone());

                        $$('.close-popup').click()

                        creait.post('configuracao', myApp.formToJSON("formconfiguracao"), function (data) {

                        });

                    });
                    $('.list_paletas').append(paleta);
                });
                $('.paleta_default').html(paleta_html(controller.layout.get()));

                function paleta_html(item) {

                    $("[name='primary_color']").val(item.primary_color);
                    $("[name='primary_font_color']").val(item.primary_font_color);
                    $("[name='secondary_color']").val(item.secondary_color);
                    $("[name='secondary_font_color']").val(item.secondary_font_color);
                    $("[name='textbox_color']").val(item.textbox_color);
                    $("[name='textbox_font_color']").val(item.textbox_font_color);
                    $("[name='light_color']").val(item.light_color);
                    $("[name='border_color']").val(item.border_color);
                    $("[name='font_light_color']").val(item.border_color);
                    $("[name='bg_color']").val(item.border_color);
                    $("[name='dark_color']").val(item.dark_color);
                    $("[name='font_color']").val(item.font_color);

                    return '    <div class="paleta">                                                                                                                        '
                        + '        <div style="border-bottom-left-radius: 10px; border-top-left-radius: 10px; background-color:' + item.primary_color + '">                  </div>'
                        + '        <div style="background-color:' + item.primary_font_color + '">                                                                                    </div>'
                        + '        <div style="background-color:' + item.secondary_color + '">                                                                                       </div>'
                        + '        <div style="background-color:' + item.secondary_font_color + '">                                                                                  </div>'
                        + '        <div style="background-color:' + item.textbox_color + '">                                                                                         </div>'
                        + '        <div style="background-color:' + item.textbox_font_color + '">                                                                                 </div>'
                        + '        <div style="background-color:' + item.border_color + '">                                                                                      </div>'
                        + '        <div style="background-color:' + item.bg_color + '">                                                                                      </div>'
                        + '        <div style="background-color:' + item.font_light_color + '">                                                                                    </div>'
                        + '        <div style="background-color:' + item.light_color + '">                                                                                           </div>'
                        + '        <div style="background-color:' + item.dark_color + '">                                                                                            </div>'
                        + '        <div style="border-bottom-right-radius: 10px; border-top-right-radius: 10px; background-color:' + item.font_color + '">                   </div>'
                        + '    </div><div style="clear:both"></div>                                                                                                                       ';
                }
            });

  
        });
    }
}


controller.confirmar = {
    init: function (events, query) {
        var endereco = controller.endereco.get();
        events(endereco, function (content) {
            if (endereco.cpf != null && endereco.cpf != '') {
                $('.iscpf').click()
            }
            $('#btn_complementoendereco').click(function () {

                $('#confirmar_complemento').toggleInputError(!$('#ckb_complemento').is(':checked') && $('#confirmar_complemento').val().trim() == '', 'Informe o complemento');
                if ($('#ckb_complemento').is(':checked')) {
                    $('formatte .has-error').removeClass('has-error');
                }
                if ($('formatte .has-error').length == 0) {
                    endereco.cpf = $('#confirmar_cpf input').val();
                    endereco.complement = $('#confirmar_complemento').val();
                    controller.endereco.set(endereco);
                    creait.redirect('confirmarPedido');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["enderecoprovisorio"] == null)
            return null;
        return JSON.parse(window.localStorage["enderecoprovisorio"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["enderecoprovisorio"] = data;
        else
            window.localStorage["enderecoprovisorio"] = JSON.stringify(data);
    }
}
controller.corfirmarEndereco = {
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
}

controller.corfirmarNumero = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["endereco"] == null)
            return null;
        return JSON.parse(window.localStorage["endereco"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["endereco"] = data;
        else
            window.localStorage["endereco"] = JSON.stringify(data);
    }
}

controller.confirmarPedido = {
    init: function (events) {

        var busca = controller.busca.get();
        busca.carrinho = controller.carrinho.get();
        busca.formaPagamento = controller.carrinho.change(busca.carrinho);
        busca.login = controller.login.get();
        var frete = controller.endereco.get().valor;
        if (frete == null || frete.indexOf('R$') == -1) {
            frete = 0;
        }
        else {
            frete = parseFloat(controller.endereco.get().valor.replace('R$', '').replace(',', '.'), 10);
        }
        busca.total = busca.carrinho.carrinho_total + frete;



        if (controller.endereco.get().valor == null) {
            busca.frete_valor = '';
        }
        else {
            busca.frete_valor = controller.endereco.get().valor;
        }

        var endereco = controller.endereco.get();

        var duracao = controller.carrinho.get().produtos.sort(function (a, b) { return (a.duracao == null ? 0 : a.duracao) - (b.duracao == null ? 0 : b.duracao) })[0].duracao;
        if (duracao == null) {
            duracao = 0;
        }
        busca.tempo = controller.filial.get().tempo;
        if (busca.tempo == null) {
            busca.tempo = 0;
        }
        busca.tempo = busca.tempo + duracao;
        if (busca.tempo != 0) {
            busca.tempo = busca.tempo + " à " + (busca.tempo + 15) + " minutos";
        }

        if (busca.correios && endereco != null) {

            var filial_frete = controller.busca.get();

            var lista_produtos_frete = [];

            for (var i = 0; i < busca.carrinho.produtos.length; i++) {

                if (busca.carrinho.produtos[i].quantidade == 1) {
                    lista_produtos_frete.push(busca.carrinho.produtos[i].id);
                } else {

                    for (var j = 0; j < busca.carrinho.produtos[i].quantidade; j++) {
                        lista_produtos_frete.push(busca.carrinho.produtos[i].id);
                    }
                }
            }


            var frete = {
                produtos: lista_produtos_frete,
                filial: filial_frete.id,
                CEP_destino: endereco.cep.replace('-', '')
            };

            creait.post('calculofrete', frete, function (data) {

                if (data.fretes.length > 0) {
                    busca.frete = data.fretes;
                    busca.total = busca.carrinho.carrinho_total + parseFloat(busca.frete[0].valor_total.replace(',', '.'));
                    busca.valor_frete = parseFloat(busca.frete[0].valor_total.replace(',', '.'));
                    busca.tipo_frete = busca.frete[0].codigo;
                }
                bind(busca);
            });

        } else {
            bind(busca);
        }
        function bind(busca) {
            debugger;
            creait.get('promocao', { id : controller.login.get().id }, function () {
                events(busca, function (content) {

                    if (!busca.correios || controller.endereco.get() == null || busca.fretes == null) {
                        $('#trocar_frete').hide();
                    }

                    $('#frete_selecionado').html($('.frete_li').html());
                    $('#frete_selecionado .arrow').removeClass().addClass('icon-pencil2');
                    var frete = null;

                    $("#label_pagamento").click(function () {
                        if (controller.pagamento.get().transacao == 4) {
                            creait.redirect("cartao");
                        }
                        else {
                            creait.redirect("pagamento");
                        }
                    });
                    if (controller.cliente.get() != null) {
                        $('.panel_cliente').show();
                        $('#label_cliente').html('<span class="icon-pencil2"></span>' + controller.cliente.get().nome);
                    }

                    $("#frete_selecionado").click(function () {
                        $(".frete_li").toggle(400);
                    });

                    $('.frete_li').click(function () {

                        $('#frete_selecionado').html($(this).html());
                        $('#frete_selecionado .arrow').removeClass().addClass('icon-pencil2');
                        frete = JSON.parse($(this).find('[data]').attr('data'));
                        $(".frete_li").toggle(400);

                        busca.total = busca.carrinho.carrinho_total + parseFloat(frete.valor_total.replace(',', '.'));
                        busca.valor_frete = parseFloat(frete.valor_total.replace(',', '.'));
                        busca.tipo_frete = frete.codigo;

                        $('#total_confirmarPedido').html(busca.total.formatMoney(2));
                    });

                    $("#trocar_endereco").click(function () {
                        if (controller.layout.get().balcao && controller.layout.get().delivery) {
                            window.location = '/';
                        }
                        else if (controller.busca.get().balcao) {
                            if (controller.layout.get().filiais.length != 1) {
                                creait.redirect("filial");
                            }
                        }
                        else {
                            creait.redirect("endereco", "to=confirmarPedido");
                        }
                    });

                    if (!biblioteca.get('pagamento_no_final', false)) {

                        var pagamento = controller.pagamento.get();
                        var usuario = controller.login.get();

                        if (pagamento.transacao == 1) {
                            $('#dinheiro').show();
                        }
                        if (pagamento.transacao == 4) {
                            $('#label_pagamento').html('<img style="float:right; height: 20px; margin-top: 8px;" src="icons/bandeiras/' + controller.cartao.get().bandeira + '.svg" /><span class="icon-pencil2"></span><span>' + pagamento.nome + '<br><span style="font-weight: bold; font- size: 11.8px;">' + controller.cartao.get().numero + '</span></span>');
                        }
                        else {
                            $('#label_pagamento').html('<span class="icon-pencil2"></span>' + pagamento.nome);
                        }
                        $('#pagamento').attr('pagamento_id', pagamento.pagamento_id);
                    }

                    var endereco = controller.endereco.get();
                    if (endereco.retirada == null) {
                        $('#label_endereco').html('<span class="icon-pencil2"></span>' + endereco.street + ', ' + endereco.number + (endereco.city == null ? '' : ' - ' + endereco.city));

                    }
                    else {
                        $('.titulo_endereco').html('<i class="icon-location"></i>Retirar na loja');
                        $('#label_endereco').html('<span class="icon-pencil2"></span>' + controller.filial.get().nome + ' - ' + controller.filial.get().endereco);
                    }




                    $("#rick").click(function () {
                        finalizar_compra();
                    });

                });
            });
        }
    }
}
controller.consulta = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?login_id=' + login.id, null, function (data) {
            debugger;
            pedido.compra = data;
            events(pedido, function (content) {
            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}


controller.endereco = {
    init: function (events, query) {

        var filial = controller.busca.get();

        $$.ajax({
            url: 'db_json/cidades.json', method: 'GET', dataType: 'json', success: function (data) {
                var estado = controller.filial.get() == null || controller.filial.get().estado == '' ? 'SP' : controller.filial.get().estado;
                var cidade = (controller.filial.get() == null || controller.filial.get().cidade == '' ? 'São Paulo' : controller.filial.get().cidade).toLocaleLowerCase().replace(/ /g, "").replace(/\./g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                $(data.estados).each(function (index, item) {

                    var option = $('<option' + (item.sigla == estado ? ' selected' : '') + '>' + item.sigla + '</option>');
                    option.data('cidades', item.cidades);
                    $('#sel_estado').append(option);
                });
                $('#sel_estado').change(function () {
                    $('#sel_cidade').html('');
                    var cidades = $(this).find('option:selected').data('cidades');
                    $(cidades).each(function (index, c) {
                        $('#sel_cidade').append('<option' + (c.toLocaleLowerCase().replace(/ /g, "").replace(/\./g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") == cidade ? ' selected' : '') + '>' + c + '</option>');
                    });
                });
                $('#sel_estado').change();
            }, error: function (a, b, c) {
            }
        });


        events({}, function (content) {

            if (biblioteca.get('endereco_table', true) == false) {
                $('#endereco_table').remove();
            }
            if (controller.layout.get().frete_produto == true) {
                //$('.endereco_mensagem').html('Qual o endereço da sua consulta?');
                $('#endereco_table').hide();
            }

            if (controller.busca.get() == null) {
                $('#voltar_endereco_edit').hide();
            }
            if (controller.login.get() != null && controller.login.get().perfil_id == 7) {
                $('#voltar_endereco_edit').show();
                if (controller.cliente.get() != null) {
                    $('.endereco_mensagem').html('<div>CLIENTE: ' + controller.cliente.get().nome + '</div>');
                }
            }

            if (controller.layout.get().place_id < 60000) {
                $('.facebook_page').hide();
            }


            if (window.gmap_async == null) {
                window.gmap_async = $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCIoBAvqfno0lFGhuzuuwqX0KmXRdr-10o&libraries=places&callback=maps_callback");
            }
            window.gmap_async.done(function () {

                //if (controller.endereco.get() != null && controller.endereco.get().lat != null) {
                //    bind(controller.endereco.get());
                //}

                var acService = new google.maps.places.AutocompleteService();
                var defaultBounds = null;
                if (controller.busca.get() != null) {
                    defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(controller.busca.get().lat, controller.busca.get().lng));
                }
                
                $('#btn_buscar').click(function () {

                    $('#busca_endereco').toggleInputError($('#busca_endereco').val().length != 8, 'CEP incorreto');

                    if (!$('#busca_endereco').hasClass('has-error')) {
                        procurar_endereco($('#busca_endereco').val(), 'geocode');


                        $('.has-error').removeClass('has-error');
                        $("#btn_att_edit").unbind('click');
                        $("#btn_att_edit").click(function () {

                            $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                            $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                            if ($('formatte .has-error').length == 0) {
                                procurar_endereco($('#sel_rua').val() + ', ' + $('#numeroPerfil').val() + ' - ' + $('#sel_cidade option:selected').html() + ', ' + $('#sel_estado option:selected').html(), 'address');
                            }
                        });
                    }
                });
                $('#digitarendereco').click(function () {

                    $('#endereco_table').hide();
                    $('#endereco_message').hide();
                    $('#btn_att_edit').show();
                    $('.digitar_cep').toggle(400);
                    $('.cep_escolhido').toggle(400);
                    $('[fixo_cep]').hide();
                    $('[digitar_cep]').show();


                    $('.has-error').removeClass('has-error');
                    $("#btn_att_edit").unbind('click');
                    $("#btn_att_edit").click(function () {

                        $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                        $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                        if ($('formatte .has-error').length == 0) {
                            procurar_endereco($('#sel_rua').val() + ', ' + $('#numeroPerfil').val() + ' - ' + $('#sel_cidade option:selected').html() + ', ' + $('#sel_estado option:selected').html(), 'address');
                        }
                    });
                })
                function procurar_endereco(busca, tipo) {
                    acService.getPlacePredictions({
                        input: busca,
                        types: [tipo],
                        bounds: defaultBounds,
                        componentRestrictions: { country: 'br' }
                    }, function (places, status) {

                        if (places == null || places.length < 1) {
                            myApp.alert('O endereço inforamado não foi encontrado', 'Oops');
                            return;
                        }
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            $('#list_enderecos').html('');

                            $(places).each(function (index, item) {

                                var service = new google.maps.places.PlacesService($('<div></div>')[0]);
                                service.getDetails({
                                    placeId: item.place_id
                                }, function (place, status) {

                                    var lat = place.geometry.location.lat();
                                    var lng = place.geometry.location.lng();

                                    var endereco = {
                                        cep: '',
                                        street: '',
                                        city: '',
                                        district: '',
                                        state: '',
                                        country: '',
                                        lat: lat.toString().replace('.', ','),
                                        lng: lng.toString().replace('.', ','),
                                        formatted_address: '',
                                        number: '',
                                        complement: '',
                                        delivery: true
                                    };

                                    $(place.address_components).each(function (index, item) {
                                        $(item.types).each(function (indext, itemt) {
                                            switch (itemt) {
                                                case "street_number":
                                                    endereco.number = item.long_name;
                                                    $('#numeroPerfil').val(endereco.number);
                                                    break;
                                                case "postal_code":
                                                    endereco.cep = item.long_name;
                                                    break;
                                                case "route":
                                                    endereco.street = item.long_name;
                                                    break;
                                                case "administrative_area_level_1":
                                                    endereco.state = item.short_name;
                                                    break;
                                                case "sublocality_level_1":
                                                    endereco.district = item.short_name;
                                                    break;
                                                case "administrative_area_level_2":
                                                    endereco.city = item.long_name;
                                                    break;
                                                case "country":
                                                    endereco.country = item.long_name;
                                                    break;

                                            }
                                        });
                                    });

                                    endereco.adr_address = place.adr_address;
                                    if (places.length == 1) {

                                        $('#endereco_table').show();
                                        bind(endereco);
                                        if (endereco.street != '') {
                                            if ($('.digitar_cep').is(':visible')) {
                                                $('[fixo_cep]').show();
                                                $('[digitar_cep]').hide()
                                                $('.cep_escolhido').show(400);
                                                $('.digitar_cep').hide(400);
                                            }
                                        }
                                        else {
                                            $('[fixo_cep]').hide();
                                            $('[digitar_cep]').show();
                                            $('.digitar_cep').hide(400);
                                            $('.cep_escolhido').show(400);
                                        }
                                    }
                                    else {
                                        var li = $('<li><i class="f7-icons fonte_cinza">angle-right</i>' + place.adr_address + '</li>');
                                        $('#list_enderecos').append(li);
                                        li.click(function () {
                                            endereco.number = $('#numeroPerfil').val();
                                            bind(endereco);
                                        });
                                    }
                                });
                            });
                            if (places.length > 1) {
                                $('.cep_escolhido').toggle(400);
                                $('#li_endereco').toggle(400);
                            }
                        }
                    });
                }
            });


            function bind(endereco) {
                $('#busca_endereco').val('');

                $('#numeroPerfil').val(endereco.number);
                $('#estado').val(endereco.state);
                $('#cidade').val(endereco.city);
                $('#complementoPerfil').val(endereco.complement);
                $('#rua').val(endereco.street);


                var filiais = controller.layout.get().filiais;
                var filial_proxima = null;
                $(filiais).each(function (a, b) {
                    if (filial_proxima == null) {
                        filial_proxima = b;
                    }
                    else {
                        var kmb = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), b.lat, b.lng);
                        var filial_proximakm = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), filial_proxima.lat, filial_proxima.lng);
                        if (filial_proximakm > kmb) {
                            filial_proxima = b;
                        }
                    }
                });
                
                debugger;
                function inside(point, vs) {
                    // ray-casting algorithm based on
                    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

                    var x = point[0], y = point[1];

                    var inside = false;
                    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                        var xi = vs[i][0], yi = vs[i][1];
                        var xj = vs[j][0], yj = vs[j][1];

                        var intersect = ((yi > y) != (yj > y))
                            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                        if (intersect) inside = !inside;
                    }

                    return inside;
                };

                if (controller.busca.get() == null || controller.busca.get().correios == false) {

                    $('#endereco_message').hide();
                    $('#btn_att_edit').show();
                    debugger;
                    var filial_proximakm = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), filial_proxima.lat, filial_proxima.lng);

                    $('#endereco_distancia').html(filial_proximakm.toFixed(2) + 'km')
                    $('#endereco_tempo').html(filial_proxima.tempo)
                    if (filial_proxima.tempo == null || filial_proxima.tempo == '')
                    {
                        $('#endereco_tempo').parent().remove();
                    }
                    var poligono_dentro = false;
                    if (filial_proxima.ceps != null) {
                        poligono_dentro = !inside([endereco.lat.replace(',', '.'), endereco.lng.replace(',', '.')], JSON.parse(filial_proxima.ceps));
                    }

                    if (poligono_dentro || filial_proxima.entrega_distancia_maxima > 0 && filial_proximakm > filial_proxima.entrega_distancia_maxima) {
                        $('#li_endereco').hide();
                        $('.cep_escolhido').show()
                        $('#endereco_message').show();
                        $('#btn_att_edit').hide();
                        $('#endereco_frete').html('Grátis')
                        $('#endereco_table').hide();
                        $('#endereco_message').html('Oops, não realizamos entregas para o endereço informado!');
                        return;
                    }
                    if (filial_proxima.entrega_distancia_maxima == 0) {
                        $('#endereco_frete').html(filial_proxima.entraga_valor_km.formatMoney(2));
                        endereco.valor = (filial_proxima.entraga_valor_km).formatMoney(2);
                    }
                    else {
                        $('#endereco_frete').html((filial_proxima.entraga_valor_km * filial_proximakm).formatMoney(2));
                        endereco.valor = (filial_proxima.entraga_valor_km * filial_proximakm).formatMoney(2);
}

                    if (endereco.valor == "" || filial_proximakm < filial_proxima.entrega_distancia_gratis) {
                        $('#endereco_frete').html('Grátis');
                        endereco.valor = 'Grátis';
                    }

                }
                else {
                    $('#endereco_table').hide();
                    $("#busca_endereco").attr("placeholder", "Informe seu CEP");
                    $("#busca_endereco").attr("type", "number");
                }

                $('.has-error').removeClass('has-error');
                $("#btn_att_edit").unbind('click');
                $("#btn_att_edit").click(function () {
                    if ($('[digitar_cep]').is(':visible')) {
                        $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                        endereco.street = $('#sel_rua').val();
                    }
                    $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                    if ($('formatte .has-error').length == 0) {
                        endereco.number = $('#numeroPerfil').val();
                        endereco.complement = $('#complementoPerfil').val();
                        endereco.delivery = true;
                        controller.endereco.set(endereco);

                        controller.filial.set(filial_proxima);

                        if (query.to == null) {
                            if (controller.endereco.get() == null) {
                                window.location = '/';
                            }
                            else if (controller.login.get() == null) {
                                creait.redirect("categoria");
                            }
                            else if (controller.pagamento.get() != null) {
                                if (controller.busca.get() != null && controller.busca.get().id == filial_proxima.id) {
                                    if (controller.pagamento.get().transacao == 4) {
                                        if (controller.cartao.get() == null) {
                                            creait.redirect("cartao");
                                        }
                                        else {
                                            creait.redirect("pagamento");
                                        }
                                    }
                                    else {
                                        creait.redirect("pagamento");
                                    }
                                }
                                else {
                                    creait.redirect("categoria");
                                }
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                        else {
                            creait.redirect(query.to);
                        }
                    }
                });

                if ($('#li_endereco').is(':visible') || $('.cep_escolhido').is(':visible')) {
                    $("#btn_att_edit").click();
                }
            }
            var perfil = controller.login.get();

            $('#activePerfil').val('true');

            $('#voltar_endereco_edit').click(function () {


                if (controller.login.get() != null && controller.login.get().perfil_id == 7) {
                    creait.redirect("cliente");
                }
                else {
                    if (query.to == null) {
                        if (controller.layout.get().delivery && controller.layout.get().balcao) {
                            window.location = '/';
                        }
                        else {
                            if (controller.pagamento.get() != null) {
                                creait.redirect("pagamento");
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                    }
                    else {
                        creait.redirect(query.to);
                    }
                }
            });

            setTimeout(function () {
                $('#cepPerfil').focus();
            }, 500);

        });
    },
    get: function () {
        if (window.localStorage["enderecoprovisorio"] == null)
            return null;
        return JSON.parse(window.localStorage["enderecoprovisorio"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["enderecoprovisorio"] = data;
        else
            window.localStorage["enderecoprovisorio"] = JSON.stringify(data);
    }
}

controller.entrar = {
    init: function (events) {
        events({}, function (content) {

            $("#fileqrcode").change(function () {
                var input = this;
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        qrcode.decode(e.target.result);
                        qrcode.callback = function (decodedDATA) {
                            $('[name="email"]').val(decodedDATA);
                            $('#btn_entrar_mesa').click();
                        };
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            });

            $('#btn_entrar_mesa').click(function () {

                creait.loader(true, 'BUSCANDO CARDÁPIO');
                creait.get('pessoas', myApp.formToJSON("form_entrar_mesa"), function (data) {
                    debugger;
                    myApp.closePanel();

                    creait.loader(false);
                    if (data == null || data.length == 0 || data.error != null) {

                        myApp.alert('Esta mesa não existe', 'Oops ...');
                        return;
                    }

                    myApp.closePanel();
                    controller.login.set(data[0]);
                    creait.redirect('categoria');
                });
            });

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
  

controller.filial = {
    init: function (events) {
        //controller.layout.get().caracteristicas.filter(function (a, b) { return produto.caracteristicas.filter(function (b, c) { return b.id == a.id; }).length > 0; });

        events(controller.layout.get(), function (content) {
            $('.redirecionar_categoria').click(function () {
                controller.filial.set(JSON.parse($(this).attr('data')));
                controller.endereco.set({ retirada: 'RETIRAR NA LOJA' });
                if (controller.login.get() != null) {
                    if (controller.login.get().perfil_id == 5 && controller.carrinho.get() != null) {
                        creait.redirect('confirmarPedido');
                    } else {
                        creait.redirect('categoria');
                    }

                } else {
                    creait.redirect('categoria');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["filial_id"] == null)
            return null;
        return JSON.parse(window.localStorage["filial_id"]);
    },
    set: function (data) {

        if (data == null)
            window.localStorage["filial_id"] = data;
        else
            window.localStorage["filial_id"] = JSON.stringify(data);
    }
}





controller.finalizar = {
    init: function (events) {
        var busca = controller.busca.get();
        busca.carrinho = controller.carrinho.get();
        events(busca, function (content) {
        });
    }
}

controller.horario = {
    init: function (events, query) {
        var perfil = controller.login.get();
        var lst = [];
        var horario_id = query.id;


        creait.get('acompanhamento?horario_id=' + horario_id, null, function (data) {
            debugger;
            data.tempolimite = new Date(data.horario1).addMinutes(data.duracao * 60) < new Date();
            controller.avaliacao.set(data);

            events(data, function (content) {


                if (data.compra.valor_frete != null) {
                    data.compra.total = data.compra.total + data.compra.valor_frete;
                }
                $('.total_acompanhamento').html((data.compra.total).formatMoney(2));
                
                var para = data.compra.comprador_id;
                if (controller.login.get().perfil_id == 2) {
                    para = data.pedido[0].produto.administrador_id;
                }

                $('.cancelar_horario').unbind('click');
                $('.cancelar_horario').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=4&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.avancar_horario').unbind('click');
                $('.avancar_horario').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=1&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.iniciar_atendimento').unbind('click');
                $('.iniciar_atendimento').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=2&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.finalizar_atendimento').unbind('click');
                $('.finalizar_atendimento').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=3&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                if (data.avaliacao == null) {
                    $('.avaliar_horario').unbind('click');
                    $('.avaliar_horario').click(function () {
                        creait.redirect('avaliacao', 'id=' + query.id);
                    });
                    $('.content_estrela').unbind('click');
                    $('.content_estrela').click(function () {
                        creait.redirect('avaliacao', 'id=' + query.id);
                    });
                }
                else {
                    $('.content_estrela').unbind('click');
                    $('.avaliar_horario div').html('Minha Avaliação &nbsp;&nbsp;');
                    for (var i = 0; i < data.avaliacao; i++) {
                        $('.avaliar_horario div').append('<i class="icon-star-full"></i>');
                    }
                }

                if (data.numero == null) {
                    $('#endereco').html('PRODUTO RETIRADO NA LOJA');
                    $('#pedido_entregue').closest('.col-33').hide();
                    var itens = $('.bg-acompanhamento .col-33');
                    itens.removeClass('col-33');
                    itens.addClass('col-50');
                    $(itens[1]).find('.label-acompanhamento').text('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('.iconecommerce-truck-4').addClass('iconecommerce-box');
                    $(itens[1]).find('.acompanhamento-line').hide();

                }
                else {
                    $('#endereco').html('<i class="flaticon-location-pin"></i>' + '  ' + data.endereco + (data.numero == null ? '' : ', ' + data.numero) + (data.complemento == null ? "" : ' - ' + data.complemento) + "" + ((data.compra.valor_frete == null || data.compra.valor_frete == 0) ? '' : " - " + biblioteca.get('frete') + ": " + (data.compra.valor_frete).formatMoney(2)));
                }
                if (data.agenda_id != null) {
                    $('.transportando').html('ATENDIMENTO');
                    $('.entregue').html('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('iconecommerce-truck-4').removeClass('glyph-icon').addClass('icon-user-check');
                    $('.iconecommerce-box').removeClass('iconecommerce-box').removeClass('glyph-icon').addClass('icon-aid-kit');
                }
            });

            $('.titulo_horario').html(data.hora_date + '<br><span style="font-size:12px;    letter-spacing: 2px;">DURAÇÃO ' + data.duracao + 'Hrs</span>');
        });
    }
}

controller.item = {
    init: function (events) {
        var login = controller.login.get();
        var ent = {
            semanas: [
                {
                    txt: "seg",
                    label: "Segunda Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "ter",
                    label: "Terça Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qua",
                    label: "Quarta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qui",
                    label: "Quinta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sex",
                    label: "Sexta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sab",
                    label: "Sabado",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "dom",
                    label: "Domingo",
                    inicio: "",
                    termino: ""
                },
            ]
        };

        creait.get('agenda?id=' + controller.login.get().id, {}, function (data) {
            $(ent.semanas).each(function (index, item) {
                item.inicio = data[item.txt + "_inicio"];
                item.termino = data[item.txt + "_fim"];
            });
            if (data != null) {
                ent.id = data.id;
            }

            events(ent, function (content) {
                $('#btn_calendario').click(function () {

                    var post = myApp.formToJSON("formcalendario");

                    $(ent.semanas).each(function (index, item) {
                        $('[name="' + item.txt + '_inicio"]').toggleInputError(post[item.txt + '_inicio'] > post[item.txt + '_fim'], 'O horário de inicio deve ser maior que o termino');

                        $('[name="' + item.txt + '_fim"]').toggleInputError((post[item.txt + '_inicio'] != "" && post[item.txt + '_fim'] == ""), 'Informe a data de termino');

                        $('[name="' + item.txt + '_inicio"]').toggleInputError((post[item.txt + '_inicio'] == "" && post[item.txt + '_fim'] != ""), 'Informe a data de inicio');

                    });

                    if ($('formcadastro .has-error').length == 0) {
                        creait.post('agenda', post, function (data) {
                        });
                    }
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}


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

                        if (data == null || data.length == 0 || data.error != null) {
                            creait.loader(false);
                            myApp.alert('Usuário ou senha inválido!', 'Oops ...');
                            return;
                        }
                        myApp.closePanel();
                        controller.cartao.set(null);

                        controller.login.set(data[0]);

                        if (controller.carrinho.get() != null) {
                            if (controller.endereco.get() == null) {
                                if (controller.layout.get().balcao && controller.layout.get().delivery) {
                                    creait.redirect('endereco');
                                }
                                else if (controller.busca.get().balcao) {
                                    creait.redirect('filial');
                                }
                                else {
                                    creait.redirect('endereco');
                                }
                            }
                            else {
                                if (controller.cartao.get() == null && controller.pagamento.get() != null && controller.pagamento.get().transacao == 4) {
                                    creait.redirect("cartao");
                                }
                                else if (controller.login.get().perfil_id == 5) {
                                    creait.redirect("pagamento");
                                }
                                else if (controller.login.get().perfil_id == 6) {
                                    creait.redirect("pagamento");
                                } else {
                                    creait.redirect("pagamento");
                                }
                            }
                        } else {
                            creait.redirect("categoria");
                        }
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
    },

}
controller.mesa = {
    init: function (events, query) {
        var perfil = controller.login.get();
        var lst = [];
        var id = query.id;

        if (controller.login.get() == null) {
            return "entrar";
        }
        if (id == null) {
            return 'categoria';
        }

        creait.get('mesa?mesa_id=' + id + '&filial_id=' + controller.filial.get().id, null, function (pessoa) {
            debugger;
            pessoa.tamanho = '180px';
            if (controller.login.get() != null && controller.login.get().perfil_id == 5) {
                pessoa.tamanho = '230px';
            }
            events(pessoa, function (content) {


                var total = pessoa.mesa.total;

                if (total > 0) {
                    $('#valor_parcial').text((total / pessoa.mesa.lugares).formatMoney(2));
                }
                else {
                    $('#valor_parcial').text('R$0,00');
                }

                $('.unidade').click(function () {
                    var control = $(this);
                    var pedido_id = JSON.parse(control.attr('pedido_id'));

                    myApp.modal({
                        title: "Qual o peso do produto?",
                        text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="tel" mask="money" inputmode="numeric" pattern="[0-9]*" placeholder="0,000" />',
                        buttons: [
                            {
                                text: 'Cancelar',
                                onClick: function () {
                                }
                            },
                            {
                                text: 'Continuar',
                                onClick: function () {
                                    var quantidade = parseFloat($('.modal_money').val().replace(',', '.'));
                                    debugger;
                                    if (isNaN(quantidade) || quantidade <= 0) {
                                        myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                            $('#unidade').click();
                                        });
                                    }
                                    else {
                                        creait.get('altec_pedido', { filial_id: controller.filial.get().id, id: pedido_id, quantidade: quantidade }, function () {
                                            //creait.loader(false);
                                            //control.parent().find('span').text(quantidade - 1);

                                            myApp.mainView.refreshPage();
                                        });
                                    }
                                }
                            }
                        ]
                    });
                    creait.bind_peso('.modal_money');
                    return;
                });

                $('#servico').click(function () {

                    isAdm('taxa', function () {
                        var controle = $(this);
                        myApp.modal({
                            title: "Qual o valor do serviço?",
                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="Porcentagem" />',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    onClick: function () {
                                    }
                                },
                                {
                                    text: 'Continuar',
                                    onClick: function () {
                                        var quantidade = parseInt($('.modal_money').val().replace(',', '.'));
                                        debugger;
                                        if (isNaN(quantidade) || quantidade <= 0) {
                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                $('#unidade').click();
                                            });
                                        }
                                        else {

                                            creait.get('mesa', { servico: quantidade, mesa_id: id }, function () {

                                                myApp.mainView.refreshPage();
                                            });
                                        }
                                    }
                                }
                            ]
                        });
                    });
                });

                function isAdm(tipo, callback) {
                    myApp.modal({
                        title: "DESBLOQUEAR",
                        text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="Senha" />',
                        buttons: [
                            {
                                text: 'Cancelar',
                                onClick: function () {
                                }
                            },
                            {
                                text: 'Continuar',
                                onClick: function () {
                                    creait.get('garcom', { filial_id: controller.filial.get().id, senha: $('.modal_money').val(), tipo: tipo }, function (result) {
                                        if (result == null) {
                                            myApp.alert("Senha inválida", "Atenção");
                                        }
                                        else {
                                            callback();
                                        }
                                        creait.loader(false);

                                    });
                                }
                            }
                        ]
                    });
                }
                $('#excluir_item').click(function () {

                    isAdm('excluir',function () {

                        var ids = '';
                        $('li.hover').each(function (index, item) {
                            ids += '|' + $(item).attr('produto_id');
                        });

                        creait.get('altec_pedido', { filial_id: controller.filial.get().id, ids: ids }, function () {
                            //creait.loader(false);
                            //control.parent().find('span').text(quantidade - 1);

                            myApp.mainView.refreshPage();
                        });
                    });
                });

                $('#desconto_item').click(function () {
                    var controle = $(this);
                    isAdm('desconto',function () {

                        var ids = '';
                        $('li.hover').each(function (index, item) {
                            ids += '|' + $(item).attr('produto_id');
                        });
                        
                        myApp.modal({
                            title: '',
                            text: 'Qual o tipo do desconto?',
                            buttons: [
                                {
                                    text: 'Valor',
                                    onClick: function () {


                                        myApp.modal({
                                            title: "Qual o valor do desconto?",
                                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="tel" mask="money" inputmode="numeric" pattern="[0-9]*" placeholder="R$0,00" />',
                                            buttons: [
                                                {
                                                    text: 'Cancelar',
                                                    onClick: function () {
                                                    }
                                                },
                                                {
                                                    text: 'Continuar',
                                                    onClick: function () {
                                                        var valor = parseFloat($('.modal_money').val().replace(',', '.'));
                                                        if (isNaN(valor)) {
                                                            valor = 0;
                                                        }
                                                        if (valor < 0) {
                                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                                $('#unidade').click();
                                                            });
                                                        }
                                                        else {

                                                            creait.get('altec_pedido', { filial_id: controller.filial.get().id, desconto: valor, ids: ids, porcentagem: false }, function () {
                                                                myApp.mainView.refreshPage();
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        });
                                        creait.bind_money('.modal_money');
                                    }
                                },
                                {
                                    text: 'Porcentagem',
                                    onClick: function () {
                                        myApp.modal({
                                            title: "Qual a porcentagem do desconto?",
                                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="Porcentagem" />',
                                            buttons: [
                                                {
                                                    text: 'Cancelar',
                                                    onClick: function () {
                                                    }
                                                },
                                                {
                                                    text: 'Continuar',
                                                    onClick: function () {
                                                        var valor = parseFloat($('.modal_money').val().replace(',', '.'));

                                                        if (isNaN(valor)) {
                                                            valor = 0;
                                                        }

                                                        if (valor < 0) {
                                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                                $('#unidade').click();
                                                            });
                                                        }
                                                        else {
                                                            creait.get('altec_pedido', { filial_id: controller.filial.get().id, desconto: valor, ids: ids, porcentagem:true }, function () {
                                                                myApp.mainView.refreshPage();
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        });

                                    }
                                }
                            ]
                        });
                    });
                });

                $('#transferir').click(function () {
                    var controle = $(this);
                    isAdm('transferencia', function () {

                        myApp.modal({
                            title: "Informe o local de transferencia",
                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="MESA" />',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    onClick: function () {
                                    }
                                },
                                {
                                    text: 'Continuar',
                                    onClick: function () {
                                        var quantidade = parseFloat($('.modal_money').val().replace(',', '.'));
                                        debugger;
                                        if (isNaN(quantidade) || quantidade <= 0) {
                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                $('#unidade').click();
                                            });
                                        }
                                        else {

                                            var ids = '';
                                            $('li.hover').each(function (index, item) {
                                                ids += '|' + $(item).attr('produto_id');
                                            });
                                            creait.get('mesa', { ids: ids, mesa_destino: quantidade, mesa_id: id }, function () {
                                                myApp.mainView.refreshPage();
                                            });
                                        }
                                    }
                                }
                            ]
                        });
                    });
                });

                $('#desconto').click(function () {
                    var controle = $(this);

                    isAdm('desconto', function () {
                        myApp.modal({
                            title: '',
                            text: 'Qual o tipo do desconto?',
                            buttons: [
                                {
                                    text: 'Valor',
                                    onClick: function () {


                                        myApp.modal({
                                            title: "Qual o valor do desconto?",
                                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="tel" mask="money" inputmode="numeric" pattern="[0-9]*" placeholder="R$0,00" />',
                                            buttons: [
                                                {
                                                    text: 'Cancelar',
                                                    onClick: function () {
                                                    }
                                                },
                                                {
                                                    text: 'Continuar',
                                                    onClick: function () {
                                                        var valor = parseFloat($('.modal_money').val().replace(',', '.'));
                                                        if (isNaN(valor)) {
                                                            valor = 0;
                                                        }
                                                        if (valor < 0) {
                                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                                $('#unidade').click();
                                                            });
                                                        }
                                                        else {

                                                            creait.get('mesa', { desconto: valor, mesa_id: id }, function () {
                                                                controle.find('span').text(valor == 0 ? 'R$0,00' : valor.formatMoney());
                                                                pessoa.mesa.total = pessoa.mesa.subtotal + (pessoa.mesa.subtotal * pessoa.mesa.servico / 100) - valor;
                                                                $('#total').find('span').text(pessoa.mesa.total == 0 ? 'R$0,00' : pessoa.mesa.total.formatMoney());
                                                                creait.loader(false);
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        });
                                        creait.bind_money('.modal_money');
                                    }
                                },
                                {
                                    text: 'Porcentagem',
                                    onClick: function () {
                                        myApp.modal({
                                            title: "Qual a porcentagem do desconto?",
                                            text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="Porcentagem" />',
                                            buttons: [
                                                {
                                                    text: 'Cancelar',
                                                    onClick: function () {
                                                    }
                                                },
                                                {
                                                    text: 'Continuar',
                                                    onClick: function () {
                                                        var valor = parseFloat($('.modal_money').val().replace(',', '.'));
                                                        if (isNaN(valor)) {
                                                            valor = 0;
                                                        }
                                                        if (valor < 0) {
                                                            myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                                                $('#unidade').click();
                                                            });
                                                        }
                                                        else {
                                                            creait.get('mesa', { desconto: valor, mesa_id: id }, function () {
                                                                controle.find('span').text(valor.formatMoney());
                                                                pessoa.mesa.total = pessoa.mesa.subtotal + (pessoa.mesa.subtotal * pessoa.mesa.servico / 100) - valor;
                                                                $('#total').find('span').text(pessoa.mesa.total == 0 ? 'R$0,00' : pessoa.mesa.total.formatMoney());
                                                                creait.loader(false);
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        });

                                    }
                                }
                            ]
                        });
                    });

                });
                $('.f7-icons.remover').click(function () {

                    var control = $(this);
                    var quantidade = parseInt(control.parent().find('span').text(), 10);
                    var pedido_id = JSON.parse(control.attr('pedido_id'));
                    isAdm('excluir', function () {

                        if (quantidade == 1) {
                            myApp.confirm('Deseja excluir este item?', '',
                                function () {
                                    remove(function () {
                                        control.closest('.produto_mesa').remove();
                                    });
                                });
                        }
                        else {
                            remove(function () {
                            });
                        }
                        function remove(callback) {
                            creait.get('altec_pedido', { filial_id: controller.filial.get().id, id: pedido_id, somar: false }, function () {
                                //creait.loader(false);
                                //control.parent().find('span').text(quantidade - 1);

                                myApp.mainView.refreshPage();
                            });
                        }
                    });
                });

                $('.f7-icons.adicionar').click(function () {
                    var control = $(this);
                    var quantidade = parseInt(control.parent().find('span').text(), 10);
                    var pedido_id = JSON.parse(control.attr('pedido_id'));

                    isAdm('excluir', function () {
                        
                        add(function () {
                        });

                        function add(callback) {
                            creait.get('altec_pedido', { filial_id: controller.filial.get().id, id: pedido_id, somar: true }, function () {
                                //creait.loader(false);
                                //control.parent().find('span').text(quantidade - 1);

                                myApp.mainView.refreshPage();
                            });
                        }
                    });
                });

                $('[complemento]').click(function () {
                    if (controller.login.get().perfil_id == 3) { return false; }

                    var controle = $(this);
                    var complemento = JSON.parse(controle.attr('complemento'));
                    myApp.confirm('Deseja excluir este item?', complemento.nome,
                        function () {
                            creait.get('altec_complemento', { filial_id: controller.filial.get().id, id: complemento.id }, function () {
                                controle.remove();
                                creait.loader(false);
                            });
                        });
                });

                $('#qtd_pessoas').click(function () {

                    myApp.modal({
                        title: "Qual o numero de pessoas?",
                        text: '<input class="modal_money" style=padding:10px;color:var(--textbox-font-color);border-radius:2px;background-color:var(--textbox-color);border:0px;text-align:center;" type="number"  inputmode="numeric" pattern="[0-9]*" placeholder="Quantidade" />',
                        buttons: [
                            {
                                text: 'Cancelar',
                                onClick: function () {
                                }
                            },
                            {
                                text: 'Continuar',
                                onClick: function () {
                                    var quantidade = parseFloat($('.modal_money').val().replace(',', '.'));
                                    debugger;
                                    if (isNaN(quantidade) || quantidade <= 0) {
                                        myApp.alert('Informe um valor válido!', 'ATENÇÃO', function () {
                                            $('#unidade').click();
                                        });
                                    }
                                    else {


                                        creait.get('mesa', { lugares: quantidade, mesa_id: id }, function () {
                                            creait.loader(false);
                                            $('#qtd_pessoas').find('div').text(quantidade + ' PESSOA(S)');
                                            if (total > 0) {
                                                $('#valor_parcial').text((total / parseInt(quantidade)).formatMoney(2));
                                            }
                                            else {
                                                $('#valor_parcial').text('R$0,00');
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    });


                });


                if (pessoa.mesa.produtos.length == 0) {
                    $('#fechar_conta').html('MESA ABERTA');
                    $('#pedirmais').css('width', '100%');
                    $('#fechar_conta').hide();
                    $('#fechar_conta_notificar').hide();
                    $('#pedido').html(pessoa.mesa.nome + ' <div style="font-size:10px; ">ABERTA</div>');
                }
                else {

                    $('#pedido').html(pessoa.mesa.nome + ' <div style="font-size:10px; ">TEMPO ' + calcular_tempo(pessoa.mesa.abertura) + '</div>');

                    for (var i = 0; i < 99999; i++)
                        window.clearInterval(i);

                    setInterval(function () {
                        $('#pedido').html(pessoa.mesa.nome + ' <div style="font-size:10px;">TEMPO ' + calcular_tempo(pessoa.mesa.abertura) + '</div>');
                    }, 1000);


                    $('#fechar_conta').click(function () {
                        isAdm('reabrir', function () {
                            var ent = {
                                comprador_id: id,
                                vendedor_id: controller.login.get().id,
                                filial_id: controller.filial.get().id,
                                status_mesa: pessoa.mesa.status
                            };
                            creait.post('fechar', ent, function (result) {
                                creait.redirect('mesas');
                            });
                        });
                    });
                    $('#abrir_conta').click(function () {
                        var ent = {
                            comprador_id: id,
                            vendedor_id: controller.login.get().id,
                            filial_id: controller.filial.get().id,
                            status_mesa: pessoa.mesa.status
                        };
                        creait.post('fechar', ent, function (result) {
                            creait.redirect('mesas');
                        });
                    });
                }

                if (controller.login.get() != null && controller.login.get().perfil_id == 3) {
                    $('.mesa_voltar').hide();
                }


                $('#pedirmais').click(function () {
                    if (controller.login.get().perfil_id == 5) {
                        controller.cliente.set({ id: pessoa.mesa.id, nome: pessoa.mesa.nome, cpf: id });
                    }
                    else if (controller.login.get().perfil_id == 3) {
                        controller.carrinho.set(null);
                        //controller.login.set({ id: pessoa.id, nome: pessoa.mesa.nome, cpf: pessoa.mesa.id, email: pessoa.mesa.id, filial_id: 3, ativo: pessoa.ativo, active: pessoa.active, perfil_id: pessoa.perfil_id, place_id: pessoa.place_id });
                    }
                    creait.redirect('categoria');
                });


                if (pessoa.mesa.status == 'L') {
                    $('#qtd_pessoas').click();
                }
            });
        });
    }
}
controller.mesas = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?vendedor_id=' + login.id + '&filial_id=' + controller.filial.get().id, null, function (data) {
            debugger;
            pedido.mesas = data;

            if (data.erro != null) {
                pedido.mesas = [];
            } 
            events(pedido, function (content) {
                $('.legenda').click(function () {
                    var control = $(this);
                    debugger;
                    control.toggleClass('selecionada');
                    $('li[status]').hide();
                    $('.legenda.selecionada').each(function () {
                        $('li[status="' + $(this).attr('status') + '"]').show();
                    });
                });
                $('.tempo_mesas').each(function (index, item) {
                    function loop() {
                        var tempo = calcular_tempo($(item).attr('data'));
                        if (tempo == null) {
                            tempo = "LIBERADA";
                        }
                        else {
                            tempo = 'TEMPO ' + tempo;
                        }
                        $(item).html(tempo);
                    }
                    loop();
                    setInterval(function () {
                        loop();
                    }, 1000);
                });


            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}


controller.montagem = {
    init: function (events, query) {


        adicionar_produto_memoria(query);
        var adicionar_value = controller.adicionar.get();
        if (adicionar_value == null) {
            events({}, function (content) {
                setTimeout(function () {
                    creait.redirect('categoria');
                }, 1000);
            });
        }
        else {

            events(adicionar_value, function (content) {

                $('[name="rdb_complementos"]').change(function () {
                    var product_id = parseInt(this.value, 10);
                    if ($(this).is(':checked')) {
                        $(this.parentNode.parentNode).addClass('active');
                        controller.montagem.adicionar(product_id, true);
                    }
                    else {
                        $(this.parentNode.parentNode).removeClass('active');
                        controller.montagem.adicionar(product_id, false);
                    }
                });

                creait.resize();
                setTimeout(function () {
                    creait.resize();
                }, 1000);
            });
        }

        if ($('[step="1"]').length > 0) {
            $('#lbl_proximo').html($('[step="1"]').attr('montagem_nome'));
            $('#lbl_proximo').html('Próximo');
        }
        $('#complemento_nome').html($('[montagem_nome]:visible').attr('montagem_nome'));
        if (adicionar_value.montagem[0].max > 1) {
            $('#complemento_nome').append('<div class="selecione">Seleciona até ' + adicionar_value.montagem[0].max + ' itens</div>');
        }

        $('#voltar').unbind('click');
        $('#voltar').click(function () {
            var step = parseInt($('.tab.active').attr('step'), 10);
            var adicionar_value = controller.adicionar.get();

            if (step > 0) {
                $(adicionar_value.montagem[step - 1].complemento).each(function (index, item) {
                    item.selecionado = false;
                });
                controller.adicionar.set(adicionar_value);
                $('#tab' + (step - 1)).find('[name="rdb_complementos"]').removeAttr('checked');

                myApp.showTab('#tab' + (step - 1));
                $('#complemento_nome').html($('[step="' + (step - 1) + '"]').attr('montagem_nome'));
                $('#lbl_proximo').html($('[step="' + (step) + '"]').attr('montagem_nome'));
                $('#lbl_proximo').html('Próximo');

                $('#tab' + (step - 1) + ' .produtoli.active').removeClass('active');

                if (adicionar_value.montagem[(step - 1)].max > 1) {
                    $('#complemento_nome').append('<div class="selecione">Seleciona até ' + adicionar_value.montagem[(step - 1)].max + ' itens</div>');
                }
            }
            else {
                creait.redirect('produto');
            }
        });
        if (adicionar_value.montagem[0].max == 1) {
            $('#tab0 .toolbar').hide();
        }
        myApp.showTab('#tab0');

        $('#avancar').unbind('click');
        $('#avancar').click(function () {
            var adicionar_value = controller.adicionar.get();
            var step = parseInt($('.tab.active').attr('step'), 10);




            if (adicionar_value.montagem[step].min > adicionar_value.montagem[step]
                .complemento.filter(function (a, b) {
                    return a.selecionado == true
                }).length) {
                myApp.alert('Selecione no minimo ' + adicionar_value.montagem[step].min + ' item.', 'ATENÇÃO');
            }
            else {
                if ($('.tab')[step + 1] != null) {

                    $('#complemento_nome').html($('[step="' + (step + 1) + '"]').attr('montagem_nome'));
                    debugger;
                    if ($('[step="' + (step + 2) + '"]').length != 0) {
                        $('#lbl_proximo').html($('[step="' + (step + 2) + '"]').attr('montagem_nome'));
                        $('#lbl_proximo').html('Próximo');
                    }
                    else {
                        $('#lbl_proximo').html('Finalizar');
                    }

                    myApp.showTab('#tab' + (step + 1));

                    if (adicionar_value.montagem[(step + 1)].max > 1) {
                        $('#complemento_nome').append('<div class="selecione">Seleciona até ' + adicionar_value.montagem[(step + 1)].max + ' itens</div>');
                    }
                }
                else {
                    controller.montagem.finalizar(adicionar_value);
                }
            }

            creait.resize();
        });
        creait.resize();
    },
    adicionar: function (product_id, add) {
        var adicionar_value = controller.adicionar.get();
        var step = parseInt($('.tab.active').attr('step'), 10);
        var complemento = adicionar_value.montagem[step]
            .complemento.filter(function (a, b) {
                return a.product_id == product_id
            })[0];
        complemento.selecionado = add;

        if (adicionar_value.montagem[step].max == adicionar_value.montagem[step]
            .complemento.filter(function (a, b) {
                return a.selecionado == true
            }).length) {
            $('#complemento_nome').html($('[step="' + (step + 1) + '"]').attr('montagem_nome'));

            if ($('[step="' + (step + 1) + '"]').length > 1) {
                $('#lbl_proximo').html($('[step="' + (step + 2) + '"]').attr('montagem_nome'));
                $('#lbl_proximo').html('Próximo');
            }
            else {
                $('#lbl_proximo').html('Finalizar');
            }
            if ($('.tab')[step + 1] == null) {
                controller.montagem.finalizar(adicionar_value);
            }
            else {

                if (adicionar_value.montagem[(step + 1)].max == 1) {
                    $('#tab' + (step + 1) + ' .toolbar').hide();
                }
                controller.adicionar.set(adicionar_value);
                myApp.showTab('#tab' + (step + 1));

                if (adicionar_value.montagem[(step + 1)].max > 1) {
                    $('#complemento_nome').append('<div class="selecione">Seleciona até ' + adicionar_value.montagem[(step + 1)].max + ' itens</div>');
                }
            }

            $('#complemento_nome').html($('[complemento_nome]:visible').attr('complemento_nome'));
        }
        else {
            controller.adicionar.set(adicionar_value);
        }

        creait.resize();
    },
    finalizar: function (adicionar_value) {
        adicionar_value.agrupamento = '';
        adicionar_value.agrupamentoid = '';
        adicionar_value.imagens = [];
        adicionar_value.montagens = [];

        var complemento_qtd = 0;

        debugger;
        $(adicionar_value.montagem).each(function (i, montagem) {
            debugger;
            var local_montagem = {
                montagem_id: montagem.id,
                preco: montagem.preco,
                produtos: []
            };
            $(montagem.complemento).each(function (a, complemento) {
                if (complemento.selecionado == true) {
                    if (adicionar_value.preco == null) {
                        adicionar_value.preco = 0;
                    }
                    adicionar_value.preco += complemento.preco_montagem_desconto;
                    if (adicionar_value.agrupamento == null) {
                        adicionar_value.agrupamento = '';
                        adicionar_value.agrupamentoid = '';
                    }
                    complemento_qtd = complemento_qtd + 1;
                    adicionar_value.agrupamento += ' + ' + complemento.nome;
                    adicionar_value.agrupamentoid += complemento.id + ',';
                    adicionar_value.imagens.push({
                        icone: (complemento.icone == "" ? null : complemento.icone)
                    });
                    adicionar_value.redirect_adicionar = 'montagem';

                    debugger;
                    local_montagem.produtos.push({ preco: complemento.preco_montagem_desconto, produto_id: complemento.product_id, external_id: complemento.external_id, nome: complemento.nome, nome: complemento.nome });
                }
                complemento.selecionado = false;
            });

            if (local_montagem.produtos.length > 0) {
                adicionar_value.montagens.push(local_montagem);
            }
        });

        //if (complemento_qtd != 2) {
        //adicionar_value.imagens = [];
        //adicionar_value.imagens.push(
        //    {
        //        icone: (complemento.icone == "" ? null : complemento.icone)
        //    });
        //}
        controller.adicionar.set(adicionar_value);
        creait.redirect('adicionar');

        creait.resize();

    },
    value: []
}


controller.pagamento = {
    init: function (events) {

        var busca = controller.busca.get();
        if (controller.busca.get().grupo_do_pagamento.length == 1 && controller.busca.get().grupo_do_pagamento[0].pagamento.length == 1) {
            var pagamento = { pagamento_id: busca.grupo_do_pagamento[0].pagamento[0].id, nome: busca.grupo_do_pagamento[0].pagamento[0].nome, external_id: busca.grupo_do_pagamento[0].pagamento[0].external_id, transacao: busca.grupo_do_pagamento[0].pagamento[0].transacao };
            controller.pagamento.set(pagamento);

            if (controller.login.get() == null) {
                creait.redirect("cadastro");
                return "cadastro";
            }
            else {
                if (controller.filial.get() != null && controller.endereco.get() == null) {
                    if (busca.delivery == true && busca.balcao == true) {
                        creait.redirect('/');
                    }
                    else if (busca.delivery == true) {
                        creait.redirect('endereco', 'to=pagamento');
                        return "endereco?to=pagamento";
                    }
                    else if (busca.balcao == true) {
                        creait.redirect('filial');
                        return "filial";
                    }

                }
                else {
                    if (pagamento.transacao == 4) {
                        if (controller.cartao.get() == null) {
                            creait.redirect("cartao");
                            return 'cartao';
                        }
                        else {
                            creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                            return controller.busca.get().balcao ? "confirmarPedido" : "confirmar";
                        }
                    }
                    else {
                        creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                        return controller.busca.get().balcao ? "confirmarPedido" : "confirmar";
                    }
                }
            }
        }
        if (biblioteca.get('pagamento_no_final', false)) {
            creait.redirect('confirmar');
            return 'confirmar';
        }
        busca.carrinho = controller.carrinho.get();
        controller.carrinho.change(busca.carrinho);
        events(busca, function (content) {
            $$("[pagamento_id]").click(function () {
                var controle = this;
                debugger;
                var pagamento = { pagamento_id: $(this).attr('pagamento_id'), nome: $(this).find('.fontextra').text(), external_id: $(controle).attr('external_id'), transacao: parseInt($(controle).attr('transacao'), 10) };
                controller.pagamento.set(pagamento);
                if (controller.login.get() == null) {
                    creait.redirect("cadastro");
                }
                else {
                    if (controller.filial.get() != null && controller.endereco.get() == null) {
                        if (busca.delivery == true && busca.balcao == true) {
                            creait.redirect('/');
                        }
                        else if (busca.delivery == true) {
                            creait.redirect('endereco', 'to=pagamento');
                        }
                        else if (busca.balcao == true) {
                            creait.redirect('filial');
                        }

                    }
                    else {
                        if (pagamento.transacao == 4) {
                            if (controller.cartao.get() == null) {
                                creait.redirect("cartao");
                            }
                            else {
                                creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                            }
                        }
                        else {
                            creait.redirect(controller.busca.get().balcao ? "confirmarPedido" : "confirmar");
                        }
                    }
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["pagamento"] == null)
            return null;
        return JSON.parse(window.localStorage["pagamento"]);
    },
    set: function (data) {
        window.localStorage["pagamento"] = JSON.stringify(data);
    }
}

controller.pedido = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?cliente_id=' + login.id, null, function (data) {

            pedido.compra = data;
            events(pedido, function (content) {
            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}


controller.perfil = {
    init: function (events) {
        events({}, function (content) {
            if (controller.login.get() != null) {
                $('#nomePerfil').val(controller.login.get().nome);
                $('#emailPerfil').val(controller.login.get().email);
                $('#telefonePerfil').val(controller.login.get().phone);
                $('#enderecoPerfil').val(controller.login.get().endereco);
                $('#numeroPerfil').val(controller.login.get().numero);
                $('#complementoPerfil').val(controller.login.get().complemento);
                $('#idPerfil').val(controller.login.get().id);

            }

            $$("#btn_att").click(function () {
                creait.post('pessoas', myApp.formToJSON("formatt"), function (data) {

                    controller.login.set(data);
                    alert('atualizado com sucesso')
                });
            });

        });
    }
}


controller.premium = {
    init: function (events, query) {

        creait.get('assinar', {}, function (data) {



            var cartao = {};
            cartao.cartao = data;
            cartao.url = controller.layout.get().url;

            events(cartao, function (content) {
                creait.loader(false);

                var cardtype = null;

                Payment.formatCardExpiry(document.querySelector('#expiracao_input'));
                Payment.formatCardCVC(document.querySelector('#cvv'));
                Payment.formatCardNumber(document.querySelector('#cardnumber_input'));

                $$('#cardnumber_input').keyup(function () {
                    var card = $(this).val();
                    cardtype = Payment.fns.cardType(card);
                    $('[name="bandeira"]').val(cardtype);
                    $('#brand').attr('src', 'icons/bandeiras/' + cardtype + '.svg');
                    $('#brand').css('display', 'block');
                });

                $$("#btn_savar_cartao").click(function () {


                    $('#cardnumber_input').toggleInputError(!Payment.fns.validateCardNumber($('#cardnumber_input').val()), 'Cartão esta inválido');
                    $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Nome obrigatório');

                    $('#expiracao_input').toggleInputError(!($('#expiracao_input').val().split('/').length == 2 && Payment.fns.validateCardExpiry($('#expiracao_input').val().split('/')[0], $('#expiracao_input').val().split('/')[1])), 'Data inválida');
                    $('#cvv').toggleInputError(!Payment.fns.validateCardCVC($('#cvv').val()), 'CCV Inváligo');
                    $('#documento').toggleInputError($('#documento').val() == '', 'CPF ou CNPJ inválido');

                    var json = myApp.formToJSON("formcartao");

                    if ($('formcartao .has-error').length == 0) {
                        if ($('input[type=checkbox]').is(':checked')) {
                            creait.loader(true, 'Estamos processando o pagamento');

                            creait.post('assinar', json, function (data) {

                                creait.loader(false);
                                if (data.id == "authorized") {
                                    data.cvv = null;
                                    localStorage.removeItem("filial_id");
                                    localStorage.removeItem("filiais");
                                    localStorage.removeItem("carrinho");
                                    localStorage.removeItem("adicionar");
                                    creait.redirect("bemvindo");
                                    setTimeout(function () {
                                        localStorage.removeItem("layout");
                                    }, 1000);
                                }
                                else {
                                    myApp.alert('Oops, ocorreu um erro', data.mensagem);
                                }
                            });
                        }
                        else {
                            myApp.alert('Você precisa aceitar os termos de uso para continuar', 'Atenção');
                        }
                    }

                });
            });
        });
    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}


controller.produto = {
    init: function (events, query) {

        if (controller.busca.get() == null) {
            window.location = '/';
            return null;
        }

        if (query.id != null) {
            controller.produto.set($(controller.busca.get().tipos).filter(function (a, b) {
                return b.id == query.id;
            })[0]);
        }
        if (controller.produto.get() != null) {
            var produto = controller.produto.get();
            controller.carrinho.change(produto);

            events(produto, function (content) {

                if (controller.login.get() != null && controller.login.get().perfil_id == 3) {
                    $('.icologin').hide();
                    $('.link.icon-only.open-panel').hide();
                }

                if (controller.carrinho.get() == null) {
                    $('.panel_carrinho').hide();
                    $('[data-page="produto"].page').removeClass('carrinho_open');
                }
                else {
                    $('[data-page="produto"].page').addClass('carrinho_open');
                }


                if (controller.login.get() == null || (controller.login.get().perfil_id != 1 && controller.login.get().perfil_id != 4)) {
                    $('#novo_produto').hide();
                    $('.swipeout').removeClass('swipeout');
                    $('.swipeout-actions-right').remove();
                }

                $('.produtoli:visible').click(function () {
                    creait.redirect($(this).attr('link'), 'id=' + $(this).attr('produto_id') + '&regiao=' + controller.busca.get().id);
                });

                if (controller.carrinho.get() == null) {
                    $('.panel_carrinho').hide();
                    $('[data-page="categoria"]').removeClass('panel_carrinho');
                }
                else {
                    $('[data-page="categoria"]').addClass('panel_carrinho');
                }

                creait.resize();
                setTimeout(function () {
                    creait.resize();
                }, 500);
                setTimeout(function () {
                    creait.resize();
                }, 1000);

                $('.produtoli[caracteristicas]').show();
                $('.produtoli[caracteristicas]').each(function (index, item) {
                    if (controller.layout.get().length > 0) {
                        var add = false;
                        $(controller.layout.get().caracteristicas).each(function (ci1, c1) {
                            if ($(item).attr('caracteristicas') != "") {
                                $($(item).attr('caracteristicas').split(',')).each(function (ci2, c2) {
                                    if (c1.id == c2) {
                                        add = c1.selecionado;
                                    }
                                });
                            }
                        });
                        if (!add) {
                            $(item).hide();
                        }
                    }
                });
            });
        }
        else {
            return 'categoria';
        }
    },
    get: function () {
        return controller.produto.memory;
    },
    set: function (data) {
        controller.produto.memory = data;
    },
    memory: null
}


controller.reservar = {
    init: function (events) {
        events({}, function (content) {

            $$("#btn_sign_up").click(function () {

                $('#nome_input').toggleInputError($('#nome_input').val() == '', 'Informe o seu nome');

                $('#email_input').toggleInputError($('#email_input').val() == '' || !creait.isEmail($('#email_input').val()), 'Email inválido');

                $('#telefone_input').toggleInputError($('#telefone_input').val() == '' || !creait.isPhone($('#telefone_input').val()), 'Informe o seu telefone');

                $('#password_input').toggleInputError($('#nome_input').val() == '' || $('#password_input').val().length < 6, 'A senha deve ter no minimo 6 caracteres');

                $('#password_confirmar_input').toggleInputError($('#password_input').val() != $('#password_confirmar_input').val(), 'A confirmação da senha esta errada');

                if ($('formcadastro .has-error').length == 0) {

                    creait.post('pessoas', myApp.formToJSON("formcadastro"), function (data) {

                        if (data.erro == null) {
                            controller.login.set(data)

                            if (controller.carrinho.get() != null) {
                                if (controller.endereco.get() == null) {
                                    if (controller.layout.get().balcao && controller.layout.get().delivery) {
                                        creait.redirect('endereco');
                                    }
                                    else if (controller.busca.get().balcao) {
                                        creait.redirect('filial');
                                    }
                                    else {
                                        creait.redirect('endereco');
                                    }
                                }
                                else {
                                    if (controller.cartao.get() == null && (controller.pagamento.get() != null && controller.pagamento.get().transacao == 4)) {
                                        creait.redirect("cartao");
                                    }
                                    else if (controller.login.get().perfil_id == 5) {
                                        creait.redirect("cliente");
                                    } else {
                                        creait.redirect("pagamento");
                                    }
                                }
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                        else {
                            myApp.alert(data.erro, "Atenção");
                        }
                    });
                }
            });
        });
    }
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
}




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
}




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






$(window).resize(function () {
    window.resizeTo(425, 660);
});



controller.senha = {
    init: function (events, query) {
        events({}, function (content) {
            $('#btn_alterarsenha').click(function () {
                if ($('#lembrar_senha').val() == $('#lembar_senha_confirmar').val() || $('#lembrar_senha').val() != "" && $('#lembar_senha_confirmar').val() != "") {
                    creait.post('lembrar?token=' + query.token + '&senha=' + $('#lembrar_senha').val(), null, function (data) {
                        creait.redirect('login');
                    });
                }
                else {
                    myApp.alert('A confirmação da senha está errada');
                }
            });
        });
    }
}
controller.servico = {
    init: function (events) {

        

        var login = controller.login.get();
        var ent = {
            produto: {},
            tipos: [],
            filiais: [],
            semanas: [
                {
                    txt: "seg",
                    label: "Segunda Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "ter",
                    label: "Terça Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qua",
                    label: "Quarta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qui",
                    label: "Quinta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sex",
                    label: "Sexta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sab",
                    label: "Sabado",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "dom",
                    label: "Domingo",
                    inicio: "",
                    termino: ""
                },
            ]
        };

        creait.get('produto?id=' + login.id, {}, function (result) {
            debugger;

            var clone = controller.login.get();
            clone.active = result.ativo;
            controller.login.set(clone);

            debugger;
            if (result.ativo == true) {

                var login = controller.login.get();
                login.active = true;
                controller.login.set(login);

                $(result.filiais).each(function (index, item) {
                    if (result.produto != null) {
                        $(result.produto.filial_produto).each(function (index1, item1) {
                            if (item.id == item1.filial_id) {
                                item.selected = 'selected';
                            }
                        });
                    }
                });
                $(result.caracteristicas).each(function (index, item) {
                    if (result.produto != null) {
                        $(result.produto.produto_caracteristica).each(function (index1, item1) {
                            if (item.id == item1.caracteristica_id) {
                                item.selected = 'selected';
                            }
                        });
                    }
                });
                if (result.produto == null) {
                    result.produto = {};
                    result.produto.nome = controller.login.get().nome;
                }
                else {
                    result.filial_produto_list = JSON.stringify(result.produto.filial_produto);
                    var login = controller.login.get();
                    login.produto_id = result.produto.id;
                    controller.login.set(login);
                }
                var agenda = result.produto.agenda;
                if (agenda == null) {
                    agenda = {};
                }
                $(ent.semanas).each(function (index, item) {
                    item.inicio = agenda[item.txt + "_inicio"];
                    item.termino = agenda[item.txt + "_fim"];
                });

                if (result.produto.observacao != null) {
                    var detalhamento = JSON.parse(result.produto.observacao);
                    ent.graduacao = detalhamento.graduacao;
                    ent.especialidade = detalhamento.especialidade;
                }
                if (result.produto.preco != null) {
                    ent.preco = (result.produto.preco).toString().replace('.', ',');
                }
                ent.caracteristicas = result.caracteristicas;
                ent.produto = result.produto;
                ent.tipos = result.tipos;
                ent.filiais = result.filiais;
            }


            events(ent, function (content) {

                if (result.ativo != true) {
                    $('.aguardando_liberacao').show();
                    $('formcalendario').remove();

                    //setTimeout(function () {
                    //    creait.loader(false);
                    //    myApp.mainView.refreshPage();
                    //}, 90000);
                }
                else {

                    $('[name="foto_produto"]')[0].addEventListener("change", function (e) {
                        readimg(e, function (img) {
                            $('[name="icone_itype"]').val(img);
                            $('.calendario_foto').html('');
                            $('.calendario_foto').css('background-image', 'url("' + img + '")');
                        });
                    }, false);

                    $('#btn_calendario').click(function () {
                        var post = creait.getForm("formcalendario");

                        post.periodo = $('[name="tipo_id"]').attr('periodo');

                        $('[name="nome"]').toggleInputError(post.nome == '', 'Informe seu nome');
                        $('[name="graduacao"]').toggleInputError(post.graduacao == '', 'Informe uma graduação');
                        $('[name="especialidade"]').toggleInputError(post.especialidade == '', 'Informe uma especialidade');
                        $('[name="tipo_id"]').toggleInputError(post.tipo_id == '', 'Informe um tipo de serviço');
                        $('[name="filiais_id"]').toggleInputError(post.filiais_id.length == 0, 'Informe o local de atendimento');
                        $('[name="caracteristicas_id"]').toggleInputError(post.caracteristicas_id.length == 0, 'Informe a caracteristica');
                        $('[name="preco"]').toggleInputError(post.preco == '', 'Informe o VALOR HORA do seu serviço');

                        $('#panel_185').toggleInputError($('.content_horario.active').length == 0, 'Selecione pelo menos um dia da semana');


                        $(ent.semanas).each(function (index, item) {
                            if ($('[name="agenda.' + item.txt + '_inicio"]').closest('.content_horario.active').length != 0) {
                                $('[name="agenda.' + item.txt + '_inicio"]').toggleInputError(post['agenda.' + item.txt + '_inicio'] > post['agenda.' + item.txt + '_fim'], 'O horário de inicio deve ser maior que o termino');
                                $('[name="agenda.' + item.txt + '_fim"]').toggleInputError((post['agenda.' + item.txt + '_fim'] == ""), 'Informe a data de termino');
                                $('[name="agenda.' + item.txt + '_inicio"]').toggleInputError((post['agenda.' + item.txt + '_inicio'] == ""), 'Informe a data de inicio');
                            }
                            else {
                                post['agenda.' + item.txt + '_inicio'] = null;
                                post['agenda.' + item.txt + '_fim'] = null;
                            }
                        });


                        if ($('[data-page="servico"] .has-error').length == 0) {

                            post.observacao = JSON.stringify({ graduacao: post.graduacao, especialidade: post.especialidade, minicurriculo: post.minicurriculo });
                            post.preco = post.preco.replace(/\./g, '').replace(/\,/g, '.');

                            creait.post('produto', post, function (data) {
                                var login = controller.login.get();
                                login.produto_id = data.id;
                                login.filial_id = (post.filiais_id.length == 0 ? null : post.filiais_id[0]);
                                controller.login.set(login);


                                $('[name="id"]').val(data.id);
                                $('[name="agenda.id"]').val(data.agenda.id);
                                //creait.redirect("produto", "id=" + data.id + '&regiao=' + login.filial_id);
                                creait.redirect("consulta");
                            });
                        }
                    });
                }
            });

        });
    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}

controller.trabalhar = {
    init: function (events) {

        creait.get('tipos', {}, function (result) {
            debugger;
            events({
                tipos: result
            }, function (content) {


                $$("#btn_trabalhar").click(function () {

                    var form = myApp.formToJSON("formtrabalhar");

                    $('[name="nome"]').toggleInputError(form.nome == '', 'Informe o seu nome');
                    $('[name="photo"]').toggleInputError(form.photo_itype == '', 'Obrigatório');
                    $('[name="comprovante"]').toggleInputError(form.comprovante_itype == '', 'Obrigatório');
                    $('[name="antecedentes"]').toggleInputError(form.antecedente_itype == '', 'Obrigatório');
                    $('[name="BankCode"]').toggleInputError(form.BankCode == '', 'Informe o seu banco');
                    $('[name="especialidade_id"]').toggleInputError(form.especialidade_id == '', 'Informe sua especialidade');

                    $('[name="rg_image"]').toggleInputError(form.rg_image_itype == '', 'Obrigatório');
                    $('[name="email"]').toggleInputError(form.email == '', 'Informe o seu email profissional');
                    $('[name="tel"]').toggleInputError(form.tel == '', 'Informe um telefone');
                    $('[name="birthday"]').toggleInputError(form.birthday == '', 'Informe a data de nascimento');
                    $('[name="cpf"]').toggleInputError(form.cpf == '', 'Informe o numero do seu cpf');
                    $('[name="rg"]').toggleInputError(form.rg == '', 'Informe o numero do seu rg');
                    $('[name="phone"]').toggleInputError(form.phone == '', 'Informe seu telefone');
                    $('[name="password"]').toggleInputError(form.password == '', 'Informe uma senha');

                    $('#aceite').toggleInputError($('#aceite:checked').length == 0, 'Para continuar você precisa aceitar os termos de uso');

                    debugger;

                    if ($('formtrabalhar .has-error').length == 0) {
                        form.comissao = 10;
                        creait.post('trabalhar', form, function (data) {

                            if (data.erro == null) {
                                controller.login.set(data)

                                if (controller.carrinho.get() != null) {
                                    if (controller.endereco.get() == null) {
                                        if (controller.layout.get().balcao && controller.layout.get().delivery) {
                                            creait.redirect('endereco');
                                        }
                                        else if (controller.busca.get().balcao) {
                                            creait.redirect('filial');
                                        }
                                        else {
                                            creait.redirect('endereco');
                                        }
                                    }
                                    else {
                                        if (controller.cartao.get() == null && (controller.pagamento.get() != null && controller.pagamento.get().transacao == 4)) {
                                            creait.redirect("cartao");
                                        }
                                        else if (controller.login.get().perfil_id == 5) {
                                            creait.redirect("cliente");
                                        } else {
                                            creait.redirect("pagamento");
                                        }
                                    }
                                } else {
                                    creait.redirect("categoria");
                                }
                            }
                            else {
                                myApp.alert(data.erro, "Atenção");
                            }
                        });
                    }
                });
            });
        });

    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }

}