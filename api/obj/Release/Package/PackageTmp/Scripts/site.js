"use strict"; jQuery.base64 = (function ($) { var _PADCHAR = "=", _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _VERSION = "1.0"; function _getbyte64(s, i) { var idx = _ALPHA.indexOf(s.charAt(i)); if (idx === -1) { throw "Cannot decode base64" } return idx } function _decode(s) { var pads = 0, i, b10, imax = s.length, x = []; s = String(s); if (imax === 0) { return s } if (imax % 4 !== 0) { throw "Cannot decode base64" } if (s.charAt(imax - 1) === _PADCHAR) { pads = 1; if (s.charAt(imax - 2) === _PADCHAR) { pads = 2 } imax -= 4 } for (i = 0; i < imax; i += 4) { b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3); x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255)) } switch (pads) { case 1: b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6); x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255)); break; case 2: b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12); x.push(String.fromCharCode(b10 >> 16)); break } return x.join("") } function _getbyte(s, i) { var x = s.charCodeAt(i); if (x > 255) { throw "INVALID_CHARACTER_ERR: DOM Exception 5" } return x } function _encode(s) { if (arguments.length !== 1) { throw "SyntaxError: exactly one argument required" } s = String(s); var i, b10, x = [], imax = s.length - s.length % 3; if (s.length === 0) { return s } for (i = 0; i < imax; i += 3) { b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2); x.push(_ALPHA.charAt(b10 >> 18)); x.push(_ALPHA.charAt((b10 >> 12) & 63)); x.push(_ALPHA.charAt((b10 >> 6) & 63)); x.push(_ALPHA.charAt(b10 & 63)) } switch (s.length - imax) { case 1: b10 = _getbyte(s, i) << 16; x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63) + _PADCHAR + _PADCHAR); break; case 2: b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8); x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63) + _ALPHA.charAt((b10 >> 6) & 63) + _PADCHAR); break } return x.join("") } return { decode: _decode, encode: _encode, VERSION: _VERSION } }(jQuery));


function jsonToUrl(data) {
    var url = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
    return url;
}

