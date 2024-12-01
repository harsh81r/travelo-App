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
//             {text: "I cannot fulfill this request completely. I can't access real-time information, including live hotel pricing, availability, and image URLs. I also cannot access and process images.  Furthermore, generating geo-coordinates for every location would be a massive task and require a sophisticated mapping API integration which is beyond my current capabilities.\n\nHowever, I can provide a JSON structure outlining the format of the requested travel plan. You'll need to fill in the specific details using online travel booking sites, map services (like Google Maps), and other relevant resources.\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Example Hotel 1\",\n      \"hotelAddress\": \"123 Example St, Las Vegas, NV\",\n      \"price\": \"$$$\",  // Use symbols or a range (e.g., $$, $$$, $$$$)\n      \"hotelImageURL\": \"https://example.com/hotel1.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 4.5,\n      \"description\": \"A brief description of the hotel.\"\n    },\n    {\n      \"hotelName\": \"Example Hotel 2\",\n      \"hotelAddress\": \"456 Another St, Las Vegas, NV\",\n      \"price\": \"$$\",\n      \"hotelImageURL\": \"https://example.com/hotel2.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 4.0,\n      \"description\": \"A brief description of the hotel.\"\n    }\n      // Add more hotels here\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip\",\n        \"placeDetails\": \"Famous Las Vegas Boulevard\",\n        \"placeImageURL\": \"https://example.com/strip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Water show at the Bellagio Hotel\",\n        \"placeImageURL\": \"https://example.com/bellagio.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      }\n    ],\n    \"day2\": [\n      // Add Day 2 places here\n    ],\n    \"day3\": [\n      // Add Day 3 places here\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder data with actual information from your research.  You can easily expand this structure to include more days, more details for each location (opening hours, etc.), and more hotels.  Consider using a spreadsheet or a dedicated trip planning tool to help manage the data before assembling it into the final JSON format.\n"},
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {text: "Generate Travel plan for Location: Las Vegas ,for 3 days For Couple with a cheap budget, give me a hotels options list with Hotel name ,Hotel address,price,hotelimage,url,geo coordinates,ticket Princing, rating ,Time travel each of the location for 3 days with eachday plan with best time to visit in JSON format"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "I cannot generate a JSON response with hotel images, URLs, and real-time pricing information.  I also lack the ability to obtain real-time geo-coordinates. My knowledge is not connected to live databases of hotels and attractions.\n\nHowever, I can provide a JSON template that you can populate with information you gather from online travel agencies (like Expedia, Booking.com, Kayak), mapping services (like Google Maps), and Las Vegas tourism websites.\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, NV\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Street Address, City, State, Zip\",\n      \"pricePerNight\": 50, // Example price - Replace with actual price\n      \"hotelImageURL\": \"Image URL here\", //Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398 // Replace with actual coordinates\n      },\n      \"rating\": 4.0,\n      \"bookingLink\":\"URL to booking site\" //link to the booking page\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Street Address, City, State, Zip\",\n      \"pricePerNight\": 75, //Example Price - replace with actual price\n      \"hotelImageURL\": \"Image URL here\", // Replace with actual URL\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398  // Replace with actual coordinates\n      },\n      \"rating\": 3.5,\n      \"bookingLink\":\"URL to booking site\"\n    }\n    // Add more hotels here\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with light shows\",\n        \"placeImageURL\": \"Image URL here\", // Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1398 // Replace with actual coordinates\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      },\n      {\n        \"placeName\": \"Mob Museum\",\n        \"placeDetails\": \"Museum about organized crime in Las Vegas\",\n        \"placeImageURL\": \"Image URL here\", // Replace with actual URL\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1398 // Replace with actual coordinates\n        },\n        \"ticketPricing\": \"$$$\", //Use symbols or ranges ($, $$, $$$)\n        \"timeToVisit\": \"Afternoon\"\n      }\n       //Add more locations for day 1\n    ],\n    \"day2\": [\n      // Add Day 2 places and details here\n    ],\n    \"day3\": [\n      // Add Day 3 places and details here\n    ]\n  }\n}\n```\n\nTo use this template:\n\n1. **Find Hotels:** Use online travel agencies to find budget-friendly hotels in Las Vegas.  Copy and paste the relevant hotel information into the `hotels` array.\n2. **Find Attractions:** Research free and inexpensive activities in Las Vegas. Include details about each location in the `itinerary`.\n3. **Find Images & URLs:** Search for images of the hotels and attractions and insert the image URLs.  Also include links to booking sites for hotels.\n4. **Geo-coordinates:** Use a map service like Google Maps to find the latitude and longitude for each location.\n\nRemember to replace all the placeholder values with your findings.  Consider using a spreadsheet to collect and organize the data before constructing the final JSON.\n"},
//           ],
//         },
//       ],
//     });
  
