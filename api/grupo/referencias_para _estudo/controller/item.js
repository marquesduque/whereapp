controller.item = {
    init: function (events) {
        var login = controller.login.get();
        var ent = {
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

        creait.get('agenda?id=' + controller.login.get().id, {}, function (data) {
            $(ent.semanas).each(function (index, item) {
                item.inicio = data[item.txt + "_inicio"];
                item.termino = data[item.txt + "_fim"];
            });
            if (data != null) {
                ent.id = data.id;
            }

            events(ent, function (content) {
                $('#btn_calendario').click(function () {

                    var post = myApp.formToJSON("formcalendario");

                    $(ent.semanas).each(function (index, item) {
                        $('[name="' + item.txt + '_inicio"]').toggleInputError(post[item.txt + '_inicio'] > post[item.txt + '_fim'], 'O horário de inicio deve ser maior que o termino');

                        $('[name="' + item.txt + '_fim"]').toggleInputError((post[item.txt + '_inicio'] != "" && post[item.txt + '_fim'] == ""), 'Informe a data de termino');

                        $('[name="' + item.txt + '_inicio"]').toggleInputError((post[item.txt + '_inicio'] == "" && post[item.txt + '_fim'] != ""), 'Informe a data de inicio');

                    });

                    if ($('formcadastro .has-error').length == 0) {
                        creait.post('agenda', post, function (data) {
                        });
                    }
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
