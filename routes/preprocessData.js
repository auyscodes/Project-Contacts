var geo = require('mapbox-geocoding');
geo.setAccessToken('pk.eyJ1IjoibmJoYXR0YXIiLCJhIjoiY2pvNGo1Z3RyMDVhMjNybW9lM3RkaWR0YSJ9.bHcNPe6O_Onx7WWxpEp_gQ');

var raw_post;
var address; // to store geocoding address query

var preprocessReq = (req) => { 
  raw_post = {
    gender : req.body.gender,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    street : req.body.street,
    city : req.body.city,
    state : req.body.state,
    zip : req.body.zip,
    phone : req.body.phone,
    email : req.body.email,
    contactbyphone : req.body.contactbyphone, 
    contactbymail : req.body.contactbymail,
    contactbyemail : req.body.contactbyemail,
    contactbyany: req.body.contactbyany,
    latlng: [0,0]
  };
  if (raw_post.contactbyany == 'Yes'){
    raw_post.contactbyphone = 'Yes';
    raw_post.contactbymail = 'Yes';
    raw_post.contactbyemail = 'Yes';
  }

  if (raw_post.contactbyphone == undefined){
    raw_post.contactbyphone ='No';
  }
  if (raw_post.contactbyemail == undefined){
    raw_post.contactbyemail = 'No';
  }
  if (raw_post.contactbymail == undefined){
    raw_post.contactbymail = 'No';
  }
  if (raw_post.contactbyany == undefined){
    raw_post.contactbyany = 'No';
  }
  console.log("trying to print req.body._id in preprocessdata");
  console.log(req.body._id);
  if (req.body._id != "undefined")
  {
    console.log("should only reach when typed update not on create");
      raw_post._id = req.body._id;
  }
  address = raw_post.street + ', ' + raw_post.city + ', ' + raw_post.state + ',' + raw_post.zip; 
  return raw_post;
};

var geoCodeData = (address) => {
   return new Promise((resolve,reject)=>{
    geo.geocode('mapbox.places', address, function (err, geoData) {
      console.log("Geocode result");
      if (err){
        console.log("There is an error, calling reject");
        return reject(err);
      }
      else{
        var latlng = geoData.features[0].center;
        console.log(latlng);
        console.log("Resolve");
        return resolve(latlng);
      }
      });
  });
};

async function preprocessData(req) {
  try{
    preprocessReq(req);
    var latlng = await geoCodeData(address);
    console.log("geocode returned");
    console.log(latlng);
    raw_post.latlng = latlng;
    console.log("Returning");
    return raw_post;
    
  } catch (ex){
    console.log("error was thrown while geocoding")
    console.error(ex);
  }
};
  
exports.processData = preprocessData;


