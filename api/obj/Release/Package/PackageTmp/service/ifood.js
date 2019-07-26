
function coletar() {
    
    var arr = [];
    $('.info .results-section').each(function (index, item) {
        var categoria = { titulo: $(item).find('h3').html() };
        categoria.produtos = [];
        $(item).find('form').each(function (form_index, form_item) {
            var nome = $(form_item).find('.text-wrap h4').html();
            var descricao = $(form_item).find('.text-wrap p').html();
            if (nome == "") {
                $(form_item).find('[name="description"]').val();
                $(form_item).find('[name="description"]').val();
            }
            categoria.produtos.push({ nome: nome, descricao: descricao });
        });
        arr.push(categoria);
    });
    document.write(JSON.stringify(arr));
}

$('html').append('<div onclick="coletar()" style="position: absolute;top: 0px;right: 0px;background-color: red;color: white;width: 200px;line-height: 60px;z-index: 99999;text-align: center;">COLETAR</div>');
