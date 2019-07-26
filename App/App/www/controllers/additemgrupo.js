controller.additemgrupo = {
    init: function (events) {
        events(controller.login.get(), function (content) {
            

            $('#btn_cadastra_item_grupo').click(function () {
                var item_id = '';

                $('.itens').each(function (i) {
                    if (($('.itens')[i].checked) == true) {
                        item_id += "&item_id=" + $($('.itens')[i]).val();
                    }
                });

                creait.post('item?grupo_id=' + localStorage.getItem("grupo_id") + item_id, null, function (data) {
                    var dados = controller.login.get();

                    for (var i = 0; i < dados.grupos.length; i++) {
                        if (dados.grupos[i].id == localStorage.getItem("grupo_id")) {
                            dados.grupos[i].itens.push(data);
                            controller.login.set(dados);
                            break;
                        }
                    }
                    creait.redirect('grupo_item');
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["additemgrupo"] == null)
            return null;
        return JSON.parse(window.localStorage["additemgrupo"]);
    },
    set: function (data) {
        window.localStorage["additemgrupo"] = JSON.stringify(data);
    }
};