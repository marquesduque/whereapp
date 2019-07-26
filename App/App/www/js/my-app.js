"use strict";

var controller = {};

window.mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

$(window).resize(function () {
    creait.resize();
});
var creait = {
    bind_money: function (item) {
        $(item == null ? '[mask="money"]' : item).maskMoney({ prefix: '', allowNegative: false, thousands: '.', decimal: ',', affixesStay: false });
        $(item == null ? '[mask="money"]' : item).keydown(function () {
            //debugger;
            //return (event.ctrlKey || event.altKey || event.keyCode == 188 || (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false) || (95 < event.keyCode && event.keyCode < 106) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode > 34 && event.keyCode < 40) || (event.keyCode == 46))
        });
    },
    bind_peso: function (item) {
        $(item == null ? '[mask="peso"]' : item).maskMoney({ prefix: '', allowNegative: false, precision: 3, thousands: '', decimal: '.', affixesStay: false });
        $(item == null ? '[mask="peso"]' : item).keydown(function () {
            //debugger;
            //return (event.ctrlKey || event.altKey || event.keyCode == 188 || (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false) || (95 < event.keyCode && event.keyCode < 106) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode > 34 && event.keyCode < 40) || (event.keyCode == 46))
        });
    },
    convert_int_peso: function (val) {
        var arr = [];
        arr[1] = '0.00';
        arr[2] = '0.0';
        arr[3] = '0.';

        val = val + '';

        if (val.length <= 3) {
            val = arr[val.length] + val;
        }
        return parseFloat(val);

    }
    , resize: function () {
        var tag = ' ';
        if ($('[data-page="montagem"] .page-on-center').length == 1) {
            tag = ' .tab.active ';
        }
        $('.page-on-center' + tag + '.produtoli:visible').height('');
        var height = 0;
        $('.page-on-center').width($('.page-on-center').width() - 20);
        $('.page-on-center' + tag + '.produtoli:visible').css('height', 'auto');
        $('.page-on-center' + tag + '.produtoli:visible').each(function (index, item) {
            if (item.clientHeight > height) {
                height = item.clientHeight;
            }
        });
        $('.page-on-center' + tag + '.produtoli:visible').css('height', height + 'px');
        $('.page-on-center').width('');


    },
    loader: function (tipo, msg) {
        $('#loader_message').html(msg);
        if (msg == null || msg == "") {
            $('#loader_message').html('CARREGANDO');
        }
        if (tipo) {
            $('.views').addClass('blur');
            $('.loader_on').show();
        }
        else {
            $('.loader_on').css('background-color', 'var(--dark-color)');
            $('.views').removeClass('blur');
            $('.loader_on').hide();
            creait.resize();
        }
    },
    root: '',//pagina/
    url_anterior: null,
    url: "http://192.168.0.5",
    init: function () {
        controller.login.index();
    },
    getForm: function (nome) {
        var b = myApp.formToJSON(nome);

        //debugger;
        //for(var a in b){
        //    if (a.indexOf('.') != -1) {
        //        if (b[a.split('.')[0]] == null) {
        //            b[a.split('.')[0]] = {};
        //        }
        //        b[a.split('.')[0]][a.split('.')[1]] = b[a.split('.')[0]];
        //    }
        //}
        return b;
    },
    get: function (controller, data, callback, async) {
        if (async == null) {
            async = true;
        }
        $$.ajax({
            url: creait.url + "/api/" + controller, method: 'GET', dataType: 'json', data: data, async: async, success: function (data) {
                try {
                    callback(data);
                }
                catch (ex) {
                    console.log(ex);
                }
            }, error: function (a, b, c) {
                if (a.responseText != null && a.responseText != '') {
                    myApp.alert(JSON.parse(a.responseText).ExceptionMessage, "Oops");
                    creait.loader(false);
                }
                console.log(a);
                //callback({ error: a.status, message: JSON.parse(a.responseText).Message });
            },
            beforeSend: function () {
                creait.loader(true);
            }
        });
    },
    post: function (controller, data, callback) {
        $$.ajax({
            url: creait.url + "/api/" + controller, method: 'POST', dataType: 'json', data: data, success: function (data) {
                try {
                    callback(data);
                }
                catch (ex) {
                    console.log(ex);
                }
            }, error: function (a, b, c) {
                if (a.responseText != null && a.responseText != '') {
                    if (JSON.parse(a.responseText).ExceptionMessage == null) {
                        myApp.alert(a.responseText, "Atenção");
                    }
                    else {
                        myApp.alert(JSON.parse(a.responseText).ExceptionMessage, "Atenção");
                    }
                    creait.loader(false);
                }
                console.log(a);
                //callback({ error: a.status, message: JSON.parse(a.responseText).Message });

            },
            beforeSend: function () {
                creait.loader(true);
            }
        });
    },
    redirect: function (page, parameter) {
        $('.page-on-center').removeAttr('loader');
        creait.url_anterior = window.location;
        mainView.router.loadPage(creait.root + page + ".html" + (parameter == null ? '' : '?' + parameter));
    },
    queryStringToJSON: function (str) {
        var pairs = str.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            var name = pair[0]
            var value = pair[1]
            if (name.length)
                if (result[name] !== undefined) {
                    if (!result[name].push) {
                        result[name] = [result[name]];
                    }
                    result[name].push(value || '');
                } else {
                    result[name] = value || '';
                }
        });
        return (result);
    },
    isEmail: function (value) {
        var valid = true;
        var emails = value.replace(';', ',').split(",");

        jQuery.each(emails, function () {
            if (jQuery.trim(this) != '') {
                if (!jQuery.trim(this).match(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i))
                    valid = false;
            }
        });
        return valid;
    },
    isPhone: function (value) {
        var error = "";
        var stripped = value.replace(/[\(\)\.\-\ ]/g, '');

        if (value == "") {
            return false
        }
        else if (isNaN(parseInt(stripped))) {
            return false
        }
        else if (!(stripped.length > 9)) {
            return false
        }

        return true;
    }
}
/*===============================================*/
/* APP INIT                                          */
/*===============================================*/
var myApp = new Framework7({
    preprocess: function (content, url, next) {
        $('.views').show();
        onloadpage(function () {
            try {
                var query = {};
                if (url.indexOf('?') > -1) {
                    query = creait.queryStringToJSON(url.split('?')[1]);
                    url = url.split('?')[0];
                }
                //debugger;
                var method = url.replace(".html", "").replace(creait.root, "");
                if (method in window["controller"]) {

                    var redirect = eval("controller." + method + '.init')(function (clone, callback) {
                        creait.loader(false);
                        var template = Template7.compile(content);


                        var data = JSON.parse(JSON.stringify(clone));
                        data.cor_tema = controller.layout.get().cor;
                        data.specialty = controller.layout.get().specialty;
                        data.logo = controller.layout.get().logo;

                        data.icone_default = controller.layout.get().icone;

                        data.comanda = controller.layout.get().comanda;
                        data.delivery = controller.layout.get().delivery;
                        data.balcao = controller.layout.get().balcao;

                        if (data.balcao) {
                            controller.endereco.set({ retirada: 'RETIRAR NA LOJA' });
                        }

                        $('.panel-overlay').click();
                        $('body').css('font-family', biblioteca.get('font'));

                        data.background_image_local = controller.layout.get().background_image_local;

                        var result = template(data);

                        next(result);

                        $('[type="file"].filefoto').each(function (index, item) {
                            item.addEventListener("change", function (e) {
                                readimg(e, function (img) {
                                    //debugger;
                                    $(item.parentElement).find('.has-error').removeClass('has-error');
                                    $('[name="' + $(item).attr('name').substring(0, $(item).attr('name').lastIndexOf('_')) + '_itype"]').val(img);
                                    $(item.parentElement).find(':not(input)').hide();
                                    $(item.parentElement).css('background-image', 'url("' + img + '")');
                                });
                            }, false);
                        });

                        if (controller.login.get() != null) {
                            $('#nomeUsuario').html(controller.login.get().nome);
                            $('.email_user').html(controller.login.get().email);


                            $('#menu_login').hide();
                            $('#menu_usuario').show();
                            //$('#menu_comanda').hide();
                            //$('#menu_usuario').hide();
                            //$('#menu_servico').hide();
                            //$('#menu_consulta').hide();
                            //$('#menu_caixa').hide();
                            //$('#atencao_ativacao').hide();

                            //$('#atencao_servico').hide();
                            //$('.agendar_horario').hide();

                            //if (controller.login.get().perfil_id == 3) {
                            //    $('#nomeUsuario').html(controller.login.get().nome);
                            //    $('#menu_garcom').css("display", "block");
                            //    if (controller.cliente.get() != null) {
                            //        $('.nomegarcom').html(controller.cliente.get().nome);
                            //        $('.panel-overlay').click();
                            //    }
                            //    else {
                            //        $('.nomegarcom').html('BUSCANDO');
                            //    }
                            //    debugger;
                            //    if (window.location.href.indexOf('mesas.html') == -1) {
                            //        $('.sair_mesa').hide();
                            //    }
                            //    else {
                            //        $('.sair_mesa').show();
                            //    }

                            //}
                            //else if (controller.login.get().perfil_id == 5) {
                            //    debugger;
                            //    $('#nomeUsuario').html(controller.login.get().nome);
                            //    $('#menu_comanda').show();
                            //    $('.nomegarcom').html(controller.login.get().nome);
                            //    $('.panel-overlay').click();
                            //}
                            //else if (controller.login.get().perfil_id == 6) {
                            //    $('#nomeUsuario').html(controller.login.get().nome);
                            //    $('#menu_servico').show();
                            //    $('.nomegarcom').html(controller.login.get().nome);
                            //    $('.panel-overlay').click();
                            //    $('.agendar_horario').hide();

                            //    if (controller.login.get().active != true) {
                            //        $('#atencao_ativacao').show();
                            //    }
                            //    else {
                            //        $('#atencao_servico').hide();
                            //        $('.agendar_horario').show();

                            //        $('#agendar_horario').click(function () {
                            //            debugger;
                            //            creait.redirect('adicionar', 'id=' + controller.login.get().produto_id + (controller.filial.get() == null ? '' : '&regiao=' + controller.filial.get().id));
                            //        });
                            //    }

                            //}
                            //else if (controller.login.get().perfil_id == 7) {
                            //    $('#menu_caixa').show();
                            //    $('.nomegarcom').html(controller.login.get().nome);
                            //    $('#nomeUsuario').html(controller.login.get().nome);
                            //}
                            //else {
                            //    $('.nomegarcom').html(controller.login.get().nome);
                            //    $('#nomeUsuario').html(controller.login.get().nome);
                            //    $(biblioteca.get('menu_usuario')).show();
                            //}

                        } else {
                            $('.iconmenu').hide();
                            $('#menu_login').show();
                            $('#menu_usuario').hide();
                        }
                        $('formlogingarcom').hide();


                        $('[mask="cel"]').mask("(99) 9999-9999?9")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                if (phone.length > 10) {
                                    element.mask("(99) 99999-999?9");
                                } else {
                                    element.mask("(99) 9999-9999?9");
                                }
                            });

                        $('[mask="tel"]').mask("(99) 9999-9999")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                if (phone.length > 10) {
                                    element.mask("(99) 99999-999?9");
                                } else {
                                    element.mask("(99) 9999-9999?9");
                                }
                            });

                        $('[mask="cpf"]').mask("999.999.999-99")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("999.999.999-99");
                            });

                        $('[mask="rg"]').mask("99.999.999-9")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("99.999.999-9");
                            });

                        $('[mask="cnpj"]').mask("99.999.999/9999-99")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("99.999.999/9999-99");
                            });

                        $('[mask="cep"]').mask("99999-999")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("99999-999");
                            });

                        $('[mask="exp_date"]').mask("99/9999")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("99/9999");
                            });

                        $('[mask="mask_date"]').mask("99/99/9999")
                            .focusout(function (event) {
                                var target, phone, element;
                                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                                phone = target.value.replace(/\D/g, '');
                                element = $(target);
                                element.unmask();
                                element.mask("99/99/9999");
                            });

                        //teste aqui
                        creait.bind_money();

                        $('[formatMoney]').each(function (intem, item) {

                            if ($(item).html().trim() == "0" && $(item).attr('formatMoney') != null) {
                                //debugger;
                                $(item).text($(item).attr('formatMoney'));
                            }
                            else {
                                $(item).html(parseFloat($(item).text()).formatMoney(2));
                            }


                        });

                        $('input').focus(function () {
                            if (window.mobilecheck()) {
                                var control = this;
                                setTimeout(function () {
                                    $('.page.page-on-center .page-content').scrollTop($(control).offset().top - $('.page.page-on-center .navbar').height());
                                }, 500);
                            }
                        });


                        (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) return;
                            js = d.createElement(s); js.id = id;
                            js.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v3.0";
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));


                        $('.facelike').append($('.fb-like').clone());

                        if (callback != null) {
                            callback(result);

                            //if (controller.login.get() == null) {
                            //    $('.open-panel').hide();
                            //}
                            setTimeout(function () {
                                creait.resize();
                            }, 1);
                        }
                    }, query);
                    if (redirect != null && redirect != '') {

                        var template = Template7.compile("");
                        var result = template({});
                        next(result);

                        setTimeout(function () {
                            creait.redirect(redirect);
                        }, 1);


                    }
                }
                else {
                    //debugger;

                    console.log("Controller [" + url + "] não foi encontrada");
                    creait.redirect($('[redirect]').attr("redirect"));
                }
            }
            catch (ex) {
                console.log(ex);
                //debugger;
            }
        });
    },
    preroute: function (view, options) {
        //if (!userLoggedIn) {
        //    view.router.loadPage('auth.html'); //load another page with auth form
        //    return false; //required to prevent default router action
        //}
    },
    material: true,
    init: false,
    pushState: true,
    cache: false,
    swipePanel: "left",
    pushStateSeparator: "#!",
    modalButtonCancel: "Cancelar",
    modalButtonOk: "Ok",
    modalPreloaderTitle: "Carregando",

});

