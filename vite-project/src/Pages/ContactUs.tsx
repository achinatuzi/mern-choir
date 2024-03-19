import { useEffect } from 'react'
import Slider from "../Components/Slider";

const ContactUs = () => {
    useEffect(() => {
      window.scroll(0, 0);
    },[]);
  return (
    <div className="home pt-2 m-0 w-100  ">
      <div className="home_image w-0  "><Slider /> </div>
    </div>
  );
}

export default ContactUs