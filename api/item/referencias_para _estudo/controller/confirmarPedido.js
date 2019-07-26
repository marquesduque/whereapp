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