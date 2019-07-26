var db = null;

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        var isMobile = window.cordova == undefined ? false : true;
        db = isMobile == true ? window.sqlitePlugin.openDatabase({ name: 'agTech.db', location: 'default' }) : window.openDatabase('agTech', '1.0', 'Data', 2 * 1024 * 1024);
    };
})();

var storage = {
    get: function (table, callback) {
        if (db == null) {
            var isMobile = window.cordova == undefined ? false : true;
            db = isMobile == true ? window.sqlitePlugin.openDatabase({ name: 'agTech.db', location: 'default' }) : window.openDatabase('agTech', '1.0', 'Data', 2 * 1024 * 1024);
        }

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table + ' (json)');
            tx.executeSql('SELECT * FROM ' + table, [], function (tx, rs) {
                if (rs.rows.length == 0) {
                    callback(null);
                }
                else {
                    callback(rs.rows.item(0).json);
                }
            }, function (error) {
                console.log('Erro: ' + error);
            }, function () {
            });
        }, function (error) {
            console.log('Erro: ' + error);
        }, function () {
        });
    },
    set: function (table, value) {
        if (db == null) {
            var isMobile = window.cordova == undefined ? false : true;
            db = isMobile == true ? window.sqlitePlugin.openDatabase({ name: 'agTech.db', location: 'default' }) : window.openDatabase('agTech', '1.0', 'Data', 2 * 1024 * 1024);
        }

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table + ' (json)');
            tx.executeSql('delete from ' + table, [], function () {
                tx.executeSql('INSERT INTO ' + table + ' VALUES (?)', [value]);
            });
        }, function (error) {
            console.log('Erro: ' + error);
        }, function () {
        });
    },
    delete: function (table) {
        if (db == null) {
            var isMobile = window.cordova == undefined ? false : true;
            db = isMobile == true ? window.sqlitePlugin.openDatabase({ name: 'agTech.db', location: 'default' }) : window.openDatabase('agTech', '1.0', 'Data', 2 * 1024 * 1024);
        }

        db.transaction(function (tx) {
            tx.executeSql('drop table ' + table);
        }, function (error) {
            console.log('Erro: ' + error);
        }, function () {
        });
    },
    clear: function () {

        if (isMobile == true) {
            window.sqlitePlugin.deleteDatabase({ name: 'agTech.db', location: 'default' }, function () {
                db = window.sqlitePlugin.openDatabase({ name: 'agTech.db', location: 'default' });
            });
        }
    }
}