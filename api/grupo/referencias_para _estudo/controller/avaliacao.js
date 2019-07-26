controller.avaliacao = {
    init: function (events, query) {
        
        events({}, function (content) {
            var star = 3;
            $('.icon-star-full').click(function () {
                star = parseInt($(this).attr('value'), 10);
                $('.icon-star-full').removeClass('activestar');
                for (var i = star; i > 0; i--) {
                    $('.icon-star-full[value="' + i + '"]').addClass('activestar');
                }
            });

            $('#avaliar').click(function () {
                debugger;
                creait.get('produto?estrela=' + $($('.activestar').get().reverse()[0]).attr('value') + '&horario_id=' + query.id, null, function (data) {
                    creait.redirect('horario', 'id=' + query.id);
                });
            });
        });
    },
    get: function () {
        return memory;
    },
    set: function (data) {
        memory = data;
    },
    memory: null
}
