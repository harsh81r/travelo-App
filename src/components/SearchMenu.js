import React, { useState,useEffect } from "react";
import {  SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { chatSession } from "../service/AIModel";
  import { AIModel } from "../constants/options";
//   import { AI_PROMPT } from "../constants/options";
// Data for the countries and cities with travel places
// import {Button, Dialog,  Heading} from 'react-aria-components';
import { useGoogleLogin } from "@react-oauth/google";
import axios from"axios";

import { doc, setDoc } from "firebase/firestore"; 

// import { doc } from "firebase/firestore";
const countryData = {
  US: [
    { city: "New York", places: ["Statue of Liberty", "Central Park", "Empire State Building"] },
    { city: "Los Angeles", places: ["Hollywood Sign", "Santa Monica Pier", "Venice Beach"] },
  ],
  India: [
    { city: "Delhi", places: ["Red Fort", "Qutub Minar", "India Gate"] },
    { city: "Mumbai", places: ["Gateway of India", "Marine Drive", "Elephanta Caves"] },
  ],
  China: [
    { city: "Beijing", places: ["Great Wall of China", "Forbidden City", "Tiananmen Square"] },
    { city: "Shanghai", places: ["The Bund", "Yu Garden", "Oriental Pearl Tower"] },
  ],
  Russia: [
    { city: "Moscow", places: ["Red Square", "Kremlin", "St. Basil's Cathedral"] },
    { city: "Saint Petersburg", places: ["Hermitage Museum", "Peterhof Palace", "Nevsky Prospekt"] },
  ],
};

const SearchMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const[isLoginDialogOpen,setIsLoginDialogOpen]=useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
 // Update state declarations
 const [inputValue, setInputValue] = useState({
  'no of days': ''
});
const [budgetValue, setBudgetValue] = useState({
  budge: ''
});
const [travelValue, setTravelValue] = useState({
  budget: ''
})

  const handleInputChange = (field, value) => {
    setInputValue(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBudgetChange = (field, value) => {
    setBudgetValue(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTravelChange = (field, value) => {
    setTravelValue(prev => ({
      ...prev,
      [field]: value
    }));
  };



  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity(null); // Reset selected city when changing country
  };

  const handleCityChange = (event) => {

    const cityName = event.target.value;
    setSelectedCity(
      countryData[selectedCountry].find((city) => city.city === cityName)
    );
  };
  const filteredCities = selectedCountry
    ? countryData[selectedCountry].filter((city) =>
        city.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];



    useEffect(() => {
      // Handle country selection and city filtering
      if (selectedCountry) {
        console.log(`Selected country changed to: ${selectedCountry}`);
        
        // Log filtered cities
        const filtered = countryData[selectedCountry].filter((city) =>
          city.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('Filtered cities:', filtered);
      }
    
      // Handle city selection
      if (selectedCity) {
        console.log('Selected city:', selectedCity);
        console.log('Available places:', selectedCity.places);
      }
    
      // Handle input value changes
     if (inputValue['no of days']) {
      console.log('Trip duration changed to:', inputValue['no of days'], 'days');
    }

    if (budgetValue.budge) {
      console.log('Budget selection changed to:', budgetValue.budge);
    }

    if (travelValue.budget) {
      console.log('Travel group changed to:', travelValue.budget);
    }

    
    }, [
      selectedCountry, 
      searchQuery, 
      selectedCity, 
      inputValue, 
      budgetValue, 
      travelValue
  
    ]);
  













    const formData = {
      people: budgetValue,
      country: selectedCountry,
      city: selectedCity?.city,
      budget: budgetValue.budge,
      duration: inputValue['no of days']
  };
  useEffect(()=>{

    console.log(formData)
  })


  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        console.log('Google OAuth response:', codeResponse);
        
        // Get user profile
        await GetUserProfile(codeResponse);
        
        setIsLoginDialogOpen(false);
        toast.success('Successfully signed in!');
        
        // Proceed with trip generation
        handleTripGeneration();
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Something went wrong during sign in');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
      setIsLoginDialogOpen(false);
      setIsLoading(false);
    }
  });



const handleTripGeneration = async () => {
  try {
    // First, validate that we have all the required data
    if (!formData.country || !formData.duration || !formData.people || !formData.budget) {
      toast.error("Missing required trip information");
      return;
    }

    // Create the prompt with proper error checking
    const FINAL_PROMPT = AIModel
      .replace("{Location}", formData.country || '')
      .replace("{totalDays}", formData.duration || '')
      .replace("{traveler}", formData.people?.budget || '') // Fix the people property
      .replace("{budget}", formData.budget || '')
      .replace("{totalDays}", formData.duration || '');

    console.log('Generated Prompt:', FINAL_PROMPT);

    // Check if chatSession is properly initialized
    if (!chatSession) {
      throw new Error("AI chat session not initialized");
    }

    // Add loading state
    toast.info("Generating your trip plan...");

    // Make the API call with proper error handling
    const result = await chatSession.sendMessage(FINAL_PROMPT, {
      maxRetries: 3, // Add retries for reliability
      timeout: 30000 // 30 second timeout
    });

    if (!result) {
      throw new Error("No response from AI service");
    }

    console.log('AI Response:', result);
    toast.success("Trip plan generated successfully!");

    // Handle the result (you might want to display it somewhere)
    // setTripPlan(result); // Add state for storing the trip plan

  } catch (error) {
    console.error("Error generating trip:", error);
    
    // More specific error messages based on the error type
    if (error.message.includes('Failed to fetch')) {
      toast.error("Network error. Please check your internet connection.");
    } else if (error.message.includes('API key')) {
      toast.error("API authentication error. Please try again later.");
    } else {
      toast.error("Failed to generate trip plan. Please try again.");
    }
  }
};



const handleGenerateTrip = () => {
  // Validate form data
  if (!formData.duration || !formData.city || !formData.budget || !formData.people) {
    toast("Please fill all details!");
    return;
  }

  if (parseInt(formData.duration) > 5) {
    toast("Trip duration cannot exceed 5 days!");
    return;
  }

  const user = localStorage.getItem('user');
  if (!user) {
    setIsLoginDialogOpen(true);
    return;
  }

  // If user is logged in, proceed with trip generation
  handleTripGeneration();

};

// Database collection adding 

// const SaveAiTrip= async(TripData)=>{

 

//   // Add a new document in collection "cities"
//   await setDoc(doc(db, "AITrips", "LA"), {

//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"

//   });
// }













// const handleGenerateTrip = async () => {
  // Validate form data

// const user = localStorage.getItem('user')

// if(!user){
//   setOpenDailog(true)
//   return;
// }


// const user = localStorage.getItem('user');
// if (!user) {
//   setIsLoginDialogOpen(true);
//   return;
// }



//   if (!formData.duration || !formData.city || !formData.budget || !formData.people) {
//     toast("Please fill all details!");
//     return;
//   }

//   if (parseInt(formData.duration) > 5) {
//     toast("Trip duration cannot exceed 5 days!");
//     return;
//   }

//   try {
//     const FINAL_PROMPT = AIModel
//       .replace("{Location}", formData.country)
//       .replace("{totalDays}", formData.duration)
//       .replace("{traveler}", formData.people)
//       .replace("{budget}", formData.budget)
//       .replace("{totalDays}", formData.duration);

//     console.log(FINAL_PROMPT); 

//     // Fix: Use chatSession.sendMessage directly

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     console.log(result);
//     toast.success("Trip plan generated successfully!");

//   } 
//   catch (error) {
//     console.error("Error generating trip:", error);
//     toast.error("Failed to generate trip plan. Please try again.");
//   }





// const GetUserProfile =(tokenInfo)=>{
//   axios.get(`https://www.googleapis.com/oath2/v1/userinfo?acess_token= ${tokenInfo?.access_token}`,{
    
    
//     headers:{
//       Authorization:`Bearer ${tokenInfo?.access_token}`,
//       Accept:"application/json"
//     }
    
//     }
//   ).then((resp)=>{
//       console.log(resp)
//       localStorage.setItem('user',JSON.stringify(resp.data))
      
//     })

const GetUserProfile = async (tokenInfo) => {
  try {
    if (!tokenInfo?.access_token) {
      throw new Error('No access token available');
    }

    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo', // Fixed URL
      {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json'
        }
      }
    );

    if (response.data) {
      console.log('User Profile:', response.data);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        ...response.data,
        access_token: tokenInfo.access_token
      }));

      toast.success('Profile loaded successfully');
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    toast.error('Failed to load user profile');
    throw error;
  }
};






