<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="api.BemVindo._default" %>

<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <title><%= api.Models.db.place.name %></title>
    <meta name="keywords" content="deplivery,aplicativo,app,aplicativo delivery,aplicativos,apps,apicativo de entrega " />
    <meta name="description" content="<%= api.Models.db.place.about %>">

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="shortcut icon" type="image/png" href="img/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Web Fonts  -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Raleway:100,200,300,400,500,700,800,900" rel="stylesheet" type="text/css">



    <link rel="apple-touch-icon" class="place_picture" href="<%= api.Models.db.place.picture %>" />
    <link rel="apple-touch-startup-image" class="place_picture" href="<%= api.Models.db.place.picture %>" />
    <link rel="shortcut icon" sizes="196x196" class="place_picture" href="<%= api.Models.db.place.picture %>">
    <link rel="shortcut icon" sizes="128x128" class="place_picture" href="<%= api.Models.db.place.picture %>">

    <meta property="og:url" class="og_url" content="http://<%= HttpContext.Current.Request.Url.DnsSafeHost%>" />
    <meta property="og:type" content="article" />
    <meta property="og:title" class="og_title" content="Aplicativo <%= api.Models.db.place.name %>" />
    <meta property="og:description" class="og_description" content="<%= api.Models.db.place.about %>" />
    <meta property="og:image" class="og_image" content="<%= api.Models.db.place.picture %>" />
    <link href="css/responsivo.css" rel="stylesheet" />

    <!-- Libs CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/v-nav-menu.css" rel="stylesheet" />
    <link href="css/v-animation.css" rel="stylesheet" />
    <link href="css/v-bg-stylish.css" rel="stylesheet" />
    <link href="css/v-shortcodes.css" rel="stylesheet" />
    <link href="css/theme-responsive.css" rel="stylesheet" />
    <link href="plugins/owl-carousel/owl.theme.css" rel="stylesheet" />
    <link href="plugins/owl-carousel/owl.carousel.css" rel="stylesheet" />

    <!-- Current Page CSS -->
    <link href="plugins/rs-plugin/css/settings.css" rel="stylesheet" />
    <link href="plugins/rs-plugin/css/custom-captions.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
    <style>
        nav li a {
            color: #555 !important;
        }
    </style>
</head>

<body class="no-page-top">

    <!--Header-->
    <!--Set your own background color to the header-->
    <header class="semi-transparent-header" data-bg-color="white" data-font-color="#fff">
        <div class="container">

            <!--Site Logo-->
            <div class="logo" data-sticky-logo="img/logo-white.png" data-normal-logo="img/logo.png">
                <a href="index.html">
                    <img alt="Venue" src="img/logo.png" data-logo-height="35">
                </a>
            </div>
            <!--End Site Logo-->

            <div class="navbar-collapse nav-main-collapse collapse">



                <!--Main Menu-->
                <nav class="nav-main mega-menu one-page-menu">
                    <ul class="nav nav-pills nav-main" id="mainMenu">

                        <li>
                            <a data-hash href="#features" style="color: #555"><i class="fa fa-fire"></i>Soluções</a>
                        </li>
                        <li>
                            <a data-hash href="#why-us" style="color: #555"><i class="fa fa-location-arrow"></i>Sua melhor opção</a>
                        </li>
                        <li>
                            <a data-hash href="#describe" style="color: #555"><i class="fa fa-flash"></i>Sobre o CreApp</a>
                        </li>
                        <!--<li>
                            <a data-hash href="#services" style="color:#555"><i class="fa fa-th-list"></i>Planos</a>
                        </li>-->
                        <li>
                            <a data-hash href="#screenshots" style="color: #555"><i class="fa fa-mobile"></i>Screenshots</a>
                        </li>


                    </ul>
                </nav>
                <!--End Main Menu-->
            </div>
            <button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">
                <i class="fa fa-bars"></i>
            </button>
        </div>
    </header>
    <!--End Header-->

    <div id="container">
        <div style="background-image: url(img/slider/image2.png); width: 100%; background-position: center; background-size: cover; padding: 20px">
            <img src="img/iphone2.png" style="width: 35%; float: left; max-width: 350px" />
            <div style="width: calc(65% - 13px); float: right; font-size: 4vw; line-height: 6vw; text-align: center; font-weight: 600; color: rgb(255, 255, 255); background-color: transparent; letter-spacing: 1px; text-shadow: rgba(0, 0, 0, 0.15) 2px 2px 2px; font-family: Raleway; margin-left: 10px; padding-top: 10px">
                Venda mais com
