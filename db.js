const mongoose = require('mongoose')
const mongoURI = 'mongodb://Carving:Abhi%401999@ac-nozkieh-shard-00-00.2hnxn3m.mongodb.net:27017,ac-nozkieh-shard-00-01.2hnxn3m.mongodb.net:27017,ac-nozkieh-shard-00-02.2hnxn3m.mongodb.net:27017/Carving?ssl=true&replicaSet=atlas-11hiup-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB =() =>{
mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err,result)=>{
   if(err)console.log("---",err)
   else{
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("fooditem");
    fetched_data.find({}).toArray(async function(err,data){
        const foodcategory = await mongoose.connection.db.collection("foodcategory");
        foodcategory.find({}).toArray(async function (err, catData) {
            if(err)console.log(err);
       else{ global.fooditem = data;
            global.foodcategory  = catData;
    }
    })
        // if(err)console.log(err);
        // else global.food_items = data;
        // // console.log(global.food_items)
    })
   }
});
}
module.exports = mongoDB;