/*===============================================*/
/* EXPORT SELECTORS ENGINE                          */
/*===============================================*/
var $$ = Dom7;

/*===============================================*/
/* ADD VIEW                                           */
/*===============================================*/
var mainView = myApp.addView(".view-main", {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

/*=========================================================*/
/* SHOW/HIDE PRELOADER FOR REMOTE AJAX LOADED PAGES           */
/*=========================================================*/
//$$(document).on("ajaxStart", function (e) {
//    if ($('.loader_on:visible').length == 0) {
//        //myApp.showIndicator();
//        if ($('.page-on-center').attr('loader') == null) {
//            creait.loader(true);
//        }
//    }
//});
//$$(document).on("ajaxComplete", function () {
//    creait.loader(false);
//});

/*==================================================================*/
/* PAGE INIT : HERE, YOU CAN WRITE YOUR CUSTOM JAVASCRIPT/JQUERY    */
/*==================================================================*/
$$(document).on("pageInit", function (e) {
    /* SLIDE SLICK */
    /*================================*/
    var slickOpts = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: "15px",
        adaptiveHeight: true
    };
    $("#walkthrough-items").slick(slickOpts);

    /* CALENDAR */
    /*================================*/
    var calendarDefault = myApp.calendar({
        input: "#calendar-default"
    });
    var pickerDescribe = myApp.picker({
        input: "#picker-time",
        cols: [
            {
                textAlign: "left",
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            {
                values: ("PM AM").split(" ")
            },
        ]
    });
});

// AND NOW WE INITIALIZE APP
myApp.init();


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
}

Number.prototype.formatMoney = function (c) {
    d = ',';
    t = '.';
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    var value = 'R$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    if (value == 'R$0,00') {
        value = "";
    }
    return value;
};




