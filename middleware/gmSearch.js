// has gotten search query from calling function



module.exports = function(req, res, next) {

    var ret;

    console.log('Before setting parameters');

    res.app.locals.gmClient.places({
        //query: 'fast food',
        query: req.query.q,
        language: 'en',
        location: [40.7128, -74.0059],
        radius: 5,
        //type: "food"
    }, function(err, response) {
      if (!err) {
        console.log('Response in gmSearch.js');
        ret = response.json.results;
        res.locals.gmResponse = ret;
        console.log('After setting res.locals.gmResponse');
        next();
        console.log('After next()');
      }
    });

    console.log('Returning function');
    //not really sure why this is here
    return function(req, res, next){
        if (next) next();
        //next();
    };

};