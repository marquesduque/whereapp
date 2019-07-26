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