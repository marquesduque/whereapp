function initSearch() {

    autocomplete = new google.maps.places.Autocomplete(
        ($('#pac-input')[0]),
        { types: ['geocode'], componentRestrictions: { country: 'br' } });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.

    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    $("#lat").val(lat.toString().replace('.', ','));
    $("#lng").val(lng.toString().replace('.', ','));

    $(place.address_components).each(function (index, item) {
        $(item.types).each(function (indext, itemt) {
            switch (itemt) {
                case "street_number":
                    $("#numero").val(item.long_name);
                    break;

                case "route":
                    $("#endereco").val(item.long_name);
                    break;

                //case "administrative_area_level_1_1":
                //    $("#cidade").val(item.long_name);
                //    break;

                case "administrative_area_level_1":
                    $("#horario_state").val(item.short_name);
                    break;
                case "administrative_area_level_2":
                    $("#cidade").val(item.long_name);
                    break;

                case "country":
                    $("#pais").val(item.long_name);
                    break;

                case "postal_code":
                    $("#cep").val(item.long_name);
                    break;

            }
        })
    });
}


$(document).ready(function () {

    $('#compra_desconto').blur(function () {

        if ($('#compra_desconto').val() > 100) {

            $('#compra_desconto').val(100);

        }

        if ($('#compra_total').val() != "" && $('#compra_desconto').val() != "") {

            $('#totaltela').val(parseFloat($('#compra_total').val()) - ((parseFloat($('#compra_desconto').val()) / 100) * parseFloat($('#compra_total').val())));

        } else if ($('#compra_total').val() != "") {

            $('#totaltela').val(parseFloat($('#compra_total').val()))

        }

       


    });



});


