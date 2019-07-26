<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="api.App.index" %>

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
            <div loader="bol" style="display: none">
                <div class="view">
                    <div class="plane main">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <div loader="sushi" id="sushi" style="display: none">
                <img src="loader/sushi.gif" />
                <div class="text_loader">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>
            <div loader="coffee" style="display: none">

                <div class="aligner">
                    <div class="aligner-item coffee-container">
                        <div class="steam-container">
                            <div class="squiggle-container squiggle-container-1">
                                <div class="squiggle">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 28.1 80.6" style="enable-background: new 0 0 28.1 80.6;" xml:space="preserve">
                                        <path class="" fill="none" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                                    </svg>
                                </div>
                                <!-- end .squiggle-->
                            </div>
                            <div class="squiggle-container squiggle-container-2">
                                <div class="squiggle">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 28.1 80.6" style="enable-background: new 0 0 28.1 80.6;" xml:space="preserve">
                                        <path class="" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                                    </svg>
                                </div>
                                <!-- end .squiggle-->
                            </div>
                            <div class="squiggle-container squiggle-container-3">
                                <div class="squiggle">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 28.1 80.6" style="enable-background: new 0 0 28.1 80.6;" xml:space="preserve">
                                        <path class="" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-miterlimit="10" d="M22.6,75.1c-8-5.6-15.2-10.5-15.2-19.9c0-12.1,14.1-17.2,14.1-29.6c0-9.1-6.7-15.7-16-20.1" />
                                    </svg>
                                </div>
                                <!-- end .squiggle-->
                            </div>
                        </div>
                        <div class="coffee-cup-container">
                            <svg class="coffee-cup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.15 31">
                                <defs>
                                    <style>
                                        .a {
                                            fill: #fe6155;
                                        }

                                        .b {
                                            fill: #5d5d5d;
                                        }
                                    </style>
                                </defs>
                                <path class="a" d="M30.06,2V23.75c0,2.63-.87,5.13-5.12,5.13H7.06A4.86,4.86,0,0,1,2,23.81V2H30.06Z" transform="translate(0 -0.06)" />
                                <path class="b" d="M40.64,9.52a10.2,10.2,0,0,0-8.64-5V0.06H0V23.81a7,7,0,0,0,7.06,7.24H24.94c2.34,0,6.06-.81,6.93-5.18a10.6,10.6,0,0,0,8.89-5.29A11.29,11.29,0,0,0,40.64,9.52ZM28,23.75c0,2.07-.42,3.31-3.06,3.31H7.06A3,3,0,0,1,4,23.81V4.06H28V23.75Zm9.26-5.17A7.13,7.13,0,0,1,32,21.78V8.45a7,7,0,0,1,5.18,3.1A7.24,7.24,0,0,1,37.26,18.58Z" transform="translate(0 -0.06)" />
                            </svg>

                        </div>
                    </div>
                    <!-- end coffee-container -->
                </div>
                <!-- end aligner -->

                <div class="text_loader">
                    <div style="font-size: 30px;">CARREGANDO</div>
                </div>
            </div>
            <div loader="connect" style="width: 100%; height: 100%; background-color: black">

                <div class="box">
                    <div class="comp"></div>
                    <div class="loader"></div>
                    <div class="con"></div>
                    <div class="byte"></div>
                    <div class="server"></div>
                    <div class="text" style="margin-top: 90px">
                        CONECTANDO
                    </div>
                </div>
            </div>

            <div loader="hamburger" id="hamburger" style="display: none">
                <img src="loader/hamburger.gif" />
                <div class="text_loader">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>
            <div loader="laranja" id="laranja" style="display: none">
                <img src="loader/laranja.gif" />
                <div class="text_loader">
                    <div style="font-size: 20px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>

            <div loader="medical" id="loader" style="display: none">
                <svg class="ldi-y58xdk" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <!--?xml version="1.0" encoding="utf-8"?-->
                    <!--Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)-->
                    <svg version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="transform-origin: 50px 50px 0px;" xml:space="preserve">
                        <g style="transform-origin: 50px 50px 0px;">
                            <g fill="rgb(0, 0, 0)" style="fill: rgb(0, 0, 0); transform-origin: 50px 50px 0px; transform: scale(0.6);">
                                <g style="transform-origin: 50px 50px 0px;">
                                    <g fill="rgb(0, 0, 0)" style="fill: rgb(0, 0, 0);">
                                        <style type="text/css" class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -1s; animation-direction: normal;">
                                            .st0, .st1 {
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st0 {
                                                fill: #e0e0e0;
                                                stroke: #333
                                            }

                                            .st1 {
                                                opacity: .2;
                                                stroke: #000;
                                                stroke-linejoin: round
                                            }

                                            .st2 {
                                                fill: #333
                                            }

                                            .st3, .st4 {
                                                fill: #a7a6a3;
                                                stroke: #333;
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st4 {
                                                fill: #fefefe
                                            }

                                            .st5 {
                                                fill: #e0e0e0
                                            }

                                            .st6 {
                                                fill: #66503a;
                                                stroke-miterlimit: 10
                                            }

                                            .st6, .st7, .st8 {
                                                stroke: #333;
                                                stroke-width: 3.5
                                            }

                                            .st7 {
                                                stroke-miterlimit: 10;
                                                fill: #cfcfcf
                                            }

                                            .st8 {
                                                fill: #e15b64
                                            }

                                            .st10, .st11, .st8, .st9 {
                                                stroke-miterlimit: 10
                                            }

                                            .st9 {
                                                opacity: .2;
                                                stroke: #000;
                                                stroke-width: 3.5
                                            }

                                            .st10, .st11 {
                                                fill: none;
                                                stroke: #a0c8d7;
                                                stroke-width: 2.6737
                                            }

                                            .st11 {
                                                stroke: #e0e0e0;
                                                stroke-width: 7.2641;
                                                stroke-linecap: round
                                            }

                                            .st12 {
                                                fill: #f47e60
                                            }

                                            .st13 {
                                                fill: #e15b64
                                            }

                                            .st14, .st15 {
                                                fill: #fff;
                                                stroke: #e15b64;
                                                stroke-width: 3.1455;
                                                stroke-miterlimit: 10
                                            }

                                            .st15 {
                                                fill: none;
                                                stroke-width: 3;
                                                stroke-linecap: round
                                            }

                                            .st16 {
                                                fill: #77a4bd
                                            }

                                            .st17 {
                                                fill: #849b87
                                            }

                                            .st18 {
                                                fill: none;
                                                stroke: #e0e0e0;
                                                stroke-width: 4;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st19 {
                                                fill: #666
                                            }

                                            .st20 {
                                                fill: #f5e169;
                                                stroke: #333;
                                                stroke-width: 4;
                                                stroke-miterlimit: 10
                                            }

                                            .st21 {
                                                fill: #f5e6c8
                                            }

                                            .st22 {
                                                fill: #c33737
                                            }

                                            .st23 {
                                                fill: #a0c8d7
                                            }

                                            .st24 {
                                                fill: #f5e169
                                            }

                                            .st25, .st26, .st27 {
                                                fill: #333;
                                                stroke: #333;
                                                stroke-width: 4;
                                                stroke-miterlimit: 10
                                            }

                                            .st26, .st27 {
                                                fill: #a0c8d7
                                            }

                                            .st27 {
                                                fill: none;
                                                stroke: #e0e0e0;
                                                stroke-width: 6;
                                                stroke-linecap: round
                                            }

                                            .st28 {
                                                fill: #b3b3b3
                                            }

                                            .st29, .st30 {
                                                fill: #fff;
                                                stroke: #ccc;
                                                stroke-width: 5;
                                                stroke-miterlimit: 10
                                            }

                                            .st30 {
                                                fill: none;
                                                stroke: #333;
                                                stroke-width: 2;
                                                stroke-linecap: round
                                            }

                                            .st31 {
                                                fill: #66503a
                                            }

                                            .st32 {
                                                fill: #cfcfcf
                                            }

                                            .st33 {
                                                fill: #f8b26a
                                            }

                                            .st34 {
                                                opacity: .11
                                            }

                                            .st35 {
                                                fill: #534741
                                            }

                                            .st36 {
                                                fill: #999
                                            }

                                            .st37 {
                                                fill: #ccc
                                            }

                                            .st38, .st39 {
                                                fill: #fff;
                                                stroke: #ccc;
                                                stroke-width: 2;
                                                stroke-miterlimit: 10
                                            }

                                            .st39 {
                                                fill: none;
                                                stroke: #c33737
                                            }

                                            .st40 {
                                                fill: #fff
                                            }

                                            .st41 {
                                                fill: none;
                                                stroke: #e15b64;
                                                stroke-width: 3.6211;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st42 {
                                                fill: none;
                                                stroke: #f8b26a
                                            }

                                            .st42, .st43, .st44 {
                                                stroke-width: 3.6211;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st43 {
                                                fill: none;
                                                stroke: #849b87
                                            }

                                            .st44 {
                                                stroke: #77a4bd
                                            }

                                            .st44, .st45, .st46 {
                                                fill: none
                                            }

                                            .st46 {
                                                stroke: #e15b64;
                                                stroke-width: 4.7391;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st47 {
                                                opacity: .2
                                            }

                                            .st48 {
                                                stroke-linecap: round
                                            }

                                            .st48, .st49, .st50 {
                                                fill: none;
                                                stroke: #333;
                                                stroke-width: 4;
                                                stroke-miterlimit: 10
                                            }

                                            .st50 {
                                                stroke: #fff;
                                                stroke-width: 8;
                                                stroke-linecap: round
                                            }

                                            .st51, .st52, .st53 {
                                                fill: #fff;
                                                stroke: #333;
                                                stroke-width: 3.5556;
                                                stroke-miterlimit: 10
                                            }

                                            .st52, .st53 {
                                                fill: #f8b26a
                                            }

                                            .st53 {
                                                fill: #e15b64
                                            }

                                            .st54 {
                                                fill: #f2f2f2
                                            }

                                            .st55 {
                                                fill: url(#SVGID_1_)
                                            }

                                            .st56 {
                                                fill: #c33636
                                            }

                                            .st57, .st58 {
                                                fill: #666;
                                                stroke: #fff;
                                                stroke-width: 2.7517;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st58 {
                                                fill: none;
                                                stroke: #c33737
                                            }

                                            .st59 {
                                                fill: #983733
                                            }

                                            .st60 {
                                                fill: #666;
                                                stroke: #fff;
                                                stroke-width: 5.2308;
                                                stroke-linecap: round
                                            }

                                            .st60, .st61, .st62, .st63 {
                                                stroke-miterlimit: 10
                                            }

                                            .st61 {
                                                stroke-linecap: round;
                                                fill: #e15b64;
                                                stroke: #fff;
                                                stroke-width: 4
                                            }

                                            .st62, .st63 {
                                                fill: #fff;
                                                stroke: #e0e0e0;
                                                stroke-width: 2
                                            }

                                            .st63 {
                                                fill: none;
                                                stroke: #e15b64;
                                                stroke-linecap: round
                                            }

                                            .st64 {
                                                fill: #abbd81
                                            }

                                            .st65 {
                                                fill: none;
                                                stroke: #333;
                                                stroke-width: 2.0086;
                                                stroke-miterlimit: 10
                                            }

                                            .st66 {
                                                fill: #ffc9c7
                                            }

                                            .st67 {
                                                fill: #d58b72
                                            }

                                            .st68, .st69 {
                                                fill: none;
                                                stroke: #fff;
                                                stroke-width: 3.5934;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10
                                            }

                                            .st69 {
                                                stroke-width: 2.8421
                                            }

                                            .st70, .st71, .st72, .st73 {
                                                fill: #f8b26a;
                                                stroke: #333;
                                                stroke-width: 4;
                                                stroke-miterlimit: 10
                                            }

                                            .st71, .st72, .st73 {
                                                fill: #abbd81
                                            }

                                            .st72, .st73 {
                                                fill: none;
                                                stroke: #849b87;
                                                stroke-width: 3;
                                                stroke-linecap: round
                                            }

                                            .st73 {
                                                stroke: #333
                                            }

                                            .st74 {
                                                opacity: .2;
                                                fill: #fff
                                            }

                                            .st75 {
                                                opacity: .1
                                            }

                                            .st76, .st77 {
                                                fill: #fff;
                                                stroke: #333;
                                                stroke-width: 4;
                                                stroke-miterlimit: 10
                                            }

                                            .st77 {
                                                fill: #77a4bd
                                            }

                                            .st78, .st79 {
                                                stroke-linecap: round
                                            }

                                            .st78 {
                                                fill: #666;
                                                stroke: #fff;
                                                stroke-linejoin: round;
                                                stroke-miterlimit: 10;
                                                stroke-width: 1.0575
                                            }

                                            .st79 {
                                                stroke-width: 3.2619
                                            }

                                            .st79, .st80, .st81, .st82 {
                                                fill: none;
                                                stroke: #666;
                                                stroke-miterlimit: 10
                                            }

                                            .st80 {
                                                stroke-linecap: round;
                                                stroke-width: 3.6813
                                            }

                                            .st81, .st82 {
                                                stroke-width: 3.2619
                                            }

                                            .st82 {
                                                fill: #f8b26a;
                                                stroke: #333;
                                                stroke-width: 3;
                                                stroke-linecap: round;
                                                stroke-linejoin: round
                                            }

                                            .st83 {
                                                fill: #fff;
                                                stroke-width: 3.1421
                                            }

                                            .st83, .st84, .st85, .st86, .st87 {
                                                stroke: #e0e0e0;
                                                stroke-miterlimit: 10
                                            }

                                            .st84 {
                                                stroke-linecap: round;
                                                fill: none;
                                                stroke-width: 5.5857
                                            }

                                            .st85, .st86, .st87 {
                                                fill: #a0c8d7;
                                                stroke-width: .9213
                                            }

                                            .st86, .st87 {
                                                fill: #f5e6c8;
                                                stroke: #333;
                                                stroke-width: 3.5
                                            }

                                            .st87 {
                                                fill: none;
                                                stroke: #fff
                                            }

                                            .st87, .st88 {
                                                stroke-linecap: round
                                            }

                                            .st88, .st89, .st90, .st91 {
                                                fill: none;
                                                stroke: #333;
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st90, .st91 {
                                                fill: #a0c8d7
                                            }

                                            .st91 {
                                                fill: #ccc
                                            }

                                            .st92, .st93 {
                                                stroke-linejoin: round
                                            }

                                            .st92 {
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10;
                                                fill: #e0e0e0;
                                                stroke: #333
                                            }

                                            .st93 {
                                                fill: none;
                                                stroke: #fff;
                                                stroke-linecap: round
                                            }

                                            .st93, .st94, .st95 {
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st94 {
                                                opacity: .11;
                                                stroke: #000
                                            }

                                            .st95 {
                                                fill: #77a4bd;
                                                stroke: #333
                                            }

                                            .st96 {
                                                fill: #333
                                            }

                                            .st100, .st101, .st102, .st96, .st97, .st98, .st99 {
                                                stroke: #333;
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st97 {
                                                stroke-linecap: round;
                                                fill: #e0e0e0
                                            }

                                            .st100, .st101, .st102, .st98, .st99 {
                                                fill: #999
                                            }

                                            .st100, .st101, .st102, .st99 {
                                                fill: #f8b26a
                                            }

                                            .st100, .st101, .st102 {
                                                fill: #fefefe;
                                                stroke-linejoin: round
                                            }

                                            .st101, .st102 {
                                                fill: #b3b3b3
                                            }

                                            .st102 {
                                                fill: #666
                                            }

                                            .st103 {
                                                fill: #fefefe
                                            }

                                            .st104, .st105 {
                                                stroke-linejoin: round
                                            }

                                            .st104 {
                                                fill: none;
                                                stroke-width: 3.5;
                                                stroke-linecap: round;
                                                stroke-miterlimit: 10;
                                                stroke: #333
                                            }

                                            .st105 {
                                                stroke: #000
                                            }

                                            .st105, .st106, .st107, .st108 {
                                                stroke-width: 3.5;
                                                stroke-miterlimit: 10
                                            }

                                            .st106 {
                                                stroke-linecap: round;
                                                fill: #e15b64;
                                                stroke: #fff
                                            }

                                            .st107, .st108 {
                                                fill: #666;
                                                stroke: #333
                                            }

                                            .st108 {
                                                fill: #f47e60
                                            }
                                        </style>
                                        <g class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.928571s; animation-direction: normal;">
                                            <circle class="st2" cx="50" cy="50" r="40" fill="var(--primary-color)" style="fill: rgb(76, 135, 195);"></circle>
                                        </g>
                                        <g style="transform-origin: 50px 50px 0px;">
                                            <g fill="rgb(0, 0, 0)" style="fill: rgb(0, 0, 0);">
                                                <g class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.857143s; animation-direction: normal;">
                                                    <path class="st40" d="M69.2,42L69.2,42l-0.9-9.8c-0.3-3.5-3.2-6.1-6.7-6.1h-0.8c-1.3,0-2.3,1-2.3,2.3v2.1c0,1.3,1,2.3,2.3,2.3h0.8 c0,0,0.1,0,0.1,0.1l0.8,9.5c0,0,0,0,0,0c0,0.1,0,0.3,0,0.4c0,0.2,0,0.5-0.1,0.7c-0.1,0.4-0.2,0.8-0.4,1.2c-0.3,0.7-0.8,1.4-1.3,2 c-1,1-2.2,1.6-3.6,1.8c-0.3,0-0.5,0.1-0.8,0.1c-0.3,0-0.6,0-0.9-0.1c-1.4-0.2-2.6-0.8-3.5-1.8c-0.6-0.6-1-1.2-1.3-2 c-0.2-0.4-0.3-0.9-0.4-1.3c0-0.2-0.1-0.4-0.1-0.6c0-0.1,0-0.2,0-0.4c0,0,0,0,0,0l0.8-9.5c0,0,0-0.1,0.1-0.1h0.8 c1.3,0,2.3-1,2.3-2.3v-2.1c0-1.3-1-2.3-2.3-2.3H51c-3.5,0-6.4,2.6-6.7,6.1l-0.8,9.7l0,0l0,0l0,0.1l0,0v0c0,0.4,0,0.9,0.1,1.3l0,0 l0.1,1.3h0.1c0.2,0.8,0.4,1.6,0.8,2.4c0.6,1.5,1.6,2.9,2.8,4.1c1.2,1.2,2.6,2.1,4.1,2.8c0.5,0.2,1.1,0.4,1.7,0.6v7.7 c0,2.8-2.3,5.2-5.2,5.2c-0.2,0-0.3,0-0.5,0c-0.6-0.1-1.2-0.2-1.7-0.5c0,0-0.1,0-0.1-0.1c-1.2-0.6-2.1-1.7-2.5-3 c1.2-1.3,1.9-2.9,1.9-4.8c0-3.9-3.2-7.1-7.1-7.1c-3.9,0-7.1,3.2-7.1,7.1c0,3.5,2.6,6.4,5.9,7c1,3,3.2,5.6,6.3,7l1,0.5l0-0.1 c1.2,0.4,2.5,0.7,3.8,0.7h0l0,0c6.3,0,11.5-4.9,11.8-11.2l0-0.1c0-0.1,0-0.2,0-0.3l0,0l0-0.1l0-1.9l0-5.7c0.6-0.2,1.2-0.3,1.7-0.6 c1.5-0.7,2.9-1.6,4.1-2.8c1.2-1.2,2.1-2.6,2.8-4.1c0.3-0.8,0.6-1.6,0.8-2.4H69l0.1-1.3c0,0,0,0,0,0C69.2,42.9,69.2,42.5,69.2,42 C69.2,42,69.2,42,69.2,42L69.2,42L69.2,42z M52.7,28.3v2.1c0,0.5-0.4,0.9-0.9,0.9H51c-0.8,0-1.4,0.6-1.5,1.4l-0.8,9.6 c0,0.4,0,0.7,0.1,1.1H45c0-0.4-0.1-0.8-0.1-1.2l0-0.1l0.8-9.7c0.2-2.8,2.5-4.8,5.3-4.8h0.8C52.3,27.4,52.7,27.8,52.7,28.3z M32.2,59c0-3.1,2.5-5.7,5.7-5.7c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7C34.7,64.6,32.2,62.1,32.2,59z M60.9,31.2 c-0.5,0-0.9-0.4-0.9-0.9v-2.1c0-0.5,0.4-0.9,0.9-0.9h0.8c2.8,0,5,2.1,5.3,4.8l0.9,9.8c0,0.4,0,0.8-0.1,1.2h-3.9 c0.1-0.4,0.1-0.7,0.1-1.1l-0.8-9.5c-0.1-0.8-0.7-1.4-1.5-1.4H60.9z" fill="rgb(255, 255, 255)" style="fill: rgb(255, 255, 255);"></path>
                                                </g>
                                                <g class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.785714s; animation-direction: normal;">
                                                    <circle class="st40" cx="37.8" cy="59" r="3.3" fill="rgb(255, 255, 255)" style="fill: rgb(255, 255, 255);"></circle>
                                                </g>
                                            </g>
                                        </g>
                                        <metadata xmlns:d="https://loading.io/stock/" class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.714286s; animation-direction: normal;">
                                            <d:name class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.642857s; animation-direction: normal;">stethoscope</d:name>
                                            <d:tags class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.571429s; animation-direction: normal;">stethoscope,doctor,treatment,diagnosis,health check,hospital</d:tags>
                                            <d:license class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.5s; animation-direction: normal;">cc-by</d:license>
                                            <d:slug class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.428571s; animation-direction: normal;">y58xdk</d:slug>
                                        </metadata>
                                    </g>
                                </g>
                            </g>
                        </g><style type="text/css" class="ld ld-breath" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: -0.357143s; animation-direction: normal;">
                                path, ellipse, circle, rect, polygon, polyline, line {
                                    stroke-width: 0;
                                }

                                @keyframes ld-breath {
                                    0% {
                                        -webkit-transform: scale(0.86);
                                        transform: scale(0.86);
                                    }

                                    50% {
                                        -webkit-transform: scale(1.06);
                                        transform: scale(1.06);
                                    }

                                    100% {
                                        -webkit-transform: scale(0.86);
                                        transform: scale(0.86);
                                    }
                                }

                                @-webkit-keyframes ld-breath {
                                    0% {
                                        -webkit-transform: scale(0.86);
                                        transform: scale(0.86);
                                    }

                                    50% {
                                        -webkit-transform: scale(1.06);
                                        transform: scale(1.06);
                                    }

                                    100% {
                                        -webkit-transform: scale(0.86);
                                        transform: scale(0.86);
                                    }
                                }

                                .ld.ld-breath {
                                    -webkit-animation: ld-breath 1s infinite;
                                    animation: ld-breath 1s infinite;
                                }
                            </style></svg></svg>


                <div class="text_loader" style="margin-top: -45px">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <%--  <div class="msg_loader" style="padding: 40px"></div>--%>
                </div>
            </div>

            <div loader="beer" id="beer" style="display: none">

                <div class="container">
                    <div class="mug">
                        <div class="beer"></div>

                    </div>
                    <div class="bubble"></div>
                    <div class="small-bubbles"></div>
                    <div class="drip"></div>
                </div>

                <div class="text_loader">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>
            <div loader="wine" id="wine" style="display: none">
                <div class="circle">
                    <div class="table"></div>
                    <div class="glass">
                        <div class="reflex"></div>
                        <div class="base"></div>
                        <div class="base shadow"></div>
                        <div class="wine">
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                            <div class="wine-line"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div loader="peixe" id="peixe" class="hidden-md-down" style="height: 280px; display: none">
                <div class="hatch">
                    <div class="screw-1"></div>
                    <div class="screw-2"></div>
                    <div class="screw-3"></div>
                    <div class="screw-4"></div>
                    <div class="screw-5"></div>
                    <div class="screw-6"></div>
                    <div class="fish-container">
                        <div class="bubble-1"></div>
                        <div class="bubble-2"></div>
                        <div class="bubble-3"></div>
                        <div class="bubble-4"></div>
                        <div class="bubble-5"></div>
                        <div class="bubble-6"></div>
                        <div class="bubble-7"></div>
                        <div class="bubble-8"></div>
                        <div class="bubble-9"></div>
                        <div class="bubble-10"></div>
                        <div class="fish">
                            <div class="fish-back-fin">
                            </div>
                            <div class="fish-body">
                                <div class="fish-face">
                                </div>
                            </div>
                            <div class="fish-lips">
                            </div>
                            <div class="fish-side-fin-wrapper">
                                <div class="fish-side-fin">
                                </div>
                            </div>
                        </div>
                        <div class="bubble-11"></div>
                        <div class="bubble-12"></div>
                        <div class="bubble-13"></div>
                        <div class="bubble-14"></div>
                        <div class="bubble-15"></div>
                        <div class="bubble-16"></div>
                        <div class="bubble-17"></div>
                        <div class="bubble-18"></div>
                        <div class="bubble-19"></div>
                        <div class="bubble-20"></div>
                    </div>
                    <div class="glass"></div>
                </div>

                <div class="text_loader" style="margin-top: -133px;">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>
            <div loader="pizza" class="hidden-md-down" style="height: 100%; margin: 0 auto; width: 100%; display: none">

                <div id="pizza">

                    <div class="bord">
                        <div class="bord-rand"></div>
                        <div class="bord-binnen"></div>
                    </div>

                    <div class="pizzasnede">
                        <div class="korst"></div>
                        <div class="kaas"></div>
                        <div class="salami een vallen"></div>
                        <div class="salami-half twee vallen"></div>
                        <div class="salami drie vallen"></div>
                    </div>

                    <div class="text_loader" style="margin-top: 210px;">
                        <div style="font-size: 30px;">CARREGANDO</div>
                        <div class="msg_loader"></div>
                    </div>

                </div>

            </div>
            <div loader="cube" class="cube" style="top: 115px; display: none">
                <div class="sides">
                    <div class="top"></div>
                    <div class="right"></div>
                    <div class="bottom"></div>
                    <div class="left"></div>
                    <div class="front"></div>
                    <div class="back"></div>
                </div>
                <div class="text_loader">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader" style="top: 50px;"></div>
                </div>
            </div>
            <div loader="diamond" style="display: none" onclick="document.getElementsByClassName('diamond')[0].classList.toggle('intro')">
                <div class='diamond intro' style="margin: 0 auto">
                    <div class='diamond__base'>
                        <div class='diamond-bottom'>
                            <div class='diamond-slice diamond-slice--0'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--1'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--2'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--3'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--4'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--5'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--6'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                            <div class='diamond-slice diamond-slice--7'>
                                <div class='diamond-slice-a'>
                                    <div class='pavilion'>
                                        <div class='pavilion__face'></div>
                                    </div>
                                    <div class='diamond-slice-b'>
                                        <div class='facet'></div>
                                        <div class='top'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text_loader" style="margin-top: -100px">
                    <div style="font-size: 30px;">CARREGANDO</div>
                    <div class="msg_loader"></div>
                </div>
            </div>


            <div loader="altec" style="display: none; text-align: center;">
                <img class="animated bouncelogo" style="max-width: 200px; max-height: 200px" />

                <div class="animated bouncelogo" id="loader_message" style="font-size: 20px; font-weight: bold; color: var(--light-color);">
                    CARREGANDO
                </div>
            </div>
        </div>
    </div>

    <div id="left-menu" class="panel panel-right panel-reveal imagem-background" style="background-color: var(--primary-color); color: var(--primary-font-color)">

        <div id="menu_usuario" class="list-block list-menu fonte_branca" style="margin: 0px !important; display: none">

            <div href="#" onclick="" style="padding: 20px; background-color: var(--secondary-color); color: var(--secondary-font-color); cursor: pointer">
                <span style="float: left; padding: 5px 10px 0px 0px;"
                    class="icon-pencil2"></span>
                <div id="nomeUsuario" class="nomegarcom" style="font-size: 18px; font-weight: 700; text-transform: uppercase;">
                    NOME
                </div>
                <div style="font-size: 10px" class="email_user">
                </div>
            </div>
            <ul>
                <li class="close-panel li_menu_pedido qrcode_opt" onclick="creait.redirect('qrcode');">
                    <span class="f7-icons">qrcode</span>
                    QRCode
                </li>
                <li class="close-panel li_menu_pedido" onclick="creait.redirect('item')">
                    <span class="f7-icons">collection</span>
                    ITENS
                </li>
                <li class="close-panel" id="menu_pedido" onclick="creait.redirect('cartao')">
                    <span class="f7-icons">card</span>
                    CARTÃO
                </li>
                <li id="logout" class="close-panel no-animation fonte_branca" onclick="localStorage.clear(); window.location = '/'">
                    <span class="icon-unlocked"></span>
                    SAIR
                </li>
            </ul>
        </div>

        <div id="menu_login" class="list-block list-menu" style="display: none; margin: 0px !important;">
            <div style="padding: 20px; margin-bottom: 10px; text-align: center; background-color: var(--secondary-color); color: var(--secondary-font-color);">
                <img class="logo" style="max-height: 150px; margin-bottom: 10px" />
            </div>
            <div class="content-block">
                <div class="item-title text-medium" style="text-align: center">
                    <formloginmenu>
                        <div class="list-block margin-bottom-40">
                            <input type="hidden" name="push_id" value="" id="push_id"/>
                            <input type="hidden" name="plataforma" value="" id="plataforma"/>
                            <ul class="no-border" style="padding:0px">
                                <li style="padding:0px">
                                    <div class="item-content">
                                        <div class="item-inner no-margin">
                                            <div class="item-input">
                                                <input class="input-index" id="email" type="email" name="email" placeholder="E-mail">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li style="padding:0px">
                                    <div class="item-content">
                                        <div class="item-inner no-margin">
                                            <div class="item-input">
                                                <input class="input-index" id="senha" type="password" name="password" class="text-thiny" placeholder="Senha">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="row btn-form-group margin-bottom-10 margin-top-40">
                            <div class="col-100">
                                <div id="btn_login_menu" class="buton" style="background-color:var(--secondary-color); color:var(--secondary-font-color)">Entrar</div>
                                <div class="lembrar" onclick="myApp.closePanel(); creait.redirect('lembrar');">Esqueci minha senha</div>
                        </div>
                            </div>    
                    </formloginmenu>
                </div>
            </div>
            <div style="clear: both"></div>

            <div class="login_cadastro" onclick="myApp.closePanel(); creait.redirect('cadastro');" style="cursor: pointer; text-align: center">
                Criar nova conta
            </div>

        </div>
    </div>

    <div class="popover popover_rastreador">
        <div class="popover-angle"></div>
        <div class="popover-inner">
            <div class="content-block">
                <p>About</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>
            </div>
        </div>
    </div>

    <div class="popover popover_ongs">
        <div class="popover-angle"></div>
        <div class="popover-inner">
            <div class="content-block">
                <p>About</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>
            </div>
        </div>
    </div>

    <div class="popover popover_padrinho">
        <div class="popover-angle"></div>
        <div class="popover-inner">
            <div class="content-block">
                <p>About</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>
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
    <!-- Path to your app js-->
    <script type="text/javascript" src="js/my-app.<%=api.App.index.js %>js"></script>
    <script src="controllers/bundle.<%=api.App.index.js %>js"></script>



    <%--    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>--%>



    <script>
        var alerta = [];
        var notificacao = [];
        var notificacao_atual = {};
        var alerta_atual = {};


        if (window.location.href.indexOf("#!") == -1 || window.location.href.split("#!")[1].length == 0) {

            onloadpage(function () {

                if (controller.login.get() == null) {
                    creait.redirect('login');
                }
                else {
                    creait.redirect('categoria');
                }

            });

        }

        function inIframe() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

    </script>


    <div id="fb-root"></div>
</body>

</html>
