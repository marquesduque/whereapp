controller.doacao = {
    init: function (events, query) {
        creait.get("doacao?pessoa_id=" + controller.login.get().id + "&tipo_id=" + query.tipo, null, function (data) {
            localStorage.setItem("num_doacao", data.adocaos.length);
            localStorage.setItem("num_ong", data.ongs.length);

            events(data, function (content) {
                
                if (query.tipo == 1) {
                    $("#doar_ong").css("display", "block");
                    $("#adocao").css("display", "none");
                    $("#addItemDoacao").css("display", "none");

                    if (localStorage.getItem("num_ong") == 0) {
                        $("#nao_tem_ong").css("display", "flex");
                    } else {
                        $("#nao_tem_ong").css("display", "none");
                    }
                }
                else {
                    $("#doar_ong").css("display", "none");
                    $("#adocao").css("display", "block");

                    if (localStorage.getItem("num_doacao") == 0) {
                        $("#nao_tem_doacao").css("display", "flex");
                    } else {
                        $("#nao_tem_doacao").css("display", "none");
                    }
                }

                $("#addItemDoacao").click(function () {
                    creait.redirect('addItem', 'tipo=' + query.tipo + "&finalidade=doacao");
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["doacao"] == null)
            return null;
        return JSON.parse(window.localStorage["doacao"]);
    },
    set: function (data) {
        window.localStorage["doacao"] = JSON.stringify(data);
    }
};