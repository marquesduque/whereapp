controller.produto_adicionar = {
    init: function (events) {
        events({}, function (content) {

            $('input[type="file"]').each(function () {
                this.addEventListener("change", readFile, false);
            });

            $('#id_produto').val(0);
            if (controller.produto_adicionar.get() != null) {
                $('#id_produto').val(controller.produto_adicionar.get().id);
                $('#nome_inpu').val(controller.produto_adicionar.get().nome);
                $('#descricao').val(controller.produto_adicionar.get().descricao);
                $('#valor_input').val(controller.produto_adicionar.get().valor);
                $('#estoque_inpu').val(controller.produto_adicionar.get().estoque);
                $("#foto_produto").css("background-image", "url(https://whereapp.creait.com.br/api/getPhoto?id=" + controller.produto_adicionar.get().id + "&tabela=item)");
            }

            $('#btn_salvar').click(function () {
                $('#nome_inpu').toggleInputError($('#nome_inpu').val() == '', 'Digite o Nome');
                $('#descricao').toggleInputError($('#descricao').val() == '', 'Digite um Descrição');
                $('#valor_input').toggleInputError($('#valor_input').val() == false, 'Digite o valor do produto');
                $('#estoque_inpu').toggleInputError($('#estoque_inpu').val() == '', 'Digite a quantidade em estoque');

                if ($("formproduto .has-error").length == 0) {
                    creait.post('produtoEmpresa', myApp.formToJSON('formproduto'), function (data) {

                        var login = controller.loginE.get();
                        if (controller.produto_adicionar.get() == null) {
                            login.meusitens.push(data);

                            controller.loginE.set(login);
                            controller.produto_adicionar.set(null);
                            creait.redirect('produto');
                        } else {
                            for (var i = 0; i < login.meusitens.length; i++) {
                                if (login.meusitens[i].id == controller.produto_adicionar.get().id) {
                                    login.meusitens[i].id = data.id;
                                    login.meusitens[i].nome = data.nome;
                                    login.meusitens[i].descricao = data.descricao;
                                    login.meusitens[i].valor = data.valor;
                                    login.meusitens[i].estoque = data.estoque;

                                    controller.loginE.set(login);
                                    controller.produto_adicionar.set(null);
                                    creait.redirect('produto');

                                    break;
                                }
                            }
                        }

                    });
                }
            });
        });
    },
    get: function () {
        if (window.localStorage["produto_adicionar"] == null)
            return null;
        return JSON.parse(window.localStorage["produto_adicionar"]);
    },
    set: function (data) {
        window.localStorage["produto_adicionar"] = JSON.stringify(data);
    }
};

function readFile() {

    var control = this;
    if (this.files && this.files[0]) {
        var files = this.files[0];
        var FR = new FileReader();
        var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
        FR.onload = function (e) {

            var img = new Image();

            img.src = e.currentTarget.result;

            img.onload = function () {
                var MAX_WIDTH = img.width;
                var MAX_HEIGHT = img.height;

                var porcent = ((800 * 100) / img.height);
                MAX_WIDTH = img.width * (porcent / 100);
                MAX_HEIGHT = img.height * (porcent / 100);

                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(this, 0, 0, width, height);


                var dataUrl = canvas.toDataURL();
                $("#foto").val(dataUrl.split(',')[1]);

                $("#foto_produto").css('background-image', 'url(' + dataUrl + ')');

            };

        };

        FR.readAsDataURL(this.files[0]);
    }
    else {
        alert("O arquivo é muito grande. Favor selecionar um arquivo com no máximo 5 mb");
    }

    if ((this.files[0].type != "image/jpeg") && (this.files[0].type != "image/png")) {
        alert("O Tipo de arquivo selecionado é inválido, selecione um formato válido (jpeg, png)");
    }

}