import React from 'react'

// import GooglePlacesAutocomplete from'react-google-places-autocomplete';

import SearchMenu from '../components/SearchMenu';

function Createtrip() {


 
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5  bg-slate-950'>

        <h2 className='font-bold text-3xl text-center text-blue-500'>Tell us your travel preferences🏕️🌴</h2>
        <p className='mt-3 text-orange-100 text-xl text-center'>Just Provide some basic information,and our trip planner will generate a customined itineray based on your preferences.</p>



        <div className='mt-20'>    
        <div>
            <h2 className='text-3xl font-bold my-3 font-sans text-center text-a'>What is destination of choice ?</h2>

    
            </div>

            <SearchMenu/>
   
            </div>






<div className='mt-10'>

<img src="icons/template01.svg" className='w-240px h-300px'></img>


</div>

    </div>
  )
}

export default Createtrip