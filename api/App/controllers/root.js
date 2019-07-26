controller.tipo = {
    get: function () {
        if (localStorage.getItem("tipo") == null) {
            return null;
        }
        return JSON.parse(localStorage["tipo"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["tipo"] = JSON.stringify(data);
        //controller.layout.private = data;
    },
    private: null
}

controller.layout = {
    get: function () {
        if (localStorage.getItem("layout") == null) {
            return null;
        }
        return JSON.parse(localStorage["layout"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["layout"] = JSON.stringify(data);
        //controller.layout.private = data;
    },
    private: null
};

controller.carrinhoEspera = {
    get: function () {
        if (localStorage.getItem("carrinhoEspera") == null) {
            return null;
        }
        return JSON.parse(localStorage["carrinhoEspera"]);
        //return controller.layout.private;
    },
    set: function (data) {
        localStorage["carrinhoEspera"] = JSON.stringify(data);
        //controller.layout.private = data;
    },
    private: null
};

controller.busca = {
    init: function (events) {
        events({}, function (content) {
            $$("#btn_search").click(function () {
                buscar_cep();
            });

            $$("#pac-input").keyup(function () {
                if (this.value.length == 8) {
                    buscar_cep();
                }
            });

            function buscar_cep() {
                var valor = $('#pac-input').val();
                var cep = valor.replace(/\D/g, '');

                if (cep != "") {
                    var validacep = /^[0-9]{8}$/;
                    if (validacep.test(cep)) {
                        $.ajax({
                            type: "GET",
                            url: 'http://viacep.com.br/ws/' + cep + '/json',
                            dataType: 'json',
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                $('#enderecos').text(result.logradouro + ' - ' + result.bairro + ' - ' + result.localidade);
                                $('#numero').val(result.complemento);
                                $('#pac-input').val(result.cep);
                                $('#cidade').val(result.localidade);
                            },
                            error: function (a, b, c) {
                                $('html').html(a.responseText)
                            }
                        });
                        $('#modal_endereco').css("display", "block");

                    } else {
                        myApp.alert('CEP invalido!', 'Atenção!');
                    }
                }
            }

            $$("#btn_search_gps").click(function () {
                //
                if (controller.busca.get() == null) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((
                            function successFunction(position) {
                                var latlng = [];
                                var lat = position.coords.latitude;
                                var lng = position.coords.longitude;

                                latlng[0] = lat;
                                latlng[1] = lng;
                                controller.corfirmarEndereco.set(latlng);

                                //
                                $.ajax({
                                    type: "GET",
                                    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng,
                                    dataType: 'json',
                                    contentType: false,
                                    processData: false,
                                    success: function (result) {
                                        $('#enderecos').text(result.results[0].address_components[1].short_name);
                                        $('#numero').val(result.results[0].address_components[0].long_name);
                                        $('#pac-input').val(result.results[0].address_components[7].long_name);
                                        $('#cidade').val(result.results[0].address_components[5].long_name);
                                    },
                                    error: function (a, b, c) {
                                        //
                                    }
                                });
                                $('#modal_endereco').css("display", "block");
                                //creait.get('busca?lat=' + lat + '&lng=' + lng, null, function (data) {
                                //    if (data == "erro")
                                //        creait.redirect("erroEndereco");
                                //    else
                                //        creait.redirect("categoria");
                                //});
                            }), (
                                function errorFunction(position) {
                                    console.log('Erro ao encontrar a possição');
                                }));
                    } else {
                        alert('Parece que Geolocation, que é necessário para esta página, não está ativado em seu navegador. Use um navegador que o suporte.');
                    }
                }
                else {
                    creait.redirect("categoria");
                }
            });

            $$("#btn_voltar").click(function () {

                $('#modal_endereco').css("display", "none");

            });

            $$("#btn_confimar").click(function () {

                var endereco = {};
                endereco.number = $('#numero').val();
                if (endereco.number == "") {
                    myApp.alert("Preencha o numero!", "Atenção!", function () {
                    });
                } else {
                    myApp.showPreloader('Buscando Cardápio');
                    $('#modal_endereco').css("display", "none");
                    endereco.active = true;
                    endereco.cep = $('#pac-input').val();
                    endereco.street = $('#enderecos').html();
                    endereco.complement = $('#complemento').val();
                    endereco.city = $('#cidade').val();
                    endereco.lat = $('#lat').val();
                    endereco.lng = $('#lng').val();

                    if (controller.login.get() == null) {
                        controller.endereco.set(endereco);
                    } else {

                        endereco.pessoa_id = controller.login.get().id;
                        creait.post('endereco', endereco, function (data) {

                        });
                    }

                    creait.redirect("categoria");
                }
            });
        });
    },
    get: function () {
        if (controller.busca.memory == null) {
            if (window.localStorage["filiais"] == null)
                return null;
            return JSON.parse(window.localStorage["filiais"]);
        }
        else {
            return controller.busca.memory;
        }
    },
    set: function (data) {
        debugger;
        try {
            if (data == null) {
                window.localStorage["filiais"] = data;
            }
            else {
                window.localStorage["filiais"] = JSON.stringify(data);
            }
            controller.busca.memory = null;
        }
        catch(ex)
        {

            if (data == null) {
                controller.busca.memory = data;
            }
            else {

                controller.busca.memory = data;
            }
        }
    },
    memory: null
}

controller.erroEndereco = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["CEP"] == null)
            return null;
        return JSON.parse(window.localStorage["CEP"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["CEP"] = data;
        else
            window.localStorage["CEP"] = JSON.stringify(data);
    }
};

controller.index = {
    init: function (events) {
        creait.get('filiais', null, function (data) {
            events(data, function (content) {
                if (controller.login.get() == null) {
                    creait.redirect("categoria");
                }
            });
        });
    }
}

controller.boleto = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["boleto"] == null)
            return null;
        return JSON.parse(window.localStorage["boleto"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["boleto"] = data;
        else
            window.localStorage["boleto"] = JSON.stringify(data);
    }
};

controller.credito = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["credito"] == null)
            return null;
        return JSON.parse(window.localStorage["credito"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["credito"] = data;
        else
            window.localStorage["credito"] = JSON.stringify(data);
    }
};

controller.debito = {
    init: function (events) {
        events({}, function (content) {

        });
    },
    get: function () {
        if (window.localStorage["debito"] == null)
            return null;
        return JSON.parse(window.localStorage["debito"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["debito"] = data;
        else
            window.localStorage["debito"] = JSON.stringify(data);
    }
};

$(window).resize(function () {
    window.resizeTo(425, 660);
});
