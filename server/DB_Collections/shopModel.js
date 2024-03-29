import mongoose from "mongoose";

const shopModel = new mongoose.Schema({
  owner_name: {
    type: String,
  },
  owner_id: {
    type: String,
  },
  image: {
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: String,
    },
  },
  shop_name: {
    type: String,
  },
  shop_mobile: {
    type: Number,
  },
  shop_address: {
    type: String,
  },
  shop_rating: {
    type: Number,
    default:5,
  },
  shop_location: {
    latitude: {
      type: Number,
      default: 0  ,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  shop_counters:[
     {
      counter_number:{
        type:Number,
        default:1
      },
      counter_head:{
        type:String
      }
     }
  ],
  shop_time: [
     {
      open: {
        type: Number,
        default:8
      },
      close: {
        type: Number,
        default:20
      },
      day:{
        type:String,
      },
    },
  ],
  shop_services: [
    {
      service_name: {
        type: String,
      },
      price: {
        type: Number,
        default: 0,
      },
      offer: {
        type: Number,
        default: 0,
      },
      duration:{
        type:Number,
        default:15
      }
    },
  ],
});

const shop = mongoose.model("shop", shopModel);
export default shop;
