$(document).ready(function () {
    qs = new Array()
    variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")

    if (variaveis != "") {
        for (i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=")
            qs[nvar[0]] = unescape(nvar[1])
        }
    }

    var qsid = QueryString('id');

    $('#content_title_suite').html('');
    $('#content_info_suite').html('');
    $('#content_additionalinfo_suite').html('');
    listo.ajax("/Imovel/Suite", "GET", { 'id': qsid }, function (json) {
        var item = json;
        var title_suite = $($('#title_suite').html());
        title_suite.find('[name="item_addres"]').html(item.address);
        title_suite.find('[name="item_district"]').html(item.district);
        title_suite.find('[name="item_id"]').html(item.id);

        var info_suite = $($('#info_suite').html());
        info_suite.find('[name="info_value"]').html(item.value.toFixed(2).replace('.', ','));
        info_suite.find('[name="info_condominium_value"]').html(item.condominium_value.toFixed(2).replace('.', ','));
        info_suite.find('[name="info_protection"]').html(item.protection);
        info_suite.find('[name="info_total_value"]').html(parseFloat(item.value + item.condominium_value).toFixed(2).replace('.', ','));

        var additional_info_suite = $($('#additional_info_suite').html());
        additional_info_suite.find('[name="meter_suite"]').html(item.meter.toFixed(2).replace('.', ','));

        var str_bedroom_suite = "DORMITÓRIO";
        if (item.bedroom >= 1) {
            str_bedroom_suite = "DORMITÓRIOS";
        }
        additional_info_suite.find('[name="str_bedroom_suite"]').html(str_bedroom_suite);
        additional_info_suite.find('[name="bedroom_suite"]').html(item.bedroom);

        var str_seat_suite = "VAGA";
        if (item.seat >= 1) {
            str_seat_suite = "VAGAS";
        }
        additional_info_suite.find('[name="str_seat_suite"]').html(str_seat_suite);
        additional_info_suite.find('[name="seat_suite"]').html(item.seat);

        var str_bathroom_suite = "BANHEIRO";
        if (item.bathroom >= 1) {
            str_bathroom_suite = "BANHEIROS";
        }
        additional_info_suite.find('[name="str_bathroom_suite"]').html(str_bathroom_suite);
        additional_info_suite.find('[name="bathroom_suite"]').html(item.bathroom);
        additional_info_suite.find('[name="floor_suite"]').html(item.floor);

        var str_animal_suite = "Não Aceita";
        if(item.animal)
        {
            str_animal_suite = "Aceita";
        }
        additional_info_suite.find('[name="animal_suite"]').html(str_animal_suite);

        var str_box_suite = "Sem Mobília";
        if (item.box) {
            str_box_suite = "Com Mobília";
        }
        additional_info_suite.find('[name="box_suite"]').html(str_box_suite);

        var str_subway_suite = "Longe";
        if (item.subway) {
            str_subway_suite = "Próximo";
        }
        additional_info_suite.find('[name="subway_suite"]').html(str_subway_suite);

        $('#content_additional_info_imovel').html('');
        $('#content_additional_info_condominium').html('');
        ($(item.common_suite)).each(function (index, item) {
            if (item.suite_id != 0 && item.common.common_type_id == 2)
            {
                var aditionalinfo_imovel = $($('#additional_info_imovel').html());
                aditionalinfo_imovel.find('[name="add_info_imovel"]').html(item.common.name);

                $('#content_additional_info_imovel').append(aditionalinfo_imovel);
            }

            if (item.suite_id != 0 && item.common.common_type_id == 1) {
                var aditionalinfo_condminium = $($('#additional_info_condominium').html());
                aditionalinfo_condminium.find('[name="add_info_condominium"]').html(item.common.name);

                $('#content_additional_info_condominium').append(aditionalinfo_condminium);
            }
        });

        $('#content_title_suite').append(title_suite);
        $('#content_info_suite').append(info_suite);
        $('#content_additionalinfo_suite').append(additional_info_suite);
        
    });

});

function QueryString(variavel) {
    return qs[variavel]
}