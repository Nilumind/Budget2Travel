import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

    const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    hotel&&GetPlacePhoto();
  },[hotel])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName
    };
  
    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0]?.photos;
  
      if (photos && photos.length > 0) {
        const photoName = photos[0].name;
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(photoUrl);
      }
    } catch (err) {
      console.error('Error fetching place photo:', err.response?.data || err.message);
    }
  };
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' >
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium '>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500 '>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem