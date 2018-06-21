let express = require('express');
let router = express.Router();

/* Get home page          */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Cool, huh!', condition: false, anyArray: [1, 2, 3] });
});

/* Get users listing          */
router.get('/users', function(req, res, next) {
    res.send('Respond with a resource');
});

router.get('/users/detail', function(req, res, next) {
    res.send('detail');
});



//