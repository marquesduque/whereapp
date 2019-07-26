<!DOCTYPE html>
<html>
<head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="
default-src 'self' data: gap:
    *;
script-src 'self' 'unsafe-inline' 'unsafe-eval'
    *;
style-src 'self' 'unsafe-inline' 'unsafe-eval'
    *;
media-src 'self' 'unsafe-inline' 'unsafe-eval'
    *;
font-src 'self' 'unsafe-inline' 'unsafe-eval'
    *;
">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="creait_licenca" content="yes">
    <link rel="apple-touch-icon" class="place_picture" href="<%= api.Models.db.place.picture %>" />
    <link rel="apple-touch-startup-image" class="place_picture" href="<%= api.Models.db.place.picture %>" />
    <link rel="shortcut icon" sizes="196x196" class="place_picture" href="<%= api.Models.db.place.picture %>">
    <link rel="shortcut icon" sizes="128x128" class="place_picture" href="<%= api.Models.db.place.picture %>">
    <meta property="og:url" class="og_url" content="http://<%= HttpContext.Current.Request.Url.DnsSafeHost%>" />
    <meta property="og:type" content="article" />
    <meta property="og:title" class="og_title" content="Aplicativo <%= api.Models.db.place.name %>" />
    <meta property="og:description" class="og_description" content="<%= api.Models.db.place.about %>" />
    <meta property="og:image" class="og_image" content="<%= api.Models.db.place.picture %>" />

    <!-- Your app title -->
    <title></title>
    <style id="rootcss">
    </style>

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,700' rel='stylesheet' type='text/css'>
    <!-- Path to Framework7 Library CSS, Material Theme -->
    <link rel="stylesheet" href="css/framework7.material.min.css">
    <!-- Path to Framework7 color related styles, Material Theme -->
    <link rel="stylesheet" href="css/framework7.material.colors.min.css">
    <!-- Slick Carousel -->
    <link rel="stylesheet" type="text/css" href="css/slick.css" />
    <link rel="stylesheet" type="text/css" href="css/slick-theme.css" />
    <!-- Path to your custom app styles-->
    <link rel="stylesheet" href="fonts/food/flaticon.css">
    <link href="fonts/f7/css/framework7-icons.css" rel="stylesheet" />
    <link href="fonts/ecommerce/flaticon.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/my-app.css">
    <link href="fonts/icomoon/style.css" rel="stylesheet" />
    <link href="loader/cube.css" rel="stylesheet" />
    <link href="loader/pizza.css" rel="stylesheet" />
    <link href="loader/coffee.css" rel="stylesheet" />
    <link href="loader/beer.css" rel="stylesheet" />
    <link href="loader/bol.css" rel="stylesheet" />
    <link href="loader/connect.css" rel="stylesheet" />
    <link href="loader/wine.css" rel="stylesheet" />
    <link href="loader/hamburger.css" rel="stylesheet" />
    <link href="loader/diamond.css" rel="stylesheet" />
    <link href="loader/peixe.css" rel="stylesheet" />
    <link href="css/effect/bonce.css" rel="stylesheet" />
    <link href="css/tooltip.css" rel="stylesheet" />
    <link href="css/custom.css" rel="stylesheet" />
    <link href="" rel="stylesheet" id="tema" />
    <link href="css/animate.css" rel="stylesheet" />
