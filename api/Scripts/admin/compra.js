/// <reference path="../site/base.js" />
function initSearch() {
    autocomplete = new google.maps.places.Autocomplete(
        ($('#pac-input')[0]),
        { types: ['geocode'], componentRestrictions: { country: 'br' } });

    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {

    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $("#lat").val(lat.toString().replace('.', ','));
    $("#lng").val(lng.toString().replace('.', ','));

    $(place.address_components).each(function (index, item) {
        $(item.types).each(function (indext, itemt) {
            switch (itemt) {
                case "street_number":
                    $("#numero").val(item.long_name);
                    break;

                case "route":
                    $("#rua").val(item.long_name);
                    break;

                case "administrative_area_level_1":
                    $("#horario_state").val(item.short_name);
                    break;
                case "administrative_area_level_2":
                    $("#cidade").val(item.long_name);
                    break;

                case "country":
                    $("#pais").val(item.long_name);
                    break;

                case "postal_code":
                    $("#cep").val(item.long_name);
                    break;
            }
        })
    });
}


function AtualizaGrid() {
    if ($('#pedido_StringPedidos').length !== 0) {
        setTimeout(function () {

            var a = JSON.parse($('#pedido_StringPedidos').val());
            for (var i = 0; i < a.length; i++) {

                if (a[i].nome_montagem == null)
                    a[i].nome_montagem = "";

                pedidos.push(a[i]);
            }

            var c = -1;
            $('#grid tr:gt(0)').remove();
            $(pedidos).each(function () {
                c += 1;

                $('#grid').append("<tr><td>" + this.produto_nome + "</td><td>" + this.nome_montagem + "</td><td>R$ " + this.precodesconto + "</td><td>" + this.desconto + " %</td><td><a id='" + c + "'  class='btn btn-danger' width = '100'; onclick = 'pedidos.splice(" + c + ", 1); $(this).parent().parent().remove(); test(" + this.precodesconto + ");'><i class='fa fa-trash'></i></a></td></tr>")

            });

        }, 2000);
    }
}



$(document).ready(function () {
    var reload = 30;
    setInterval(function () {
        $('.contagem').html(reload);
        if (!$('#loader_card.loader').is(":visible")) {
            BuscaCards();
        }
    }, reload * 1000);

    contagem();
    function contagem() {
        $('.contagem').html(reload);
        setInterval(function () {
            var count = parseInt($('.contagem').text(), 10) - 1;
            $('.contagem').html(count);
        }, 1000);
    }

    AtualizaGrid();

    setTimeout(function () {

        $('#compra_desconto').blur();
        $('#compra_pago').blur();
        $('#compra_frete').blur();

    }, 2000);


    $('#compra_frete').blur(function () {


        if ($('#compra_total').val() != "") {

            //VER COM AS MENINAS DA FASHION YOU QUAL A ORDEM AQUI
            $('#totaltela').val((parseFloat($('#compra_total').val().replace(',', ".")) + parseFloat($(this).val())).toFixed(2));
            $('#compra_desconto').blur();
            $('#compra_pago').blur();

        } else {
            $('#totaltela').val("0.00");

        }
    });



    $('#compra_desconto').blur(function () {

        //SERVE PRA NUNCA DAR MAIS DOQ 100%
        //if ($('#compra_desconto').val() > 100) {

        //    $('#compra_desconto').val(100);

        //}

        if ($('#compra_total').val() != "" && $('#compra_desconto').val() != "") {

            //ORIGINAL (DESCONTO PO PORCENTAGEM)
            //$('#totaltela').val((parseFloat($('#compra_total').val().replace(',', ".")) - ((parseFloat($('#compra_desconto').val()) / 100) * parseFloat($('#compra_total').val().replace(',', "."))) + parseFloat($('#compra_frete').val())).toFixed(2));

            //DESCONTO DIRETO
            $('#totaltela').val((parseFloat($('#compra_total').val().replace(',', ".")) - parseFloat($('#compra_desconto').val()) + parseFloat($('#compra_frete').val())).toFixed(2));

        } else if ($('#compra_total').val() != "") {

            var frete = $('#compra_frete').val() == "" ? $('#compra_frete').val(0) : parseFloat($('#compra_frete').val());


            $('#totaltela').val(parseFloat(parseFloat($('#compra_total').val().replace(',', ".")) + frete).toFixed(2));

        }
        $('#compra_pago').blur();

    });


    $('#compra_pago').blur(function () {

        if ($('#compra_pago').val() == "") {
            this.value = 0;
        }



        if ($('#totaltela').val() != "") {

            $('#troco').val((parseFloat($('#compra_pago').val().replace(".", "").replace(",", ".")) - parseFloat($('#totaltela').val().replace(',', "."))).toFixed(2));
        }

    });






    $('[name="pago"]').unbind('blur');
    $('[name="pago"]').blur(function () {

        if (this.value == '') {
            this.value = ($(this).attr('total')).replace(",", ".");

        } else {
            this.value = this.value;


        }
    });





    //SUBMETER O FORM DE CREATE E DE EDIT
    $('#btnSalvar').click(function () {
        var compra_total = parseFloat($('[name="compra.total"]').val().replace(',', "."));
        var compra_pago = parseFloat($('[name="compra.pago"]').val().replace(',', "."));
        $('.field-validation-error').removeClass('field-validation-error').addClass('field-validation-valid').html('');

        if (isNaN(compra_total)) {
            $('[data-valmsg-for="compra.total"]').removeClass('field-validation-valid').addClass('field-validation-error').html("Adicione um produto ao carrinho!");
        }
        else if (compra_total > compra_pago) {
            $('[data-valmsg-for="compra.pago"]').removeClass('field-validation-valid').addClass('field-validation-error').html("O pagamento tem que ser maior que o total!");
        }

        if ($('[name="horario.endereco"]').val() == '') {
            $('[data-valmsg-for="horario.endereco"]').removeClass('field-validation-valid').addClass('field-validation-error').html("Selecione o endereço na busca acima!");
        }
        if ($('[name="horario.cliente_id"]').val() == '') {
            $('[data-valmsg-for="horario.cliente_id"]').removeClass('field-validation-valid').addClass('field-validation-error').html("Selecione um cliente!");
        }
        if ($('[name="compra.pagamento_id"]').val() == '') {
            $('[data-valmsg-for="compra.pagamento_id"]').removeClass('field-validation-valid').addClass('field-validation-error').html("Selecione um pagamento!");
        }

        if ($('.field-validation-error').length == 0) {
            confirm("Deseja Finalizar esta compra?", function (result) {


                if (result) {
                    $(".loader").show()
                    $('#compra_total').val(($('#compra_total').val()).toString().replace(".", ","));

                    $('#form_compra').submit();
                }

            });
        }
    });
});


var pedidos = [];

//VARIAVEL PARA TRAZER O TIPO CERTO DE PREPARO PARA A TELA
var tipo_de_preparo = '';


//NÃO SEI DIREITO, MAS SOMA O VALOR TOTAL DA COMPRA
function soma() {
    var somar = 0;

    $('[name="complemento"]:checked').each(function (index, item) {
        somar += parseFloat($(item).attr('preco').replace(",", "."));

    });
    $('#preco_produto_montagem').val(somar.toFixed(2));


}


//BOTAO ADICIONAR, QUE ADICIONA O PRODUTO AO ARRAY
function adicionar_montagem(produto_id) {
    var montagens = [];
    var produtos = [];
    debugger;
    var nomes = "";
    $('[name="montagens"]').each(function (index, item) {


        montagens.push({
            montagem_id: parseInt($(item).attr('id').replace("montagem_", "")),
            produtos: []
        });

    });



    $('[name="complemento"]:checked').each(function (index, item) {
        nomes += ' + ' + $(item).attr('nome');

        $(montagens).each(function (indexx, itemm) {
            if (itemm.montagem_id == parseInt($(item).attr('montagem_id'))) {

                itemm.produtos.push({
                    produto_id: JSON.parse($(item).val()),
                    nome: $(item).attr('nome')
                });

            }

        });
    });



    pedidos.push({
        id: 0,
        produto_nome: $('[callback="add"] option:checked').attr('nome'),
        produto_id: produto_id,
        precodesconto: ((parseFloat($('#preco_produto_montagem').val().replace(",", "."))) - ((($('#desconto_produto_montagem').val() == "" ? 1 : parseFloat($('#desconto_produto_montagem').val().replace(",", "."))) / 100) * (parseFloat($('#preco_produto_montagem').val().replace(",", "."))))).toFixed(2),
        preco: parseFloat($('#preco_produto_montagem').val().replace(",", ".")).toFixed(2),
        desconto: parseFloat($('#desconto_produto_montagem').val()),
        montagens: montagens,
        nome_montagem: nomes
    });


    $('#grid tr:gt(0)').remove();
    $('#compra_total').val('0')
    $(pedidos).each(function (index, item) {


        $('#grid').append("<tr><td>" + item.produto_nome + "</td><td>" + item.nome_montagem + "</td><td>R$ " + item.precodesconto + "</td><td>" + item.desconto + " %</td><td><a class='btn btn-danger' onclick = \"pedidos.splice(" + index + ",1); $(this).parent().parent().remove();test(" + item.precodesconto + ");\"><i class='fa fa-trash'></i></a></td></tr>")

        $('#compra_total').val(parseFloat($('#compra_total').val()) + parseFloat(item.precodesconto))

        $('#totaltela').val(parseFloat($('#compra_total').val().replace(',', ".")).toFixed(2))

    });



    $("#desconto_produto_montagem").val("0");
    //$("#produto_selecionado").val("");
    $("#preco_produto_montagem").val("");
    $('#adicionar_button').hide();
    $('#montagem').hide();
    $('#produto').select2('val', '0');
    $('#pedido_StringPedidos').val(JSON.stringify(pedidos));


}



//RODA O TEMPLATE DAS MONTAGENS (JOGA O TEMPLATE NA TELA)
function add(produto_id) {
    $('.field-validation-error').removeClass('field-validation-error').addClass('field-validation-valid').html('');
    var form = $($('[produto_id=' + produto_id + ']').html());
    bind_select2(form.find('select[source]'));
    $('#preco_produto_montagem').val(parseFloat($('[name="prodselect"]:checked').attr('preco')));
    $('#montagem').html(form);
    $('#adicionar_button').show();
    $('#montagem').show();

}

//QUANDO UM PRODUTO É DELETADO DA GRID, ELE RODA ESSA FUNÇÃO PRA DESCONTAR O VALOR DO TOTAL DA COMPRA
function test(evt) {
    $('#compra_total').val(parseFloat($('#compra_total').val()) - parseFloat(evt))
    $('#pedido_StringPedidos').val(JSON.stringify(pedidos));
    $('#compra_desconto').blur();
    $('#compra_pago').blur();
}

//BUSCA O HORARIO DA ULTIMA COMPRA PARA O EDIT DE COMPRAS
function buscaHorario(id) {
    $.ajax({
        type: "GET",
        url: "/Compras/BuscaHorario?id=" + id,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (result) {

            if (result) {

                $('#horario_lat').val(result.lat.toString().replace(".", ","));
                $('#horario_lng').val(result.lng.toString().replace(".", ","));
                $('#horario_compra_id').val(result.compra_id);
                $('#horario_endereco').val(result.endereco);
                $('#horario_numero').val(result.numero);
                $('#horario_cidade').val(result.cidade);
                $('#horario_pais').val(result.pais);
                $('#horario_cep').val(result.cep);
                $('#horario_complemento').val(result.complemento);

            } else {

                $('#horario_lat').val("");
                $('#horario_lng').val("");
                $('#horario_compra_id').val("");
                $('#horario_endereco').val("");
                $('#horario_numero').val("");
                $('#horario_cidade').val("");
                $('#horario_pais').val("");
                $('#horario_cep').val("");
                $('#horario_complemento').val("");

            }
        }
    });


}

//FUNÇÕES PARA A TELA DE CARDS
function BuscaCards() {
    $.ajax({
        type: "GET",
        url: "/Compras/BuscaCards?filial_id=" + $('#filial_id').val(),
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (result) {


            //ESSE IF SERVE PARA ESCONDER A COMBOBOX DE PREPAROS QUE FICA LÁ EM CIMA NA TELA
            if (result.preparo) {
                $('#boxPreparo').show();
            } else {
                $('#boxPreparo').hide();
            }
            $('#TelaDetails').html('<ul id="card_list_1"></ul> <ul id="card_list_2"></ul> <ul id="card_list_3"></ul>');

            //each de compras
            $(result.list).each(function (index, item) {

                var card_template = $($('#card_template').html());
                if (item.id_compra != null) {

                    card_template.find('#id_compra').html("<i class='fa fa-tag' style='color:#fff;margin-right:3px;'></i>" + item.id_compra + " (" + (item.hora + ':' + (item.minuto.length == 1 ? ("0" + item.minuto) : item.minuto)) + ")");
                }
                if (item.nome_cliente != null) {

                    card_template.find('#nome_cliente').html("<i class='fa fa-user' style='color:#fff;margin-right:3px;'></i>" + item.nome_cliente);
                }
                if (item.telefone_cliente != null) {
                    card_template.find('#telefone_cliente').html("<i class='fa fa-phone' style='color:#fff;margin-right:3px;'></i>" + item.telefone_cliente);
                }
                if (item.retirada != null && item.nome_cliente.toLowerCase().indexOf('mesa') == -1) {
                    card_template.find('#retirada').html("<i class='fa fa-motorcycle' style='color:#fff;margin-right:3px;'></i>" + item.retirada);
                }
                if (item.total != null) {
                    card_template.find('#total').html("Total: R$" + item.total);
                }
                
                card_template.find('#pago').html(item.pago != null ? "Troco Para: R$ " + item.pago : "");
                card_template.find('#cancel').attr('onclick', 'CancelaCard(' + item.id_compra + ')');
                //card_template.find('#arr_pedidos').val()

                //ARRAY COM OS IDs DE PEDIDOS
                var arr_pedido = [];

                //each de pedidos
                $(item.pedidos).each(function (indexx, itemm) {


                    var pedidos_template = $($('#pedidos_template').html());
                    if (itemm.complemento_de == null) {
                        pedidos_template.find('#pedido_principal').html(itemm.nome);
                        pedidos_template.find('#preco_pedido').html(itemm.preco);

                        //PEGA A HORA EM QUE A COMPRA PASSOU PARA PREPARO (C.PREPARO)
                        var timeParts = item.hora_preparo.split(":");
                        var a = new Date();
                        a.setHours(timeParts[0]);
                        a.setMinutes(timeParts[1]);
                        a.setSeconds(0);

                        //ESSA FAZ AS BARRAS DE PROGRESSO RODAREM
                        progress();

                        //A MAGICA DA BARRA DE PROGRESSO
                        function progress() {
                            $element = pedidos_template.find('#progressBar');
                            var timetotal = (itemm.duracao * 60);
                            var timeleft = (timetotal - (Math.abs(a - new Date()) / 1000));

                            var progressBarWidth = timeleft * $element.width() / timetotal;
                            $element.find('div').css("width", progressBarWidth).html(Math.floor(timeleft / 60) + ":" + timeleft % 60);


                            if ($element.find('div').width() > ($element.width() * 0.7)) {

                                $element.find('div').css("background-color", "green");

                            } else if ($element.find('div').width() > ($element.width() * 0.4)) {

                                $element.find('div').css("background-color", "yellow");

                            } else {

                                $element.find('div').css("background-color", "red");
                            }

                            if (timeleft > 0) {
                                setTimeout(function () {
                                    progress();
                                });
                            }
                        };


                        //MUDA A COR DA BOLINHA DO LADO DO PEDIDO
                        if (itemm.preparo == null) {

                            pedidos_template.find('#circle').css("background-color", "#f44336");

                        }
                        else if (itemm.finalizado == null) {

                            pedidos_template.find('#circle').css("background-color", "#ff9800");


                        }
                        else {

                            pedidos_template.find('#circle').css("background-color", "#4caf50");

                        }



                        //SE TIVER DURACAO, MOSTRA NA TELA
                        if (itemm.duracao != null) {
                            pedidos_template.find('#progressBar').show();
                        }

                        //SE OBSERVACAO FOR DIFERENTE DE NULO, INSERE NA TELA
                        if (itemm.observacao != '' && itemm.observacao != null) {
                            pedidos_template.find('#observacao').html('Observação: ' + itemm.observacao);
                        }

                        //each de complementos (sabores da pizza)
                        $(item.pedidos).each(function (indexxx, itemmm) {
                            if (itemmm.complemento_de == itemm.id) {

                                pedidos_template.find('#complementos').append("+" + itemmm.nome);
                                //ADICIONAR OS IDS DOS COMPLEMENTOS(PRECISO DOS IDS DE TODOS OS PEDIDOS, NÃO SÓ DOS PRINCIPAIS)
                                if (tipo_de_preparo == '' || (parseInt(tipo_de_preparo) == itemm.tipo_de_preparo && item.status_da_compra_id == 5)) {
                                    arr_pedido.push(itemmm.id);
                                }
                            }
                        });

                        //MOSTRA APENAS AS COMPRAS: QUE ESTÃO EM PREPARO, E OS PEDIDOS DA COMPRA QUE ESTÃO COM O TIPO DE PREPARO CERTO E ESTÁ EM PREPARO
                        if (tipo_de_preparo == '' || ((parseInt(tipo_de_preparo) == itemm.tipo_de_preparo) && (itemm.finalizado == null) && (item.status_da_compra_id == 5))) {

                            card_template.find('#pedidos').append(pedidos_template);

                            //INSERE O ID DO PEDIDO NO ARRAY
                            arr_pedido.push(itemm.id);
                            card_template.find('#arr_pedidos').val(arr_pedido);
                        }

                    }


                });//pedido

                //ARRUMA OQUE CADA BOTÃO FAZ
                card_template.find('#upgrade').click(function () { AtualizaCard(true); });
                card_template.find('#downgrade').click(function () { AtualizaCard(false); });

                function AtualizaCard(sentido) {
                    card_template.find('#loader_card').show();


                    $.ajax({
                        type: "GET",
                        url: "/Compras/AtualizaCard?id_compra=" + item.id_compra + "&ids=" + JSON.stringify(arr_pedido) + "&status_da_compra_id=" + item.status_da_compra_id + "&sentido=" + sentido,
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            if (result == '' || result == null) {

                            }
                            else {
                                modal(result);
                            }
                            BuscaCards();
                        },
                        error: function (result) {

                            if (result.status != 200) {
                                alert(result);
                            }
                            else {
                                BuscaCards();
                            }
                        }

                    });
                }

                //INSERE O CARD NA TELA (SE HOUVER ALGUM PEDIDO DENTRO DELE)



                //MUDAR AS CORES DOS CARDS
                //PEDIDO RECEBIDO
                if (item.status_da_compra_id == 4) {

                    card_template.find('#fundo').css('background-color', '#f44336 !important');
                    card_template.find('#upgrade').css('background-color', '#f44336 !important').html('Preparar');
                    card_template.find('#downgrade').css('display', 'none');
                    card_template.find('#cancel').css('display', 'block');
                    card_template.find('.progressBarDiv').css('display', 'none');

                    if (card_template.find('#pedido_principal').length > 0) {
                        $('#card_list_1').append(card_template);
                    }

                }
                //EM PREPARO
                else if (item.status_da_compra_id == 5) {

                    if (result.preparo) {
                        //ESSA LINHA AQUI, DEIXA SÓ O LUGAR CORRETO PREPARAR O PEDIDO(OU SEJA, SÓ A COZINHA PREPARA AS PIZZAS, SÓ O BAR PREPARA AS BEBEIDAS)
                        if (tipo_de_preparo == '') { card_template.find('#upgrade').off().html('Aguardando...'); } else { card_template.find('#upgrade').html('Enviar'); }
                    } else {

                        //ESSA LINHA AQUI,DEIXA O CAIXA (PREPARO = TODOS) PREPARAR TUDO (OU SEJA, NÃO IMPORTA O TIPO DE PREPARO, O CAIXA PASSA TUDO FINALIZADO E JÁ ERA)
                        card_template.find('#upgrade').html('Enviar');

                    }

                    card_template.find('#fundo').css('background-color', '#ff9800 !important');
                    card_template.find('#upgrade').css('background-color', '#ff9800 !important');
                    card_template.find('#cancel').css('display', 'none');
                    card_template.find('#downgrade').css('background-color', '#f44336 !important');

                    if (card_template.find('#pedido_principal').length > 0) {
                        $('#card_list_2').append(card_template);
                    }

                }
                //FINALIZADO INDO PARA ENTREGA
                else if (item.status_da_compra_id == 6) {
                    card_template.find('#fundo').css('background-color', '#4caf50 !important')
                    card_template.find('#upgrade').css('background-color', '#4caf50 !important').html('Finalizar');
                    card_template.find('#downgrade').css('background-color', '#f44336 !important');
                    card_template.find('#cancel').css('display', 'none');
                    card_template.find('.progressBarDiv').css('display', 'none');

                    if (card_template.find('#pedido_principal').length > 0) {
                        $('#card_list_3').append(card_template);
                    }

                }
                else {
                    return "nao_encontrada";
                }

                if (item.preparo == null) {
                    card_template.find('#tempoDuracao').html('00:00');
                }
                else {

                    upTime(item.preparo.split(' ')[0].split('/')[2] + '-' + item.preparo.split(' ')[0].split('/')[1] + '-' + item.preparo.split(' ')[0].split('/')[0] + ' ' + item.preparo.split(' ')[1]);

                    function upTime(countTo) {

                        now = new Date();
                        countTo = new Date(countTo.replace(' ', 'T'));
                        difference = (now - countTo);

                        days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
                        hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
                        mins = Math.floor(((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
                        secs = Math.floor((((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);

                        card_template.find('#tempoDuracao').html((days == 0 ? '' : days + ' DIA(S)') + ' ' + (hours < 10 ? (hours == 0 ? '' : '0' + hours + ':') : hours + ':') + '' + (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs));

                        clearTimeout(upTime.to);
                        upTime.to = setTimeout(function () { upTime(countTo); }, 1000);
                    }
                }

            }); // each de compras


            //ESSE CODIGO AQUI SERVE PRA FAZER AS COLUNAS SE ADAPTAREM DE ACORDO COM QUANTOS STATUS DE COMPRA TEM NA TELA
            var tamanho = 0;
            $($('#TelaDetails ul').each(function (index, item) {

                if ($(item).html() == "") {

                    $(item).remove();
                } else {

                    tamanho++;
                }

            }));
            if (localStorage["qtd_kds"] == null) {
                localStorage["qtd_kds"] = "3";
            }
            if (localStorage["row_kds"] == null) {
                localStorage["row_kds"] = "";
            }

            $('#qtd_kds').select2("val", localStorage["qtd_kds"]);
            $('#row_kds').select2("val", localStorage["row_kds"]);

            $('#TelaDetails ul').css('width', 'calc(100% / ' + tamanho + ')');

        } // success

    }); // ajax
}


function CancelaCard(result) {


    confirm('Deseja Cancelar esta compra?', function (resposta) {

        if (resposta) {

            $.ajax({
                type: "POST",
                url: "/Compras/CancelaCard?id=" + result,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (result) {
                    BuscaCards();

                }
            });
        }
    });
}

function MudaPreparo(result) {
    tipo_de_preparo = result;
    BuscaCards();
}