controller.cadastrarRastreador = {
    init: function (events) {
        events({}, function (content) {
            var picker = myApp.picker({
                input: '#picker_item',
                rotateEffect: true,
                cols: [
                    {
                        values: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
                    }
                ],
                toolbarTemplate:
                    '<div class = "toolbar">' +
                    '<div class = "toolbar-inner">' +
                    '<div class = "left">' +
                    '<a href = "#" class = "link close-picker" onclick="creait.redirect(\'addItem\')">Cadastrar Item</a>' +
                    '</div>' +
                    '<div class = "center"></div>' +
                    '<div class = "">' +
                    '<a href = "#" class = "link close-picker">Done</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                onClose: function () {
                },
                onOpen: function () {
                }
            });
            $('#picker_item').click(function () {
                picker.open();
            });
        });
    },
    get: function () {
        if (window.localStorage["cadastrarRastreador"] == null)
            return null;
        return JSON.parse(window.localStorage["cadastrarRastreador"]);
    },
    set: function (data) {
        window.localStorage["cadastrarRastreador"] = JSON.stringify(data);
    }
};