</head>
<body style="background-color: var(--dark-color); background-size: cover; background-repeat: no-repeat">
    <div class="fb-root"></div>
    <div style="display: none">
        <div class="fb-like" data-href="https://facebook.com/<%= api.Models.db.place.place_id %>" data-layout="button" data-action="recommend" data-size="large" data-show-faces="true" data-share="true"></div>

    </div>
    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar-overlay"></div>
    <!-- Panels overlay-->
    <div class="panel-overlay"></div>
    <!-- Left panel with reveal effect-->
    <div class="loader_on">
        <div class="container" style="width: 100%;">
            <div loader="altec" style="display: none; text-align: center;">
                <img class="animated bouncelogo" style="max-width: 200px; max-height: 200px" src="img/monitoramento/logo/azul.png" />
                <div class="animated bouncelogo" id="loader_message" style="font-size: 20px; font-weight: bold; color: var(--light-color);">
                    CARREGANDO
                </div>
            </div>
        </div>
    </div>
    <div id="notificacao">
        <div id="n-box">
            <div id="n-titulo">
                <img src="img/monitoramento/logo_mini.png">
                <span>Notificação</span>
                <a role="button" id="n-fecha">
                    <i class="icon f7-icons">close_round_fill</i>
                </a>
            </div>
            <div id="n-msg">
                <span></span>
            </div>
        </div>
    </div>
    <div id="left-menu" class="panel panel-right panel-reveal imagem-background" style="background-color: var(--primary-color); color: var(--primary-font-color)">
        <div id="menu_usuario" class="list-block list-menu fonte_branca" style="height: 100%; margin: 0px !important; display: none">
            <div href="#" class="close-panel" onclick="creait.redirect('perfil')" style="padding: 20px; background-color: var(--secondary-color); color: var(--secondary-font-color); cursor: pointer; height: 50px;">
                <span style="float: left; padding: 5px 10px 0px 0px;" class="icon-pencil2"></span>
                <div id="nomeUsuario" class="nomegarcom" style="font-size: 18px; font-weight: 700; text-transform: uppercase;">
                    NOME
                </div>
                <div style="font-size: 10px" class="email_user">
                </div>
                <div style="position: absolute; top: 5px; right: 5px; width: 25px; height: 25px;">
                    <div style="width: 100%; height: 100%; background-image: url(img/icones/logout.png); background-size: contain; background-repeat: no-repeat; background-position: center;" role="button"  onclick="localStorage.clear(); creait.redirect('login');"></div>
                </div>
            </div>
            <div style="height: calc(100% - 90px); overflow: auto">
                <ul id="notificacoes" style="display: none;">
                </ul>
                <div id="nao_tem_mensagem" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 65%; text-align: justify;">
                        <span style="">Voce não possui nenhuma notificação ou mensagem :(</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Views -->
    <div class="views" style="display: none">
        <!-- Your main view, should have "view-main" class -->
        <div class="view view-main">
            <!-- Pages container, because we use fixed navbar and toolbar, it has additional appropriate classes-->
            <div class="pages" style="">
                <!-- Page, "data-page" contains page name -->
                <div data-page="index" class="page navbar-fixed toolbar-fixed">
                    <!-- Scrollable page content -->
                    <div class="page-content" id="app-cover" style="background-size: cover">
                        <div class="clearfix"></div>
                        <div class="app-cover-content">
                            <div class="loader_off">
                                <div>
                                    <img class="logo" src="" style="max-width: 200px; border-radius: 10px; margin-top: 50px" />
                                </div>

                                <div class="index-titulo"></div>
                                <div style="position: relative; width: 120px; height: 50px; z-index: 99999999999999; top: 0px; margin: 0 auto">
                                    <a target="_blank" id="index_facebook" class="link external" href="#" style="background-image: url(img/facebook.svg); height: 50px; background-size: 100% 100%; max-width: 50px; width: 100%; float: right; margin-right: 10px"></a>
                                    <a target="_blank" id="index_whatsapp" class="link external" href="#" style="background-image: url(img/whatsapp.svg); height: 50px; background-size: 100% 100%; max-width: 50px; width: 100%; float: right; margin-right: 10px; border-radius: 100%"></a>
                                </div>
                                <div class="row" style="position: absolute; bottom: 0px; left: 0px; width: 100%">
                                    <div style="width: 100%; float: left; padding: 10px 20px">
                                        <div onclick="creait.redirect('endereco')" class="buton" style="height: 80px; line-height: 80px; padding: 0px; overflow: hidden; border-radius: 10px;">
                                            <div class="bgroxo">
                                                <img src="icons/delivery-man.svg" />
                                            </div>
                                            <div style="font-size: 16px; line-height: 30px; float: right; padding: 6px 14px;">
                                                ENTREGAR EM<br />
                                                <span style="font-size: 44px; font-weight: 700;">CASA</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style="width: 100%; float: left; padding: 10px 20px 20px 20px">
                                        <div onclick="creait.redirect('filial')" class="buton" style="height: 80px; line-height: 80px; padding: 0px; overflow: hidden; border-radius: 10px;">
                                            <div class="bgroxo">
                                                <img src="icons/shop.svg" />
                                            </div>
                                            <div style="font-size: 16px; line-height: 30px; float: right; padding: 6px 14px;">
                                                RETIRADA NA<br />
                                                <span style="font-size: 44px; font-weight: 700;">LOJA</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="scripts/index.js"></script>
    <!-- Jquery-->
    <script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
    <!-- Slick Carousel -->
    <script type="text/javascript" src="js/slick.min.js"></script>
    <!-- Path to Framework7 Library JS-->
    <script type="text/javascript" src="js/framework7.min.js"></script>
    <script src="js/jquery.maskedinput.min.js"></script>
    <script src="js/jquery.maskMoney.js"></script>
    <script type="text/javascript" src="js/qrcode/src/grid.js"></script>
    <script type="text/javascript" src="js/qrcode/src/version.js"></script>
    <script type="text/javascript" src="js/qrcode/src/detector.js"></script>
    <script type="text/javascript" src="js/qrcode/src/formatinf.js"></script>
    <script type="text/javascript" src="js/qrcode/src/errorlevel.js"></script>
    <script type="text/javascript" src="js/qrcode/src/bitmat.js"></script>
    <script type="text/javascript" src="js/qrcode/src/datablock.js"></script>
    <script type="text/javascript" src="js/qrcode/src/bmparser.js"></script>
    <script type="text/javascript" src="js/qrcode/src/datamask.js"></script>
    <script type="text/javascript" src="js/qrcode/src/rsdecoder.js"></script>
    <script type="text/javascript" src="js/qrcode/src/gf256poly.js"></script>
    <script type="text/javascript" src="js/qrcode/src/gf256.js"></script>
    <script type="text/javascript" src="js/qrcode/src/decoder.js"></script>
    <script type="text/javascript" src="js/qrcode/src/qrcode.js"></script>
    <script type="text/javascript" src="js/qrcode/src/findpat.js"></script>
    <script type="text/javascript" src="js/qrcode/src/alignpat.js"></script>
    <script type="text/javascript" src="js/qrcode/src/databr.js"></script>
    <script src="js/card.js"></script>
    <script src="js/d3.v3.min.js"></script>
    <script src="js/trianglify-min.js"></script>
    <script src="biblioteca.js"></script>
    <script src="js/pagseguro.js"></script>
    <!-- Path to your app js-->
    <script type="text/javascript" src="js/my-app.js"></script>
    <!--<script type="text/javascript" src="js/creait.min.js"></script>-->
    <script src="controllers/bundle.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIoBAvqfno0lFGhuzuuwqX0KmXRdr-10o" async defer></script>
    <%--<script type="text/javascript" src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"></script>--%>
    <script type="text/javascript" src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"></script>

    <script>
        var alerta = [];
        var notificacao = [];
        var notificacao_atual = {};
        var alerta_atual = {};


        if (window.location.href.indexOf("#!") == -1 || window.location.href.split("#!")[1].length == 0) {

            onloadpage(function () {
                creait.get('tipo', null, function (data) {
                    controller.tipo.set(data);
                    if (controller.login.get() == null) {
                        creait.redirect('login');
                    }
                    else {
                        creait.get('pessoas?email=' + controller.login.get().email + '&password=' + controller.login.get().senha, null, function (data) {
                            debugger;
                            controller.login.set(data);
                            creait.redirect('categoria');
                        });

                    }
                });
            });

        }

        function inIframe() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

        $("#num_cartao").on("blur", function () {
            var cardBin = "";
            for (var i = 0; i <= 5; i++) {
                cardBin += $("#num_cartao").val()[i];
            }
            PagSeguroDirectPayment.getBrand({
                cardBin: cardBin,
                success: function (response) {
                    $("#img_bandeira").attr("src", "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/42x20/" + response.brand.name + ".png");
                    $("#bandeira").val(response.brand.name);
                },
                error: function (response) {
                },
                complete: function (response) {
                }
            });
        });

        $("#finalizar_cc").click(function () {
            var valor = parseFloat($("#valor_doacao_ong").val()).toFixed(2);
            $('#nome_cc').toggleInputError($('#nome_cc').val() == '', 'Informe o nome impresso no cartao');
            $('#cpf_cc').toggleInputError($('#cpf_cc').val() == '', 'Informe o CPF do dono do cartao');
            $('#data_nasc_cc').toggleInputError($('#data_nasc_cc').val() == '', 'Informe a data de nascimento do dono do cartao');
            $('#telefone_cc').toggleInputError($('#telefone_cc').val() == '', 'Informe um telefone para contato');
            $('#num_cartao').toggleInputError($('#num_cartao').val() == '', 'Informe o numero do cartao');
            $('#cvv').toggleInputError($('#cvv').val() == '', 'Informe o Codigo de segurança');
            $('#exp_date').toggleInputError($('#exp_date').val() == '', 'Informe a data de validade do cartao');

            $('#cep_cobranca').toggleInputError($('#cep_cobranca').val() == '', 'Informe o cep');
            $('#estado_cobranca').toggleInputError($('#estado_cobranca').val() == '', 'Informe o estado');
            $('#cidade_cobranca').toggleInputError($('#cidade_cobranca').val() == '', 'Informe a cidade');
            $('#bairro_cobranca').toggleInputError($('#bairro_cobranca').val() == '', 'Informe o bairro');
            $('#rua_cobranca').toggleInputError($('#rua_cobranca').val() == '', 'Informe a rua');
            $('#numero_cobranca').toggleInputError($('#numero_cobranca').val() == '', 'Informe o numero');
            $('#complemento_cobranca').toggleInputError($('#complemento_cobranca').val() == '', 'Informe um complemento');

            if ($("#pagamento_cc .has-error").length == 0) {
                creait.loader(true);
                var hash;
                var card_token;
                PagSeguroDirectPayment.onSenderHashReady(function (response) {
                    if (response.status == 'error') {
                        creait.loader(false);
                        myApp.alert("Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!", "Aviso!");
                        return;
                    }
                    hash = response.senderHash;
                    PagSeguroDirectPayment.createCardToken({
                        cardNumber: $("#num_cartao").val(),
                        brand: $("#bandeira").val(),
                        cvv: $("#cvv").val(),
                        expirationMonth: $("#exp_date").val().split("/")[0],
                        expirationYear: $("#exp_date").val().split("/")[1],
                        success: function (response) {
                            card_token = response.card.token;

                            var item = "&itemId1=Doacao&itemDescription1=Doacao para a Ong&itemAmount1=" + valor + "&itemQuantity=1&";
                            var shipping = "&shippingAddressRequired=false";
                            var delivery = "false";
                            var balcao = "false";


                            //---PROD
                            var data = "paymentMode=default&paymentMethod=creditCard&currency=brl&extraAmount=0.00" + item + "senderName=" + controller.login.get().nome + "&senderCpf=" + controller.login.get().cpf.replace("-", "").replace(".", "").replace(".", "") + "&senderAreaCode=" + controller.login.get().celular.split("(")[1].split(")")[0] + "&senderPhone=" + controller.login.get().celular.split(" ")[1].replace("-", "") + "&senderEmail=" + controller.login.get().email + "&senderHash=" + hash + shipping + "&creditCardToken=" + card_token + "&installmentQuantity=1&installmentValue=" + valor + "&noInterestInstallmentQuantity=2&&creditCardHolderName=" + $("#nome_cc").val() + "&creditCardHolderCPF=" + $("#cpf_cc").val().replace("-", "").replace(".", "").replace(".", "") + "&creditCardHolderBirthDate=" + $("#data_nasc_cc").val() + "&creditCardHolderAreaCode=" + $("#telefone_cc").val().split("(")[1].split(")")[0] + "&creditCardHolderPhone=" + $("#telefone_cc").val().split(" ")[1].replace("-", "") + "&billingAddressStreet=" + $("#rua_cobranca").val() + "&billingAddressNumber=" + $("#numero_cobranca").val() + "&billingAddressComplement=" + $("#complemento_cobranca").val() + "&billingAddressDistrict=" + $("#bairro_cobranca").val() + "&billingAddressPostalCode=" + $("#cep_cobranca").val() + "&billingAddressCity=" + $("#cidade_cobranca").val() + "&billingAddressState=" + $("#estado_cobranca").val() + "&billingAddressCountry=BRA";
                            $.ajax({
                                type: 'post',
                                url: "https://ws.pagseguro.uol.com.br/v2/transactions?email=diretoria@ifdcontroladoria.com.br&token=336b2f7b-9402-4c70-809c-60f1dc9cc63e06442b8e48579505841f1a1a22f44a1ca278-4fa8-4b1b-a82b-fe8c77cbdbda",
                                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                contenttype: 'application/x-www-form-urlencoded; charset=utf-8',
                                data: data,
                                success: function (response) {
                                    creait.post('ong?comprador_id=' + controller.login.get().id + "&vendedor_id=" + controller.ong.get().id + "&total=" + valor + "&delivery=" + delivery + "&balcao=" + balcao, null, function (data) {
                                        creait.loader(false);
                                        myApp.aler("Doação realizada com sucesso", "", function () {
                                            creait.redirect("categoria");
                                        });
                                    });
                                },
                                error: function (e) {
                                    creait.loader(false);
                                    myApp.alert("Ocorreu um erro ao tentar finalizar a compra. Tente novamente mais tarde.", "");
                                }
                            });
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
                });
            }
        });
    </script>

    <div id="fb-root"></div>
</body>
</html>
