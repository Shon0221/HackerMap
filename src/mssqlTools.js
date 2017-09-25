const conn = require('mssql');

const config = {
    user: 'Geo',
    password: 'Pa$$w0rd',
    server: 'localhost',
    port: 1433,
    database: 'Location'
}

exports.getGeo = function(callback){
    conn.connect(config).then(pool => {
        return pool.request().query('EXEC Get_Geo_Info');
    }).then(res => {
        console.log(res.recordset);
    }).catch(err => {
        console.log(err);
    });
}

function processData(data, callback) {

}