// import { doc, getDoc } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { db } from '../../service/firebaseConfig';
// import { toast } from 'react-toastify';
// import InfoSection from '../components/InfoSection';
// import Hotels from '../components/Hotel';

// function Viewtrip() {
//    const { tripId } = useParams();
//    const [trip, setTrip] = useState(null); // Initialize as null
//    const [loading, setLoading] = useState(true); // Loading state

//    useEffect(() => {
//       if (tripId) {
//          GetTripData();
//       }
//    }, [tripId]);

//    // Function to get trip information through Firebase
//    const GetTripData = async () => {
//       const docRef = doc(db, 'AITrips', tripId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//          console.log('Document:', docSnap.data()); // Log the fetched document
//          setTrip(docSnap.data());
//       } else {
//          console.log('No fetch Documents!');
//          toast.info('No document found!');
//       }
//       setLoading(false); // Set loading to false after fetching
//    };

//    // Parse tripdata and userSelection
//    const tripData = trip ? JSON.parse(trip.tripdata) : null; // Parse tripdata
//    const userSelection = trip ? trip.userSelection : null; // Get userSelection

//    return (
//       <div className='p-10 md:px-20 lg:px-44 xl:px-56 '>
//          {/* Information Section */}
//          {loading ? ( // Show loading state while fetching
//             <p>Loading trip information...</p>
//          ) : (
//             tripData && userSelection ? ( // Check if both tripData and userSelection are available
//                <InfoSection tripData={tripData} userSelection={userSelection} /> // Pass tripData and userSelection
//             ) : (
//                <p>No trip information available.</p> // Handle case where data is not available
//             )
//          )}
//          {/* Recommended Hotel */}
//         { tripData && <Hotels tripData={tripData} />}
//          {/* Daily plan */}
//          {/* Footer */}
//       </div>
//    );
// }

// export default Viewtrip;
// path/to/your/file
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../service/firebaseConfig';
import { toast } from 'react-toastify';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotel';

function Viewtrip() {
   const { tripId } = useParams();
   const [trip, setTrip] = useState(null); // Initialize as null
   const [loading, setLoading] = useState(true); // Loading state

   useEffect(() => {
      if (tripId) {
         GetTripData();
      }
   }, [tripId]);

   // Function to get trip information through Firebase
   const GetTripData = async () => {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
         console.log('Document:', docSnap.data()); // Log the fetched document
         setTrip(docSnap.data());
      } else {
         console.log('No fetch Documents!');
         toast.info('No document found!');
      }
      setLoading(false); // Set loading to false after fetching
   };

   // Parse tripdata and userSelection
   const tripData = trip ? JSON.parse(trip.tripdata) : null; // Parse tripdata
   const userSelection = trip ? trip.userSelection : null; // Get userSelection

   return (
      <div className='p-10 md:px-20 lg:px-44 xl:px-56 mb-10 bg-teal-50'>
      {/* Information Section */}
      {loading ? (
          <p>Loading trip information...</p>
      ) : (
          tripData && userSelection ? (
              <InfoSection tripData={tripData} userSelection={userSelection} />
          ) : (
              <p>No trip information available.</p>
          )
      )}
      <br></br>
      <br></br>
      <br></br>
      {/* Recommended Hotels with margin */}
      {tripData && <div className='mt-5'><Hotels tripdata={tripData} /></div>} {/* Add margin-top */}
      {/* Daily plan */}
      {/* Footer */}
  </div>
   );
}

export default Viewtrip;