$(document).ready(function () {
    var menu = $('.sidebar-menu').find('[href="/' + (window.location.pathname.split('/')[1] + window.location.search) + '"]');
    menu.closest('.treeview').addClass('active');
    menu.parent().addClass('active');
    var notificacoes = [];
    setInterval(function () {
        $.ajax({
            type: "GET",
            url: "/API/notificacao",
            dataType: 'json',
            success: function (result) {
                if (result != null && result.length > 0) {
                    Notification.requestPermission();
                    $(result).each(function (index, item) {
                        if (item.titulo != '' && item.titulo != null) {
                            var enviar = true;
                            $(notificacoes).each(function (index1, item1) {
                                if (item.id == item1.id) {
                                    enviar = false;
                                }
                            });
                            if (enviar) {
                                var myAudio = new Audio("/bipe.mp3");
                                setTimeout(function () {
                                    myAudio.play();
                                }, 1000);

                                if (typeof BuscaCards != "undefined") {
                                    BuscaCards();
                                }

                                notificacoes.push(item);
                                var notificacao = new Notification(item.titulo, {
                                    // use \n para quebrar linhas
                                    body: item.descricao,
                                    // opcional
                                    icon: logo_base64
                                });
                                notificacao.onclick = function () {
                                    event.preventDefault(); // prevent the browser from focusing the Notification's tab
                                    var pop = window.open('/compras/details', '_self');
                                    pop.focus();
                                };
                            }
                        }
                    });

                }
            },
            error: function (a, b, c) {

            }
        });
    }, 1000);

    if (typeof perfil_id_master != "undefined" && (perfil_id_master == 1 || perfil_id_master == 4)) {
        $('[base_library]').each(function (index, item) {
            $(item).css("visibility", "visible");
            var label = jQuery.grep(JSON.parse(library), function (n, i) {
                return (n.name == $(item).attr('base_library'));
            });
            if (label.length > 0) {
                add(label[0]);
            }
            else {
                var json = { description: $(item).html(), col_description: $(item).html() };
                add(json);
            }

            function add(json) {
                $(item).html(json.description);
                $(item).data('base_library', json);

                if (item.localName == 'td') {
                    var tdPosition = null;
                    $(item).parent().find('td').each(function (tdp, td) {
                        if ($(td).attr('base_library') == $(item).attr('base_library')) {
                            tdPosition = tdp;
                        }
                    });
                    if (tdPosition != null) {
                        if (json.col == false) {
                            $('head').append($('<style>td:nth-child(' + (tdPosition + 1) + '){ display:none; }</style>'));
                        }
                        else if (json.size != false) {
                            $('head').append($('<style>td:nth-child(' + (tdPosition + 1) + '){ min-width:' + json.size + 'px; }</style>'));
                        }
                    }
                    if (json.col_description != null && json.col_description != '') {
                        $(item).html(json.col_description);
                    }
                    else {
                        $(item).html(json.description);
                    }
                }
                else {
                    if (json.col == false) {
                        $(item).hide();
                    }
                    if (json.description != null && json.description != '') {
                        $(item).html(json.description);
                    }
                    else {
                        $(item).html(json.col_description);
                    }
                }
                //$('#Filter_' + $(item).attr('base_library').split('.')[$(item).attr('base_library').split('.').length - 1]).attr('placeholder', json.description);

                if ($('[base_library]').css('cursor') != "text") {
                    $(item).contextmenu(function () {
                        prompt($(item).attr('base_library').replace(/_/g, ' '), json, function (success, result) {
                            if (success) {
                                result.url = window.location.toString();
                                result.name = $(item).attr('base_library');


                                $(item).data('base_library', result);
                                $.ajax({
                                    type: "POST",
                                    url: "/biblioteca_de_palavra/create?" + jsonToUrl(result),
                                    dataType: 'json',
                                    success: function (result) {
                                    },
                                    error: function (a, b, c) {

                                    }
                                });

                                add(result);
                            }
                        });
                        return false;
                    });
                }
            }
        });
    }


    $('.info-box-icon').each(function () {

        var source = $(this).parent().find('[type="file"]').attr('source');
        if ($(source + "_itype").val().toString().indexOf('image') != -1) {
            $(this).css("background-image", 'url(' + $(source + "_itype").val() + ',' + $(source).val() + ')');

        }
        else if ($(source + "_itype").val().toString().indexOf('pdf') != -1) {
            $(this).html('<i class="fa fa-file-pdf-o"></i>');
        }
        else {
            $(this).html('<i class="fa fa-image"></i>');
        }

        $(this).unbind('click');
        $(this).click(function () {
        
if($(source + "_itype").val() != ''){
            var image = new Image();
            image.src = $(source + "_itype").val() + ',' + $(source).val();

            var w = window.open("");
            w.document.write(image.outerHTML);
}
        });
    });




    if ($('.field-validation-error:visible').length > 0) {
        $('.alert-danger').show();
    }

    if ($('[find_cep]').length > 0) {
        $.each($('[find_cep]'), function (index, item) {

            var arr = JSON.parse($(item).attr('find_cep'))
            for (var key in arr) {
                $(arr[key]).css('text-transform', 'uppercase');
            }
        });
    }


    addplus();
    function addplus() {
        if ($('.select2-selection--multiple').length == 0) {
            setTimeout(function () {
                addplus();
            });
        }
        else {

            $('.select2-selection--multiple').append('<i class="glyphicon glyphicon-plus-sign" style="position: absolute; margin-left:-20px; margin-top:9px; cursor:pointer"></i>');
        }
    }

    if (typeof perfil != 'undefined') {

        $(perfil).each(function (index_p, item_p) {
            var url_banco = item_p.url.toLowerCase().split('?')[0];

            $('[href]').each(function (index, item) {
                var url = $(item).attr('href').toLowerCase();

                if ($(item).attr('fixed') == null && url.indexOf(url_banco.toLowerCase()) != -1 && url.toLowerCase().indexOf('create') != -1) {
                    if (item_p.create) {
                        $(item).show();
                    }
                    else {
                        $(item).hide();
                    }
                }
                if ($(item).attr('fixed') == null && url.indexOf(url_banco.toLowerCase()) != -1 && url.toLowerCase().indexOf('edit') != -1) {

                    if (item_p.edit) {
                        $(item).show();
                    }
                    else {
                        $('fieldset').attr('disabled', 'disabled')
                        $(item).hide();
                    }
                }
                if ($(item).attr('fixed') == null && url.toLowerCase().indexOf(url_banco.toLowerCase()) != -1 && url.toLowerCase().indexOf('details') != -1) {
                    if (item_p.list) {
                        $(item).show();
                    }
                    else {
                        $(item).hide();
                    }
                }
                if ($(item).attr('fixed') == null && url.toLowerCase() == url_banco.toLowerCase()) {
                    if (item_p.list) {
                        $(item).show();
                    }
                    else {
                        $(item).hide();
                    }
                }
                if ($(item).attr('fixed') == null && url.toLowerCase().indexOf(url_banco.toLowerCase()) != -1 && url.toLowerCase().indexOf('delete') != -1) {
                    if (item_p.delete) {
                        $(item).show();
                    }
                    else {
                        $(item).hide();
                    }
                }
            });

            $('[value="Alterar"]').each(function (index, item) {
                if (window.location.toString().toLowerCase().indexOf(url_banco.toLowerCase()) != -1) {
                    if (item_p.edit) {
                        $(item).show();
                    }
                    else {
                        $('fieldset').attr('disabled', 'disabled')
                        $(item).hide();
                    }
                }
            });
            $('[base_library]').each(function (index, item) {

                if ($(item).attr('fixed') == null && window.location.toString().indexOf(url_banco.toLowerCase()) != -1 && $(item).attr('base_library').toLowerCase().indexOf('library_edit') != -1) {
                    if (item_p.edit) {
                        $(item).show();
                    }
                    else {
                        $('fieldset').attr('disabled', 'disabled')
                        $(item).hide();
                    }
                }
            });



            $('[onclick]').each(function (index, item) {

                if ($(item).attr('onclick').toLowerCase().indexOf("delete_item") != -1) {
                    if ($(item).attr('onclick').toLowerCase().indexOf(url_banco.toLowerCase()) != -1) {
                        if (item_p.delete) {
                            $(item).show();
                        }
                        else {
                            $(item).hide();
                        }
                    }
                }
            });
        });
    }

    //Validar campos obrigatorios ao ganhar foco
    $('input[data-val=true]').on('blur', function () {

        if ($(this).val().trim() == "" || $(this).val().trim() == "R$ 0,00") {
            $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-valid');
            $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-error');
            $('[data-valmsg-for="' + this.id + '"]').html($(this).attr('data-val-required'));
        }
        else {
            $('[data-valmsg-for="' + this.id + '"]').removeClass('field-validation-error');
            $('[data-valmsg-for="' + this.id + '"]').addClass('field-validation-valid');
            $('[data-valmsg-for="' + this.id + '"]').html("");
        }

        //Validar input com caixa alta
        var inputValue = $(this).val();
        $(this).val(inputValue);
    });

    if ($('[datepiker]').datepicker != null) {
        $('[datepiker]').datepicker();

        $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
    }

    $('[monthYear]').datepicker({
        format: "mm/yyyy",
        viewMode: "months",
        minViewMode: "months"
    });

    $("[mask]").each(function () {

        if ($(this).attr('mask') == 'money') {
            $(this).maskMoney({ prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });
        }
        else if ($(this).attr('mask') == 'percent') {
            $(this).maskMoney({ prefix: '% ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: false });
        }
        else {
            var json = JSON.parse($(this).attr('mask'));
            json.property = { 'placeholder': json.placeholder };

            if (json.value == "99/99/9999") {
                $(this).datepicker({
                    format: 'dd/mm/yyyy',
                    language: 'pt-BR'
                });
            }
            $(this).inputmask(json.value, json.property);
        }
    });

    $('input[type="file"]').each(function () {
        this.addEventListener("change", readFile, false);
    });

    function readFile() {

        var control = this;
        if (this.files && this.files[0]) {
            var files = this.files[0];
            var FR = new FileReader();
            var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
            FR.onload = function (e) {
                if (control.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {

                    var files = control.files, f = files[0];
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var data = e.target.result;
                        if (!rABS) data = new Uint8Array(data);
                        var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });

                        /* DO SOMETHING WITH workbook HERE */
                        var first_sheet_name = workbook.SheetNames[0];

                        /* Get worksheet */
                        var worksheet = workbook.Sheets[first_sheet_name];

                        //ESSE PEDAÇO DE CÓDIGO SERVE PARA IGNORAR A PRIMEIRA LINHA DA PLANILHA
                        var range = XLSX.utils.decode_range(worksheet['!ref']);
                        range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
                        worksheet['!ref'] = XLSX.utils.encode_range(range);
                        //ATÉ AQUI É O PEDAÇO DE CÓDIGO


                        //CÓDIGO AQUI EMBAIXO IMPRIME O ARRAY NO CONSOLE
                        //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
                        $($(control).attr("source")).val(JSON.stringify(XLSX.utils.sheet_to_json(worksheet, { raw: true })));
                    };
                    if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);


                    //target.addEventListener('change', handleFile, false);



                }
                else {
                    var img = new Image();

                    img.src = e.currentTarget.result;

                    img.onload = function () {
                        var MAX_WIDTH = img.width;
                        var MAX_HEIGHT = img.height;

                        if ($(control).attr('size') != null) {

                            var porcent = ((parseFloat($(control).attr('size')) * 100) / img.height);
                            MAX_WIDTH = img.width * (porcent / 100);
                            MAX_HEIGHT = img.height * (porcent / 100);
                        }
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
                        $($(control).attr('source')).val(dataUrl.split(',')[1]);
                        $($(control).attr('source') + '_itype').val(dataUrl.split(',')[0]);

                        $($(control).attr('source')).parent().parent().find('.info-box-icon').css('background-image', 'url(' + dataUrl + ')');
                        $($(control).attr('source')).parent().parent().find('.info-box-icon').html('');
                        if (files.type == "application/pdf") {
                            $($(control).attr('source')).parent().parent().find('.info-box-icon').html('<i class="fa fa-file-pdf-o"></i>');
                        }

                        $($(control).attr('source')).parent().parent().find('.info-box-icon').unbind('click');
                        $($(control).attr('source')).parent().parent().find('.info-box-icon').click(function () {
                            window.open(dataUrl);
                        });
                    };
                }
            };

            FR.readAsDataURL(this.files[0]);
        }
        else {
            $($(control).attr('source')).val('');
            alert("O arquivo é muito grande. Favor selecionar um arquivo com no máximo 5 mb");
        }

        if ((this.files[0].type != "image/jpeg") && (this.files[0].type != "image/png") && (this.files[0].type != "application/pdf") && (this.files[0].type != "image/svg+xml") && (this.files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            $($(control).attr('source')).val('');
            alert("O Tipo de arquivo selecionado é inválido, selecione um formato válido (jpeg, png, pdf)");
        }



    }

    if ($("[money]").maskMoney != null) {
        $("[money]").maskMoney({ allowNegative: true, thousands: '.', decimal: ',', allowZero: true, affixesStay: false });
    }


    $('[icheck]').each(function () {
        $('[name="' + $(this).attr('icheck') + '"][value="' + $(this).val().toLowerCase() + '"]').attr('checked', 'checked');
    });
    if ($('fieldset').attr('disabled') == null) {
        //iCheck for checkbox and radio inputs
        $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
        });
        //Red color scheme for iCheck
        $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
            checkboxClass: 'icheckbox_minimal-red',
            radioClass: 'iradio_minimal-red'
        });
        //Red color scheme for iCheck
        $('input[type="checkbox"].minimal-green, input[type="radio"].minimal-green').iCheck({
            checkboxClass: 'icheckbox_minimal-green',
            radioClass: 'iradio_minimal-green'
        });
        //Flat red color scheme for iCheck
        $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });
    }


    $('[icheck]').each(function () {
        var controler = this;
        $('[name="' + $(controler).attr('icheck') + '"]').on('ifUnchecked', function (event) {
            check();
        });
        $('[name="' + $(controler).attr('icheck') + '"]').on('ifChecked', function (event) {
            check();
            var callback = $(controler).attr('callback');
            if (callback != null) {
                eval(callback)($(controler).val());
            }
        });


        function check() {
            var value = '';
            $("[name='" + $(controler).attr('icheck') + "']:checked").each(function () {
                value = $(this).val() + ',';
            });

            if (value.length > 0) {
                value = value.substring(0, value.length - 1);
            }
            $(controler).val(value);

            if ($("[name='" + $(controler).attr('icheck') + "']:checked").length == $("[name='" + $(controler).attr('icheck') + "']").length) {
                $(controler).val('');
            }
            if ($(controler).closest('table').length > 0) {
                setTimeout(function () {
                    $('.tblrow').remove();
                    $('#Page').val('0');
                    $(controler).closest('form').submit();
                });
            }
        }
    });

    $('[find_cep]').each(function () {
        var input = this;

        $(input).keyup(function () {
            if ($(input).val().length >= 8) {
                submit(input);
            }

        });

        function submit(input) {


            var fields = JSON.parse($(input).attr('find_cep'));
            $.ajax({
                type: "GET",
                //url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + $(input).val() + '+brasil',
                url: "http://viacep.com.br/ws/" + $(input).val() + "/json/",
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (place) {
                    $(fields.estado).val(place.uf.toLowerCase());
                    $(fields.cidade).val(place.localidade.toLowerCase());
                    $(fields.endereco).val(place.logradouro.toLowerCase());
                    $(fields.bairro).val(place.bairro.toLowerCase());
                    $(fields.numero).val("");
                    $(fields.cep).val(place.cep);
                },
                error: function (data) {
                }
            });
        }
    });

    bind_select2($('select[source]'));

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    $('form').submit(function () {
        if ($(this).attr('ajax') == null) {
            $('.loader').show();
        }
    });

    bind_ajax();


    $('[table="tbl"]form').submit();

});

