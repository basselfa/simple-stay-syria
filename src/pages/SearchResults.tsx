import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { HotelCard, Hotel } from "@/components/HotelCard";
import { SearchForm, SearchData } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Grid, List } from "lucide-react";
import damascusHotel from "@/assets/damascus-hotel.jpg";
import aleppoHotel from "@/assets/aleppo-hotel.jpg";
import lattakiaResort from "@/assets/lattakia-resort.jpg";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const destination = searchParams.get('destination') || '';
  const type = searchParams.get('type') || 'hotels';

  // Sample search results
  const searchResults: Hotel[] = [
    {
      id: "1",
      name: "Damascus Palace Hotel",
      location: "Old City, Damascus",
      rating: 4.5,
      reviewCount: 234,
      price: 85,
      currency: "USD",
      image: damascusHotel,
      amenities: ["wifi", "parking", "breakfast"],
      distance: "0.5 km from center"
    },
    {
      id: "2", 
      name: "Aleppo Heritage Suites",
      location: "Historic Quarter, Aleppo",
      rating: 4.3,
      reviewCount: 189,
      price: 65,
      currency: "USD",
      image: aleppoHotel,
      amenities: ["wifi", "breakfast"],
      distance: "0.8 km from center"
    },
    {
      id: "3",
      name: "Lattakia Seaside Resort",
      location: "Mediterranean Coast, Lattakia",
      rating: 4.7,
      reviewCount: 312,
      price: 120,
      currency: "USD", 
      image: lattakiaResort,
      amenities: ["wifi", "parking", "breakfast"],
      distance: "Beachfront"
    },
    {
      id: "4",
      name: "Central Damascus Hotel",
      location: "New Damascus",
      rating: 4.2,
      reviewCount: 156,
      price: 75,
      currency: "USD",
      image: damascusHotel,
      amenities: ["wifi", "parking"],
      distance: "1.2 km from center"
    },
    {
      id: "5",
      name: "Aleppo Citadel View",
      location: "Near Citadel, Aleppo",
      rating: 4.6,
      reviewCount: 203,
      price: 95,
      currency: "USD",
      image: aleppoHotel,
      amenities: ["wifi", "breakfast"],
      distance: "0.3 km from citadel"
    }
  ];

  const handleSearch = (data: SearchData) => {
    console.log("New search:", data);
    // Update search params and results
  };

  const handleHotelClick = (hotel: Hotel) => {
    console.log("Hotel clicked:", hotel);
    // Navigate to hotel details
  };

  const filteredResults = searchResults.filter(hotel => 
    hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Header */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {type === 'hotels' ? 'Hotels' : 'Rides'} in {destination || 'Syria'}
            </h1>
            <p className="text-muted-foreground">
              {filteredResults.length} properties found
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="space-y-3">
                  {['Free WiFi', 'Parking', 'Breakfast', 'Pool', 'Gym'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <label
                        htmlFor={amenity}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border/20">
                <h3 className="font-semibold mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm font-medium leading-none"
                      >
                        {rating}+ stars
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredResults.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onClick={handleHotelClick}
                />
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}