seu próprio aplicativo
                <div style="clear: both"></div>
                <div id="intro_stores" style="margin: 0 auto; margin: 20px auto; width: 100%; max-width: 600px">
                    <img src="/criaraplicativo/img/app-store.svg" />
                    <img src="/criaraplicativo/img/google-play.svg" />
                    <div style="clear: both"></div>
                </div>
                <div>
                    <a href='/CriarAplicativo' class="btn v-btn v-second-light" style="font-size: 4vw; width: 100%;">CRIAR APP</a>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>

        <div class="v-page-wrap no-bottom-spacing">

            <div class="container">
                <div class="v-spacer col-sm-12 v-height-small"></div>
            </div>

            <!--Features-->
            <div class="container" id="features">

                <div class="row center">

                    <div class="col-sm-12">
                        <p class="v-smash-text-large-2x">
                            <span>Aplicativo multiplataforma para o seu negócio</span>
                        </p>
                        <div class="horizontal-break"></div>
                        <p class="lead" style="color: #999;">
                            Sua empresa ao alcance dos seus clientes a qualquer hora e em qualquer lugar
                        </p>
                    </div>
                    <div class="v-spacer col-sm-12 v-height-standard"></div>
                </div>

                <div class="row features">

                    <div class="col-md-4 col-sm-4">
                        <div class="feature-box left-icon v-animation pull-top" data-animation="fade-from-left" data-delay="300">
                            <div class="feature-box-text">
                                <h3>Venda em tempo real</h3>
                                <div class="feature-box-text-inner">
                                    Venda mais através de seu próprio aplicativo. Acompanhe em tempo real suas vendas, fuja das taxas abusivas das app stores.
                                </div>
                            </div>
                        </div>
                        <div class="v-spacer col-sm-12 v-height-standard"></div>

                        <div class="feature-box left-icon v-animation pull-top" data-animation="fade-from-left" data-delay="300">
                            <div class="feature-box-text">
                                <h3>Conhecer melhor e gerenciar os clientes</h3>
                                <div class="feature-box-text-inner">
                                    Com o perfil cliente você pode conhecer melhor quem está comprando, com nosso sistema de gestão inteligente você pode personalizar, ofertar e fidelizar seus cliente.
                                </div>
                            </div>
                        </div>

                        <div class="v-spacer col-sm-12 v-height-standard"></div>

<%--                        <div class="feature-box left-icon v-animation" data-animation="fade-from-left" data-delay="600">
                            <div class="feature-box-text">
                                <h3>Notificações Push direto na tela dos seus clientes</h3>
                                <div class="feature-box-text-inner">
                                    Com Notificações Push você envia mensagens diretamente no celular dos clientes. O canal ideal para ofertas especiais, menu do dia, dicas de eventos e etc.
                                </div>
                            </div>
                        </div>--%>

                        <div class="v-spacer col-sm-12 v-height-standard"></div>

                        <div class="feature-box left-icon v-animation" data-animation="fade-from-left" data-delay="900">
                            <div class="feature-box-text">

                                <div class="feature-box-text-inner">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 col-sm-4">
                        <img class="img-responsive phone-image v-animation" data-animation="fade-from-bottom" data-delay="250" src="img/landing/single-iphone.png" />
                    </div>

                    <div class="col-md-4 col-sm-4">
                        <div class="feature-box left-icon v-animation pull-top" data-animation="fade-from-right" data-delay="300">
                            <div class="feature-box-text">
                                <h3>Modular</h3>
                                <div class="feature-box-text-inner">
                                    Monte seu aplicativo por módulos de acordo com a necessidade da sua empresa!
                                </div>
                            </div>
                        </div>

                        <div class="v-spacer col-sm-12 v-height-standard"></div>

