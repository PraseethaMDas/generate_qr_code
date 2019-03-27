const MongoClient = require('mongodb').MongoClient;

const table_name = 'product_details';
var db, table;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err

    db = client.db('prj');
    table = db.collection(table_name);
})

function insert_doc(data) {
    table.insertOne(data, function (err, res) {
        if (err ) return err
        row = res.insertedId;
        console.log("inserted ", row)
        return row;
    });
}

module.exports = {insert_doc}