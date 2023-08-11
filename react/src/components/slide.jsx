import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const Slides = () => {  
   const [imageNum, setImageNum] = useState(1);
   const sliderImages = [
      // {
      //    url: "images/velo1.jpg",
      // },
      {
         url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Product_500718_55726.jpg",
      },
      {
         url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Danish_public_bicycle_CPH.jpg",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Biomega_ams_mens_8sp.jpg",
     },
     {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/27/2010_Cervelo_RS_01.jpg",
   },
   ];
   return (
      <div>
         {/* <h3>
            {" "}
            Creating the image slider using the react-simple-image-slider
         </h3> */}
         <div style={{ display: 'flex', justifyContent: 'center' }}>
         <SimpleImageSlider
            width={700}
            height={380}
            images={sliderImages}
            showBullets={true}
            showNavs={true}
            autoPlay={true} 
            onStartSlide = {(index, length) => {
               setImageNum(index);
            }}
               autoPlayDelay = {3}
         />
         </div>
         {/* <div style = {{ fontSize: "1.5rem" }}>
            The current image slide No is {imageNum}.
         </div> */}
      </div>
   );
}
export {Slides};