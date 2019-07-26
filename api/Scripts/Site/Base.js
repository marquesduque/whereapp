var listo = {
    ajax: function (url, type, params, success, error) {
        $.ajax({
            type: type,
            url: url,
            data: params,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (success != null) {
                    success(response);
                }
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                if (error != null) {
                    error(response);
                }
            }
        });
    }
}