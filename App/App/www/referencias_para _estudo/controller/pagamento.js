

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
