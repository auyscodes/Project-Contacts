var express = require('express');
var router = express.Router();

var dbc = require("./databaseConnect");
var ppd = require("./preprocessData");


var ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}

router.get('/', ensureLoggedIn, function(req, res) {
    getDataAndRender(res);
});


router.post('/update', ensureLoggedIn, function(req, res) {
    // console.log(req.body);
    // console.log(req.body._id);
    console.log ("update requested");
    updateAndRender(req, res);
});

router.post('/create', ensureLoggedIn, function(req, res) {
    createAndRender(req, res);
});

router.post('/delete', ensureLoggedIn, function(req, res) {
    
    console.log("delete requested");
    console.log("delete operation requested");
    // console.log(req.body);
    // console.log(req.body._id);
    deleteAndRender(req,res);
});

async function deleteAndRender(req,res){
    try{
        await dbc.dbOperation("delete", req.body._id);
        var result = await dbc.dbOperation("retrieve");
        res.json(result);
    } catch(ex){
        console.log(" delete and render error");
        console.error(ex);
    }
}

async function updateAndRender(req, res){
    try{
        console.log("inside update and render ");
        var processed_data = await ppd.processData(req);
        // console.log(processed_data);
        await dbc.dbOperation("update", processed_data);
        var result = await dbc.dbOperation("retrieve");
        res.json(result);
    } catch (ex){
        console.log('update and render error');
        console.error(ex);
    }
}
async function createAndRender(req, res){
    try{
        var processed_data = await ppd.processData(req);
        await dbc.dbOperation("insert", processed_data);
        var result = await dbc.dbOperation("retrieve");
        res.json(result);
    } catch(ex){
        console.log('create and render error');
        console.log(ex);
    }
}


async function getDataAndRender(res){
    try{
        var result = await dbc.dbOperation("retrieve");
        if (result.length!=0){
            res.render('contacts', {result: result});
        }
        else {
            res.render('econtacts', {});
        }
            
    } catch(ex){
        console.error(ex);
    }
}


module.exports = router;
