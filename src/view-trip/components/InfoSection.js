import React from 'react';
// import {  } from '@tabler/icons-react';

export default function InfoSection({ tripData, userSelection }) {
  return (
    <div className='h-[340px] w-full object-cover rounded-md mb-20 pb-10'>
      <img 
        src='https://imgs.search.brave.com/UWjqEHR2ipi-9HtSUya3jOi12A2_HiBYrB65-4oePW4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzgwLzk1LzE2/LzM2MF9GXzc4MDk1/MTY3Ml9jSnpWZU94/eWJrSGtDa0ZESU9H/VUFsY3EyQURJSFZP/Ny5qcGc' 
        alt='Travel Destination' 
        className='w-full h-[200px] object-cover rounded-t-sm' 
      />

      <div className=' flex justify-between items-center'>
      
      <div className='p-4 bg-slate-50 rounded-b-sm flex flex-col sm:flex-row gap-3 sm:gap-5 
    sm:grid-cols-2 md:grid-cols-3 rounded-lg hover:scale-90 transition-all'>
  <h2 className='text-lg sm:text-2xl font-bold text-center sm:text-left'>
    {tripData?.trip_name || 'Trip Information'}
  </h2>
  <p className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm text-center sm:text-left'>
    <strong>💰Budget:</strong> {userSelection?.budget || 'Not specified'}
  </p>
  <p className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm text-center sm:text-left'>
    <strong>Country:</strong> {userSelection?.country || 'Not specified'}
  </p>
  <p className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm text-center sm:text-left'>
    <strong>City:</strong> {userSelection?.city || 'Not specified'}
  </p>
  <p className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm text-center sm:text-left'>
    <strong>Traveler:</strong> {userSelection?.people || 'Not specified'}
  </p>
  <p className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm text-center sm:text-left'>
    <strong>📅Duration:</strong> {tripData?.duration || 'Not specified'}
  </p>
</div>


   
  <a class="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-black hover:bg-black-700 hover:border-black-700" target="_blank" rel="noopener" href="https://telegram.me/share/url?text=&amp;url=" aria-label="Share on Telegram" draggable="false">
    <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6">
      <title>Telegram</title>
      <path d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm115 169c-4 39-20 134-28 178-4 19-10 25-17 25-14 2-25-9-39-18l-56-37c-24-17-8-25 6-40 3-4 67-61 68-67l-1-4-5-1q-4 1-105 70-15 10-27 9c-9 0-26-5-38-9-16-5-28-7-27-16q1-7 18-14l145-62c69-29 83-34 92-34 2 0 7 1 10 3l4 7a43 43 0 0 1 0 10z">
      </path>
    </svg>
  </a>
</div>

      </div>
    
  );
}