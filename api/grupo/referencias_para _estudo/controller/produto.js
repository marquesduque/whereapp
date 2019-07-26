
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
