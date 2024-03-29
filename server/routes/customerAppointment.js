import customerAppointment from "../DB_Collections/customerAppointmentModel.js";

export const bookAppointment = async (request, response) => {
  try {
    console.log(request.body);

    const {
      customer_id,
      customer_name,
      services,
      total_price,
      total_duration,
      shop_name,
      shop_id,
      counter_number,
      time_slot,
      date,
      shop_address,
    } = request.body;

    if (
      !customer_id |
      !customer_name |
      !services |
      !total_price |
      !total_duration |
      !shop_name |
      !shop_id |
      !counter_number |
      !time_slot |
      !date |
      !shop_address

    ) {
      return response
        .status(401)
        .json({ error: "Please fill the details completely !" });
    }

    // Check is slot free or not

    const getSlotList = await customerAppointment.find({
      shop_id,
      date,
      counter_number,
    });

    let bookedLength = getSlotList.length;

    for (let a = 0; a < bookedLength; a++) {
      let slotSequence = getSlotList[a].time_slot.length;
      let userSlots = time_slot.length;
      for (let i = 0; i < slotSequence; i++) {
        for (let j = 0; j < userSlots; j++) {
          if (getSlotList[a].time_slot[i].slot === time_slot[j].slot) {
            return response
              .status(400)
              .json({ error: "Slot is Not Free, Try with another Time Slot" });
          }
        }
      }
    }

    // So Slot is Free So add it to dataBase
    const addToAppointments = await customerAppointment.create(request.body);
    if (!addToAppointments) {
      return response.status(400).json({ error: "Proess Failed" });
    }

    return response
      .status(200)
      .json({ message: "Your Slot Booked Successfully" });
  } catch (error) {
    response.status(400).json({ error });
  }
};

// Get all The Appointments of a Shop with respect to Date
export const getAllAppointments = async (request, response) => {
  try {
    console.log("get data of booked slots");
    console.log(request.body);

    const { shop_id, counter_number, date } = request.body;

    const appointments = await customerAppointment.find({
      shop_id,
      date,
      counter_number,
    });
    console.log(appointments);
    if (appointments.length > 0) {
      response.status(200).json({
        success: true,
        data: appointments,
      });
    } else {
      response.status(201).json({
        success: false,
        data: "No Appointment Found",
      });
    }
  } catch (error) {
    response.status(400).json({ error });
  }
};


// Get All the Appointment of a customer with respect to customer id;
export const getMyAppointments = async (request, response) => {

  const customer_id = request.query.key;

  const findAppointment = await customerAppointment.find({ customer_id }).sort({_id:-1});

  if (findAppointment.length !== 0) {
    response.status(200).json({
      success: true,
      data: findAppointment,
    });
  } else {
    response.status(200).json({
      success: true,
      error: "You does not have Booked any Slot yet",
    });
  }
};


// Get the Appointment of all customers with respect to shop id;
export const getAllCustomerAppointments = async (request, response) => {

  const { shop_id, date, counter_number } = request.body;

  const getList = await customerAppointment.find({ shop_id, date, counter_number }).sort({ time_slot: -1 });


  return response.status(200).json({ data: getList });



}
// Cancel The Customer Appointment
export const cancelCustomerAppointment = async (request, response) => {
  const _id = request.body;
  console.log(_id);
  try {
    const del = await customerAppointment.deleteOne(_id);
    // console.log(del);
    if (!del) {
      return response.status(401).json({ error: "process faild" });

    }
    return response.status(201).json({message:"Appointment Canceled Successfully"});
  }

catch(error){
  return response.status(401).json({error:"process faild"});

}


};



// Edit Payment Status of a Particular Appointment with respect to Customer
export const editPaymentStatus = async(request,response)=>{

}

// Edit CheckIn Status of a Particular Customer with respect to Shop
export const editCheckInStatus = async(request,response)=>{

}


