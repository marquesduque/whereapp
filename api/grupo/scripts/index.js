
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        
        document.addEventListener('backbutton', onBackKeyDown, false);

    };

    function onBackKeyDown() {

    }
})();