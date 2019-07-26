

controller.formulario = {
    init: function (events, query) {

        if (query.id == null) {
            query.id = controller.login.get().id;
        }
        creait.get('formulario', { id: query.id }, function (data) {
            debugger;
            events({  grupos: data }, function (content) {


                $('[pergunta_id] input').change(function () {
                    debugger;
                    creait.post('formulario', { pergunta_id: $(this).closest('[pergunta_id]').attr('pergunta_id'), valor: ($(this).is(':checked') ? 'Sim' : 'Não') , pessoa_id: query.id, autor_id: controller.login.get().id }, function (data) {
                        creait.loader(false);
                    });
                    creait.loader(false);
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["cartao"] == null)
            return null;
        return JSON.parse(window.localStorage["cartao"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cartao"] = data;
        else
            window.localStorage["cartao"] = JSON.stringify(data);
    }
}