<%--                        <div class="feature-box left-icon v-animation" data-animation="fade-from-right" data-delay="600">
                            <div class="feature-box-text">
                                <h3>Novidades, ofertas, agendamento, reservas e mais</h3>
                                <div class="feature-box-text-inner">
                                    Comunicação e interação entre a sua empresa e o seus clientes com o seu próprio aplicativo. Com mais de 30 módulos, nosso criador de aplicativos oferece funções para empresas de todos os setores.
                                </div>
                            </div>
                        </div>--%>

                        <div class="v-spacer col-sm-12 v-height-standard"></div>

                        <div class="feature-box left-icon v-animation" data-animation="fade-from-right" data-delay="600">
                            <div class="feature-box-text">
                                <h3>WebApp + App Android e IOS</h3>
                                <div class="feature-box-text-inner">
                                    A CREAPP combina tecnologia, inovação e facilidade. A presença online completa da sua empresa criada e gerenciada em uma só plataforma.
                                </div>
                            </div>
                        </div>

                        <div class="v-spacer col-sm-12 v-height-standard"></div>

                        <div class="feature-box left-icon v-animation" data-animation="fade-from-right" data-delay="900">
                            <div class="feature-box-text">
                                <div class="feature-box-text-inner">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center">
                    <a href='/CriarAplicativo' class="btn v-btn v-second-light" style="font-size: 2vw; background-color: #2bb8c7 !important; margin: 0px auto">CRIAR APLICATIVO</a>
                </div>
            </div>
            <!--End Features-->

            <div class="container">
                <div class="v-spacer col-sm-12 v-height-standard"></div>
            </div>

            <!--Why Us-->
            <div class="v-parallax v-bg-stylish v-bg-stylish-v4 no-shadow" id="why-us">
                <div class="container">
                    <div class="row app-brief" style="text-align: center">

                        <p class="v-smash-text-large-2x pull-top">
                            <span>Por que adquirir o CreApp?</span>
                            <div>Seu aplicativo funcionará em celulares, tablets e computadores</div>
                        </p>

                        <figure class="resize-box">
                            <div class="webcam"></div>
                            <div class="device-border">
                                <div class="screen-mask">
                                    <svg class="resizable" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                                        y="0px" width="506px" height="371.849px" viewBox="0 0 506 371.849">
                                        <g class="body">
                                            <rect class="nav-dark" fill="#12838f" width="26.5%" height="29.021" viewBox="0 0 506 371.849" />
                                            <rect class="nav-light" x="143" fill="#2bb8c7" width="72%" height="29.021" />
                                            <rect class="hero" y="40" fill="#2bb8c7" width="364" height="124.011" />
                                            <rect class="project proj-3" x="248.477" y="175.011" fill="#2bb8c7" width="115.523" height="105" />
                                            <rect class="caption" y="290.011" fill="#2bb8c7" width="364" height="49" />
                                            <rect class="etc" y="351.24" fill="#2bb8c7" width="364" height="20.608" />
                                            <rect class="project proj-2" x="123.989" y="175.011" fill="#2bb8c7" width="115.523" height="105" />
                                            <rect class="project proj-1" y="175.011" fill="#2bb8c7" width="115.523" height="105" />
                                        </g>
                                        <rect class="sidebar side-1" x="374" y="40" fill="#C4C4C4" width="132" height="124.011" />
                                        <rect class="sidebar side-2" x="374" y="174.011" fill="#C4C4C4" width="132" height="56" />
                                        <rect class="sidebar side-3" x="374" y="241.011" fill="#C4C4C4" width="132" height="130.838" />
                                    </svg>
                                </div>
                            </div>
                        </figure>

                        <p class="v-smash-text-large-2x pull-top">
                            <img src="../images/premium.svg" style="width: 80px" /><br />
                            Assine o plano premium<br />
                            GANHE GRÁTIS
                        </p>


                        <div class="v-spacer col-sm-12 v-height-small"></div>

                        <ul class="v-list-v2">

                            <%--5.000 mil Push Notification
