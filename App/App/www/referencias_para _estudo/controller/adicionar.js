
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