// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
// // import {GoogleGenerativeAI} from '@google/generative-ai';

//   const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
//   const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const fileManager = new GoogleAIFileManager(apiKey);
  
//   /**
//    * Uploads the given file to Gemini.
//    *
//    * See https://ai.google.dev/gemini-api/docs/prompting_with_media
//    */
//   async function uploadToGemini(path, mimeType) {
//     const uploadResult = await fileManager.uploadFile(path, {
//       mimeType,
//       displayName: path,
//     });
//     const file = uploadResult.file;
//     console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
//     return file;
//   }
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "application/json",
//   };
  
//     // TODO Make these files available on the local file system
//     // You may need to update the file paths
//     const files = [
//       await uploadToGemini("Recorded Audio December 01, 2024 - 5:17PM.ogg", "audio/ogg"),
//     ];
  
//    export const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {
//               fileData: {
//                 mimeType: files[0].mimeType,
//                 fileUri: files[0].uri,
//               },
//             },
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//               {text: "I cannot fulfill this request completely. I can't access real-time information, including live hotel pricing, availability, and image URLs. I also cannot access and process images.  Furthermore, generating geo-coordinates for every location would be a massive task and require a sophisticated mapping API integration which is beyond my current capabilities.\n\nHowever, I can provide a JSON structure outlining the format of the requested travel plan. You'll need to fill in the specific details using online travel booking sites, map services (like Google Maps), and other relevant resources.\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Example Hotel 1\",\n      \"hotelAddress\": \"123 Example St, Las Vegas, NV\",\n      \"price\": \"$$$\",  // Use symbols or a range (e.g., $$, $$$, $$$$)\n      \"hotelImageURL\": \"https://example.com/hotel1.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 4.5,\n      \"description\": \"A brief description of the hotel.\"\n    },\n    {\n      \"hotelName\": \"Example Hotel 2\",\n      \"hotelAddress\": \"456 Another St, Las Vegas, NV\",\n      \"price\": \"$$\",\n      \"hotelImageURL\": \"https://example.com/hotel2.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 4.0,\n      \"description\": \"A brief description of the hotel.\"\n    }\n      // Add more hotels here\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip\",\n        \"placeDetails\": \"Famous Las Vegas Boulevard\",\n        \"placeImageURL\": \"https://example.com/strip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Water show at the Bellagio Hotel\",\n        \"placeImageURL\": \"https://example.com/bellagio.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      }\n    ],\n    \"day2\": [\n      // Add Day 2 places here\n    ],\n    \"day3\": [\n      // Add Day 3 places here\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder data with actual information from your research.  You can easily expand this structure to include more days, more details for each location (opening hours, etc.), and more hotels.  Consider using a spreadsheet or a dedicated trip planning tool to help manage the data before assembling it into the final JSON format.\n"},
//             ],
//           },
//           {
//             role: "user",
//             parts: [
//               {text: "Generate Travel plan for Location: Las Vegas ,for 3 days For Couple with a cheap budget, give me a hotels options list with Hotel name ,Hotel address,price,hotelimage,url,geo coordinates,ticket Princing, rating ,Time travel each of the location for 3 days with eachday plan with best time to visit in JSON format"},
//             ],
//           },
//           {
//             role: "model",
//             parts: [
//               {text: "I cannot generate a JSON response with hotel images, URLs, and real-time pricing information.  I also lack the ability to obtain real-time geo-coordinates. My knowledge is not connected to live databases of hotels and attractions.\n\nHowever, I can provide a JSON template that you can populate with information you gather from online travel agencies (like Expedia, Booking.com, Kayak), mapping services (like Google Maps), and Las Vegas tourism websites.\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, NV\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Street Address, City, State, Zip\",\n      \"pricePerNight\": 50, // Example price - Replace with actual price\n      \"hotelImageURL\": \"Image URL here\", //Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398 // Replace with actual coordinates\n      },\n      \"rating\": 4.0,\n      \"bookingLink\":\"URL to booking site\" //link to the booking page\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Street Address, City, State, Zip\",\n      \"pricePerNight\": 75, //Example Price - replace with actual price\n      \"hotelImageURL\": \"Image URL here\", // Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398  // Replace with actual coordinates\n      },\n      \"rating\": 3.5,\n      \"bookingLink\":\"URL to booking site\"\n    }\n    // Add more hotels here\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with light shows\",\n        \"placeImageURL\": \"Image URL here\", // Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1398 // Replace with actual coordinates\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      },\n      {\n        \"placeName\": \"Mob Museum\",\n        \"placeDetails\": \"Museum about organized crime in Las Vegas\",\n        \"placeImageURL\": \"Image URL here\", // Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1398 // Replace with actual coordinates\n        },\n        \"ticketPricing\": \"$$$\", //Use symbols or ranges ($, $$, $$$)\n        \"timeToVisit\": \"Afternoon\"\n      }\n       //Add more locations for day 1\n    ],\n    \"day2\": [\n      // Add Day 2 places and details here\n    ],\n    \"day3\": [\n      // Add Day 3 places and details here\n    ]\n  }\n}\n```\n\nTo use this template:\n\n1. **Find Hotels:** Use online travel agencies to find budget-friendly hotels in Las Vegas.  Copy and paste the relevant hotel information into the `hotels` array.\n2. **Find Attractions:** Research free and inexpensive activities in Las Vegas. Include details about each location in the `itinerary`.\n3. **Find Images & URLs:** Search for images of the hotels and attractions and insert the image URLs.  Also include links to booking sites for hotels.\n4. **Geo-coordinates:** Use a map service like Google Maps to find the latitude and longitude for each location.\n\nRemember to replace all the placeholder values with your findings.  Consider using a spreadsheet to collect and organize the data before constructing the final JSON.\n"},
//             ],
//           },
//         ],
//       });
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");







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
  
 