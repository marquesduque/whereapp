$(document).ready(function () {

    debugger;
    pagarme.client.connect({ email: 'fernando@creait.com.br', password: 'fefa90' })
        .then(client => client.transactions.all())
        .then(transactions => function () {

            debugger;
        })
        .catch(error => function () {
            debugger;
        });

});