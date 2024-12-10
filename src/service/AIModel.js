



import {GoogleGenerativeAI} from '@google/generative-ai';
  const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  



   export const chatSession = model.startChat({

      generationConfig,
      history: [

        {

          role: "user",
          parts: [
            {text: "Generate Travel travel plan for Location : Las Vegas , for 3 days for Couple with a cheap budget , Give me days. Provide a Hotels of hotel options list with Hotel name  , Hotel hotel address,  price, Hotel Image url , Geo geo coordinates , , rating, descriptions and descriptions. Additionally, suggest  an itinerary with placename ,  place details,  place Image Url geo coordinates , Geocoordinates,, ticket Princing , rating  , Time and travel each of the location . for 3 days with eachday plan with best time to visit in JSON format ."},
          ],

        },

        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display images or real-time pricing for hotels.  Hotel prices fluctuate constantly.  Therefore, the JSON below will omit image URLs and pricing. You'll need to use online travel agencies (like Expedia, Booking.com, Kayak) to find current prices and view hotel images based on the suggestions provided.  Geocoordinates are approximate and should be verified using a mapping service before your trip.\n\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"Check online travel agencies\",\n      \"imageUrl\": \"N/A - Check online\",\n      \"geoCoordinates\": {\"latitude\": 36.1218, \"longitude\": -115.1715},\n      \"rating\": \"3.5 stars (example)\",\n      \"description\": \"A budget-friendly option with a circus theme, offering various entertainment options on-site.\"\n    },\n    {\n      \"name\": \"Excalibur Hotel & Casino\",\n      \"address\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"Check online travel agencies\",\n      \"imageUrl\": \"N/A - Check online\",\n      \"geoCoordinates\": {\"latitude\": 36.0924, \"longitude\": -115.1766},\n      \"rating\": \"3.0 stars (example)\",\n      \"description\": \"Medieval-themed hotel with affordable rooms, known for its location on the Strip.\"\n    },\n    {\n      \"name\": \"Luxor Hotel & Casino\",\n      \"address\": \"3900 S Las Vegas Blvd, Las Vegas, NV 89119\",\n      \"price\": \"Check online travel agencies\",\n      \"imageUrl\": \"N/A - Check online\",\n      \"geoCoordinates\": {\"latitude\": 36.0904, \"longitude\": -115.1742},\n      \"rating\": \"3.5 stars (example)\",\n      \"description\": \"Pyramid-shaped hotel with affordable options, offering a unique experience.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Strip Exploration & Free Activities\",\n      \"plan\": [\n        {\n          \"placeName\": \"The Bellagio Fountains\",\n          \"placeDetails\": \"Free water show with music and lights.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.1110, \"longitude\": -115.1748},\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.5 stars (example)\",\n          \"time\": \"Evening\"\n        },\n        {\n          \"placeName\": \"Walk the Las Vegas Strip\",\n          \"placeDetails\": \"Explore the casinos, hotels, and street performers.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.1106, \"longitude\": -115.1725},\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"N/A\",\n          \"time\": \"Afternoon to Evening\"\n        },\n         {\n          \"placeName\": \"Fremont Street Experience (Downtown)\",\n          \"placeDetails\": \"Free light show and live music in the evening.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.1677, \"longitude\": -115.1414},\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"4.0 stars (example)\",\n          \"time\": \"Evening\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Affordable Entertainment & Downtown\",\n      \"plan\": [\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"Outdoor museum featuring vintage Vegas signs (check ticket prices online)\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.1726, \"longitude\": -115.1320},\n          \"ticketPricing\": \"Check online\",\n          \"rating\": \"4.0 stars (example)\",\n          \"time\": \"Morning\"\n        },\n         {\n          \"placeName\": \"Container Park\",\n          \"placeDetails\": \"Unique shopping, dining, and entertainment area with a giant praying mantis sculpture.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.1641, \"longitude\": -115.1389},\n          \"ticketPricing\": \"Free (unless purchasing food/souvenirs)\",\n          \"rating\": \"4 stars (example)\",\n          \"time\": \"Afternoon\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Relaxation & Departure\",\n      \"plan\": [\n        {\n          \"placeName\": \"Pool Time at your hotel (if available)\",\n          \"placeDetails\": \"Relax by the pool and enjoy the hotel amenities.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": \"Check your hotel's location\",\n          \"ticketPricing\": \"Usually included with hotel stay\",\n          \"rating\": \"N/A\",\n          \"time\": \"Morning/Afternoon\"\n        },\n         {\n          \"placeName\": \"Outlet Shopping (optional)\",\n          \"placeDetails\": \"North Las Vegas Premium Outlets offers discounts on various brands.\",\n          \"imageUrl\": \"N/A - Check online\",\n          \"geoCoordinates\": {\"latitude\": 36.2169, \"longitude\": -115.2164},\n          \"ticketPricing\": \"Free entry, but shopping costs will apply\",\n          \"rating\": \"4 stars (example)\",\n          \"time\": \"Afternoon\"\n        }\n      ]\n    }\n  }\n}\n```\n\nRemember to check for updated prices and availability on travel websites.  Consider using public transportation (buses) or ride-sharing services to minimize transportation costs.  Free activities are a great way to save money in Las Vegas.  Have a fantastic trip!\n"},
          ],

        },
        
      ],

    });
  
 