var cor_tema = null;
var background_image_local = null;
var logo = null;
var icone = null;
var loader = null;

function onloadpage(callback) {
    login();
    $('.loader_off').hide();
    $('#msg_loader').html('Conectando');
    //$('.loader_on').show();
    //creait.loader(true);

    bind({
        "nome": "Creait",
        "loader": "altec",
        "background_image_local": null,
        "place_id": 1102338579877559,
        "url": "creait",
        "specialty": "Pizzaria",
        "about": "A Creait é uma empresa que oferece para seus clientes as melhores soluções em Desenvolvimento de Aplicativos e outras tecnologias.",
        "whatsapp_message": null,
        "cor": "default",
        "icone": "img/monitoramento/logo/azul.png",
        "logo": "img/monitoramento/logo/azul.png",
        "primary_color": "#820b05",
        "primary_font_color": "#ffffff",
        "secondary_color": "#0a7995",
        "secondary_font_color": "#ffffff",
        "textbox_color": "#f1f2f4",
        "textbox_font_color": "#656269",
        "border_color": "#3a1304",
        "font_light_color": "#000000",
        "bg_color": "#ffffff",
        "border_radius_textbox": "2",
        "border_radius_button": "2",
        "light_color": "#ffffff",
        "dark_color": "#0a7995",
        "font_color": "#ffffff"
    });

    function bind(data) {

        logo = data.logo;
        icone = data.icone;
        cor_tema = data.cor;
        loader = data.loader;
        background_image_local = data.background_image_local;
        $('.place_picture').attr('href', data.icone);
        $('title').html(data.nome);
        $('.index-titulo').text(data.nome);
        $('.og_url').attr('content', window.location.href)
        $('.og_title').attr('content', 'Aplicativo ' + data.nome);
        $('.og_description').attr('content', data.about);
        $('.og_image').attr('content', logo);


        $('.bouncelogo').attr('src', data.logo);
        $('#index_whatsapp').attr('href', 'https://api.whatsapp.com/send?phone=&text=Olha%20s%C3%B3%20que%20legal%20o%20aplicativo%20da%20' + data.nome + '%20http%3A%2F%2F' + data.url + '.creapp.com.br%2Fapp');

        $('#index_facebook').attr('href', 'https://facebook.com/' + data.place_id);

        $('.logopremium').css('background-image', 'url(' + data.logo + ')');
        $('#tema').attr('href', 'css/temas/' + data.cor + '.css');
        $('#lojasvg').attr('src', 'icons/animated/' + cor_tema + '/loja.svg');
        $('#carsvg').attr('src', 'icons/animated/' + cor_tema + '/car.svg');
        $('.loader_on').find('[loader]').hide();
        $('[loader="' + loader + '"]').show();
        $('.logo').attr('src', data.logo);

        theme(data);

        if (data.dark_color.split(',').length == 4) {
            var bg = '';
            $(data.dark_color.split(',')).each(function (index, item) {
                if (index < 3) {
                    bg += item + ((index < 2) ? ',' : '');
                }
            });
            $('.loader_on').css('background-color', bg + ')');
        }

        //var currentTrianglifier = new Trianglify(
        //    {
        //        "bleed": 250,
        //        "cellsize": 50,
        //        "x_gradient": [data.light_color, data.dark_color],
        //        "y_gradient": [data.light_color, data.dark_color],
        //        "cellpadding": 50,
        //        "noiseIntensity": 0
        //    });
        //if (data.background_image_local == null) {
        //var background = currentTrianglifier.generate($(window).width(), $(window).height()).dataUrl;
        //data.background_image_local = background;
        //$(".loader_on").css("background-image", data.background_image_local);
        //}
        //else {
        //$(".loader_on").css("background-image", 'url(' + data.background_image_local + ')');
        //}

        controller.layout.set(data);
    }
    callback();
}
jQuery(function ($) {

    $.fn.toggleInputError = function (erred, message) {

        //if (!$(this).hasClass('has-error')) {
        message = '<div onclick="$(this).remove()" style="height:0px" data-tooltip="' + message + '"></div>';
        if (erred) {
            //debugger;
            if ($(this).parent().hasClass('smart-select')) {
                $(this).parent().parent().prepend(message);
            }
            else {
                $(this).parent().prepend(message);
            }
            $(this).focus(function () {
                $(this).parent().find('[data-tooltip]').remove();
                $(this).removeClass('has-error');
            });
            $(this).click(function () {
                $(this).parent().find('[data-tooltip]').remove();
                $(this).removeClass('has-error');
            });
            $('.page.page-on-center .page-content').scrollTop($(this).offset().top - $('.page.page-on-center .navbar').height());
            $(this).toggleClass('has-error', erred);
        }
        else {
            $(this).parent().find('[data-tooltip]').remove();
            $(this).removeClass('has-error');
        }



        return this;
        //$('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
    };
});

