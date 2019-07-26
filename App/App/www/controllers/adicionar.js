controller.adicionar = {
    init: function (events) {
        events(controller.adicionar.get(), function (content) {

            $('.menos_adicionar').click(function () {
                if ($("#qtde_adicionar").html() > 1) {
                    var adicionar = controller.adicionar.get();
                    var qtd = parseInt($("#qtde_adicionar").html()) - 1;
                    $("#qtde_adicionar").html(qtd);
                    adicionar.estoque = parseInt(adicionar.estoque) + 1;

                    controller.adicionar.set(adicionar);
                }
            });

            $('.mais_adicionar').click(function () {
                if ($("#qtde_adicionar").html() == controller.adicionar.get().estoque) {
                    myApp.alert("Quantidade maxima de produtos em estoque atingido", "...");
                }
                else {
                    var adicionar = controller.adicionar.get();
                    var qtd = parseInt($("#qtde_adicionar").html()) + 1;
                    $("#qtde_adicionar").html(qtd);
                    adicionar.estoque = parseInt(adicionar.estoque) - 1;

                    controller.adicionar.set(adicionar);
                }
            });

            $("#btn_adicionar").click(function () {
                var carrinho = controller.carrinho.get();
                var adicionar = controller.adicionar.get();

                if (adicionar.estoque == 0) {
                    myApp.alert("Este produto está fora de estoque.", "");
                }
                else {
                    adicionar.estoque = parseInt(adicionar.estoque) - parseInt($("#qtde_adicionar").html());
                    controller.adicionar.set(adicionar);

                    if (carrinho == null) {
                        var data = {
                            valor_total: parseFloat(controller.adicionar.get().valor) * parseFloat($("#qtde_adicionar").html()),
                            loja_id: controller.adicionar.get().responsavel_id,
                            endereco_bool: 0,
                            rua_entrega: "",
                            numero_entrega: "",
                            complemento_entrega: "",
                            bairro_entrega: "",
                            cep_entrega: "",
                            cidade_entrega: "",
                            estado_entrega: "",
                            itens: [{
                                id: controller.adicionar.get().id,
                                nome: controller.adicionar.get().nome,
                                qtde: parseInt($("#qtde_adicionar").html()),
                                descricao: controller.adicionar.get().descricao,
                                valor: controller.adicionar.get().valor
                            }]
                        };

                        data.valor_total = data.valor_total.toFixed(2);
                        controller.carrinho.set(data);

                        myApp.alert("Item adicionado com sucesso!", "...");
                    }
                    else {
                        carrinho.valor_total = (parseFloat(controller.adicionar.get().valor) * parseFloat($("#qtde_adicionar").html())) + parseFloat(carrinho.valor_total);
                        carrinho.valor_total = carrinho.valor_total.toFixed(2);

                        for (var i = 0; i <= carrinho.itens.length; i++) {
                            if (i == carrinho.itens.length) {
                                carrinho.itens.push({
                                    id: controller.adicionar.get().id,
                                    nome: controller.adicionar.get().nome,
                                    qtde: parseInt($("#qtde_adicionar").html()),
                                    descricao: controller.adicionar.get().descricao,
                                    valor: controller.adicionar.get().valor,
                                    foto: controller.adicionar.get().foto,
                                    foto_itype: controller.adicionar.get().foto_itype
                                });

                                break;
                            }
                            else if (carrinho.itens[i].id == controller.adicionar.get().id) {
                                var qtd = parseInt(carrinho.itens[i].qtde) + parseInt($("#qtde_adicionar").html());
                                carrinho.itens[i].qtde = qtd;

                                break;
                            }
                        }
                        controller.carrinho.set(carrinho);

                        myApp.alert("Item adicionado com sucesso!", "...");
                    }

                    $('#div_carrinho').css('display', 'block');

                    $('.views').addClass('carrinho');
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["adicionar"] == null)
            return null;
        return JSON.parse(window.localStorage["adicionar"]);
    },
    set: function (data) {
        window.localStorage["adicionar"] = JSON.stringify(data);
    }
};