Site Responsivo
PDV para realisar vendas fora do aplicativo
Gerenciador de produtos
Gerenciador de estoque
Visualizaçao de pedidos em tempo real
Roteiro de entregas para otimizar a rota de entrega
Lista de email marketing segmentada
Suporte por email
Suporte por telefone
Layout Personalizado
Treinamento--%>

       <%--                     <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">5.000 mil Push Notification                        </span></li>--%>
               <%--             <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Site Responsivo                                    </span></li>--%>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">PDV para realizar vendas fora do aplicativo        </span></li>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Gerenciador de produtos                            </span></li>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Gerenciador de estoque                             </span></li>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Visualizaçao de pedidos em tempo real              </span></li>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Roteiro de entregas para otimizar a rota de entrega</span></li>
        <%--                    <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Lista de email marketing segmentada                </span></li>--%>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Suporte por whatsapp                                  </span></li>
         <%--                   <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Suporte por telefone                               </span></li>--%>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Layout Personalizado                               </span></li>
                            <li class="v-animation" data-animation="fade-from-right" data-delay="150"><i class="fa fa-check"></i><span class="v-lead">Treinamento                                        </span></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--End Why Us-->
        <!--Describe-->
        <div class="v-parallax v-bg-stylish" id="describe">
            <div class="container">
                <div class="row app-brief">

                    <div class="col-sm-6">
                        <p class="v-smash-text-large-2x pull-top">
                            <span>Sobre o CreApp</span>
                        </p>
                        <div class="horizontal-break left"></div>
                        <p class="v-lead">
                            O CreApp é um aplicativo em módulos, pensado para suprir as necessidades das empresas que querem se incluir no mundo digital e
                                melhorar seu posicionamento no mercado através das novas tendências com um ótimo custo benefício. Com poucos cliques
                                você pode adquirir um app feito sob medida para o seu negócio. Crie agora seu aplicativo e coloque sua empresa na era mobile!
                                <div style="clear: both"></div>
                            <a href='/CriarAplicativo' class="btn v-btn v-second-light" style="font-size: 2vw; background-color: #2bb8c7 !important; margin: 0px auto; margin-top: 20px">CRIAR APLICATIVO</a>
                        </p>

                        <p class="v-lead">
                        </p>
                    </div>

                    <div class="col-sm-6">
                        <img class="img-responsive phone-image v-animation" data-animation="fade-from-left" data-delay="250" src="img/landing/2-iphone-left.png" />
                    </div>
                </div>
            </div>
        </div>
        <!--End Describe-->
        <!--Services-->
        <!--<div class="v-parallax v-parallax-video v-bg-stylish" id="services" style="background-image: url(img/slider/slider4.jpg);">
                <div class="container">
                    <div class="row" style="font-size:50px; color:white; text-align:center">
                        <div class="v-bg-overlay overlay-colored"></div>                        Planos a partir de R$ 90 reais mês
                    </div>
                </div>
            </div>-->
        <!--End Services-->
        <!--Screenshots-->
        <div class="v-parallax v-bg-stylish v-bg-stylish-v4 no-shadow" id="screenshots">
            <div class="container">
                <div class="row center">
                    <div class="col-sm-12">
                        <p class="v-smash-text-large-2x">
                            <span>Screenshots</span>
                        </p>
                        <div class="horizontal-break"></div>
                        <p class="lead" style="color: #999;">
                        </p>
                    </div>
                    <div class="v-spacer col-sm-12 v-height-standard"></div>
                </div>

                <div class="row">
                    <div class="col-sm-12">

                        <div class="carousel-wrap">

                            <div class="owl-carousel" data-plugin-options='{"items": 4, "singleItem": false, "pagination": true}'>
                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/1.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/1.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/2.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/2.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/3.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/3.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/4.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/4.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/5.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/5.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>

