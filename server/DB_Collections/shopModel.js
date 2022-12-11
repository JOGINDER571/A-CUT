import mongoose from "mongoose";

const shopModel = new mongoose.Schema({
  owner_name: {
    type: String,
  },
  owner_id:{
     type:String,
  },
  shop_name:{
     type:String
  },
  shop_mobile: {
    type: Number,
  },
  shop_address: {
    type: String,
  },
  shop_rating: {
    type: Number,
    default:0
  },
  shop_services: [
    {
      service_name: {
        type: String,
      },
      price: {
        type: Number,
      },
      offer: {
        type: Number,
      },
    },
  ],
});


const shop = mongoose.model("shop", shopModel);
export default shop;
