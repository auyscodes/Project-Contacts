var express = require('express');
var router = express.Router();
var ppd = require("./preprocessData");
var dbc = require("./databaseConnect")

/* GET form page. */
router.get('/', function(req, res, next) {
  res.render('mailer');
});

/* POST thank you page */
router.post('/', function(req, res, next){
    main(req, res);

    // console.log(req.body);
    
});

async function main(req, res){
  try{
    var processed_data = await ppd.processData(req);
    await dbc.dbOperation("insert", processed_data);
    res.render('thankyou', {processed_data:processed_data});
  } catch (ex){
    console.error('catach block');
    console.error(ex);
  }
  
}
/*End of post data*/

module.exports = router;
