controller.notificacao = {
    init: function (events) {
        creait.get("notificacao?pessoa_id=" + controller.login.get().id, null, function (data) {
            events(data, function (content) {
                $(".notify").click(function () {
                    var notificacao_id = $(this).attr("notificacao_id");
                    var mensagem = $(this).attr("mensagem");
                    myApp.alert(mensagem, "", function () {
                        $.ajax({
                            url: "https://whereapp.creait.com.br/api/notificacao?notificacao_id=" + notificacao_id,
                            method: 'POST',
                            dataType: 'json',
                            async: true,
                            success: function (data) {
                                myApp.views[0].router.refreshPage();
                                var d = controller.login.get();
                                d.num_notificacao -= 1;
                                controller.login.set(d);
                            }, error: function (e) {
                                console.log(e);
                            }
                        });
                    });
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["meuItem"] == null)
            return null;
        return JSON.parse(window.localStorage["meuItem"]);
    },
    set: function (data) {
        window.localStorage["meuItem"] = JSON.stringify(data);
    }
};