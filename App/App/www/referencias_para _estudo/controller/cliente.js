
controller.cliente = {
    init: function (events) {
        events({}, function (content) {


            $("#proximo").click(function () {

                debugger;
                var post = myApp.formToJSON("formconfir");

                $('[name="email"]').toggleInputError(post.email.replace(/ /g, '') == "", 'O email é obrigatório');
                $('[name="nome"]').toggleInputError(post.nome.replace(/ /g, '') == "", 'O nome é obrigatório');

                if (post.phone.replace(/ /g, '') == "" &&
                    post.cpf.replace(/ /g, '') == "") {
                    $('[name="phone"]').toggleInputError(post.phone.replace(/ /g, '') == "", 'O telefone é obrigatório');
                    $('[name="phone"]').toggleInputError(post.phone.replace(/ /g, '').length != 10 &&
                        post.phone.replace(/ /g, '').length != 11, 'Telefone inválido');
                }

                if ($('formconfir .has-error').length == 0) {
                    creait.post('confirmarcliente', post, function (data) {
                        controller.cliente.set(data);
                        if ($('#endereco_cliente').is(':visible')) {
                            creait.redirect("categoria");
                        }
                        else {
                            creait.redirect("endereco");
                        }
                    });
                }
            });

            $("#buscar").click(function () {
                if ($("#dados").val() == "" || $("#dados").val() == null) {
                    myApp.alert('Digite o Email, CPF ou Telefone do Cliente', 'Atenção!');
                }
                else {
                    creait.get('confirmarcliente?busca=' + $("#dados").val(), null, function (data) {

                        if (data != "0") {
                            //if ($("#dados").val().length == 14) {
                            //    $(".pessoaJ").css("display", "block");
                            //}
                            //else {
                            //    $(".pessoaJ").css("display", "none");
                            //}
                            debugger;

                            $('[name="id"]').val(data.id);
                            if (data.nome != null && data.nome.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #nome').val(data.nome);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #nome').attr('disabled', 'disabled');
                                }
                            }
                            if (data.email != null && data.email.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #email').val(data.email);

                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #email').attr('disabled', 'disabled');
                                }
                            }
                            if (data.cpf != null && data.cpf.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #cpf').val(data.cpf);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #cpf').attr('disabled', 'disabled');
                                }
                            }
                            if (data.rg != null && data.rg.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #rg').val(data.rg);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #rg').attr('disabled', 'disabled');
                                }
                            }
                            if (data.telefone != null && data.telefone.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #telefone').val(data.telefone);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #telefone').attr('disabled', 'disabled');
                                }
                            }
                            if (data.cnpj != null && data.cnpj.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #cnpj').val(data.cnpj);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #cnpj').attr('disabled', 'disabled');
                                }
                            }
                            if (data.razao_social != null && data.razao_social.replace(/ /g, '') != '') {
                                $('[data-page="confirmarCliente"] #razao_social').val(data.razao_social);
                                if (data.senha != null) {
                                    $('[data-page="confirmarCliente"] #razao_social').attr('disabled', 'disabled');
                                }
                            }

                            if (data.cnpj != null || data.cnpj != "" || data.razao_social != null || data.razao_social != "") {
                                $('[data-page="confirmarCliente"] #pj').click();
                            }
                            var endereco = {
                                adr_address: "",
                                cep: data.cep,
                                city: data.cidade,
                                country: data.pais,
                                delivery: true,
                                district: data.bairro,
                                formatted_address: "",
                                lat: data.lat,
                                lng: data.lng,
                                number: data.numero,
                                state: data.estado,
                                street: data.endereco,
                                valor: data.valor
                            }
                            if (endereco.street != "") {
                                $('#endereco_cliente').show();
                                $('#endereco_cliente').html(endereco.street + ", " + endereco.number + (endereco.bairro == null ? "" : " - " + endereco.bairro));
                                $('#endereco_cliente').unbind('click');
                                $('#endereco_cliente').click(function () {
                                    controller.cliente.set(data);
                                    creait.redirect("endereco");
                                });
                            }
                            else {

                                $('#endereco_cliente').hide();
                            }

                            controller.endereco.set(endereco);
                            debugger;
                            var filiais = controller.layout.get().filiais;
                            var filial_proxima = null;
                            $(filiais).each(function (a, b) {
                                if (data.filial_id == b.id) {
                                    filial_proxima = b;
                                }
                            });
                            controller.filial.set(filial_proxima);


                        } else {
                            $('[name="id"]').val('');
                            myApp.alert('Este usuário não possui cadastro', 'Atenção!');

                            $('[data-page="confirmarCliente"] #cpf').val("");
                            $('[data-page="confirmarCliente"] #telefone').val("");
                            $('[data-page="confirmarCliente"] #nome').val("");
                            $('[data-page="confirmarCliente"] #email').val("");
                            $('[data-page="confirmarCliente"] #rg').val("");
                            $('[data-page="confirmarCliente"] #cnpj').val("");
                            $('[data-page="confirmarCliente"] #razao_social').val("");
                            $('#endereco_cliente').hide();
                            $('#endereco_cliente').html('');
                            if ($('[data-page="confirmarCliente"] #dados').val().indexOf('@') != -1) {
                                $('[data-page="confirmarCliente"] #email').val($('[data-page="confirmarCliente"] #dados').val());
                            }
                            else if ($('[data-page="confirmarCliente"] #dados').val().indexOf(')') != -1) {
                                $('[data-page="confirmarCliente"] #telefone').val($('[data-page="confirmarCliente"] #dados').val());
                            }
                        }
                        $(".dadosCli").fadeIn(3000);
                        creait.loader(false);
                    });
                }
            });


            if (controller.cliente.get() != null) {
                $("#dados").val(controller.cliente.get().email);
                $("#buscar").click();
            }
        });
    },
    get: function () {
        if (window.localStorage["cliente"] == null)
            return null;
        return JSON.parse(window.localStorage["cliente"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["cliente"] = data;
        else
            window.localStorage["cliente"] = JSON.stringify(data);
    }
}