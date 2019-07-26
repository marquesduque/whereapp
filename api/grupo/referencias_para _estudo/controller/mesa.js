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