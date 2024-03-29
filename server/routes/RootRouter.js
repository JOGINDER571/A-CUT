import express from "express";
const router = express.Router();
import uploadImages from "../middleware/uploadImages.js";
import {signup,sendOTPtoEmail,
  verifyOTPforEmail} from "./signup.js";
import login from "./login.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShopDetails,
  deletShop,
  addShopService,
  updateShopService,
  deletShopService,
  uploadShopImage,
  addNewCounter,
  editShopCounter,
  deletShopCounter,
} from "./shop.js";
import {
  add_services,
  get_services,
  update_service,
  delet_service,
} from "./plateformServices.js";
import {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  getAllCustomerAppointments,
  cancelCustomerAppointment,
} from "./customerAppointment.js";
import ownerAuthenticate from "../middleware/ownerAuthentication.js";
import {
  setNewPassword,
  sendFrgPassOTP,
  verifyFrgPassOTP,
 
} from "./password.js";


//    ======= Authentication Routes =========  //

router.route("/signup").post(signup);
router.route("/verifyEmail").post(sendOTPtoEmail);
router.route("/verifyOTP").post(verifyOTPforEmail);
router.route("/login").post(login);

router.route("/user/new/pass").post(setNewPassword);
router.route("/user/forgot/pass").post(sendFrgPassOTP);
router.route("/entered/otp/verify").post(verifyFrgPassOTP);

router.route("/addShopCounter").post(ownerAuthenticate, addNewCounter);
router.route("/updateShopCounter").post(ownerAuthenticate, editShopCounter);
router.route("/deletShopCounter").post(ownerAuthenticate, deletShopCounter);

router.route("/createShop").post(ownerAuthenticate, createShop);
router.route("/getAllShops").get(getAllShops);
router.route("/getShop").get(getShopById);
router.route("/updateShopDetails").post(ownerAuthenticate, updateShopDetails);
router.route("/addShopService").post(ownerAuthenticate, addShopService);
router.route("/deletShop").post(ownerAuthenticate, deletShop);
router.route("/updateShopService").post(ownerAuthenticate, updateShopService);
router.route("/deletShopService").post(ownerAuthenticate, deletShopService);
router
  .route("/uploadShopImage")
  .post(ownerAuthenticate, uploadImages, uploadShopImage);

router.route("/addService").post(add_services);
router.route("/getServices").get(get_services);
router.route("/updateService").post(update_service);
router.route("/deletService").post(delet_service);

router.route("/bookAppointment").post(bookAppointment);
router.route("/getAllAppointments").post(getAllAppointments);
router.route("/getMyAppointments").get(getMyAppointments);
router.route("/getAllCustomerAppointments").post(getAllCustomerAppointments);
router.route("/deleteCustomerAppointments").delete(cancelCustomerAppointment);

export default router;
