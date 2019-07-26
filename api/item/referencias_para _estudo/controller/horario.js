controller.horario = {
    init: function (events, query) {
        var perfil = controller.login.get();
        var lst = [];
        var horario_id = query.id;


        creait.get('acompanhamento?horario_id=' + horario_id, null, function (data) {
            debugger;
            data.tempolimite = new Date(data.horario1).addMinutes(data.duracao * 60) < new Date();
            controller.avaliacao.set(data);

            events(data, function (content) {


                if (data.compra.valor_frete != null) {
                    data.compra.total = data.compra.total + data.compra.valor_frete;
                }
                $('.total_acompanhamento').html((data.compra.total).formatMoney(2));
                
                var para = data.compra.comprador_id;
                if (controller.login.get().perfil_id == 2) {
                    para = data.pedido[0].produto.administrador_id;
                }

                $('.cancelar_horario').unbind('click');
                $('.cancelar_horario').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=4&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.avancar_horario').unbind('click');
                $('.avancar_horario').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=1&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.iniciar_atendimento').unbind('click');
                $('.iniciar_atendimento').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=2&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                $('.finalizar_atendimento').unbind('click');
                $('.finalizar_atendimento').click(function () {
                    creait.get('compras?horario_id=' + horario_id + '&status=3&para=' + para, {}, function (json) {
                        myApp.mainView.refreshPage();
                    });
                });
                if (data.avaliacao == null) {
                    $('.avaliar_horario').unbind('click');
                    $('.avaliar_horario').click(function () {
                        creait.redirect('avaliacao', 'id=' + query.id);
                    });
                    $('.content_estrela').unbind('click');
                    $('.content_estrela').click(function () {
                        creait.redirect('avaliacao', 'id=' + query.id);
                    });
                }
                else {
                    $('.content_estrela').unbind('click');
                    $('.avaliar_horario div').html('Minha Avaliação &nbsp;&nbsp;');
                    for (var i = 0; i < data.avaliacao; i++) {
                        $('.avaliar_horario div').append('<i class="icon-star-full"></i>');
                    }
                }

                if (data.numero == null) {
                    $('#endereco').html('PRODUTO RETIRADO NA LOJA');
                    $('#pedido_entregue').closest('.col-33').hide();
                    var itens = $('.bg-acompanhamento .col-33');
                    itens.removeClass('col-33');
                    itens.addClass('col-50');
                    $(itens[1]).find('.label-acompanhamento').text('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('.iconecommerce-truck-4').addClass('iconecommerce-box');
                    $(itens[1]).find('.acompanhamento-line').hide();

                }
                else {
                    $('#endereco').html('<i class="flaticon-location-pin"></i>' + '  ' + data.endereco + (data.numero == null ? '' : ', ' + data.numero) + (data.complemento == null ? "" : ' - ' + data.complemento) + "" + ((data.compra.valor_frete == null || data.compra.valor_frete == 0) ? '' : " - " + biblioteca.get('frete') + ": " + (data.compra.valor_frete).formatMoney(2)));
                }
                if (data.agenda_id != null) {
                    $('.transportando').html('ATENDIMENTO');
                    $('.entregue').html('FINALIZADO');
                    $('.iconecommerce-truck-4').removeClass('iconecommerce-truck-4').removeClass('glyph-icon').addClass('icon-user-check');
                    $('.iconecommerce-box').removeClass('iconecommerce-box').removeClass('glyph-icon').addClass('icon-aid-kit');
                }
            });

            $('.titulo_horario').html(data.hora_date + '<br><span style="font-size:12px;    letter-spacing: 2px;">DURAÇÃO ' + data.duracao + 'Hrs</span>');
        });
    }
}
