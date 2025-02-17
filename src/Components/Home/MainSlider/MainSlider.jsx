import React from 'react';
import image1 from '../../../assets/images/41nN4nvKaAL._AC_SY200_.jpg';
import image2 from '../../../assets/images/61cSNgtEISL._AC_SY200_.jpg';
import image3 from '../../../assets/images/XCM_Manual_1.jpg';
import image4 from '../../../assets/images/XCM_Manual_2.jpg';
import image5 from '../../../assets/images/XCM_Manual_3.jpg';
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        dots: true, // Display navigation dots
        infinite: true, // Infinite loop mode
        speed: 500, // Transition speed in ms
        slidesToShow: 1, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at a time
        autoplay: true, // Enable autoplay for automatic scrolling
        autoplaySpeed: 3000, // Delay between slides in ms
        arrows: true, // Show previous/next arrows
        centerMode: false, // Center the active slide
        adaptiveHeight: true, // Adjust height based on content
        pauseOnHover: true, // Pause autoplay on hover
        responsive: [ // Make carousel responsive for different screen sizes
            {
            breakpoint: 1024, // For tablets and large devices
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 768, // For mobile devices
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true, // Enable dots on mobile
            }
            }
        ]
    };
  return (
    <>
       <div className="container mx-auto my-20 px-6">
            <div className="flex justify-center items-center">
                <div className="w-3/4 pr-4">
                    <Slider {...settings} className="rounded-lg">
                        <div className="overflow-hidden rounded-lg">
                            <img className="w-full h-[400px] object-contain" src={image3} alt={image1} />
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <img className="w-full h-[400px] object-contain" src={image2} alt={image2} />
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <img className="w-full h-[400px] object-contain" src={image1} alt={image3} />
                        </div>
                    </Slider>
                </div>
                <div className="w-1/4 pl-4 flex flex-col space-y-1">
                    <div className="overflow-hidden rounded-lg">
                        <img className="w-full h-[200px] object-contain" src={image4} alt={image4} />
                    </div>
                    <div className="overflow-hidden rounded-lg">
                        <img className="w-full h-[200px] object-contain" src={image5} alt={image5} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
