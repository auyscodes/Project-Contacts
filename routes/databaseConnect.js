const MongoDb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const  url = "mongodb://localhost:27017/test";

async function dbCRUD(command, processed_data){
  
  try{
    
    const connection = await MongoClient.connect(url);
    const db = await connection.db("final_project");
    if (command == "retrieve"){
      var  result = await db.collection("information").find().toArray();
      console.log(" inside retrieve command ");
      // console.log (result);
      console.log ("result of retreive command in server");
      return result;
    }
    
    if (command == "insert"){
      await db.collection("information").insert(processed_data);
      return 1;
    }
    
    if (command == "update"){
      var ID = processed_data._id;

      // console.log(processed_data._id);
      // console.log(ID);
      console.log(" inside update command reached ")
      delete processed_data._id;
      await db.collection("information").replaceOne({"_id" : new MongoDb.ObjectID(ID)}, processed_data);
      return 1;
    }
    
    if (command == "delete"){
      console.log("inside delete command ");
      var delete_result = await db.collection("information").deleteOne({"_id" : new MongoDb.ObjectID(processed_data)});
      // console.log(delete_result);
    }
    connection.close();
    
  } catch (ex){
    console.log("Data Error");
    console.error(ex);
    
  }
  
}

exports.dbOperation = dbCRUD;