function bind_ajax() {

    if (jQuery('[ajax]').length > 0) {

        $('.loader').show();
    }
    jQuery('[ajax]').submit(function () {

        var form_selected = this;
        var table_id = $(form_selected).attr("table");

        if (typeof table_id != "undefined") {
            $(window).scroll(function (event) {
                var scroll = $(window).scrollTop() + 20;
                if (scroll >= $('html').innerHeight() - $(window).height()) {
                    if ($('[loader="' + table_id + '"]').length > 0 && !$('[loader="tbl"]').is(':visible')) {
                        jQuery('[ajax][table]').submit();
                    }
                }
            });
        }


        var dataSubmit = jQuery(form_selected).serialize().replace(/Filter./g, "");//.replace(/\./g, "").replace(/%2C/g, ".").replace(/on/g, "true").replace(/%off/g, "false");

        $('[loader="' + table_id + '"]').show();

        $('#Page').val(parseInt($('#Page').val(), 10) + 1);
        $.ajax({
            type: "POST",
            url: jQuery(form_selected).attr('ajax') + "?" + dataSubmit,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (result) {

                $('.loader').hide();
                if (result.length < 30) {
                    $('[loader="' + table_id + '"]').remove();
                }
                if ($(form_selected).attr('callback') != null) {
                    if (result.errors != null) {
                        $(result.errors).each(function (index, item) {
                            $('[data-valmsg-for="' + jQuery(form_selected).attr('ajax').toLowerCase() + '.' + item.Key + '"]').html(item.Value);
                        });
                    }
                    else {
                        eval($(form_selected).attr('callback'))(result);
                    }
                }
                else {
                    $(result).each(function (index, item) {

                        var template = $($("[template='" + table_id + "']").html());

                        if ($('[pk_value="' + item[template.attr('pk')] + '"]').length == 0) {

                            template.attr('pk_value', item[template.attr('pk')]);

                            for (var key in item) {
                                if (item.hasOwnProperty(key)) {
                                    debugger;
                                    var value = item[key];
                                    if (typeof (value) != "object") {
                                        if (template.find('[column="' + key + '"]').attr('tradutor') != null) {
                                            if (JSON.parse(template.find('[column="' + key + '"]').attr('tradutor'))[value] != null) {
                                                value = JSON.parse(template.find('[column="' + key + '"]').attr('tradutor'))[value];
                                            }
                                        }
                                        if (typeof value == "string") {
                                            template.find('[column="' + key + '"]').html(value.replace(' 00:00:00', ''));
                                        }
                                        else {
                                            template.find('[column="' + key + '"]').html(value);
                                        }
                                    }
                                    else {

                                        for (var keyParent in value) {
                                            var valueParent = value[keyParent];
                                            if (template.find('[column="' + key + '.' + keyParent + '"]').attr('tradutor') != null) {
                                                if (JSON.parse(template.find('[column="' + key + '.' + keyParent + '"]').attr('tradutor'))[valueParent] != null) {
                                                    valueParent = JSON.parse(template.find('[column="' + key + '.' + keyParent + '"]').attr('tradutor'))[valueParent];
                                                }
                                            }
                                            if (template.find('[column="' + key + '.' + keyParent + '"]').attr('type') == 'money') {
                                                valueParent = teste;
                                            }
                                            template.find('[column="' + key + '.' + keyParent + '"]').html(valueParent);
                                        }
                                    }
                                }
                            }
                            if (item.N_Codigo_Titular != null) {
                                $(template).find('.b_icon').html('');
                            }

                            if ($(template).attr('pk') != null) {

                                template.click(function () {
                                    var exists = false;

                                    $(perfil[0]).each(function (index_p, item_p) {
                                        if (window.location.pathname.toLowerCase().indexOf(item_p.url.toLowerCase()) != -1) {
                                            //if (item_p.B_Editar) {
                                            window.location = $("[template='" + table_id + "']").attr('redirect') + '/' + item[$(template).attr('pk')] + window.location.search;
                                            //}
                                            exists = true;
                                        }
                                    });
                                    if (!exists) {
                                        window.location = $("[template='" + table_id + "']").attr('redirect') + '/' + item[$(template).attr('pk')] + window.location.search;
                                    }
                                });
                            }
                            $('#' + table_id).append(template);
                        }
                    });
                }

                $('[loader="' + table_id + '"]').hide();

            },
            error: function (ex, e) {

                $('[loader="' + table_id + '"]').hide();
            }
        });

        return false;
    });
}

