"use client"
import React, {useState,useEffect} from 'react';
import BuyComponent from '../../../Components/PublicPage/BuyForm/BuyComponent';
import { CircularProgress } from '@mui/material';
import NoResult from '@/app/Components/NoResult/NoResult';
import { myCourseService } from "../../../services";



export default function OneClassBuy({params}) {
  const [loading, setLoading] = useState(true);

  const [data,setData] = useState({});

  useEffect(() => {
    // Getting date from Voucher in URL
    console.log("got loaded")
    console.log({params})
    async function getVoucher() {
      console.log("function got called")
    
      let res = await myCourseService.publicGetOne(`${params.oneCourseId}`);
      console.log({res,id:params.oneCourseId})
    
      if (res.variant === "success") {
        setData(res.data)
        console.log(res.data)
        snackRef.current.handleSnack(res);
      } else {
        snackRef.current.handleSnack(res);
        console.log(res);
      }
    }
      getVoucher();
  }, [params]);


  return (
  <> 
       {loading ? (
                <div className="center">
                  <CircularProgress size={30} />{" "}
                </div>
              ) : loading === false && result.length === 0 ? (
                <NoResult label="No Result Available" />
              ) : null}
    <BuyComponent data ={data} />
  </>
  );
}