function theme(data) {

    $('#rootcss').html(":root{" +
        "--primary-color: #0a7995;" +
        "--primary-color-hover:rgba(0, 0, 0, 0.05);" +
        "--primary-font-color:" + data.primary_font_color + ";" +
        "--secondary-color: #3a547d;" +
        "--secondary-hover:rgba(0, 0, 0, 0.05);" +
        "--secondary-font-color:" + data.secondary_font_color + ";" +
        "--textbox-color:" + data.textbox_color + ";" +
        "--textbox-color-hover: rgba(0, 0, 0, 0.05);" +
        "--textbox-font-color:" + data.textbox_font_color + ";" +
        "--border-radius-textbox:" + data.border_radius_textbox + "px;" +
        "--border-color:" + data.border_color + ";" +
        "--bg-color:" + data.bg_color + ";" +
        "--font-light-color:" + data.font_light_color + ";" +
        "--border-radius-button:" + data.border_radius_button + "px;" +
        "--light-color:" + data.light_color + ";" +
        "--dark-color: #2c3b51;" +
        "--font-color:" + data.font_color + ";" +
        "}");

}

function maps_callback() {


}

function SaveTheme() {

    var bodyStyles = window.getComputedStyle(document.body);
    var root = {
        primary_color: bodyStyles.getPropertyValue('--primary-color'),
        primary_font_color: bodyStyles.getPropertyValue('--primary-font-color'),
        secondary_color: bodyStyles.getPropertyValue('--secondary-color'),
        secondary_font_color: bodyStyles.getPropertyValue('--secondary-font-color'),
        textbox_color: bodyStyles.getPropertyValue('--textbox-color'),
        textbox_font_color: bodyStyles.getPropertyValue('--textbox-font-color'),
        border_radius_textbox: bodyStyles.getPropertyValue('--border-radius-textbox'),
        border_color: bodyStyles.getPropertyValue('--border-color'),
        bg_color: bodyStyles.getPropertyValue('--bg-color'),
        font_light_color: bodyStyles.getPropertyValue('--font-light-color'),
        border_radius_button: bodyStyles.getPropertyValue('--border-radius-button'),
        light_color: bodyStyles.getPropertyValue('--light-color'),
        dark_color: bodyStyles.getPropertyValue('--dark-color'),
        font_color: bodyStyles.getPropertyValue('--font-color')
    }


    $.post('/api/theme', root, function () {
        alert('Tema salvo com sucesso');
    });
}
function login() {

    //$('#btn_login_garcom').unbind('click');
    //$('#btn_login_garcom').click(function () {
    //    if ($('formlogingarcom .has-error').length == 0) {
    //        $('#garcon_password').val($('#garcon_email').val());
    //        creait.get('pessoas', myApp.formToJSON("formlogingarcom"), function (data) {
    //            if (data == null || data.length == 0 || data.error != null) {

    //                myApp.alert('Usuário ou senha inválido!', 'Oops ...');
    //                return;
    //            }
    //            debugger;
    //            myApp.closePanel();
    //            if (controller.login.get() != null && controller.login.get().perfil_id == 3) {

    //                var is_redirect = controller.cliente.get() != null;
    //                controller.cliente.set({ id: data[0].id, nome: data[0].nome });

    //                $('.nomegarcom').html(controller.cliente.get().nome);
    //                $('.panel-overlay').click();
    //                $('#garcon_email').val('');

    //                controller.filial.set({ id: controller.login.get().filial_id });

    //                if (is_redirect) {
    //                    creait.redirect('mesas');
    //                }
    //                else {
    //                    myApp.mainView.refreshPage();
    //                }

    //            }
    //        });
    //    }
    //});

    $('#btn_login_menu').unbind('click');
    $('#btn_login_menu').click(function () {

        creait.loader(true, 'CARREGANDO');
        if ($('formloginmenu .has-error').length == 0) {
            if (localStorage.getItem('pushToken') == null || localStorage.getItem('plataforma_id') == null) {
                $('#push_id').val("");
                $('#plataforma').val("");
            }
            else {
                $('#push_id').val(localStorage.getItem('pushToken'));
                $('#plataforma').val(localStorage.getItem('plataforma_id'));
            }

            creait.get('pessoas', myApp.formToJSON("formloginmenu"), function (data) {
                creait.loader(false);
                if (data == null || data.length == 0 || data.error != null) {
                    myApp.alert('Usuário ou senha inválido!', 'Oops ...');
                    return;
                }
                myApp.closePanel();
                controller.login.set(data[0]);
                //debugger;
                //if (controller.login.get().perfil_id == 5) {
                //    creait.redirect('mesas');
                //}
                //else if (controller.login.get().perfil_id == 7) {
                //    creait.redirect('cliente');
                //}
                //else if (controller.login.get().perfil_id == 6) {
                //    creait.redirect('servico');
                //}
                //else if (controller.login.get().perfil_id == 3) {
                //    creait.redirect('mesa', 'id=' + controller.login.get().id);
                //}
                //else {
                myApp.mainView.refreshPage();
                //}

            });
        }
    });
}

