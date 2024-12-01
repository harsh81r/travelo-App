import React, { useState,useEffect } from "react";
import { AI_PROMPT, SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { chatSession } from "../service/AIModel";
  // import { AI_PROMPT } from "../constants/options";
// Data for the countries and cities with travel places
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

  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
// const [canGenerateTrip, setCanGenerateTrip] = useState(false);


  // const [inputValue, setInputValue] = useState("");
  // const [budgetValue, setBudgetValue] = useState("");
  // const [travelValue, setTravelValue] = useState("");

  // // Add these three handlers
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // const handleBudgetChange = (e) => {
  //   setBudgetValue(e.target.value);
  // };

  // const handleTravelChange = (e) => {
  //   setTravelValue(e.target.value);
  // };

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



const handleGenerateTrip = () => {
  if(formData?.duration>5 && !formData?.duration && !formData?.city || !formData?.budget){
  toast("please fill all details!");
  return;
  }


  const FINAL_PROMPT = AI_PROMPT
  .replace("{Location}",formData?.country)
  .replace("{totalDays}",formData?.duration)
  .replace("{traveler}",formData?.people)
  .replace("{budget}",formData?.budget)
  .replace("{totalDays}",formData?.duration)
 

  console.log(FINAL_PROMPT);
  const result = chatSession.getHistory.sendMessage(FINAL_PROMPT);
console.log(result)
};



  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
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
        <span class="relative"  onClick={handleGenerateTrip}>Generate Trip</span>
    </span>
    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</a>
<ToastContainer />
</div>


    </div>

  );
};

export default SearchMenu;
