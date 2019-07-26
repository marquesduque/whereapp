controller.contato_doador = {
    init: function (events) {
        events(controller.contato_doador.get(), function (content) {
            $("#btn_adotar").click(function () {
                myApp.params.modalButtonOk = "Sim";
                myApp.params.modalButtonCancel = "Não";

                var doador_id = $(this).attr("doador_id");
                var item_id = $(this).attr("item_id");

                myApp.confirm("Para que a adoção seja confirmada, seus dados para contato serão compartilhados com o doador! Você concorda com isso?", "Deseja finalizar?",
                        function () {
                            creait.post("doacao?pessoa_id=" + controller.contato_doador.get().id_doador + "&doador_id=" + doador_id + "&item_id=" + item_id, null, function () {
                            creait.loader(false);
                            myApp.alert("Dados compartilhados com sucesso, agora é só aguardar o doador entrar em contato!", "");
                            creait.redirect("categoria");
                        });

                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    },
                    function () {
                        myApp.params.modalButtonOk = "Ok";
                        myApp.params.modalButtonCancel = "Cancelar";
                    }
                );
            });

            $("#voltar_doacao").click(function () {
                creait.redirect("doacao", "tipo=" + controller.contato_doador.get().tipo);
            });
        });
    },
    get: function () {
        if (window.localStorage["contato_doador"] == null)
            return null;
        return JSON.parse(window.localStorage["contato_doador"]);
    },
    set: function (data) {
        window.localStorage["contato_doador"] = JSON.stringify(data);
    }
};