function bind_select2(selects) {

    selects.each(function () {

        if ($(this).closest('fieldset').attr('disabled') == null && $(this).hasClass('select2')) {

            var select = this;
            setTimeout(function () {

                $(select).select2(null);
                $(select).on("select2-selecting", function (e) {
                    alert('1');
                });


                $(select).on('change', function () {

                    if ($(select).val() == null || $(select).val() == '') {
                        $($(select).attr("source")).val('');
                    }
                    else {
                        if ($(select).attr('multiple') != null) {

                            $($(select).attr("source")).val(JSON.stringify($(select).val()));
                        }
                        else {
                            $($(select).attr("source")).val($(select).val());
                        }

                    }
                    if ($(select).attr('callback') != null) {
                        eval($(select).attr('callback'))($($(select).attr("source")).val());
                    }
                });
                if ($(select).attr('multiple') == null) {
                    $(select).select2("val", $($(select).attr("source")).val());
                }
                else {
                    var result = $($(select).attr("source")).val();
                    if (result != null && result != '') {
                        $(select).select2("val", JSON.parse($($(select).attr("source")).val()));
                    }
                }
            }, 1);
        }
        else {
            $(this).find('option').removeAttr('selected');
            $(this).find('option[value="' + $($(this).attr('source')).val() + '"]').attr('selected', 'selected');


            $(this).change(function () {
                $($(this).attr('source')).val($(this).find('option:selected').attr('value'));
            });
        }
    });
}
function modal(message) {

    $("#myModal .modal-body").html(message);
    $("#myModal").on("shown.bs.modal", function () {

    }).modal('show');
}

