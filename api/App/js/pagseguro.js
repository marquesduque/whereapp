
var pagseguro = {
    hash: function (callback) {
        $.get('/api/pagseguro', null, function (data) {
            PagSeguroDirectPayment.setSessionId(data);

            PagSeguroDirectPayment.onSenderHashReady(function (response) {
                if (response != null) {
                    if (response.status == 'error') {
                        console.log(response.message);
                        return false;
                    }
                    window.localStorage['hash'] = response.senderHash;
                }
                callback(window.localStorage['hash']);
            });
        });
    },
    card_token: function (cartao, callback) {
        PagSeguroDirectPayment.createCardToken({
            cardNumber: cartao.numero,
            brand: cartao.bandeira,
            cvv: cartao.cvv,
            expirationMonth: cartao.expiracao.split("/")[0],
            expirationYear: cartao.expiracao.split("/")[1],
            success: function (response) {
                callback(response.card.token);
            },
            error: function (response) {
                creait.loader(false);
                myApp.alert("Cartão de Crédito Inválido", "Aviso!");
                return;
            },
            complete: function (response) {
                // Callback para todas chamadas.
            }
        });
    },
    plano: function (cartao) {
        pagseguro.hash(function (hash) {
            var documento = cartao.documento.replace("-", "").replace(".", "").replace(".", "");
            if (cartao.tipo == 'boleto') {
                var carrinho = controller.carrinho.get();
                carrinho.pessoa_id = controller.login.get().id;
                carrinho.nome = controller.login.get().nome;
                carrinho.nome_cartao = cartao.nome;
                carrinho.cpf = documento;
                carrinho.email = controller.login.get().email;
                carrinho.hash = hash;
                carrinho.tipo = "boleto";
                carrinho.telefone = controller.login.get().celular.replace("(", "").replace(")", "").replace("-", "");

                creait.post("pagseguro", carrinho, function (a) {
                    if (a == 0) {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro ao finalizar a compra. Tente novamente mais tarde!", "");

                    } else {
                        controller.carrinho.set(null);
                        creait.redirect('confirma_compra');
                    }
                });
            }
            else if (cartao.tipo == 'credito') {
                pagseguro.card_token(cartao, function (card_token) {
                    var carrinho = controller.carrinho.get();
                    carrinho.pessoa_id = controller.login.get().id;
                    carrinho.nome = cartao.nome;
                    carrinho.nome_cartao = cartao.nome;
                    carrinho.cpf = documento;
                    carrinho.cpf = cartao.documento.replace(" - ", "").replace(".", "").replace(".", "");
                    carrinho.email = controller.login.get().email;
                    carrinho.hash = hash;
                    carrinho.card_token = card_token;
                    carrinho.expiracao = cartao.expiracao;
                    carrinho.data_nascimento = cartao.data_nascimento;
                    carrinho.tipo = "credito";
                    carrinho.telefone = controller.login.get().celular.replace("(", "").replace(")", "").replace("-", "");

                    creait.post("pagseguro", carrinho, function (a) {
                        if (a == 0) {
                            creait.loader(false);
                            myApp.alert("Ocorreu um erro ao finalizar a compra verifique se os dados do cartão estão correto ou tente novamente mais tarde!", "");

                        } else {
                            controller.carrinho.set(null);
                            creait.redirect('confirma_compra');
                        }
                    });
                });
            }
            else {
                pagseguro.card_token(cartao, function (card_token) {
                    var assinat = {
                        pessoa_id: controller.login.get().id,
                        item_id: controller.detalhe_padrinho.get().id,
                        nome_assinatura: "Assinatura Mensal - pessoa: " + controller.login.get().id + " / " + controller.login.get().nome + " - item: " + controller.detalhe_padrinho.get().id + " - " + controller.detalhe_padrinho.get().nome,
                        valor_mensal: cartao.valor,
                        dia_cobranca: cartao.dia_cobranca,
                        plano: "",
                        nome_usuario: controller.login.get().nome,
                        email_usuario: controller.login.get().email,
                        telefone_usuario: controller.login.get().celular.replace("(", "").replace(")", "").replace("-", ""),
                        hash: hash,
                        cpf_usuario: documento,
                        rua: controller.login.get().rua,
                        numero: controller.login.get().numero,
                        complemento: controller.login.get().complemento == null ? "nt" : controller.login.get().complemento,
                        bairro: controller.login.get().bairro,
                        cep: controller.login.get().cep.replace("-", ""),
                        cidade: controller.login.get().cidade,
                        estado: controller.login.get().estado,
                        card_token: card_token,
                        nome_cartao: cartao.nome,
                        data_nascimento: cartao.data_nascimento
                    };

                    creait.post("assinatura", assinat, function (a) {
                        if (a == 0) {
                            creait.loader(false);
                            myApp.alert("ocorreu um erro ao finalizar a compra verifique se os dados do cartão estão correto ou tente novamente mais tarde!", "");

                        } else {
                            controller.carrinho.set(null);
                            creait.redirect('confirma_compra');
                        }
                    });
                });
            }
        });
    }
}