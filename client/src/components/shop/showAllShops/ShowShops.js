import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import ShopLayout from './ShopLayout';
import "../../../styles/showShops.css";
import { clearBookingData } from "../../../redux/action/bookShopSlotAction";

const ShowShops = () => {

    const dispatch = useDispatch();
    const AllShops = useSelector((state) => state.allShopDataReducer);
 
    
    useEffect(() => {
        window.scrollTo({top:0,behavior:"smooth"});
        dispatch(clearBookingData());
    }, []);
    return (
        <>

            <div className='allShops-canvas'>
                <div className=" allshop_tittle">-:All Avalable Shops</div>

                <SearchBar />
                <div>
                </div>


                <div className='allShops-list-sec'>
                    {AllShops.length !== 0 ? AllShops.map((data, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ShopLayout data={data} />
                            </React.Fragment>
                        )

                    }) : (<div><h2> No Shop Found </h2></div>)}

                </div>

            </div>

        </>
    );
}

export default ShowShops;