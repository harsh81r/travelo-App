


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
import { db } from "../service/firebaseConfig";

import { doc,setDoc } from "firebase/firestore";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { countryData } from "./custom/CountryData";
import countryData from "./custom/CountryData";
import { useNavigate } from "react-router-dom";


const SearchMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const[isLoginDialogOpen,setIsLoginDialogOpen]=useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const navigate= useNavigate();
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

const handleInputChange=(field,value)=>{

  setInputValue(prev => ({
    ...prev,
    [field]: value
  }));
}
  
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
      people: travelValue.budget,
      country: selectedCountry,
      city: selectedCity?.city,
      budget: budgetValue.budge,
      duration: inputValue['no of days'],
      places: selectedPlaces  // Add selected places to form data
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



  const handlePlaceSelection = (place) => {
    if (selectedPlaces.length < 5 && !selectedPlaces.includes(place)) {
      setSelectedPlaces(prev => [...prev, place]);
    } else if (selectedPlaces.includes(place)) {
      setSelectedPlaces(prev => prev.filter(p => p !== place));
    }
  };


const handleGenerateTrip = () => {
  // Existing validations
  if (!formData.duration || !formData.city || !formData.budget || !formData.people) {
    toast("Please fill all details!");
    return;
  }

  if (parseInt(formData.duration) > 5) {
    toast("Trip duration cannot exceed 5 days!");
    return;
  }

  // New place selection validation
  if (selectedPlaces.length === 0) {
    toast("Please select at least one place to visit!");
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

const handleTripGeneration = async () => {
  try {
    // First, validate that we have all the required data
    if (!formData.country || !formData.duration || !formData.people || !formData.budget) {
      toast.error("Missing required trip information");
      return;
    }

    // Create the prompt with proper error checking
    const FINAL_PROMPT = AIModel
      .replace("{Location}", formData.city || '')
      .replace("{totalDays}", formData.duration || '')
      .replace("{traveler}", formData.people?.budget || '') 
      .replace("{budget}", formData.budge || '')
      .replace("{totalDays}", formData.duration || '');

    // Add more detailed logging
    console.log('Generated Prompt:', FINAL_PROMPT);
    console.log('Chat Session:', chatSession);

    // Check if chatSession is properly initialized
    if (!chatSession) {
      throw new Error("AI chat session not initialized");
    }

    // Add loading state
    toast.info("Generating your trip plan...");

    // Make the API call with proper error handling
    const result = await chatSession.sendMessage(FINAL_PROMPT, {
      maxRetries: 3, 
      timeout: 30000 
    });

    if (!result) {
      throw new Error("No response from AI service");
    }

    console.log('AI Response:', result);
    
    // Ensure SaveAiTrip receives the result
    await SaveAiTrip(result.response?.text() || 'No trip details');

    
    toast.success("Trip plan generated successfully!");

  } catch (error) {
    console.error("Error generating trip:", error);
    
    // More specific error messages
    if (error.message.includes('aborted')) {
      toast.error("AI service connection failed. Please check your internet connection and try again.");
    } else if (error.message.includes('Failed to fetch')) {
      toast.error("Network error. Please check your internet connection.");
    } else if (error.message.includes('API key')) {
      toast.error("API authentication error. Please check your API configuration.");
    } else {
      toast.error(`Trip generation failed: ${error.message}`);
    }
  }
};


const SaveAiTrip = async (TripData) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Validate user and trip data
    if (!user || !user.email) {
      toast.error("User not authenticated");
      return;
    }

    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: {
        ...formData,
        places: selectedPlaces  // Include selected places
      },
      tripdata: TripData || 'No trip details available',
      userEmail: user.email,
      id: docId
    });
    navigate('/view-trip/'+docId)

    toast.success("Trip saved successfully");
  } catch (error) {
    console.error("Error saving trip:", error);
    toast.error("Failed to save trip details");
  }
};


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

      {/* {selectedCountry && (
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

      )} */}



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
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Select Places to Visit in {selectedCity.city} 
        {selectedPlaces.length > 0 && ` (${selectedPlaces.length}/5)`}
      </h2>
      
      {selectedPlaces.length < 5 && (
        <div className="relative mb-4">
          <select
            value=""
            onChange={(e) => {
              const place = e.target.value;
              if (place) {
                handlePlaceSelection(place);
              }
            }}
            className="w-full border rounded px-3 py-2 appearance-none"
          >
            <option value="">Choose a Place</option>
            {selectedCity.places
              .filter(place => !selectedPlaces.includes(place))
              .map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))
            }
          </select>
        </div>
      )}


      {/* Selected Places Display */}
      {selectedPlaces.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedPlaces.map((place, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {place}
              <button 
                onClick={() => handlePlaceSelection(place)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
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











































