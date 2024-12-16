import React from 'react'

function Hotels({ tripdata }) {
    return (
      <div >
         <h2 className='font-bold mt-5 text-xl'>Hotels Recommendation</h2>
          <div className='grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {tripdata?.hotel_options?.map((hotel, index) => (



                  <div className='rounded-lg border p-4 m-2' key={index}>

<div className='grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-lg hover:scale-90 transition-all'>
               <img src='https://imgs.search.brave.com/SUviyQyaD4rIBVMkUgjpll5m4piTQdHq-uzoRw_l2s0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/NzMxNzE3L3Bob3Rv/L2x1eHVyeS1yZXNv/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWNPRE1TUGJZ/eXJuMUZIYWtlMXhZ/ejlNOHIxNWlPZkd6/OUFvc3k5RGI3bUk9'/>
            </div>



                    
                      <h3 className='font-bold'>{hotel.hotel_name}</h3>
                      <p>{hotel.hotel_address}</p>
                      <p className='text-lg font-semibold'>💰{hotel.price}</p>
                      <a href={hotel.booking_url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:bg-gray-300 rounded'>Book Now</a>
                      <div className='flex items-center'>
                        {/* Displaying the rating */}
                        <span className='text-yellow-500'>
                            {'★'.repeat(Math.floor(hotel.rating))} {/* Full stars */}
                            {'☆'.repeat(5 - Math.floor(hotel.rating))} {/* Empty stars */}
                        </span>
                        <span className='ml-2 text-sm'>🌟{hotel.rating}</span> {/* Numeric rating */}
                    </div>
                  </div>



              ))}
          </div>
      </div>
    );
  }
  
  export default Hotels;