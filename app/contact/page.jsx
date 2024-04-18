import "./contactStyle.css";
import { TopAbstract } from "../MyApp";
import Enquiry from "../Components/Enquiry/Enquiry";
import {NewFooter} from "../Components/Footer/Footer";
import Navbar from "../Components/ITStartup/Common/Navbar/Navbar";
function Contact() {
  return (
    <main style={{backgroundColor:"#fff"}}>
    <Navbar/>
    <TopAbstract/>
    <Enquiry/>
    <NewFooter/>
    </main>
  )
}

export default Contact