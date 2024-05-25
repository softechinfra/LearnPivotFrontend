"use client";
import React, { Fragment, useEffect } from 'react'
import { useState,Suspense  } from "react";
// import {DARKMODE} from "./Components/Context/types"

import Navbar from '../Components/ITStartup/Common/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Loading from '../Components/Loading/Loading';
import PaymentCom from '../Components/ITStartup/payment/PaymentCom';


function MyPayment() {  

  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<Loading />}>
      <PaymentCom />

      <Footer />

      </Suspense>
    </Fragment>
  );
  }



 
export default MyPayment