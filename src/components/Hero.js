// import React, { useEffect, useState } from 'react'; // Added useEffect and useState
// import { Link } from 'react-router-dom'

// const Hero = () => { // Fixed function declaration
//     const backgroundImages = [

//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/18f4e89e.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/7a289402.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/6f5bb0c7.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/2f3c5133.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/ba858211.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/9d162144.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url(" https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/a2cfa93e.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//         'url("https://images.trvl-media.com/lodging/1000000/530000/526400/526330/8d3c72ae.jpg?impolicy=resizecrop&rw=1200&ra=fit")', 
//         'url("https://images.trvl-media.com/lodging/1000000/530000/526400/526330/b0bb7ca2.jpg?impolicy=resizecrop&rw=1200&ra=fit")'
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/18f4e89e.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/7a289402.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/6f5bb0c7.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/2f3c5133.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/ba858211.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
//     //     'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/9d162144.jpg?impolicy=resizecrop&rw=1200&ra=fit")'
//      ];





//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//         }, 5000); // Change image every 5 seconds

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, []);


    

//     return (
//         <div className='bg-orange-300-950 bg-slate-950'>
//             <div className="mx-auto w-full max-w-7xl ">
//                 <aside className="relative overflow-hidden font-serif text-gray-50 rounded-lg sm:mx-16 mx-2 sm:py-16 text-opacity-60">
//                     <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
//                         <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
//                             <h2 className="text-4xl font-bold sm:text-5xl">
//                                Make your trip with <span className='text-indigo-800 font-serif '>Travelo</span>
//                                 <span className="hidden sm:block text-4xl">personalized</span> {/* Corrected typo */}
//                             </h2>

//                             <Link
//                                 className="inline-flex text-white items-center px-6 py-3 font-medium bg-indigo-800 rounded-lg hover:opacity-75"
//                                 to="/create-trip"
//                             >
//                                 <svg
//                                     fill="white"
//                                     width="24"
//                                     height="24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fillRule="evenodd"
//                                     clipRule="evenodd"
//                                 >
//                                     <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
//                                 </svg>

//                                 &nbsp; Get Started
//                             </Link>
//                         </div>
//                     </div>

//                     <div
//                         className="  max-w-[350px] w-full   absolute top-0 left-0 h-full bg-cover bg-center transition-all duration-1000 mt-10"
//                         style={{ backgroundImage: backgroundImages[currentIndex] }}
//                     >
//                         <div></div>
//                         <div className="flex items-end justify-center h-full text-3xl font-serif text-white  text-opacity-60">
//                             Best Hotel with Best choice
//                         </div>
//                     </div>

//                     <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Let's Go</h1>
//                 </aside>

//             </div>
//             <div className='flex flex-col items-center mx-56 gap-9'>
//                 <h1 className='font-extrabold text[50px]  text-orange-600 text-clip mt-16'>
//                     <span className='text-[#f56551] text-4xl '>Discover Your Next Adventure With Travelo: </span>

             



//                    <span className='text-2xl hover:text-sky-500'>personalized Itineraries at your Fingertips</span>  {/* Corrected typo */}
//                 </h1>
             


     
//             </div>


//             <img    className=" "  src='icons/template01.svg'/>


            
//         </div>
//     );
// };

// export default Hero;



import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import { Link } from 'react-router-dom'

const Hero = () => { // Fixed function declaration
    const backgroundImages = [
        'url("https://images.trvl-media.com/lodging/14000000/13460000/13455700/13455660/ee0402ef.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/7a289402.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/6f5bb0c7.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/2f3c5133.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/ba858211.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/9d162144.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/3000000/2230000/2223800/2223789/a2cfa93e.jpg?impolicy=resizecrop&rw=1200&ra=fit")',
        'url("https://images.trvl-media.com/lodging/1000000/530000/526400/526330/8d3c72ae.jpg?impolicy=resizecrop&rw=1200&ra=fit")', 
        'url("https://images.trvl-media.com/lodging/1000000/530000/526400/526330/b0bb7ca2.jpg?impolicy=resizecrop&rw=1200&ra=fit")'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className='bg-orange-300-950 bg-slate-950'>
            <div className="mx-auto w-full max-w-full"> {/* Updated to max-w-full for responsiveness */}
                <aside className="relative overflow-hidden font-serif text-gray-50 rounded-lg sm:mx-2 mx-2 sm:py-16 text-opacity-60">
                    <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                            <h2 className="text-4xl font-bold sm:text-5xl">
                               Make your trip with <span className='text-indigo-800 font-serif '>Travelo</span>
                                <span className="hidden sm:block text-4xl">personalized</span> {/* Corrected typo */}
                            </h2>

                            <Link
                                className="inline-flex text-white items-center px-6 py-3 font-medium bg-indigo-800 rounded-lg hover:opacity-75"
                                to="/create-trip"
                            >
                                <svg
                                    fill="white"
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                                </svg>

                                &nbsp; Get Started
                            </Link>
                        </div>
                    </div>

                    <div
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000"
                        style={{ backgroundImage: backgroundImages[currentIndex] }}
                    >
                        <div className="flex items-end justify-center h-full text-3xl font-serif text-white text-opacity-60">
                            Best Hotel with Best choice
                        </div>
                    </div>

                    <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Let's Go</h1>
                </aside>
            </div>
            <div className='flex flex-col items-center mx-4 gap-9'> {/* Updated mx-4 for better responsiveness on mobile */}
                <h1 className='font-extrabold text[50px] text-orange-600 text-clip mt-16'>
                    <span className='text-[#f56551] text-4xl '>Discover Your Next Adventure With Travelo: </span>
                    <span className='text-2xl hover:text-sky-500'>personalized Itineraries at your Fingertips</span>  {/* Corrected typo */}
                </h1>
            </div>

            <img className=" w-full" src='icons/template01.svg' /> {/* Updated for responsiveness */}
            {/* <img className=" w-full" src='icons/template03.svg' /> */}
            <img className=" w-full" src='icons/template04.svg' />
            <img className=" w-full" src='icons/template05.svg' />

        </div>
    );
};

export default Hero;

