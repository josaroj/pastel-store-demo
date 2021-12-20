const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


var exphbs = require('express-handlebars');


var cors = require('cors');
app.use(cors());


/// set engine handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    const origin = req.get('origin');
    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});


app.listen(process.env.PORT || 4002, () => {
    console.log('API Start watch_mii_server_read server at port 4002.')
})

var cartRoute = require('./routes/cart.route');
var favoriteRoute = require('./routes/favorite.route');
var orderRoute = require('./routes/order.route');
var paymentRoute = require('./routes/payment.route');
var productRoute = require('./routes/product.route');
var userRoute = require('./routes/user.route');


cartRoute(app);
favoriteRoute(app);
orderRoute(app);
paymentRoute(app);
productRoute(app);
userRoute(app);
