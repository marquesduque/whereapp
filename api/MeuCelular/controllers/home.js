controller.home = {
    init: function (events) {
        events({}, function (content) {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: controller.loginMC.get().lat_celular, lng: controller.loginMC.get().lon_celular },
                zoom: 16,
                clickableIcons: false
            });

            var marker = new google.maps.Marker({
                position: { lat: controller.loginMC.get().lat_celular, lng: controller.loginMC.get().lon_celular },
                map: map
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            //var contentString = '<div id="content" style="width: 130px;">' +
            //    '<div id="siteNotice">' +
            //    '</div>' +
            //    '<span id="firstHeading" class="firstHeading" style="font-weight: bolder">' + controller.mapa.get().nome + '</span>' +
            //    '<div id="bodyContent" style="background-image: url(' + controller.mapa.get().photo_itype + ',' + controller.mapa.get().photo + ')">' +

            //    '</div>' +
            //    '</div>';

            //var infowindow = new google.maps.InfoWindow({
            //    content: contentString
            //});
        });
    },
    get: function () {
        if (window.localStorage[""] == null)
            return null;
        return JSON.parse(window.localStorage[""]);
    },
    set: function (data) {
        window.localStorage[""] = JSON.stringify(data);
    }
};
