import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { get } from '../../../API_Call/Get_Call'; // Replace with the correct relative path
import style from './CategorySlider.module.css'

import Slider from "react-slick";
export default function CategorySlider() {
    // Function to fetch product details
    async function getCategories() {
    try {
        const message = await get(`https://ecommerce.routemisr.com/api/v1/Categories`);
        console.log(message);
        return message?.data?.data;
    } catch (error) {
        console.log(error);
    }
    }
    // Fetching product details with react-query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Fetch_categories'],
        queryFn: getCategories,
        refetchInterval: 3000,
    });
    
  var settings = {
    dots: false, // Display navigation dots
    infinite: true, // Infinite loop mode
    speed: 500, // Transition speed in ms
    slidesToShow: 7, // Number of slides to show at once
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
    <div className="container mx-auto my-12">
        <h1 className={`${style.green} text-center text-3xl font-extrabold mb-5 mt-20`}>Popular Categories</h1>
        <Slider {...settings} >
        {data?.map((category)=> {
                    return <>
                    <div className='flex flex-wrap justify-center items-center'>
                        <img key={category._id} className="w-[250px] h-[250px] object-cover" src={category.image} alt={`Category Image ${category._id}`} />
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                        </div>
                    </>
                })}
        </Slider>
    </div>
    </>
  )
}
