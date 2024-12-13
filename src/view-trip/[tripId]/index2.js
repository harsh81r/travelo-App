// In ViewTrip component
import HotelOptions from './HotelOptions';

const ViewTrip = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Inside your return statement
  <HotelOptions 
    destination={tripData.userSelection.country}
    onSelectHotel={(hotel) => setSelectedHotel(hotel)}
  />
}