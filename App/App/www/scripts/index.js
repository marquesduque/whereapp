var pushToken;
var plataforma;
var latitude_watch;
var longitude_watch;

var watchIDFg = "";

function onSuccessPosition(position) {
    latitude_watch = position.coords.latitude;
    longitude_watch = position.coords.longitude;

    if (controller.login.get() != null) {
        $.ajax({
            url: "https://whereapp.creait.com.br/api/localizacao",
            method: 'POST',
            dataType: 'json',
            data: {
                lat_celular: latitude_watch,
                lon_celular: longitude_watch,
                id: controller.login.get().id
            },
            async: true,
            success: function (data) {
                console.log(data);
            }, error: function (e) {
                console.log(e);
            }
        });
    }
   
}

function onErrorPosition(error) {
    console.warn("codigo: " + error.code + " / mensagem: " + error.message);
}


(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        
        BackgroundGeolocation.configure({
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 10,
            distanceFilter: 10,
            notificationTitle: 'Rastreio',
            notificationText: 'O rastreio está funcionando em segundo plano!',
            debug: true,
            interval: 60000,
            fastestInterval: 60000,
            activitiesInterval: 60000
        });
        
        BackgroundGeolocation.on('location', function (l) {
            BackgroundGeolocation.startTask(function (taskKey) {
                $.ajax({
                    url: "https://whereapp.creait.com.br/api/localizacao",
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        lat_celular: l.latitude,
                        lon_celular: l.longitude,
                        id: controller.login.get().id
                    },
                    async: true,
                    success: function (data) {
                        console.log(data);
                    }, error: function (e) {
                        console.log(e);
                    }
                });
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        watchIDFg = navigator.geolocation.watchPosition(onSuccessPosition, onErrorPosition, { timeout: 60000 });

        cordova.plugins.backgroundMode.on('activate', function () {
            console.log('foi pro background');
            if (watchIDFg != "") {
                navigator.geolocation.clearWatch(watchIDFg);
            }

            if (controller.login.get() == null) {
                BackgroundGeolocation.start();
            }
        });

        cordova.plugins.backgroundMode.on('deactivate', function () {
            console.log("foi pro foreground");
            BackgroundGeolocation.stop(
                function (a) {
                    console.log(a);
                },
                function (e) {
                    console.log(e);
                }
            );
            watchIDFg = navigator.geolocation.watchPosition(onSuccessPosition, onErrorPosition, { timeout: 60000 });
        });

        $('#n-fecha').click(function () {
            $('#notificacao').css('top', '-100%');
        });
        var push = PushNotification.init({
            android: {
                icon: 'icon',
                iconColor: '#037892',
                senderID: "1082934731737"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function (data) {
            pushToken = data.registrationId;
        });

        push.on('notification', function (data) {
            $('#n-msg').html(data.message);
            $('#notificacao').css('top', '5px');
        });

        push.on('error', function (e) {
            debugger;
        });

        if (device.platform == "Android") {
            plataforma = 0;
        }
        else {
            plataforma = 1;
        }

        document.addEventListener('backbutton', onBackKeyDown, false);

    };

    function onBackKeyDown() {

    }
})();