function confirm(message, callback) {

    $("#myConfirm .modal-body").html(message);
    $("#myConfirm").on("shown.bs.modal", function () {
    }).modal('show');

    $("#myConfirmYes").unbind('click');
    $("#myConfirmYes").click(function () {
        callback(true);
    });
    $("#myConfirmNo").unbind('click');
    $("#myConfirmNo").click(function () {
        callback(false);
    });
}

function prompt(message, json, callback) {

    $("#myPromptLabel").html(message);
    $("#myPromptTxt").val(json.description);
    $("#myPromptTxtColumn").val(json.col_description);
    $("#myPromptTxtSize").val(json.size);
    setTimeout(function () { $("[name='item_col_prompt'][value='" + json.col + "']").iCheck('check') });

    $("#myPrompt").on("shown.bs.modal", function () {
    }).modal('show');

    $("#myPromptYes").unbind('click');
    $("#myPromptYes").click(function () {


        var json = {};
        json.description = $("#myPromptTxt").val();
        json.col = $("[name='item_col_prompt']:checked").val() == "true";
        json.col_description = $("#myPromptTxtColumn").val();
        json.size = $("#myPromptTxtSize").val();

        callback(true, json);
    });
    $("#myPromptNo").unbind('click');
    $("#myPromptNo").click(function () {
        callback(false);
    });
}

function fnExcelReport() {
    var tab_text = $('#tbl').clone();
    tab_text.find('thead').remove();
    tab_text = tab_text[0].outerHTML
    window.open('data:application/vnd.ms-excel;base64,' + $.base64.encode(tab_text));

    return;
    var textRange; var j = 0;
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + $.base64.encode(tab_text));

    return (sa);
}

function delete_item(action) {
    var control = this;
    confirm("Tem certeza que deseja excluir este item?", function (condition) {
        if (condition) {
            $.ajax({
                type: "POST",
                url: action,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (result) {
                    window.location = result.redirect + window.location.search;
                },
                error: function (a, b, c) {

                }
            });
        }
    });
}


//CODIGO DO ALE PRA PODER DAR REPLACE EM TUDO QUE APARECER NA PORRA DA STRING (GERALMENTE UM REPLACE FUNCIONA SÓ NA PRIMEIRA OCORRÊNCIA)
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};