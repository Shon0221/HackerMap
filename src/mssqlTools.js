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
        conn.close();
        processData(res.recordset, callback);
    }).catch(err => {
        conn.close();
        console.log(err);
    });
}

function processData(data, callback) {//
    let geoMap = {};
    let bjData = [];
    const host = 'Host';
    const hostJSON = {name: host};
    geoMap[host] = [-119.2660834, 38.4849417];
    data.forEach(element => {
        const city = element.City; 
        geoMap[city] = [element.Longitude, element.Latitude];
        let vaTemp = element.SumT;
        if (vaTemp > 150) {
            vaTemp = 150;
        }
        const fromGeo = {name: city, value: vaTemp, f: element.SumT};
        bjData.push([fromGeo, hostJSON]);
    });
    const reqData = {GeoMap: geoMap, BJData: bjData};
    // console.log(bjData);
    callback(reqData);
}
