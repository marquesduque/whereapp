"use strict";

var creait = {
    url: "", //AMBIENTE PRODUÇÃO ===>  http://100.26.47.28:81/ //AMBIENTE HOMOLOGAÇÃO ===>  http://100.26.47.28:83/
    init: function () {
        controller.login.index();
    },
    get: function (controller, data, callback) {
        chkAjax = $$.ajax({
            url: creait.url + "/api/" + controller,
            method: 'GET',
            dataType: 'json',
            data: data,
            beforeSend: function () {
                bootbox.dialog({
                    message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>',
                    closeButton: false
                });
            },
            complete: function () {
                window.setTimeout(function () {
                    bootbox.hideAll();
                }, 1000);
            },
            success: function (data) {
                try {
                    callback(data);
                }
                catch (ex) {
                    console.log("Creait: " + ex);
                }
            },
            error: function (a, b, c) {
                if (a.status == 400) {
                    myApp.addNotification({
                        message: JSON.parse(a.responseText).Message
                    });
                }
                callback({ error: a.status, message: JSON.parse(a.responseText).Message });
            }
        });
    },
    post: function (controller, data, callback, async) {
        chkAjax = $$.ajax({
            url: creait.url + "/api/" + controller,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                try {
                    callback(data);
                }
                catch (ex) {
                    console.log("Creait: " + ex);
                }
            },
            beforeSend: function () {
                bootbox.dialog({
                    message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>',
                    closeButton: false
                });
            },
            async: async,
            error: function (a, b, c) {

                if (a.status == 400) {
                    myApp.addNotification({
                        message: JSON.parse(a.responseText).Message
                    });
                }
                callback({ error: a.status, message: JSON.parse(a.responseText).Message });

            },
            complete: function () {
                window.setTimeout(function () {
                    bootbox.hideAll();
                }, 1000);
            }
        });
    },
    redirect: function (page, parameter) {
        mainView.router.loadPage("pagina/" + page + ".html" + (parameter == null ? '' : parameter == undefined ? '' : '?' + parameter));
    },
    queryStringToJSON: function (str) {
        var pairs = str.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            var name = pair[0];
            var value = pair[1];
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
    countdownFunctionException: function (seconds, functionName) {

        toCode = setTimeout(function () {
            try {
                var fn = window[functionName];
                fn();
            }
            catch (ex) {
                console.warn(ex);
            }
        }, seconds * 1000);
    },

    breakCountdownFunctionException: function () {
        if (toCode != "") {
            clearTimeout(toCode);
        }
    }
};

/*===============================================*/
/* APP INIT                                      */
/*===============================================*/
var controller = {};
var myApp = new Framework7({
    //actions: {
    //    convertToPopover: false,
    //    grid: true,
    //},
    preprocess: function (content, url, next) {
        window.setTimeout(function () {
            var query = {};
            if (url.indexOf('?') > -1) {
                query = creait.queryStringToJSON(url.split('?')[1]);
                url = url.split('?')[0];
            }
            var method = url.replace(".html", "").replace("pagina/", "");
            if (method in window["controller"]) {
                eval("controller." + method + '.init')(function (data, callback) {
                    var template = Template7.compile(content);
                    var result = template(data);
                    next(result);
                    if (callback != null) {
                        callback(result);
                    }
                }, query);
                $('[mask="cel"]').mask("(99) 99999-9999");


                $('[mask="tel"]').mask("(99) 9999-9999");

                $('[mask="cpf"]').mask("999.999.999-99");

                $('[mask="rg"]').mask("99.999.999-9");

                $('[mask="cnpj"]').mask("99.999.999/9999-99");

                $('[mask="cep"]').mask("99999-999");

                $('[mask="exp_date"]').mask("99/9999");
            }
            else {
                console.log("Creait is not defined url: " + url);
                creait.redirect($('[redirect]').attr("redirect"));
            }
        }, 600);
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
    swipePanel: "false",
    modalButtonOk: "Ok",
    modalButtonCancel: "Cancelar"
});

/*===============================================*/
/* EXPORT SELECTORS ENGINE                          */
/*===============================================*/
var $$ = Dom7;

$$('.popup-about').on('popup:open', function (e, popup) {
    console.log('About popup open');
});
$$('.popup-about').on('popup:opened', function (e, popup) {
    console.log('About popup opened');
});

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
$$(document).on("ajaxStart", function (e) {
    myApp.showIndicator();
});
$$(document).on("ajaxComplete", function () {
    myApp.hideIndicator();
});

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
        input: "#calendar-default",
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

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function readimg(e) {

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
            return dataUrl.split(',')[1];
        };
        img.src = e.target.result;
    };
    fileReader.readAsDataURL(e);
}

function resizeBase64(el, W) {
    var porcent = (W * 100 / $(el).width());
    var MAX_WIDTH = $(el).width() * porcent / 100;
    var MAX_HEIGHT = $(el).height() * porcent / 100;
    var width = $(el).width();
    var height = $(el).height();

    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    }
    else if (width == height) {
        width = MAX_WIDTH;
        height = MAX_HEIGHT;
    }
    else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(el, 0, 0, width, height);


    var dataUrl = canvas.toDataURL();
    return dataUrl.split(',')[1];
}

function seleciona_data(id) {

    var today = new Date();
    var weekLater = new Date().setDate(today.getDate() + 7);

    var calendarDefault = myApp.calendar({
        input: "#" + id,
        disabled: {
            to: new Date(today)
        },
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekHeader: true,
        monthNames: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        onClose: function () {
            if ($('.picker-calendar-selected-date').html() == "Select date") {
                $('#' + id).val("");
                $('#' + id).removeClass('not-empty-state');
            }
            calendarDefault.destroy();
        },
        closeOnSelect: true,
        toolbarTemplate:
        '<div class = "toolbar calendar-custom-toolbar">' +
        '   <div class = "toolbar-inner">' +
        '       <div class = "left">' +
        '           <a href = "#" class = "link icon-only picker-calendar-prev-month"><i class = "icon icon-prev"></i></a>' +
        '       </div>' +
        '       <div class = "center">' +
        '           <span class="current-month-value"></span>' +
        '       </div > ' +
        '       <div class = "">' +
        '           <a href = "#" class = "link icon-only picker-calendar-next-month"><i class = "icon icon-next"></i></a>' +
        '       </div>' +
        '       <div class = "left">' +
        '           <a href = "#" class = "link icon-only picker-calendar-prev-year"><i class = "icon icon-prev"></i></a>' +
        '       </div>' +
        '       <div class = "center">' +
        '           <span class="current-year-value"></span>' +
        '       </div > ' +
        '       <div class = "">' +
        '           <a href = "#" class = "link icon-only picker-calendar-next-year"><i class = "icon icon-next"></i></a>' +
        '       </div>' +
        '   </div>' +
        '</div>'
    });
    calendarDefault.open();
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


