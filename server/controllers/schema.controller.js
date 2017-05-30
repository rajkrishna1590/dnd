var config = require('config.json');
var express = require('express');
var router = express.Router();
var schemaService = require('services/schema.service');

// routes 
router.post('/schema', creatSchemas); 

module.exports = router;
 
function creatSchemas(req, res) {
    schemaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
    });
}
 