const mongoose = require('mongoose');
const uri = 'mongodb+srv://zs5992984:Zain1122@cluster0.txd202x.mongodb.net/goFood?retryWrites=true&w=majority';
const config = async () => {

    await mongoose.connect(uri).then(async () => {
        console.log("connected")
        const collection = mongoose.connection.db.collection('food_items');
        // console.log(collection.dbName);
        const data = await collection.find({}).toArray();
        global.food_items = data;
        const foodCategory = mongoose.connection.db.collection('food_categories');
        const catData = await foodCategory.find({}).toArray();
        global.food_category = catData;
        // console.log(data);
        // console.log(catData);
    }).catch(err => {
        console.log(err)
    });
}
module.exports = config;