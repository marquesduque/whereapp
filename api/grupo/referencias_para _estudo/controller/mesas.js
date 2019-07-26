controller.mesas = {
    init: function (events) {
        var login = controller.login.get();
        var pedido = {};
        creait.get('pedido?vendedor_id=' + login.id + '&filial_id=' + controller.filial.get().id, null, function (data) {
            debugger;
            pedido.mesas = data;

            if (data.erro != null) {
                pedido.mesas = [];
            } 
            events(pedido, function (content) {
                $('.legenda').click(function () {
                    var control = $(this);
                    debugger;
                    control.toggleClass('selecionada');
                    $('li[status]').hide();
                    $('.legenda.selecionada').each(function () {
                        $('li[status="' + $(this).attr('status') + '"]').show();
                    });
                });
                $('.tempo_mesas').each(function (index, item) {
                    function loop() {
                        var tempo = calcular_tempo($(item).attr('data'));
                        if (tempo == null) {
                            tempo = "LIBERADA";
                        }
                        else {
                            tempo = 'TEMPO ' + tempo;
                        }
                        $(item).html(tempo);
                    }
                    loop();
                    setInterval(function () {
                        loop();
                    }, 1000);
                });


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