//$('.qrcode_opt').click(function () {
//    myApp.alert(
//        "<div style='color:#2196f3; font-size: 20px; text-align: left;' onclick='creait.redirect(\"qrcode\"); myApp.closeModal(\".modal\");'>Meu QRCode</div><div style='color:#2196f3;  font-size: 20px; text-align: left;' onclick='openCameraQRcode(); myApp.closeModal(\".modal\");'>Ler um QRCode</div>",
//        "Escolha uma das opções a baixo!"
//    );
//});


function finalizar_compra() {
    myApp.hideIndicator();
    creait.loader(true, 'ENVIANDO PEDIDO');

    var compra = {
        pedido: []
    }

    var busca = controller.busca.get();
    var pagamento = controller.pagamento.get();
    var endereco = controller.endereco.get();
    var carrinho = controller.carrinho.get();
    //var horarios = controller.busca.get();

    if (busca == null) {
        window.location = '/';
        return;
    }

    compra.comprador_id = controller.login.get().id;

    if (controller.cliente.get() != null && controller.login.get().perfil_id == 3) {
        compra.vendedor_id = controller.cliente.get().id;
    }
    else if (controller.cliente.get() != null && controller.login.get().perfil_id == 5) {
        compra.comprador_id = controller.cliente.get().id;
        compra.vendedor_id = controller.login.get().id;
    }
    else if (controller.cliente.get() != null && controller.login.get().perfil_id == 6) {
        compra.comprador_id = controller.cliente.get().id;
        compra.vendedor_id = controller.login.get().id;
    }
    else if (controller.cliente.get() != null && controller.login.get().perfil_id == 7) {
        compra.comprador_id = controller.cliente.get().id;
        compra.vendedor_id = controller.login.get().id;
    }

    controller.carrinho.change(compra);
    compra.total = compra.carrinho_total;
    //debugger;
    if (endereco == null) {
        endereco = {};
    }
    if (endereco.valor == null) {
        endereco.valor = '$0';
    }
    if (endereco.valor.indexOf('$') != -1) {
        compra.valor_frete = parseFloat(endereco.valor.split('$')[1].replace(',', '.'));
    }
    compra.tipo_frete = busca.tipo_frete;
    if ($('[name="troco"]').val() != null) {
        compra.pago = parseFloat($('[name="troco"]').val().replace(',', '.'));
    }

    if (pagamento != null) {
        compra.pagamento_id = pagamento.pagamento_id;
        compra.pagamento_external_id = pagamento.external_id;
        compra.transacao = pagamento.transacao;
    }
    compra.filial_id = controller.filial.get().id;
    compra.status_da_compra_id = 4;
    compra.delivery = endereco.delivery;
    compra.balcao = endereco.balcao;

    if (pagamento != null && pagamento.transacao == 4) {
        var cartao = controller.cartao.get();

        if (cartao != null) {
            compra.cartao_id = cartao.id;
            compra.cpf = cartao.documento;
        }
    }
    else {
        compra.cartao_id = null;
        compra.cpf = null;
    }
    if (endereco.cpf != null && endereco.cpf != '') {
        compra.cpf = endereco.cpf;
    }

    //debugger;
    $(carrinho.produtos).each(function (index, item) {

        var pedido = {
            horario: {}
        };
        pedido.produto_id = item.id;
        pedido.produto = item;
        pedido.produto_nome = item.nome;
        pedido.external_id = item.external_id;
        pedido.preco = item.preco;
        pedido.desconto = item.desconto == null ? 0 : item.desconto;
        pedido.observacao = item.observacao;
        pedido.comanda = item.comanda;
        pedido.quantidade = item.quantidade;
        pedido.data = item.data;
        pedido.agenda_id = item.agenda_id;
        pedido.montagens = item.montagens;

        if (controller.cliente.get() != null && controller.login.get().perfil_id == 3) {
            pedido.horario.cliente_id = controller.login.get().id;
        }
        else if (controller.cliente.get() != null && controller.login.get().perfil_id == 5) {
            pedido.horario.cliente_id = controller.cliente.get().id;
        }
        else if (controller.cliente.get() != null && controller.login.get().perfil_id == 6) {
            pedido.horario.cliente_id = controller.cliente.get().id;
        }
        else if (controller.cliente.get() != null && controller.login.get().perfil_id == 7) {
            pedido.horario.cliente_id = controller.cliente.get().id;
        }

        function isFloat(n) {
            return n === +n && n !== (n | 0);
        }
        //debugger;

        if (pedido.horario != null) {
            pedido.horario = {};
        }
        if (endereco.delivery) {
            //debugger;
            pedido.horario.lat = endereco.lat.replace(',', '.');
            pedido.horario.lng = endereco.lng.replace(',', '.');

            pedido.horario.endereco = endereco.street;
            pedido.horario.numero = endereco.number;
            pedido.horario.complemento = endereco.complement;
            pedido.horario.cidade = endereco.city;
            pedido.horario.bairro = endereco.district;
            pedido.horario.pais = endereco.country;
            pedido.horario.cep = endereco.cep;

        } else {
            pedido.horario.lat = busca.lat;
            pedido.horario.lng = busca.lng;

            pedido.horario.endereco = busca.endereco;
        }
        compra.pedido.push(pedido);
    });

    //debugger;
    creait.post('pedido', compra, function (data_pedido) {
        //debugger;
        if (data_pedido.erro != null) {
            myApp.alert(data_pedido.erro, 'Atenção');
            creait.loader(false);
        }
        else {
            if (data_pedido.pagarme_status == null || data_pedido.pagarme_status == "approved" || data_pedido.pagarme_status == "authorized") {
                window.localStorage.removeItem('carrinho');
                window.localStorage.removeItem('pagamento');
                //debugger;
                if (controller.login.get().perfil_id == 3) {
                    myApp.alert('', 'Pedido realizado com sucesso');
                    creait.redirect('categoria');
                }
                else if (controller.login.get().perfil_id == 5) {
                    creait.redirect('mesa', 'id=' + controller.cliente.get().cpf);
                }
                else if (controller.login.get().perfil_id == 7) {
                    controller.cliente.set(null);
                    creait.redirect('cliente');
                    myApp.alert('Pedido realizado', 'SUCESSO');
                }
                else if (biblioteca.get('menu_usuario') == '#menu_consulta') {
                    creait.redirect('horario', 'id=' + data_pedido.horario[0].id);
                }
                else {
                    creait.redirect('acompanhamento', 'compra_id=' + data_pedido.id);
                }
            }
            else if (data_pedido.pagarme_status == 'erro') {
                myApp.alert(data_pedido.message, 'Oops');
                creait.loader(false);
            }
            else if (data_pedido.pagarme_status == 'not_cleared') {
                myApp.alert('Seu cartão não foi aceito, informe outro cartão ou escolha outra forma de pagamento', 'Cartão recusado');
                creait.loader(false);
            }
            else {
                myApp.alert('Verifique se você digitou os dados do seu cartão corretamente', 'Cartão não aprovado');
                creait.loader(false);
            }
        }
        //setTimeout(function () { 
        //    creait.loader(false);
        //}, 5000)
    });
}


