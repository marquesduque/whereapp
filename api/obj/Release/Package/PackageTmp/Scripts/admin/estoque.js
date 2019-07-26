//function InsereEstoque() {

//    if ($('#s_produto').val() != "null" && $('#s_pessoa').val() !="null" && $('#Filter_data_entrada').val() != "" && $('#Filter_estoque1').val() != "") {
//        
//        $('#Filter_flag').val(2);
//        $('.tblrow').remove();
//        $('#Page').val('0');
//        $('[ajax]').submit();

//    } else {

//        alert('Para cadastrar,todos os campos devem estar preenchidos');

//    }

//}
var produtos = [];
var indice = 1;
function InserirProduto() {

    if ($('#produto_id').val() != "null" && $('#estoque1').val() != "" && $('#estoque1').val() >= 1) {



        //SE HOUVER PRODUTOS SUFICIENTES EM ESTOQUE
        if (parseFloat($('#s_produto option:selected').attr('quantidade')) >= parseFloat($('#estoque1').val())) {

            var item = {
                id: 0,
                indice: indice,
                produto_id: $('#produto_id').val(),
                NomeProduto: $('#s_produto option:selected').text(),
                estoque1: $('#estoque1').val(),
                observacao: "",
                codigo: parseInt($('#s_produto option:selected').attr('codigo')),
                preco: parseFloat(($('#s_produto option:selected').attr('preco')).replace(",","."))
            }
            indice = indice + 1;
            produtos.push(item);

            carregarGrid();

        } else {

            alert('Não há produtos suficientes em estoque');
            Limpar();
        }

    } else {

        alert('Por Favor, preencha os campos corretamente!');

    }
}



function carregarGrid() {
    $('#grid').html('<thead><th>Produto</th> <th>Valor Revenda</th> <th>Quantidade</th><th>Vendido</th><th>Observação</th><th>Remover</th>');

    //ESSA VARIAVEL SERVE PARA SOMAR O TOTAL DOS PREÇOS E COLOCAR EMBAIXO DA TABELA
    var totalPreco = 0

    $(produtos).each(function (index, item) {

        var html = $("<tr><td>" + item.NomeProduto + "</td><td>R$ " + item.preco.toFixed(2) + "</td><td>" + item.estoque1 + "</td><td><input index='" + index + "' type='number' style='width:50px' value='0' onblur='Vendido(this)'></td><td><input type='text' value='" + item.observacao + "'  onblur='AdicionarObs(this," + item.indice + ")'></td><td><a onclick=RemoverProduto(" + item.indice + ") class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></a></td></tr>");
        $('#grid').append(html);

        //SOMANDO O TOTAL DOS PRECOS
        totalPreco += item.preco

        //disable nos produtos que ja foram selecionados
        $('#s_produto option[codigo="' + item.codigo + '"]').prop('disabled', true)
        $('#s_produto').select2();

    });

    $('#estoque_list').val(JSON.stringify(produtos))


    $('#grid').append("<tr><td></td><td>Total: R$ " + totalPreco.toFixed(2)+"</td><td></td><td></td><td></td><td></td></tr>");


    //Verifica se esta na tela de Edit ou de Create, para sumir como campo de vendido
    var url = window.location.href.toLowerCase();
    if (!url.includes("edit")) {
        $('#grid th:nth-child(4)').hide()
        $('#grid td:nth-child(4)').hide()
        $('#grid th:nth-child(5)').hide()
        $('#grid td:nth-child(5)').hide()
    }


    Limpar();

}

//Limpa os campos de cadastro de produtos
function Limpar() {

    $('#s_produto').select2("val", "null")
    $('#estoque1').val(1)
}


function RemoverProduto(i) {

    $(produtos).each(function (index, item) {

        if (item.indice == i) {

            produtos.splice(index, 1);
            //habilita todos os produtos do select, no carregaGrid ele desabilita oq que já foram selecionados
            $('#s_produto option').prop('disabled', false)
            $('#s_produto').select2();

            carregarGrid();

        }

    });
}


function Vendido(element) {

    //Função para botao on/off da lista de produtos
    var produto = produtos[$(element).attr('index')]

    if (produto.estoque1 <= parseInt($(element).val()) || parseInt($(element).val()) < 0) {
        $(element).val(parseInt(produto.estoque1));
    }

    produto.sai_estoque = parseInt($(element).val());
    $('#estoque_list').val(JSON.stringify(produtos))



}


function AdicionarObs(element, indice) {

    debugger;


    $(produtos).each(function (index, item) {

        if (item.indice == indice) {

            item.observacao = $(element).val();

            $('#estoque_list').val(JSON.stringify(produtos))

        }

    });

}


//QUANDO DA ERRO, ELE RETORNA A STRING INTEIRA E JOGA DE NOVO NA TELA, PRO USUÁRIO NÃO PRECISAR DIGITAR TUDO DE NOVO
$(document).ready(function () {

    var somaEstoques = 0;
    if ($('#estoque_list').length != 0) {
        setTimeout(function () {

            var a = JSON.parse($('#estoque_list').val())
            for (var i = 0; i < a.length; i++) {
                a[i].indice = indice
                somaEstoques = somaEstoques + a[i].estoque1;
                debugger;
                produtos.push(a[i]);
                indice = indice + 1;
            }
            if (somaEstoques == 0) {
                $('#btnEditar').css('display', 'none');
                $('#btnImprimirEstoque').css('display', 'none');
                $('#btnEstornar').css('display', 'none');

            }

            carregarGrid();

        }, 1000);
    }




});





function SubmitEditar(result) {
    if (result)
        $('#btnEditar').closest('form').submit();
}