// Update your login success handler to use this function


// };
// useEffect(() => {
//   console.log('Dialog open state:', isLoginDialogOpen);
// }, [isLoginDialogOpen]);



  return (
    <div className="max-w-4xl mx-auto p-6 bg-cyan-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Travel Destinations</h1>
      
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Select Country
        </label>
        <select
          id="country"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Choose a Country</option>
          {Object.keys(countryData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Search City
          </label>
          <input
            id="city"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {selectedCountry && filteredCities.length > 0 && (
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Select City
          </label>
          <select
            id="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleCityChange}
          >
            <option value="">Choose a City</option>
            {filteredCities.map((city) => (
              <option key={city.city} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Top Places in {selectedCity.city}</h2>
          <ul className="list-disc ml-6 mt-2">
            {selectedCity.places.map((place, index) => (
              <li key={index} className="text-gray-800">{place}</li>
            ))}
          </ul>
        </div>
      )}


<br></br>

<div className='mb-4'>
  <h2>How many days are you planning trip</h2>
    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input type="text" id="small-input"

  
    onChange={(e)=>handleInputChange("no of days",e.target.value)}
    
    
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ex.3"/>
</div>
<br></br>


<div>
<h1 className="text-2xl my-3 font-medium ">What is your budget for this trip?</h1>
<h1>The budget exclusively allocated for activities and driling purpose.</h1>
<div className="grid grid-cols-3 gap-5 mt-7"> {SelectBudgetOptions.map((item,index)=>(

<div 
key={index}
onClick={() => handleBudgetChange('budge', item.title)}
className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer transition-all duration-200
  ${budgetValue?.budge=== item.title &&'shadow-lg border-black' }`}
>


  
  <h2><img src={item.icon} alt="icon" className="w-12 h-12"/></h2>
  <h2 className="font-bold text-lg">{item.title}</h2>
  <h2 className="text-sm text-gray-500 cursor-pointer">{item.desc}</h2>
  </div>

))}
</div>
</div>

<div>
<h1 className="my-5 text-2xl font-medium">Who do you plan travelling with on your next adventure?</h1>
<div className="grid grid-cols-3 gap-5 mt-5"> {SelectTravelesList.map((item,index)=>(
<div key={index}

 onClick={()=>handleTravelChange('budget',item.people)}

className={`${travelValue?.budget=== item.people &&'shadow-lg border-black' } p-4 border rounded-lg hover:shadow-lg cursor-pointer`}>
  <h2><img src={item.icon} alt="icon" className="w-12 h-12"/></h2>
  <h2 className="font-bold text-lg">{item.title}</h2>
  <h2 className="text-sm text-gray-500 cursor-pointer">{item.desc}</h2>
  <h2>{item.people}</h2>

  </div>
))}
</div>
</div>
<div className="mt-6">
<a href="#_" class="relative inline-block text-lg group">
    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span class="relative"  onClick = {handleGenerateTrip}>Generate Trip</span>
    </span>
    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</a>


<ToastContainer />
</div>




<div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
    {/* ... other content ... */}

    {/* Login Dialog */}
    {isLoginDialogOpen && (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {/* Dialog Header */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Sign in Required
                </h3>
                <button
                  onClick={() => setIsLoginDialogOpen(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Please sign in with Google to generate your trip plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

<button
  type="button"
  onClick={() => login()}
  disabled={isLoading}
  className="inline-flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:bg-blue-300"
>
  {isLoading ? (
    <span className="flex items-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <svg> 
        <path></path>
      </svg>
      
      Signing in...
    </span>
  ) : (
    <span className="flex items-center">
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google" 
        className="w-4 h-4 mr-2"
      />
      Sign in with Google
    </span>
  )}
</button>

              <button
                type="button"
                onClick={() => setIsLoginDialogOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <ToastContainer />
  </div>
    </div>

  );
}

export default SearchMenu;
