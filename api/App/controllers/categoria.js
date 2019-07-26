controller.categoria = {
    init: function (events) {
        events({}, function (content) {

            if (controller.login.get().num_notificacao > 0) {
                $("#numero_not").html(controller.login.get().num_notificacao);
                $("#numero_not").css("display", "flex");
            } else {
                $("#numero_not").css("display", "none");
            }

            $(".imagem_divisor").css("height", $(".imagem_divisor").innerWidth());
            

            if (controller.login.get().notificacoes.length == 0) {
                $('#nao_tem_mensagem').css('display', 'flex');
                $('#notificacoes').css('display', 'none');
            } else {
                $('#nao_tem_mensagem').css('display', 'none');
                $('#notificacoes').css('display', 'block');

                var html = '';
                for (var i = 0; i <= controller.login.get().notificacoes.length; i++) {
                    if (i == controller.login.get().notificacoes.length) {
                        $('#notificacoes').html(html);
                    } else {
                        html +=
                            '<li class="produtoli grid-item-m swipeout notify" mensagem="' + controller.login.get().notificacoes[i].mensagem + '" notificacao_id="' + controller.login.get().notificacoes[i].id + '" style="position: relative;">' +
                            '   <div class="lido' + controller.login.get().notificacoes[i].lido + '"></div>' +
                            '   <div class="item-title-row">' +
                            '       <div class="titulo_produto item-title" style="text-align: right;">' + controller.login.get().notificacoes[i].data + '</div>' +
                            '       <div style="padding: 0px 10px; text-align: left;">' + controller.login.get().notificacoes[i].mensagem_previa + '</div>' +
                            '   </div>' +
                            '   <div style="clear:both"></div>' +
                            '</li>';
                    }
                }
            }

            $(".notify").click(function () {
                var notificacao_id = $(this).attr("notificacao_id");
                var mensagem = $(this).attr("mensagem");
                myApp.alert(mensagem, "", function () {
                    $.ajax({
                        url: "/api/notificacao?notificacao_id=" + notificacao_id,
                        method: 'POST',
                        dataType: 'json',
                        async: true,
                        success: function (data) {
                            var d = controller.login.get();
                            for (var i = 0; i < d.notificacoes.length; i++) {
                                if (d.notificacoes[i].id == notificacao_id) {
                                    d.notificacoes[i].lido = 1;
                                    d.num_notificacao -= 1;

                                    controller.login.set(d);
                                    break;
                                }
                            }
                            myApp.views[0].router.refreshPage();
                        }, error: function (e) {
                            console.log(e);
                        }
                    });
                });
            });
        });
    },
    get: function () {
        if (window.localStorage["categoria"] == null)
            return null;
        return JSON.parse(window.localStorage["categoria"]);
    },
    set: function (data) {
        window.localStorage["categoria"] = JSON.stringify(data);
    }
};