<%--                                <div class="item">
                                    <figure class="lightbox animated-overlay overlay-alt clearfix">
                                        <img src="img/landing/6.jpg" class="attachment-full">
                                        <a class="view" href="img/landing/6.jpg" rel="image-gallery"></a>
                                        <figcaption>
                                            <div class="thumb-info">

                                                <i class="fa fa-eye"></i>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Screenshots-->
        <!--Download-->
        <div class="v-parallax v-bg-stylish v-bg-stylish-v10" id="download" style="background-image: url(img/slider/slider4.jpg);">

            <div class="container">
                <div class="row center">

                    <div class="col-sm-12">

                        <div class="v-content-wrapper">
                            <p class="v-smash-text-large-2x">
                                <span>Entre em contato com nossa equipe!</span>
                            </p>
                            <div class="v-spacer col-sm-12 v-height-standard"></div>

                            <p class="lead" style="color: #fff;">
                                <a target="_blank" href="https://api.whatsapp.com/send?phone=5511961207705&text=Ol%C3%A1%20Marco%20gostaria%20de%20saber%20mais%20sobre%20a%20CREAPP.">
                                    <img src="img/whatsapp.svg" width="50">
                                    <b style="color: #fff">Whatsapp: +55 11 96120-7705 </b>
                                </a>
                            </p>

                        </div>

                    </div>

                    <div class="v-bg-overlay overlay-colored"></div>
                </div>
            </div>
        </div>

        <!--Footer-Wrap-->
        <div class="footer-wrap">
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-4">
                            <section class="widget">
                                <img alt="Venue" src="img/logo-white.png" style="height: 40px; margin-bottom: 20px;">
                                <p class="pull-bottom-small">
                            </section>
                        </div>
                        <div class="col-sm-8">
                            <section class="widget">
                                <div class="widget-heading">
                                    <h4>Fale com a gente</h4>
                                </div>
                                <div class="footer-contact-info">
                                    <ul>
                                        <li></li>
                                        <li>
                                            <p><i class="fa fa-map-marker"></i>Emilio Mallet, 317, Sala 213 - Tatuapé - São Paulo/SP </p>
                                        </li>
                                        <!--<li>
                                                <p><i class="fa fa-envelope"></i><strong>Email:</strong> <a href="mailto:contato@pp.delivery">contato@creapp.com.br</a></p>
                                            </li>-->
                                        <li>
                                            <p><i class="fa fa-phone"></i>+55 11 2372-2070</p>
                                        </li>
                                    </ul>
                                    <br />


                                </div>
                            </section>
                        </div>

                        <!--<div class="col-sm-3">
                                <section class="widget">
                                    <div class="widget-heading">
                                        <h4>Redes Sociais<h4>
                                    </div>

                                    <ul class="social-icons standard">
                                        <li class="twitter"><a href="#" target="_blank"><i class="fa fa-twitter"></i><i class="fa fa-twitter"></i></a></li>
                                        <li class="facebook"><a href="#" target="_blank"><i class="fa fa-facebook"></i><i class="fa fa-facebook"></i></a></li>

                                        <li class="youtube"><a href="#" target="_blank"><i class="fa fa-youtube"></i><i class="fa fa-youtube"></i></a></li>
                                        <li class="googleplus"><a href="#" target="_blank"><i class="fa fa-google-plus"></i><i class="fa fa-google-plus"></i></a></li>

                                    </ul>
                                </section>
                            </div>-->
                    </div>
                </div>
            </footer>

            <div class="copyright">
                <div class="container">
                    <p>© Copyright 2017 by Creait. Todos direitos reservados.</p>
                    <nav class="footer-menu std-menu"></nav>
                </div>
            </div>
        </div>
        <!--End Footer-Wrap-->
    </div>

    <!--// BACK TO TOP //-->
    <div id="back-to-top" class="animate-top"><i class="fa fa-angle-up"></i></div>

    <!-- Libs -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.flexslider-min.js"></script>
    <script src="js/jquery.easing.js"></script>
    <script src="js/jquery.fitvids.js"></script>
    <script src="js/jquery.carouFredSel.min.js"></script>
    <script src="js/theme-plugins.js"></script>
    <script src="js/jquery.isotope.min.js"></script>
    <script src="js/imagesloaded.js"></script>

    <script src="js/view.min.js?auto"></script>

    <script src="plugins/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
    <script src="plugins/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>

    <script src="js/theme-core.js"></script>

    <script src="https://assets.pagar.me/pagarme-js/3.0/pagarme.min.js"></script>
    <script src="js/pagamento.js"></script>
</body>
</html>
