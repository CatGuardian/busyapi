module.exports = function(app){
    let Usages;

    app.post('/api/usages', function(req, res){
        Usages = Usages || app.db.collection("Usages");

        // Store the supplied usage data
        Usages.insert(req.body, (err, result) => {
            if (err != null) {
                res.status(500).json({'message':'An internal error occurred'});
            }

            res.status(201).json({'id':result.insertedIds[0]});
        });
    });

    app.get('/api/usages/count', function(req, res) {
        Usages = Usages || app.db.collection("Usages");

        Usages.count((err, result) => {
            if (err != null) {
                res.status(500).json({'message':'An internal error occurred'});
            }

            res.status(200).json({'numUsages':result});
        });
    });
}
