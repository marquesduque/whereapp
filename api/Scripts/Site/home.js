var autocomplete;

function initSearch() {
    
    autocomplete = new google.maps.places.Autocomplete($('#pac-input')[0]);
    
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */($('#pac-input')[0]),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    window.location = '/Busca/?lat=' + lat + '&lng=' + lng + ''
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}