const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main()
.then(()=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '67f4ec021a166c6ec31c43ad'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();