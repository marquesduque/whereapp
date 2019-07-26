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