function calcular_tempo(data) {
    var dtPartida = new Date();
    var dtChegada = new Date(data);


    var diffMs = (dtPartida - dtChegada);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    if (isNaN(diffHrs)) {
        return null;
    }
    var diff = diffHrs + 'hr(s) ' + diffMins + 'min';
    if (diffHrs == 0) {
        diff = diffMins + " min";
    }
    else if (diffHrs == 1) {
        diff = "1hr " + diffMins + "min";
    }
    else {
        diff = diffHrs + 'hrs ' + diffMins + "min";
    }
    return diff;
}

Date.prototype.addMinutes = function (minutes) {
    var copiedDate = new Date(this.getTime());
    return new Date(copiedDate.getTime() + minutes * 60000);
}



function adicionar_produto_memoria(query) {
    if (query.id != null) {

        var produto_id = parseInt(query.id, 10);
        var adicionar_value = null;

        var categoria = $(controller.busca.get().tipos).filter(function (a, b) {
            if ($(b.produto).filter(function (c, d) {
                if (d.id == produto_id) {
                    adicionar_value = jQuery.extend(true, {}, d);;
                    return true;
                }
                else {
                    return false;
                }
            }).length > 0) {
                return true;
            }
            else {
                return false;
            }
        });

        adicionar_value.imagens = [];
        adicionar_value.imagens.push(
            {
                icone: (adicionar_value.icone == '' ? null : adicionar_value.icone)
            });
        adicionar_value.redirect_adicionar = 'produto';
        adicionar_value.agrupamento = adicionar_value.descricao;
        adicionar_value.categoria_id = categoria[0].id;
        controller.adicionar.set(adicionar_value);

        if (adicionar_value.redirect != "adicionar") {
            //creait.redirect(adicionar_value.redirect);
            //return;
        }
    }
}

