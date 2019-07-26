function initSearch() {

    autocomplete = new google.maps.places.Autocomplete(
                ($('#pac-input')[0]),
                { types: ['geocode'], componentRestrictions: { country: 'br' } });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {

    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $("#ultimo_horario_lat").val(lat.toString().replace('.', ','));
    $("#ultimo_horario_lng").val(lng.toString().replace('.', ','));

    $(place.address_components).each(function (index, item) {
        $(item.types).each(function (indext, itemt) {
            switch (itemt) {
                case "street_number":
                    $("#ultimo_horario_numero").val(item.long_name);
                    break;

                case "route":
                    $("#ultimo_horario_endereco").val(item.long_name);
                    break;

                case "administrative_area_level_1":
                    $("#ultimo_horario_state").val(item.short_name);
                    break;
                case "administrative_area_level_2":
                    $("#ultimo_horario_cidade").val(item.long_name);
                    break;

                case "country":
                    $("#ultimo_horario_pais").val(item.long_name);
                    break;

                case "postal_code":
                    $("#ultimo_horario_cep").val(item.long_name);
                    break;
            }
        })
    });
}