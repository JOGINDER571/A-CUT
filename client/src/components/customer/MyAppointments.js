import React from 'react'
import { useSelector } from 'react-redux';
import AppointmentLayout from './AppointmentLayout';
import "../../styles/myappointments.css";
// import SearchBar from '../../components/shop/showAllShops/SearchBar.js';



const MyAppointments = () => {

   const appointmentList = useSelector((state) => state.myAppointmentReducer);

   console.log("appointmentList", appointmentList);

   return (
      <>
         <div>
            <div className="appointment_tittle">-: Appointment Details :-
            </div>
            {/* <SearchBar /> */}

            {appointmentList.length !== 0 ? appointmentList.map((data, index) => {
               return (
                  <React.Fragment key={index}>

                     <AppointmentLayout data={data} />

                  </React.Fragment>
               )
            }) : (<div>
               <p>Does Not Booked Any Services Yet</p>
            </div>)}




         </div>


      </>
   )
}

export default MyAppointments