// src/components/HotelOptions.jsx
import React, { useState, useEffect } from 'react';

// Comprehensive Hotel Data Structure
const hotelDatabase = {
  'New York': [
    { 
      id: 'ny1',
      name: 'Luxury Manhattan Hotel',
      image: 'https://images.unsplash.com/photo-1596524430615-2252b68a83f0',
      rating: 4.5,
      price: 250,
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
      location: 'Midtown Manhattan',
      roomTypes: ['Standard', 'Deluxe', 'Suite']
    },
    { 
      id: 'ny2',
      name: 'Central Park View Hotel',
      image: 'https://images.unsplash.com/photo-1582719478250-c0cec7d50b34',
      rating: 4.7,
      price: 300,
      amenities: ['Spa', 'Rooftop Bar', 'Fitness Center', 'Concierge'],
      location: 'Upper West Side',
      roomTypes: ['City View', 'Park View', 'Executive Suite']
    }
  ],
  'Paris': [
    { 
      id: 'paris1',
      name: 'Eiffel Tower Boutique Hotel',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      rating: 4.8,
      price: 220,
      amenities: ['Breakfast', 'Terrace', 'Room Service', 'Free WiFi'],
      location: 'Near Eiffel Tower',
      roomTypes: ['Classic', 'Deluxe', 'Romantic']
    },
    { 
      id: 'paris2',
      name: 'Seine River Luxury Stay',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099c7c',
      rating: 4.6,
      price: 190,
      amenities: ['River View', 'Bar', 'Wellness Center', 'Parking'],
      location: 'Seine Riverfront',
      roomTypes: ['Standard', 'Superior', 'Panoramic']
    }
  ]
};

const HotelOptions = ({ destination, onSelectHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    amenities: []
  });
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Fetch hotels based on destination
  useEffect(() => {
    const destinationHotels = hotelDatabase[destination] || [];
    setHotels(destinationHotels);
  }, [destination]);

  // Filter hotels based on criteria
  const filteredHotels = hotels.filter(hotel => 
    hotel.price >= filters.priceRange[0] &&
    hotel.price <= filters.priceRange[1] &&
    hotel.rating >= filters.rating
  );

  // Render hotel filter options
  const renderFilters = () => (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Filter Hotels</h3>
      
      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <input 
          type="range" 
          min="0" 
          max="500" 
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prev => ({
            ...prev, 
            priceRange: [0, Number(e.target.value)]
          }))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Minimum Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => setFilters(prev => ({ ...prev, rating }))}
              className={`px-3 py-1 rounded ${
                filters.rating === rating 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {rating}+ ★
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Render hotel card
  const renderHotelCard = (hotel) => (
    <div 
      key={hotel.id}
      className={`
        bg-white border rounded-lg overflow-hidden shadow-md 
        hover:shadow-xl transition-all duration-300 
        ${selectedHotel?.id === hotel.id ? 'border-blue-500 border-2' : ''}
      `}
      onClick={() => {
        setSelectedHotel(hotel);
        onSelectHotel(hotel);
      }}
    >
      <div className="relative">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full">
          {hotel.rating} ★
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-semibold">${hotel.price}/night</span>
          <span className="text-gray-500">{hotel.location}</span>
        </div>
        
        {/* Amenities */}
        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map(amenity => (
            <span 
              key={amenity} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Filters Column */}
        <div>
          {renderFilters()}
        </div>
        
        {/* Hotels Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Hotels in {destination}
          </h2>
          
          {filteredHotels.length === 0 ? (
            <div className="text-center text-gray-500">
              No hotels match your current filters.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredHotels.map(renderHotelCard)}
            </div>
          )}
        </div>
      </div>

      {/* Selected Hotel Details (Optional) */}
      {selectedHotel && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Selected Hotel Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Room Types</h4>
              <ul className="list-disc pl-5">
                {selectedHotel.roomTypes.map(type => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Full Amenities</h4>
              <ul className="list-disc pl-5">
                {selectedHotel.amenities.map(amenity => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelOptions;