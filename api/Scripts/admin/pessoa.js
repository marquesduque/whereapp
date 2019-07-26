function initSearch() {
    debugger;
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

                case "administrative_area_level_1":
                    $("#ustate").val(item.short_name);
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