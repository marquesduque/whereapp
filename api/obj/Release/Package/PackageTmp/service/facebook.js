var arr = [];
var token = 'EAAaeTiasTLIBAGSELDxnK7WckiRbMxxPhSVJOd5w0anjMN0dlfx3EPs32062VWldneKZCGLpxkyfSF3F42mUHRLSU4Of5ZCLJ4ExDNFQPOuDVIEJsj5ab0cWRV2ZAH3VeMNCQGcnwb7fqVpNODEbYQAiKMEok1ZAEDazIDrV4dCAqZATFzkh6mF2wXoUFKZCYZD';
var count = 0;
var erro = 0;
var speciality = "";
var place_id = 0;
var theme_id = 0;
var time = -10000;
var places_trash = JSON.parse(window.localStorage["places_trash"]);


function scroll() {
    $('li[data-bt]').each(function () {

        var place = JSON.parse($(this).attr('data-bt')).id;
        if ($('#resultado').length == 0) {
            $('body').prepend('<div id="resultado" style="background-color: red;width: 100%;margin-top: 43px;position: fixed;z-index: 999;color: white;font-size: 20px;text-align: center;font-weight: 800;">' + count + ' de ' + arr.length + ' Coletados</div>');
        }
        else {
            $('#resultado').html(count + ' de ' + arr.length + ' Coletados');
        }

        if (place != null) {

            if (-1 == arr.indexOf(place) && !places_trash.includes(place.toString())) {
                arr.push(place);
                ajax();
            }
            function ajax() {
                bind();
            }
            function bind() {
                //if (data.phone != null) {
                //    if (data.phone.replace(/ /g, '').indexOf(')9') > -1 || (data.phone.replace(/ /g, '').indexOf('-9') > -1 && data.phone.replace(/ /g, '').split('-')[0].length == 2)) {
                time = time + 10000;
                setTimeout(function () {
                    var url = 'https://localhost/api/facebook?id=' + place + '&speciality=' + speciality + '&theme_id=' + theme_id + '&token=' + token;
                    var iframe = document.createElement('iframe');
                    iframe.onload = function () {
                        count = count + 1;
                        $(iframe).remove();
                        debugger;
                        $('#resultado').html(count + ' de ' + arr.length + ' Coletados');
                    };
                    iframe.src = url;
                    $('body').append(iframe);
                    //    }
                    //}
                }, time);
            }
        }
    });

    window.scrollTo(0, document.body.scrollHeight);


    setTimeout(function () {
        time = -10000;
        scroll();
    }, (count == arr.length ? 1000 : ((arr.length - count) * 10000)));
}

scroll();

