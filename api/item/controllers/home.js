controller.home = {
    init: function (events) {
        //creait.get('item?id=33', null, function (data) {
        events({}, function (content) {
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: -23.652500, lng: -46.862847 },
                    zoom: 16,
                    clickableIcons: false
                });

                var marker = new google.maps.Marker({
                    position: { lat: -23.652500, lng: -46.862847 },
                    map: map
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

                //var contentString = '<div id="content" style="width: 130px;">' +
                //    '<div id="siteNotice">' +
                //    '</div>' +
                //    '<span id="firstHeading" class="firstHeading" style="font-weight: bolder">' + controller.mapa.get().nome + '</span>' +
                //    '<div id="bodyContent" style="background-image: url(' + controller.mapa.get().foto + ')">' +
                //    '</div>' +
                //    '<div>' +
                //    '<button style="width: 100%; border-radius: 8px; background-color: #0a7995; border-color: #086077;" onclick="launchnavigator.navigate([' + "-23.647181" + ',' + "-46.847690" + ']);">Abrir GPS</button>' +
                //    '</div>' +
                //    '</div>';

                //var infowindow = new google.maps.InfoWindow({
                //    content: contentString
                //});
            });
        //});
    },
    get: function () {
        if (window.localStorage["home"] == null)
            return null;
        return JSON.parse(window.localStorage["home"]);
    },
    set: function (data) {
        window.localStorage["home"] = JSON.stringify(data);
    }
};
