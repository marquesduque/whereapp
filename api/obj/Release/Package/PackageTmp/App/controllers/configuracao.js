controller.configuracao = {
    init: function (events) {

        events({}, function (content) {
            $.get('/api/configuracao', null, function (config) {

                $(config.theme).each(function (index, item) {

                    var paleta = $(paleta_html(item));
                    $(paleta).click(function () {

                        $("[name='primary_color']").val(item.primary_color);
                        $("[name='primary_font_color']").val(item.primary_font_color);
                        $("[name='secondary_color']").val(item.secondary_color);
                        $("[name='secondary_font_color']").val(item.secondary_font_color);
                        $("[name='textbox_color']").val(item.textbox_color);
                        $("[name='textbox_font_color']").val(item.textbox_font_color);
                        $("[name='border_color']").val(item.border_color);
                        $("[name='bg_color']").val(item.border_color);
                        $("[name='font_light_color']").val(item.border_color);
                        $("[name='light_color']").val(item.light_color);
                        $("[name='dark_color']").val(item.dark_color);
                        $("[name='font_color']").val(item.font_color);

                        theme(item);

                        $('.paleta_default').html(paleta.clone());

                        $$('.close-popup').click()

                        creait.post('configuracao', myApp.formToJSON("formconfiguracao"), function (data) {

                        });

                    });
                    $('.list_paletas').append(paleta);
                });
                $('.paleta_default').html(paleta_html(controller.layout.get()));

                function paleta_html(item) {

                    $("[name='primary_color']").val(item.primary_color);
                    $("[name='primary_font_color']").val(item.primary_font_color);
                    $("[name='secondary_color']").val(item.secondary_color);
                    $("[name='secondary_font_color']").val(item.secondary_font_color);
                    $("[name='textbox_color']").val(item.textbox_color);
                    $("[name='textbox_font_color']").val(item.textbox_font_color);
                    $("[name='light_color']").val(item.light_color);
                    $("[name='border_color']").val(item.border_color);
                    $("[name='font_light_color']").val(item.border_color);
                    $("[name='bg_color']").val(item.border_color);
                    $("[name='dark_color']").val(item.dark_color);
                    $("[name='font_color']").val(item.font_color);

                    return '    <div class="paleta">                                                                                                                        '
                        + '        <div style="border-bottom-left-radius: 10px; border-top-left-radius: 10px; background-color:' + item.primary_color + '">                  </div>'
                        + '        <div style="background-color:' + item.primary_font_color + '">                                                                                    </div>'
                        + '        <div style="background-color:' + item.secondary_color + '">                                                                                       </div>'
                        + '        <div style="background-color:' + item.secondary_font_color + '">                                                                                  </div>'
                        + '        <div style="background-color:' + item.textbox_color + '">                                                                                         </div>'
                        + '        <div style="background-color:' + item.textbox_font_color + '">                                                                                 </div>'
                        + '        <div style="background-color:' + item.border_color + '">                                                                                      </div>'
                        + '        <div style="background-color:' + item.bg_color + '">                                                                                      </div>'
                        + '        <div style="background-color:' + item.font_light_color + '">                                                                                    </div>'
                        + '        <div style="background-color:' + item.light_color + '">                                                                                           </div>'
                        + '        <div style="background-color:' + item.dark_color + '">                                                                                            </div>'
                        + '        <div style="border-bottom-right-radius: 10px; border-top-right-radius: 10px; background-color:' + item.font_color + '">                   </div>'
                        + '    </div><div style="clear:both"></div>                                                                                                                       ';
                }
            });

  
        });
    }
}
