function ImportarProdutos(element, tipo_id) {

    debugger;
    if ($('#' + element).val() != "") {

        //ESSE FOREACH AQUI SÓ SERVE PARA TRANSFORMAR AS "porcentagemlucro" EM FLOAT (E TROCAR "," POR ".")
        var JProdutos = JSON.parse($('#' + element).val().replaceAll(' %', ''));

        $(JProdutos).each(function (index, item) {

            var teste = (item.porcentagemlucro).replaceAll(",", ".");  
        item.porcentagemlucro = parseFloat(teste);

        });

        var Produtos = JSON.stringify(JProdutos);

        $('.loader').show()
        $.ajax({
            type: "POST",
            traditional: true,
            url: "/produtos/Importar",
            data: { produtos: Produtos },
            dataType: "json",
            //contentType: false,
            //processData: true,
            success: function (result) {
                debugger;

                $('.loader').hide()
                $('[name="btnProcurar"]').click();
                $('#myfile').val('');
                $('#productSheet').val('');






            }, error: function (e) {
                debugger;
                $('.loader').hide()
                alert('Houve um erro, tente novamente')

            }

        });

    } else {

        alert('Por favor, selecione um arquivo válido');


    }
}