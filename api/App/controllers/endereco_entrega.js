controller.endereco_entrega = {
    init: function (events) {
        events({}, function (content) {
            $(".endereco_entrega").click(function () {
                if ($(this).attr("valor") == 0) {
                    $("#endereco_novo").css("display", "block");
                    $('#estado').val(controller.login.get().estado);
                    $('#cidade').val(controller.login.get().cidade);
                    $('#bairro').val(controller.login.get().bairro);
                    $('#rua').val(controller.login.get().rua);
                    $('#numero').val(controller.login.get().numero);
                    $('#cep').val(controller.login.get().cep);
                    $('#complemento').val(controller.login.get().complemento);
                } else if ($(this).attr("valor") == 1) {
                    $("#endereco_novo").css("display", "block");
                    $('#estado').val("");
                    $('#cidade').val("");
                    $('#bairro').val("");
                    $('#rua').val("");
                    $('#numero').val("");
                    $('#cep').val("");
                    $('#complemento').val("");
                } else {
                    $("#endereco_novo").css("display", "none");
                }
            });

            $("#ir_forma_pagamento").click(function () {
                var carrinho = controller.carrinho.get();

                if ($("#endereco_novo").css("display") == "block") {
                    
                    $('#rua').toggleInputError($('#rua').val() == '', 'Informe a rua');
                    $('#numero').toggleInputError($('#numero').val() == '', 'Informe o numero');
                    $('#complemento').toggleInputError($('#complemento').val() == '', 'Informe um complemento');
                    $('#bairro').toggleInputError($('#bairro').val() == '', 'Informe o bairro');
                    $('#cep').toggleInputError($('#cep').val() == '', 'Informe o cep');
                    $('#cidade').toggleInputError($('#cidade').val() == '', 'Informe a cidade');
                    $('#estado').toggleInputError($('#estado').val() == '', 'Selecione o estado');

                    if ($("#endereco_novo .has-error").length == 0) {
                        carrinho.endereco_bool = true;
                        carrinho.rua_entrega = $("#rua").val();
                        carrinho.numero_entrega = $("#numero").val();
                        carrinho.complemento_entrega = $("#complemento").val();
                        carrinho.bairro_entrega = $("#bairro").val();
                        carrinho.cep_entrega = $("#cep").val().replace("-", "");
                        carrinho.cidade_entrega = $("#cidade").val();
                        carrinho.estado_entrega = $("#estado").val();
                    } else {
                        return;
                    }
                    
                }

                controller.carrinho.set(carrinho);

                creait.redirect('forma_pagamento');
            });
        });
    },
    get: function () {
        if (window.localStorage["endereco_entrega"] == null)
            return null;
        return JSON.parse(window.localStorage["endereco_entrega"]);
    },
    set: function (data) {
        window.localStorage["endereco_entrega"] = JSON.stringify(data);
    }
};