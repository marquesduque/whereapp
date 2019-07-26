
var page = {};
var cor = null;
$(document).ready(function () {

    if ($(window.location.hash).length > 0) {
        $('section.active').removeClass('active');
        $(window.location.hash).addClass('active');
    }

    $('[name="telefone_usuario"]').mask("(99) 9999-9999?9")
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

    $('input').focus(function () {
        var control = this;
        setTimeout(function () {

            $('section.active').scrollTop($(control).offset().top - $('section.active').height() + 20);
        }, 100);
    });

    $('[name="nome_usuario"]').focus();

    var especialidade = [
        { id: 1482454638734295, name: 'Pizzaria', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Hamburgueria', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Bebidas', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Brasileira', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Churrascaria', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Italiana', loader: 'altec', background_image_local: null },
        { id: 241689569557966, name: 'Japonesa', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Mexicana', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Saudável', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Variada', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Salgados', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Doces', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Frutos do mar', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Sorvetes', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Vegetariano', loader: 'altec', background_image_local: null },
        { id: 489662784750293, name: 'Outros', loader: 'altec', background_image_local: null }
    ].sort(function (a, b) {
        return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0);
    });

    $(especialidade).each(function (index, item) {
        var div = $('<li place_id="' + item.id + '"><span class="icon-check-validation"></span><span class="content">' + item.name + '</span></li>')
        $('.answer-group ul').append(div);
        div.click(function () {
            $('[name="specialty"]').val(item.name);
            $('[name="loader"]').val(item.loader);
            $('[name="background_image_local"]').val(item.background_image_local);
            $('[name="place_id"]').val(item.id);
            $('section.active').removeClass('active');
            $('#section_cor').addClass('active');
        })
    });
    function showbutton() {

        var text = "";
        $('section.active:last [show_button]').each(function () {
            text += $(this).val();
        });
        if ($('section.active:last [show_button]').val() != null) {
            if (text.length == 0) {
                $($('section.active:last [show_button]').attr('show_button')).css('visibility', 'hidden');
            }
            else {
                $($('section.active:last [show_button]').attr('show_button')).css('visibility', 'visible');
            }
        }
    }
    $('.btn-blue-back').click(function () {

        $($('section.active:last')[0].previousElementSibling).addClass('active');
        $('section.active:last').removeClass('active');
    });

    showbutton();
    $('[show_button]').keyup(function () {
        showbutton();
    });

    //$('.logo').click(function () {
    //    $('#file').trigger('click');
    //});
    $('#btn_iniciar').click(function () {
        $('[nome_usuario]').html($('[name="nome_usuario"]').val());
        showbutton();
        $('section.active').removeClass('active');
        $('#section_facebook').addClass('active');
        window.location = window.location.href.split('#')[0] + "#section_facebook";
    });
    $('#btn_importar').click(function () {
        showbutton();
        $('section.active').removeClass('active');
        $('#section_facebook').addClass('active');
        window.location = window.location.href.split('#')[0] + "#section_facebook";
        setTimeout(function () {
            $('#txt_pagina').focus();
        }, 10);
    });
    $('#btn_manual').click(function () {
        showbutton();
        $('section.active').removeClass('active');
        $('#section_manual').addClass('active');
        window.location = window.location.href.split('#')[0] + "#section_manual";
    });
    $('#btn_cor').click(function () {
        showbutton();
        $('section.active').removeClass('active');
        $('#section_acesso').addClass('active');
        window.location = window.location.href.split('#')[0] + "#section_acesso";
        $('[name="email_usuario"]').focus();
    });
    $('#btn_endereco').click(function () {
        showbutton();

        var json = $('#form').serializeFormJSON();

        if (json.city == '' || json.state == '' || json.number == '' || json.street == '') {
            if (json.city == '') {
                $('[name="city"]').addClass('required');
                $('[required="city"]').show();
            }
            if (json.state == '') {
                $('[name="state"]').addClass('required');
                $('[required="state"]').show();
            }
            if (json.number == '') {
                $('[name="number"]').addClass('required');
                $('[required="number"]').show();
            }
            if (json.street == '') {
                $('[name="street"]').addClass('required');
                $('[required="street"]').show();
            }
        }
        else {
            $('section.active').removeClass('active');
            $('#section_especialidade').addClass('active');
            window.location = window.location.href.split('#')[0] + "#section_especialidade";
        }
    });
    $('#btn_aplicativo').show();
    $('.btn-blue-normal').hide();
    $('#btn_aplicativo').click(function () {
        showbutton();

        $('.msg_required').hide();
        $('[required]').removeClass('required');
        $('.required').removeClass('required');

        var json = $('#form').serializeFormJSON();
        if (json.logo == '' || json.nomedoaplicativo == '' || json.descricaoaplicativo == '' || json.urldoaplicativo == '' || !checkUrl('http://' + json.url + '.com')) {
            var text = '';
            if (json.logo == '') {
                $('.logo').addClass('required');
                $('[required="logo"]').show();
            }
            if (json.nomedoaplicativo == '') {
                $('[name="nomedoaplicativo"]').addClass('required');
                $('[required="nomedoaplicativo"]').show();
            }
            if (json.descricaoaplicativo == '') {
                $('[name="descricaoaplicativo"]').addClass('required');
                $('[required="descricaoaplicativo"]').show();
            }
            if (json.urldoaplicativo == '') {
                $('[name="urldoaplicativo"]').addClass('required');
                $('[required="urldoaplicativo"]').text('Campo obrigatório');
                $('[required="urldoaplicativo"]').show();
            }
            if (!checkUrl('http://' + json.urldoaplicativo + '.com')) {
                $('[name="urldoaplicativo"]').addClass('required');
                $('[required="urldoaplicativo"]').text('A url que você escolheu é inválida');
                $('[required="urldoaplicativo"]').show();
            }
        }
        else {
            $('#btn_aplicativo').hide();
            $('.btn-blue-normal').show();

            $.ajax({
                type: 'GET',
                url: "/api/facebook?url=" + json.urldoaplicativo, //Returns ID in body
                async: false, // <<== THAT makes us wait until the server is done.
                success: function (data) {
                    if (data) {
                        if (json.logo_itype != '') {
                            $('.logoapp').attr('src', json.logo_itype + ',' + json.logo);
                        }

                        $('.nomeapp').html($('[name="nomedoaplicativo"]').val());
                        $('section.active').removeClass('active');
                        $('#section_endereco').addClass('active');
                        window.location = window.location.href.split('#')[0] + "#section_endereco";
                    }
                    else {
                        $('[name="urldoaplicativo"]').addClass('required');
                        $('[required="urldoaplicativo"]').text('A url já está sendo utilizada por outro aplicativo');
                        $('[required="urldoaplicativo"]').show();
                    }

                    $('#btn_aplicativo').show();
                    $('.btn-blue-normal').hide();
                    showbutton();
                }
            });
        }
    });

    $('.checkbox ul').each(function () {
        var control = this;
        $(control).find('li').click(function () {
            $(control).find('li.selected').removeClass('selected');
            $(this).addClass('selected');
        });
    });

    $("[name='urldoaplicativo']").keyup(function () {
        $(this).val($(this).val().replace(/ /g, "").replace('#', ''));
    });
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    $("#txt_pagina").focusout(function () {
        facebook($(this).val());
    });
    $('#btn_facebook').click(function () {
        facebook($("#txt_pagina").val());
    });
    function facebook(text) {

        text = text.split('?')[0];
        $.ajax({
            type: 'GET',
            url: "https://graph.facebook.com/" + text + "?fields=about,link,name,description,checkins,picture,emails,location,phone,website,category_list,company_overview,cover,hours,price_range,rating_count,restaurant_services,restaurant_specialties&limit=5&access_token=1862908353727666|e8c4e2011b9b18fab0dc50d9c2b54c9f", //Returns ID in body

            //async: false, // <<== THAT makes us wait until the server is done.
            success: function (data) {

                $('#paginas').html('');

                var item = data;
                var div = $('<div class="line_face"><img style="float:left; height:40px" src="' + item.picture.data.url + '"><div>' + item.name + '<div></div>');
                div.data('data', item);

                $.ajax({
                    type: 'GET',
                    url: "/api/facebook?id=" + item.id, //Returns ID in body
                    async: false, // <<== THAT makes us wait until the server is done.
                    success: function (exists) {

                        if (exists) {
                            $('[required="facebook"]').html('Ops, já existe um aplicativo para esta página');
                            $('[required="facebook"]').show();
                        }
                        else {
                            page = jQuery.extend(true, {}, item);

                            $('[required="facebook"]').html('');
                            $('[required="facebook"]').hide('');

                            page.picture = 'https://graph.facebook.com/' + page.id + '/picture?width=200&height=200';
                            if (item.cover != null) {
                                page.cover = item.cover.source;
                            }
                            $("[name='nome_usuario']").val();
                            if (page.emails != null) {
                                $("[name='email_usuario']").val(page.emails[0]);
                            }
                            var arrlink = page.link.split('/');
                            var link = arrlink[arrlink.length - 1];
                            if (link == '') {
                                link = arrlink[arrlink.length - 2];
                            }
                            if ($.isNumeric(link)) {
                                link = page.name.replace(/ /g, "").replace(/'/g, "").replace(/,/g, "").replace(/;/g, "").replace(/\./g, "").replace(/\//g, "").replace(/\\/g, "").replace(/\?/g, "");
                            }
                            if (page.location != null && page.location.street != null && page.location.latitude != null && page.location.city != null && page.location.state != null) {
                                $('[name="country"]').val(page.location.country);
                                $('[name="city"]').val(page.location.city);
                                $('[name="lat"]').val(page.location.latitude);
                                $('[name="lng"]').val(page.location.longitude);
                                $('[name="state"]').val(page.location.state);
                                $('[name="street"]').val(page.location.street);
                                if (page.location.street != null) {
                                    if (page.location.street.split(',').length > 1) {
                                        $('[name="street"]').val(page.location.street.split(',')[0]);
                                        $('[name="number"]').val(page.location.street.split(',')[1].replace(' ', ''));
                                        if (page.location.street.split(',')[1].replace(' ', '').split(' ').length > 1) {
                                            $('[name="complement"]').val(page.location.street.split(',')[1].replace(' ', '').split(' ')[1]);
                                        }
                                    }
                                }
                                $('#endereco_busca').show();
                                $('.endereco_busca').hide();
                                $('#btn_endereco').show();
                            }
                            else {
                                $('#endereco_busca').hide();
                                $('.endereco_busca').show();
                                $('#btn_endereco').hide();
                            }

                            $("[name='telefone_usuario']").val('');
                            $("[name='nomedoaplicativo']").val(page.name);
                            $("[name='urldoaplicativo']").val(link.toLowerCase().replace(/\./g, '_').replace(/-/g, '_').replace(/'/g, ''));
                            $("[name='descricaoaplicativo']").val(page.about);
                            $('.logo').css('background-image', 'url(https://graph.facebook.com/' + page.id + '/picture?width=150&height=150)');
                            $('.logoapp').attr('src', 'https://graph.facebook.com/' + page.id + '/picture?width=150&height=150');

                            $('.nomeapp').html(page.name);
                            $('.nometelefone').html(page.phone);

                            $('[name="logo"]').val('false');
                            $('[name="logo_itype"]').val('');

                            $("[name='senha_usuario']").val();
                            $("[name='confirmarsenha_usuario']").val();
                            $('section.active').removeClass('active');
                            $('#section_manual').addClass('active');
                            showbutton();
                            window.location = window.location.href.split('#')[0] + "#section_manual";
                        }
                    }
                });
                //$('#paginas').append(div);

            },
            error: function () {
                var btn = $('<button type="button" class="btn-blue" style="    margin-left: 10px;    margin: 40px 0px;">CONTINUAR SEM PÁGINA</button>');
                btn.click(function () {

                    $('#endereco_busca').show();
                    $('.endereco_busca').hide();
                    $('#btn_endereco').show();
                    $('section.active').removeClass('active');
                    $('#section_manual').addClass('active');
                    showbutton();
                    window.location = window.location.href.split('#')[0] + "#section_manual";
                });
                $('[required="facebook"]').html('Ops, esta pagina não existe!<br>');
                $('[required="facebook"]').append(btn);
                $('[required="facebook"]').show();
                page = {};
            }
        });
    }


    $('input[name="upload_file"]').each(function () {
        this.addEventListener("change", readFile, false);
    });

    function readFile() {
        var control = this;
        if (this.files && this.files[0]) {
            var files = this.files[0];
            var FR = new FileReader();
            FR.onload = function (e) {


                var img = new Image();

                img.src = e.currentTarget.result;

                img.onload = function () {
                    var MAX_WIDTH = img.width;
                    var MAX_HEIGHT = img.height;

                    if ($(control).attr('size') != null) {
                        var porcent = (parseFloat($(control).attr('size')) * 400 / img.width);
                        MAX_WIDTH = img.width * porcent / 100;
                        MAX_HEIGHT = img.height * porcent / 100;
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
                    $('[name="' + $(control).attr('source') + '"]').val(dataUrl.split(',')[1]);
                    $('[name="' + $(control).attr('source') + '_itype"]').val(dataUrl.split(',')[0]);

                    $('.' + $(control).attr('source')).css('background-image', 'url(' + dataUrl + ')');

                };
            };

            FR.readAsDataURL(this.files[0]);
        }
        else {
            $($(control).attr('source')).val('');
            alert("O arquivo é muito grande. Favor selecionar um arquivo com no máximo 5 mb");
        }

        if ((this.files[0].type != "image/jpeg") && (this.files[0].type != "image/png") && (this.files[0].type != "application/pdf") && (this.files[0].type != "image/svg+xml")) {
            $($(control).attr('source')).val('');
            alert("O Tipo de arquivo selecionado é inválido, selecione um formato válido (jpeg, png, pdf)");
        }
    }

    $('#btn_cadastrar').click(function () {
        finalizar();
    });

    function finalizar() {

        var json = $('#form').serializeFormJSON();

        $('section.active [required]').hide();

        if (json.telefone_usuario == null) {
            $('[name="telefone_usuario"]').addClass('required');
            $('[required="telefone_usuario"]').show();
            $('[required="telefone_usuario"]').text('Campo obrigatório');
        }
        else {
            $('[required="telefone_usuario"]').hide();
        }
        if (json.senha_usuario == null) {
            $('[name="senha_usuario"]').addClass('required');
            $('[required="senha_usuario"]').show();
        }
        if (!validatePhone(json.telefone_usuario)) {
            $('[name="telefone_usuario"]').addClass('required');
            $('[required="telefone_usuario"]').show();
            $('[required="telefone_usuario"]').text('Telefone inválido');
        }
        if (json.email_usuario == null) {
            $('[name="email_usuario"]').addClass('required');
            $('[required="email_usuario"]').show();
            $('[required="email_usuario"]').text('Campo obrigatório');
        }
        if (!checkEmail(json.email_usuario)) {
            $('[name="email_usuario"]').addClass('required');
            $('[required="email_usuario"]').show();
            $('[required="email_usuario"]').text('Email inválido');
        }

        if (json.confirmarsenha_usuario == null) {
            $('[name="confirmarsenha_usuario"]').addClass('required');
            $('[required="confirmarsenha_usuario"]').show();
        }

        if (json.senha_usuario != json.confirmarsenha_usuario) {
            $('[name="confirmarsenha_usuario"]').addClass('required');
            $('[required="confirmarsenha_usuario"]').show();
            $('[required="confirmarsenha_usuario"]').text('Confirmação da senha inválida');
        }
        if (json.senha_usuario != null && json.senha_usuario.length < 6) {
            $('[name="senha_usuario"]').addClass('required');
            $('[required="senha_usuario"]').show();
            $('[required="senha_usuario"]').text('A senha deve ter no mónimo 6 caracteres');
        }

        if ($('section.active [required]:visible').length == 0) {
            page.user_name = json.nome_usuario;
            page.email = [{ nome: json.email_usuario }];
            page.phone = json.telefone_usuario;
            page.name = json.nomedoaplicativo;
            page.specialty = json.specialty;
            page.url = json.urldoaplicativo;
            page.about = json.descricaoaplicativo;
            page.password = json.senha_usuario;
            page.theme = 'default';
            page.picture = page.picture;
            page.logo_itype = json.logo_itype;

            if (json.logo_itype != '') {
                page.picture = json.logo;
            }
            page.place_id = json.place_id;
            page.loader = json.loader;
            page.background_image_local = json.background_image_local;
            page.delivery = true;

            page.primary_color = cor.primary_color;
            page.primary_font_color = cor.primary_font_color;
            page.secondary_color = cor.secondary_color;
            page.secondary_font_color = cor.secondary_font_color;
            page.textbox_color = cor.textbox_color;
            page.textbox_font_color = cor.textbox_font_color;
            page.border_radius_textbox = cor.border_radius_textbox;
            page.border_radius_button = cor.border_radius_button;
            page.light_color = cor.light_color;
            page.dark_color = cor.dark_color;
            page.font_color = cor.font_color;
            page.border_color = cor.border_color;
            page.bg_color = cor.bg_color;
            page.font_light_color = cor.font_light_color;

            if (page.location == null) {
                page.location = {};
            }
            page.location.zip = json.cep;
            page.location.city = json.city;
            page.location.country = json.country;
            page.location.latitude = json.lat.replace(',', '.');
            page.location.longitude = json.lng.replace(',', '.');
            page.location.state = json.state;
            page.location.street = json.street;
            page.location.number = json.number;
            page.location.number = json.country;

            $('section.active').removeClass('active');
            $('#section_loader').addClass('active');
            window.location = window.location.href.split('#')[0] + "#section_loader";

            $.post("/api/facebook", page,
                function (data) {
                    window.location = 'http://' + page.url + ".creapp.com.br";
                });
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);



function checkUrl(url) {
    //regular expression for URL
    var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;

    if (pattern.test(url)) {
        return true;
    } else {
        return false;
    }
}
//function used to check valid email
function checkEmail(email) {
    //regular expression for email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

$(document).ready(function () {
    $.get('/api/facebook', null, function (cores) {

        $(cores).each(function (index, item) {

            var paleta = $(
                '    <div class="paleta">                                                                                                                        '
                + '        <div style="border-bottom-left-radius: 10px; border-top-left-radius: 10px; background-color:' + item.primary_color + '">                  </div>'
                + '        <div style="background-color:' + item.primary_font_color + '">                                                                                    </div>'
                + '        <div style="background-color:' + item.secondary_color + '">                                                                                       </div>'
                + '        <div style="background-color:' + item.secondary_font_color + '">                                                                                  </div>'
                + '        <div style="background-color:' + item.textbox_color + '">                                                                                         </div>'
                + '        <div style="background-color:' + item.textbox_font_color + '">                                                                                    </div>'
                + '        <div style="background-color:' + item.light_color + '">                                                                                           </div>'
                + '        <div style="background-color:' + item.dark_color + '">                                                                                            </div>'
                + '        <div style="border-bottom-right-radius: 10px; border-top-right-radius: 10px; background-color:' + item.font_color + '">                   </div>'
                + '    </div><div style="clear:both"></div>                                                                                                                       '
            );
            $(paleta).click(function () {

                //$("[name='primary_color']").val(item.primary_color);
                //$("[name='primary_font_color']").val(item.primary_font_color);
                //$("[name='secondary_color']").val(item.secondary_color);
                //$("[name='secondary_font_color']").val(item.secondary_font_color);
                //$("[name='textbox_color']").val(item.textbox_color);
                //$("[name='textbox_font_color']").val(item.textbox_font_color);
                //$("[name='light_color']").val(item.light_color);
                //$("[name='dark_color']").val(item.dark_color);
                //$("[name='border_color']").val(item.border_color);
                //$("[name='bg_color']").val(item.bg_color);
                //$("[name='font_light_color']").val(item.font_light_color);
                cor = item;
                //PRIMARY COLOR
                $('.top').css('background-color', item.primary_color);
                $('.local').css('background-color', item.primary_color);

                //PRIMARY FONT COLOR
                $('.top').css('color', item.primary_font_color);
                $('.local').css('color', item.primary_font_color);


                //SECONDARY COLOR
                $('.busca').css('background-color', item.secondary_color);
                $('.carrinho').css('background-color', item.secondary_color);

                //SECONDARY FONT COLOR
                $('.busca').css('color', item.secondary_font_color);
                $('.carrinho').css('color', item.secondary_font_color);


                //TEXT BOX COLOR
                $('.produto').css('background-color', item.text_color);

                //TEXT BOX FONT COLOR
                $('.produto').css('color', item.text_font_color);


                //LIGHT
                $('.logobar').css({ background: 'linear-gradient(-45deg,' + item.dark_color + ' 50%,' + item.light_color + ')' });

                $('.nomeapp').css('color', item.font_color);


                $('.paleta_default').html(paleta.clone());


                $('#modal_paletas').hide();
            });
            $('#modal_paletas').append(paleta);
        });
        $('.paleta')[0].click();
    });

    if (window.gmap_async == null) {
        window.gmap_async = $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCIoBAvqfno0lFGhuzuuwqX0KmXRdr-10o&libraries=places&callback=maps_callback");
    }
    window.gmap_async.done(function () {

        var acService = new google.maps.places.AutocompleteService();
        $('[name="busca"]').keyup(function () {

            acService.getPlacePredictions({
                input: $('[name="busca"]').val(),
                types: ['address'],
                componentRestrictions: { country: 'br' }
            }, function (places, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    $('#place_results').html('');
                    $(places).each(function (index, item) {
                        var div = $('<li><span class="icon-location"></span>' + item.description + '</li>');
                        $('#place_results').append(div);

                        div.click(function () {
                            var service = new google.maps.places.PlacesService($('<div></div>')[0]);
                            service.getDetails({ placeId: item.place_id },
                                function (place, status) {
                                    fillInAddress(place);
                                });
                        });
                    });
                }
            });
        });
    });
});


function maps_callback() {


}

function validatePhone(value) {
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


function fillInAddress(place) {


    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $("[name='lat']").val(lat.toString().replace('.', ','));
    $("[name='lng']").val(lng.toString().replace('.', ','));

    $(place.address_components).each(function (index, item) {
        $(item.types).each(function (indext, itemt) {
            switch (itemt) {
                case "street_number":
                    $("[name='number']").val(item.long_name);
                    $('#endereco_busca').show();
                    $('.endereco_busca').hide();
                    $('#btn_endereco').show();

                    break;

                case "route":
                    $("[name='street']").val(item.long_name);
                    $('#endereco_busca').show();
                    $('.endereco_busca').hide();
                    $('#btn_endereco').show();
                    break;

                case "administrative_area_level_1":
                    $("[name='state']").val(item.short_name);
                    $('#endereco_busca').show();
                    $('.endereco_busca').hide();
                    $('#btn_endereco').show();
                    break;
                case "administrative_area_level_2":
                    $("[name='city']").val(item.long_name);
                    $('#endereco_busca').show();
                    $('#btn_endereco').show();
                    $('.endereco_busca').hide();
                    break;

                case "country":
                    $("[name='country']").val(item.long_name);
                    $('#endereco_busca').show();
                    $('.endereco_busca').hide();
                    $('#btn_endereco').show();
                    break;

                case "postal_code":
                    $("[name='cep']").val(item.long_name);
                    $('#endereco_busca').show();
                    $('#btn_endereco').show();
                    $('.endereco_busca').hide();
                    break;
            }
        })
    });
}

