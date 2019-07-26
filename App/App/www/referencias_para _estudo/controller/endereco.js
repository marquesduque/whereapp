
controller.endereco = {
    init: function (events, query) {

        var filial = controller.busca.get();

        $$.ajax({
            url: 'db_json/cidades.json', method: 'GET', dataType: 'json', success: function (data) {
                var estado = controller.filial.get() == null || controller.filial.get().estado == '' ? 'SP' : controller.filial.get().estado;
                var cidade = (controller.filial.get() == null || controller.filial.get().cidade == '' ? 'São Paulo' : controller.filial.get().cidade).toLocaleLowerCase().replace(/ /g, "").replace(/\./g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                $(data.estados).each(function (index, item) {

                    var option = $('<option' + (item.sigla == estado ? ' selected' : '') + '>' + item.sigla + '</option>');
                    option.data('cidades', item.cidades);
                    $('#sel_estado').append(option);
                });
                $('#sel_estado').change(function () {
                    $('#sel_cidade').html('');
                    var cidades = $(this).find('option:selected').data('cidades');
                    $(cidades).each(function (index, c) {
                        $('#sel_cidade').append('<option' + (c.toLocaleLowerCase().replace(/ /g, "").replace(/\./g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") == cidade ? ' selected' : '') + '>' + c + '</option>');
                    });
                });
                $('#sel_estado').change();
            }, error: function (a, b, c) {
            }
        });


        events({}, function (content) {

            if (biblioteca.get('endereco_table', true) == false) {
                $('#endereco_table').remove();
            }
            if (controller.layout.get().frete_produto == true) {
                //$('.endereco_mensagem').html('Qual o endereço da sua consulta?');
                $('#endereco_table').hide();
            }

            if (controller.busca.get() == null) {
                $('#voltar_endereco_edit').hide();
            }
            if (controller.login.get() != null && controller.login.get().perfil_id == 7) {
                $('#voltar_endereco_edit').show();
                if (controller.cliente.get() != null) {
                    $('.endereco_mensagem').html('<div>CLIENTE: ' + controller.cliente.get().nome + '</div>');
                }
            }

            if (controller.layout.get().place_id < 60000) {
                $('.facebook_page').hide();
            }


            if (window.gmap_async == null) {
                window.gmap_async = $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCIoBAvqfno0lFGhuzuuwqX0KmXRdr-10o&libraries=places&callback=maps_callback");
            }
            window.gmap_async.done(function () {

                //if (controller.endereco.get() != null && controller.endereco.get().lat != null) {
                //    bind(controller.endereco.get());
                //}

                var acService = new google.maps.places.AutocompleteService();
                var defaultBounds = null;
                if (controller.busca.get() != null) {
                    defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(controller.busca.get().lat, controller.busca.get().lng));
                }
                
                $('#btn_buscar').click(function () {

                    $('#busca_endereco').toggleInputError($('#busca_endereco').val().length != 8, 'CEP incorreto');

                    if (!$('#busca_endereco').hasClass('has-error')) {
                        procurar_endereco($('#busca_endereco').val(), 'geocode');


                        $('.has-error').removeClass('has-error');
                        $("#btn_att_edit").unbind('click');
                        $("#btn_att_edit").click(function () {

                            $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                            $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                            if ($('formatte .has-error').length == 0) {
                                procurar_endereco($('#sel_rua').val() + ', ' + $('#numeroPerfil').val() + ' - ' + $('#sel_cidade option:selected').html() + ', ' + $('#sel_estado option:selected').html(), 'address');
                            }
                        });
                    }
                });
                $('#digitarendereco').click(function () {

                    $('#endereco_table').hide();
                    $('#endereco_message').hide();
                    $('#btn_att_edit').show();
                    $('.digitar_cep').toggle(400);
                    $('.cep_escolhido').toggle(400);
                    $('[fixo_cep]').hide();
                    $('[digitar_cep]').show();


                    $('.has-error').removeClass('has-error');
                    $("#btn_att_edit").unbind('click');
                    $("#btn_att_edit").click(function () {

                        $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                        $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                        if ($('formatte .has-error').length == 0) {
                            procurar_endereco($('#sel_rua').val() + ', ' + $('#numeroPerfil').val() + ' - ' + $('#sel_cidade option:selected').html() + ', ' + $('#sel_estado option:selected').html(), 'address');
                        }
                    });
                })
                function procurar_endereco(busca, tipo) {
                    acService.getPlacePredictions({
                        input: busca,
                        types: [tipo],
                        bounds: defaultBounds,
                        componentRestrictions: { country: 'br' }
                    }, function (places, status) {

                        if (places == null || places.length < 1) {
                            myApp.alert('O endereço inforamado não foi encontrado', 'Oops');
                            return;
                        }
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            $('#list_enderecos').html('');

                            $(places).each(function (index, item) {

                                var service = new google.maps.places.PlacesService($('<div></div>')[0]);
                                service.getDetails({
                                    placeId: item.place_id
                                }, function (place, status) {

                                    var lat = place.geometry.location.lat();
                                    var lng = place.geometry.location.lng();

                                    var endereco = {
                                        cep: '',
                                        street: '',
                                        city: '',
                                        district: '',
                                        state: '',
                                        country: '',
                                        lat: lat.toString().replace('.', ','),
                                        lng: lng.toString().replace('.', ','),
                                        formatted_address: '',
                                        number: '',
                                        complement: '',
                                        delivery: true
                                    };

                                    $(place.address_components).each(function (index, item) {
                                        $(item.types).each(function (indext, itemt) {
                                            switch (itemt) {
                                                case "street_number":
                                                    endereco.number = item.long_name;
                                                    $('#numeroPerfil').val(endereco.number);
                                                    break;
                                                case "postal_code":
                                                    endereco.cep = item.long_name;
                                                    break;
                                                case "route":
                                                    endereco.street = item.long_name;
                                                    break;
                                                case "administrative_area_level_1":
                                                    endereco.state = item.short_name;
                                                    break;
                                                case "sublocality_level_1":
                                                    endereco.district = item.short_name;
                                                    break;
                                                case "administrative_area_level_2":
                                                    endereco.city = item.long_name;
                                                    break;
                                                case "country":
                                                    endereco.country = item.long_name;
                                                    break;

                                            }
                                        });
                                    });

                                    endereco.adr_address = place.adr_address;
                                    if (places.length == 1) {

                                        $('#endereco_table').show();
                                        bind(endereco);
                                        if (endereco.street != '') {
                                            if ($('.digitar_cep').is(':visible')) {
                                                $('[fixo_cep]').show();
                                                $('[digitar_cep]').hide()
                                                $('.cep_escolhido').show(400);
                                                $('.digitar_cep').hide(400);
                                            }
                                        }
                                        else {
                                            $('[fixo_cep]').hide();
                                            $('[digitar_cep]').show();
                                            $('.digitar_cep').hide(400);
                                            $('.cep_escolhido').show(400);
                                        }
                                    }
                                    else {
                                        var li = $('<li><i class="f7-icons fonte_cinza">angle-right</i>' + place.adr_address + '</li>');
                                        $('#list_enderecos').append(li);
                                        li.click(function () {
                                            endereco.number = $('#numeroPerfil').val();
                                            bind(endereco);
                                        });
                                    }
                                });
                            });
                            if (places.length > 1) {
                                $('.cep_escolhido').toggle(400);
                                $('#li_endereco').toggle(400);
                            }
                        }
                    });
                }
            });


            function bind(endereco) {
                $('#busca_endereco').val('');

                $('#numeroPerfil').val(endereco.number);
                $('#estado').val(endereco.state);
                $('#cidade').val(endereco.city);
                $('#complementoPerfil').val(endereco.complement);
                $('#rua').val(endereco.street);


                var filiais = controller.layout.get().filiais;
                var filial_proxima = null;
                $(filiais).each(function (a, b) {
                    if (filial_proxima == null) {
                        filial_proxima = b;
                    }
                    else {
                        var kmb = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), b.lat, b.lng);
                        var filial_proximakm = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), filial_proxima.lat, filial_proxima.lng);
                        if (filial_proximakm > kmb) {
                            filial_proxima = b;
                        }
                    }
                });
                
                debugger;
                function inside(point, vs) {
                    // ray-casting algorithm based on
                    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

                    var x = point[0], y = point[1];

                    var inside = false;
                    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                        var xi = vs[i][0], yi = vs[i][1];
                        var xj = vs[j][0], yj = vs[j][1];

                        var intersect = ((yi > y) != (yj > y))
                            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                        if (intersect) inside = !inside;
                    }

                    return inside;
                };

                if (controller.busca.get() == null || controller.busca.get().correios == false) {

                    $('#endereco_message').hide();
                    $('#btn_att_edit').show();
                    debugger;
                    var filial_proximakm = getDistanceFromLatLonInKm(parseFloat(endereco.lat.replace(',', '.')), parseFloat(endereco.lng.replace(',', '.')), filial_proxima.lat, filial_proxima.lng);

                    $('#endereco_distancia').html(filial_proximakm.toFixed(2) + 'km')
                    $('#endereco_tempo').html(filial_proxima.tempo)
                    if (filial_proxima.tempo == null || filial_proxima.tempo == '')
                    {
                        $('#endereco_tempo').parent().remove();
                    }
                    var poligono_dentro = false;
                    if (filial_proxima.ceps != null) {
                        poligono_dentro = !inside([endereco.lat.replace(',', '.'), endereco.lng.replace(',', '.')], JSON.parse(filial_proxima.ceps));
                    }

                    if (poligono_dentro || filial_proxima.entrega_distancia_maxima > 0 && filial_proximakm > filial_proxima.entrega_distancia_maxima) {
                        $('#li_endereco').hide();
                        $('.cep_escolhido').show()
                        $('#endereco_message').show();
                        $('#btn_att_edit').hide();
                        $('#endereco_frete').html('Grátis')
                        $('#endereco_table').hide();
                        $('#endereco_message').html('Oops, não realizamos entregas para o endereço informado!');
                        return;
                    }
                    if (filial_proxima.entrega_distancia_maxima == 0) {
                        $('#endereco_frete').html(filial_proxima.entraga_valor_km.formatMoney(2));
                        endereco.valor = (filial_proxima.entraga_valor_km).formatMoney(2);
                    }
                    else {
                        $('#endereco_frete').html((filial_proxima.entraga_valor_km * filial_proximakm).formatMoney(2));
                        endereco.valor = (filial_proxima.entraga_valor_km * filial_proximakm).formatMoney(2);
}

                    if (endereco.valor == "" || filial_proximakm < filial_proxima.entrega_distancia_gratis) {
                        $('#endereco_frete').html('Grátis');
                        endereco.valor = 'Grátis';
                    }

                }
                else {
                    $('#endereco_table').hide();
                    $("#busca_endereco").attr("placeholder", "Informe seu CEP");
                    $("#busca_endereco").attr("type", "number");
                }

                $('.has-error').removeClass('has-error');
                $("#btn_att_edit").unbind('click');
                $("#btn_att_edit").click(function () {
                    if ($('[digitar_cep]').is(':visible')) {
                        $('#sel_rua').toggleInputError($('#sel_rua').val().replace(/ /g, "") == '', 'Informe o endereço');
                        endereco.street = $('#sel_rua').val();
                    }
                    $('#numeroPerfil').toggleInputError($('#numeroPerfil').val().replace(/ /g, "") == '', 'Informe o número');

                    if ($('formatte .has-error').length == 0) {
                        endereco.number = $('#numeroPerfil').val();
                        endereco.complement = $('#complementoPerfil').val();
                        endereco.delivery = true;
                        controller.endereco.set(endereco);

                        controller.filial.set(filial_proxima);

                        if (query.to == null) {
                            if (controller.endereco.get() == null) {
                                window.location = '/';
                            }
                            else if (controller.login.get() == null) {
                                creait.redirect("categoria");
                            }
                            else if (controller.pagamento.get() != null) {
                                if (controller.busca.get() != null && controller.busca.get().id == filial_proxima.id) {
                                    if (controller.pagamento.get().transacao == 4) {
                                        if (controller.cartao.get() == null) {
                                            creait.redirect("cartao");
                                        }
                                        else {
                                            creait.redirect("pagamento");
                                        }
                                    }
                                    else {
                                        creait.redirect("pagamento");
                                    }
                                }
                                else {
                                    creait.redirect("categoria");
                                }
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                        else {
                            creait.redirect(query.to);
                        }
                    }
                });

                if ($('#li_endereco').is(':visible') || $('.cep_escolhido').is(':visible')) {
                    $("#btn_att_edit").click();
                }
            }
            var perfil = controller.login.get();

            $('#activePerfil').val('true');

            $('#voltar_endereco_edit').click(function () {


                if (controller.login.get() != null && controller.login.get().perfil_id == 7) {
                    creait.redirect("cliente");
                }
                else {
                    if (query.to == null) {
                        if (controller.layout.get().delivery && controller.layout.get().balcao) {
                            window.location = '/';
                        }
                        else {
                            if (controller.pagamento.get() != null) {
                                creait.redirect("pagamento");
                            } else {
                                creait.redirect("categoria");
                            }
                        }
                    }
                    else {
                        creait.redirect(query.to);
                    }
                }
            });

            setTimeout(function () {
                $('#cepPerfil').focus();
            }, 500);

        });
    },
    get: function () {
        if (window.localStorage["enderecoprovisorio"] == null)
            return null;
        return JSON.parse(window.localStorage["enderecoprovisorio"]);
    },
    set: function (data) {
        if (data == null)
            window.localStorage["enderecoprovisorio"] = data;
        else
            window.localStorage["enderecoprovisorio"] = JSON.stringify(data);
    }
}