const mongo = require('mongodb');

const SAVE_USAGES_INTERVAL = 5000; // in milliseconds

module.exports = function(app){
    app.usages = [];
    
    setTimeout(saveUsages, SAVE_USAGES_INTERVAL);

    app.post('/api/usages', function(req, res){
        try {
            req.body._id = new mongo.ObjectID();
    
            // Store the supplied usage data in memory for now, then a process will store the rows into the db.
            app.usages.push(req.body);
    
            res.status(201).json({id:req.body._id});
        } catch (error) {
            res.status(500).json({'message':'An internal error occurred'});
        }
    });

    // Endpoint for debug only -- Not guaranteed to be good code.
    app.get('/api/usages/count', function(req, res) {
        const usages = app.db.collection("Usages");

        usages.count((err, result) => {
            if (err != null) {
                res.status(500).json({'message':'An internal error occurred'});
            }

            res.status(200).json({'numUsages':result});
        });
    });

    // Endpoint for debug only -- Not guaranteed to be good code.
    app.get('/api/usages/:id', function(req, res) {
        getUsageById(req.params.id).then((usage) => {
            res.status(200).json(usage);
        }).catch((err) => {
            res.status(500).json({'message':'An internal error occurred', 'err':err});
        });
    });

    function getUsageById(id) {
        const usageCursor =  app.db.collection("Usages").find({ _id: new mongo.ObjectID(id) });
    
        return usageCursor.next();
    }

    function saveUsages() {
        if (app.usages.length > 0) {
            const usages = app.usages;
            app.usages = [];

            const usagesCollection = app.db.collection("Usages");

            usagesCollection.insertMany(usages)
            .catch((err) => {
                console.error('Inserting usages from memory failed', err);
            });
        }

        setTimeout(saveUsages, SAVE_USAGES_INTERVAL);
    }
}

