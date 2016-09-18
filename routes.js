module.exports = function (models, socket) {
    var router = require('express').Router();

    router.get('/', function (req, res, next) {
        res.send('index.html');
    });

    router.get('/api/:collection', function (req, res, next) {
        var model = models[req.params.collection];
        model.find(function (err, results, count) {
            res.send(results);
        });
    });
    router.post('/api/:collection', function (req, res) {
        var model = models[req.params.collection];
        model.create(req.body, function (err, data) {
            if (!err) socket.emit('new-' + model.modelName.toLowerCase(), data);
        });
        res.send(req.body);
    });

    return router
};
