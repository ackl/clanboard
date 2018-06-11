module.exports = (models, socket) => {
    const router = require('express').Router();

    router.get('/', (req, res) => {
        res.send('index.html');
    });
    router.get('/api/:collection', (req, res) => {
        const model = models[req.params.collection];

        model.find((err, results) => {
            res.send(results);
        });
    });
    router.get('/api/:collection/:id/:subcollection', (req, res) => {
        const model = models[req.params.subcollection];

        model.find({ thread: req.params.id }, (err, results) => {
            res.send(results);
        });
    });

    router.post('/api/:collection', (req, res) => {
        const model = models[req.params.collection];
        model.create(req.body, (err, data) => {
            if (!err) socket.emit(
                `new-${model.modelName.toLowerCase()}-${req.body.thread}`,
                data
            );
        });

        res.send(req.body);
    });

    return router
};
