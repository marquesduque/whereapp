controller.servico = {
    init: function (events) {

        

        var login = controller.login.get();
        var ent = {
            produto: {},
            tipos: [],
            filiais: [],
            semanas: [
                {
                    txt: "seg",
                    label: "Segunda Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "ter",
                    label: "Terça Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qua",
                    label: "Quarta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "qui",
                    label: "Quinta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sex",
                    label: "Sexta Feira",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "sab",
                    label: "Sabado",
                    inicio: "",
                    termino: ""
                },
                {
                    txt: "dom",
                    label: "Domingo",
                    inicio: "",
                    termino: ""
                },
            ]
        };

        creait.get('produto?id=' + login.id, {}, function (result) {
            debugger;

            var clone = controller.login.get();
            clone.active = result.ativo;
            controller.login.set(clone);

            debugger;
            if (result.ativo == true) {

                var login = controller.login.get();
                login.active = true;
                controller.login.set(login);

                $(result.filiais).each(function (index, item) {
                    if (result.produto != null) {
                        $(result.produto.filial_produto).each(function (index1, item1) {
                            if (item.id == item1.filial_id) {
                                item.selected = 'selected';
                            }
                        });
                    }
                });
                $(result.caracteristicas).each(function (index, item) {
                    if (result.produto != null) {
                        $(result.produto.produto_caracteristica).each(function (index1, item1) {
                            if (item.id == item1.caracteristica_id) {
                                item.selected = 'selected';
                            }
                        });
                    }
                });
                if (result.produto == null) {
                    result.produto = {};
                    result.produto.nome = controller.login.get().nome;
                }
                else {
                    result.filial_produto_list = JSON.stringify(result.produto.filial_produto);
                    var login = controller.login.get();
                    login.produto_id = result.produto.id;
                    controller.login.set(login);
                }
                var agenda = result.produto.agenda;
                if (agenda == null) {
                    agenda = {};
                }
                $(ent.semanas).each(function (index, item) {
                    item.inicio = agenda[item.txt + "_inicio"];
                    item.termino = agenda[item.txt + "_fim"];
                });

                if (result.produto.observacao != null) {
                    var detalhamento = JSON.parse(result.produto.observacao);
                    ent.graduacao = detalhamento.graduacao;
                    ent.especialidade = detalhamento.especialidade;
                }
                if (result.produto.preco != null) {
                    ent.preco = (result.produto.preco).toString().replace('.', ',');
                }
                ent.caracteristicas = result.caracteristicas;
                ent.produto = result.produto;
                ent.tipos = result.tipos;
                ent.filiais = result.filiais;
            }


            events(ent, function (content) {

                if (result.ativo != true) {
                    $('.aguardando_liberacao').show();
                    $('formcalendario').remove();

                    //setTimeout(function () {
                    //    creait.loader(false);
                    //    myApp.mainView.refreshPage();
                    //}, 90000);
                }
                else {

                    $('[name="foto_produto"]')[0].addEventListener("change", function (e) {
                        readimg(e, function (img) {
                            $('[name="icone_itype"]').val(img);
                            $('.calendario_foto').html('');
                            $('.calendario_foto').css('background-image', 'url("' + img + '")');
                        });
                    }, false);

                    $('#btn_calendario').click(function () {
                        var post = creait.getForm("formcalendario");

                        post.periodo = $('[name="tipo_id"]').attr('periodo');

                        $('[name="nome"]').toggleInputError(post.nome == '', 'Informe seu nome');
                        $('[name="graduacao"]').toggleInputError(post.graduacao == '', 'Informe uma graduação');
                        $('[name="especialidade"]').toggleInputError(post.especialidade == '', 'Informe uma especialidade');
                        $('[name="tipo_id"]').toggleInputError(post.tipo_id == '', 'Informe um tipo de serviço');
                        $('[name="filiais_id"]').toggleInputError(post.filiais_id.length == 0, 'Informe o local de atendimento');
                        $('[name="caracteristicas_id"]').toggleInputError(post.caracteristicas_id.length == 0, 'Informe a caracteristica');
                        $('[name="preco"]').toggleInputError(post.preco == '', 'Informe o VALOR HORA do seu serviço');

                        $('#panel_185').toggleInputError($('.content_horario.active').length == 0, 'Selecione pelo menos um dia da semana');


                        $(ent.semanas).each(function (index, item) {
                            if ($('[name="agenda.' + item.txt + '_inicio"]').closest('.content_horario.active').length != 0) {
                                $('[name="agenda.' + item.txt + '_inicio"]').toggleInputError(post['agenda.' + item.txt + '_inicio'] > post['agenda.' + item.txt + '_fim'], 'O horário de inicio deve ser maior que o termino');
                                $('[name="agenda.' + item.txt + '_fim"]').toggleInputError((post['agenda.' + item.txt + '_fim'] == ""), 'Informe a data de termino');
                                $('[name="agenda.' + item.txt + '_inicio"]').toggleInputError((post['agenda.' + item.txt + '_inicio'] == ""), 'Informe a data de inicio');
                            }
                            else {
                                post['agenda.' + item.txt + '_inicio'] = null;
                                post['agenda.' + item.txt + '_fim'] = null;
                            }
                        });


                        if ($('[data-page="servico"] .has-error').length == 0) {

                            post.observacao = JSON.stringify({ graduacao: post.graduacao, especialidade: post.especialidade, minicurriculo: post.minicurriculo });
                            post.preco = post.preco.replace(/\./g, '').replace(/\,/g, '.');

                            creait.post('produto', post, function (data) {
                                var login = controller.login.get();
                                login.produto_id = data.id;
                                login.filial_id = (post.filiais_id.length == 0 ? null : post.filiais_id[0]);
                                controller.login.set(login);


                                $('[name="id"]').val(data.id);
                                $('[name="agenda.id"]').val(data.agenda.id);
                                //creait.redirect("produto", "id=" + data.id + '&regiao=' + login.filial_id);
                                creait.redirect("consulta");
                            });
                        }
                    });
                }
            });

        });
    },
    get: function () {
        if (window.localStorage["pedidos"] == null)
            return null;
        return JSON.parse(window.localStorage["pedidos"]);
    },
    set: function (data) {
        window.localStorage["pedidos"] = JSON.stringify(data);
    }
}
