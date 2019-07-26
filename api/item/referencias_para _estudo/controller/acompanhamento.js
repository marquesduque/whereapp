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