function getWeek() {
    var days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    return days[new Date().getDay()];
}


function readimg(e, callback) {

    var control = this;

    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
            var porcent = (250 * 100 / img.width);
            var MAX_WIDTH = img.width * porcent / 100;
            var MAX_HEIGHT = img.height * porcent / 100;
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
            callback(dataUrl);
        }
        img.src = e.target.result;
    }
    fileReader.readAsDataURL(e.target.files[0]);
}

function openCameraQRcode() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (result.cancelled) {
                console.log('leitura cancelada!');
            }
            else {
                creait.post("qrcode?codigo=" + result.text + "pessoa_id=" + controller.login.get().id, null, function (data) {
                    if (data.flag == "grupo") {
                        var grupo = controller.login.get();

                        grupo.grupos.push({
                            id: data.id,
                            nome: data.nome,
                            descricao: data.descricao
                        });

                        controller.login.set(grupo);

                        myApp.alert("Você entrou para o grupo " + data.nome + ".", "");
                        creait.loader(false);
                    }
                });
            }
        },
        function (error) {
            console.log("Scanning failed: " + error);
        },
        {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: false, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt: "", // Android
            resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSulpessBeep: false // iOS and Android
        }
    );
}

function seleciona_data(id) {

    var today = new Date();
    var calendarDefault = myApp.calendar({
        input: "#" + id,
        dateFormat: 'dd/mm/yyyy',
        dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekHeader: true,
        monthNames: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        maxDate: today,
        onClose: function () {
            if ($('.picker-calendar-selected-date').html() == "Select date") {
                $('#' + id).val("");
                $('#' + id).removeClass('not-empty-state');
            }
            calendarDefault.destroy();
        },
        toolbarTemplate:
        '<div class = "toolbar calendar-custom-toolbar">' +
        '<div class = "toolbar-inner">' +
        '<div class = "left">' +
        '<a href = "#" class = "link icon-only picker-calendar-prev-month"><i class = "icon icon-prev"></i></a>' +
        '</div>' +
        '<div class = "center">' +
        '<span class="current-month-value"></span>' +
        '</div > ' +
        '<div class = "">' +
        '<a href = "#" class = "link icon-only picker-calendar-next-month"><i class = "icon icon-next"></i></a>' +
        '</div>' +
        '<div class = "left">' +
        '<a href = "#" class = "link icon-only picker-calendar-prev-year"><i class = "icon icon-prev"></i></a>' +
        '</div>' +
        '<div class = "center">' +
        '<span class="current-year-value"></span>' +
        '</div > ' +
        '<div class = "">' +
        '<a href = "#" class = "link icon-only picker-calendar-next-year"><i class = "icon icon-next"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>'
    });
    calendarDefault.open();
}

function seleciona_estado(id) {
    var picker = myApp.picker({
        input: '#' + id,
        rotateEffect: true,
        cols: [
            {
                values: ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
            }
        ],
        toolbarTemplate:
        '<div class = "toolbar">' +
        '<div class = "toolbar-inner">' +
        '<div class = "left">' +
        '</div>' +
        '<div class = "center"></div>' +
        '<div class = "">' +
        '<a href = "#" class = "link close-picker">Done</a>' +
        '</div>' +
        '</div>' +
        '</div>',
        onClose: function () {
        },
        onOpen: function () {
        }
    });

    picker.open();
}