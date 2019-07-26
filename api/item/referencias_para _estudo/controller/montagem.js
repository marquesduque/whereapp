
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