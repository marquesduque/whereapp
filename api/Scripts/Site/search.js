$(document).ready(function () {
    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });

    $('#ex2').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });
    //$(".nano").nanoScroller();
    //$('#content_suites').html('');
    //    listo.ajax("/Busca/Coordinate", "GET", null, function (json) {
    //        $(json).each(function (index, item) {
    //            var item_suite = $($('#item_suite').html());
    //            item_suite.find('[name="suite_img"]').attr('src', item.url);
    //            item_suite.find('[name="suite_name"]').html(item.adreess);
    //            item_suite.find('[name="suite_district"]').html(item.district);
    //            item_suite.find('[name="suite_bedroom"]').html(item.bedroom);
    //            item_suite.find('[name="suite_seat"]').html(item.seat);
    //            item_suite.find('[name="suite_meter"]').html(item.meter);
    //            item_suite.find('[name="suite_id"]').html(item.id);
    //            item_suite.find('[name="value_suite"]').html(item.value);
    //            item_suite.find('[name="total_value_suite"]').html(parseFloat(item.condominium_value + item.value));
    //            item_suite.find('img').click(function () {
    //                window.location = '/Imovel/?id=' + item.id;
    //            });
    //            $('#content_suites').append(item_suite);
    //            $(".nano").nanoScroller();
    //        });
    ////        $(".nano").nanoScroller();
    //    });
});

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function InitSearch() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */($('#pac-input')[0]),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

    fillInAddressUrl();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    
    $('#content_suites').html('');
    listo.ajax("/Busca/Coordinate", "GET", { 'lat': lat, 'lng': lng, 'distance': 1, 'search': '', 'page': 0 }, function (json) {
        var image = '/images/markermap.png';
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lng },
            zoom: 13
        });
        $(json).each(function (index, item) {
            var item_suite = $($('#item_suite').html());
            item_suite.find('[name="suite_name"]').html(item.address);
            item_suite.find('[name="suite_img"]').attr('src', item.url);
            item_suite.find('[name="suite_district"]').html(item.district);
            item_suite.find('[name="suite_bedroom"]').html(item.bedroom);
            item_suite.find('[name="suite_seat"]').html(item.seat);
            item_suite.find('[name="suite_meter"]').html(item.meter);
            item_suite.find('[name="suite_id"]').html(item.id);
            item_suite.find('[name="value_suite"]').html(item.value);
            item_suite.find('[name="total_value_suite"]').html(parseFloat(item.condominium_value + item.value));
            item_suite.find('img').click(function () {
                window.location = '/Imovel/?id=' + item.id;
            });
            $('#content_suites').append(item_suite);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                title: '"' + item.id + '"',
                map: map,
                image: image
            });

            $(".nano").nanoScroller();
        });
        //        $(".nano").nanoScroller();
    });
}

function fillInAddressUrl() {
    qs = new Array()
    variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&")

    if (variaveis != "") {
        for (i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=")
            qs[nvar[0]] = unescape(nvar[1])
        }
    }

    var lat = QueryString("lat");
    var lng = QueryString("lng");

    $('#content_suites').html('');
    listo.ajax("/Busca/Coordinate", "GET", { 'lat': lat, 'lng': lng, 'distance': 1, 'search': '', 'page': 0,  }, function (json) {
        var image = '/images/markermap.png';
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: parseFloat(lat), lng: parseFloat(lng) },
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        $(json).each(function (index, item) {
            var item_suite = $($('#item_suite').html());
            item_suite.find('[name="suite_name"]').html(item.address);
            item_suite.find('[name="suite_img"]').attr('src', item.url);
            item_suite.find('[name="suite_district"]').html(item.district);
            item_suite.find('[name="suite_bedroom"]').html(item.bedroom);
            item_suite.find('[name="suite_seat"]').html(item.seat);
            item_suite.find('[name="suite_meter"]').html(item.meter);
            item_suite.find('[name="suite_id"]').html(item.id);
            item_suite.find('[name="value_suite"]').html(item.value);
            item_suite.find('[name="total_value_suite"]').html(parseFloat(item.condominium_value + item.value).toFixed(2));
            item_suite.find('img').click(function () {
                window.location = '/Imovel/?id=' + item.id;
            });
            $('#content_suites').append(item_suite);

            var contentString = '<div id="iw-container">' +
                                '<div class="iw-title">Código do Imóvel:' + item.id + '</div>' +
                                '<div class="iw-content">' +
                                    '<div class="thumbnail" style="padding:0;border:0">' +
                                      '<a href="/Imovel/?id=' + item.id + '" style="cursor:pointer;"><img src=' + item.url + ' style="width:100%" alt="Listo" /></a>' +
                                      '<div class="caption">' +
                                          '<p class="colorgraysmbusca">' +
                                              '<span>' + item.address + '</span>&nbsp;•&nbsp;' + 
                                              '<span>' + item.district + '</span><br />' +
                                              '<span>' + item.bedroom + '</span> dormitório&nbsp;•&nbsp;' + 
                                              '<span>' + item.seat + '</span> vaga&nbsp;•&nbsp;' + 
                                              '<span>' + item.meter + '</span> m²<br />' +
                                              '<hr style="background-color:#808080;margin:4px 0;width:100%;">' +
                                              'Aluguel: R$ <span>' + item.value + '</span>' +
                                              '<br />' +
                                              'Total: R$<span>' + parseFloat(item.condominium_value + item.value).toFixed(2) + '</span>' +
                                          '</p>' +
                                      '</div>' +
                                    '</div>'
                                '</div>' +
                              '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: $(contentString),
                maxWidth: 350
            });

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                title:'Código do Imóvel: ' + item.id,
                map: map,
                icon: image
            });

            marker.addListener('click', function () {
                infowindow.open(map, this);
            });

            google.maps.event.addListener(infowindow, 'domready', function() {
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();
                iwBackground.children(':nth-child(2)').css({'display' : 'none'});
                iwBackground.children(':nth-child(4)').css({'display' : 'none'});
                iwOuter.parent().parent().css({left: '115px'});
                iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
                iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
                iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
                var iwCloseBtn = iwOuter.next();
                var iwCloseInfo = iwOuter.next().next();
                iwCloseBtn.css({ right: '45px', top: '6px', width: '19px', height: '20px', border: '3px solid #539bec', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9', opacity: '1' });
                iwCloseInfo.css({ right: '48px', top: '4px', width: '19px', height: '20px' });
                iwCloseBtn.mouseout(function(){
                    $(this).css({opacity: '1'});
                });
            });

            $(".nano").nanoScroller();
        });
        //        $(".nano").nanoScroller();
    });
}

function QueryString(variavel) {
    return qs[variavel]
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