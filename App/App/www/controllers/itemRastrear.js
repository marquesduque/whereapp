controller.itemRastrear = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            $(".abrir_mapa").click(function () {
                var dados = [];

                for (var i = 0; i < controller.login.get().meusitens.length; i++) {
                    //if (controller.login.get().meusitens[i].rastreador == 1) {
                        if (controller.login.get().meusitens[i].id == $(this).attr("item_id")) {
                            dados.push({
                                nome: controller.login.get().meusitens[i].nome,
                                foto: "https://whereapp.creait.com.br/api/getPhoto?id=" + $(this).attr("item_id") + "&tabela=item"
                            });
                            controller.mapa.set(dados[0]);
                            break;
                        }
                    //}
                }

                creait.redirect('mapa');
            });
        });
    },
    get: function () {
        if (window.localStorage["itemRastrear"] == null)
            return null;
        return JSON.parse(window.localStorage["itemRastrear"]);
    },
    set: function (data) {
        window.localStorage["itemRastrear"] = JSON.stringify(data);
    }
};