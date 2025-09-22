import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HotelCard, Hotel } from "@/components/HotelCard";
import { SearchForm, SearchData } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Grid, List } from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hotels, loading, searchHotels } = useHotels();
  const { t, isRTL, getCityName } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('price');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const destination = searchParams.get('destination') || '';

  useEffect(() => {
    searchHotels(destination);
  }, [destination]);

  const handleSearch = (data: SearchData) => {
    const params = new URLSearchParams();
    if (data.destination) params.set('destination', data.destination);
    if (data.checkIn) params.set('checkIn', data.checkIn.toISOString());
    if (data.checkOut) params.set('checkOut', data.checkOut.toISOString());
    params.set('guests', data.guests.toString());
    
    setSearchParams(params);
  };

  const handleHotelClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Convert Supabase hotel format to component format
  const searchResults = hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    rating: hotel.rating || 0,
    reviewCount: 0,
    price: hotel.price_per_night,
    currency: "USD",
    image: hotel.image_url || "/placeholder.svg",
    amenities: hotel.amenities || [],
    distance: ""
  }));

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
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t('search.hotels_in')} {getCityName(destination || 'Syria')}
            </h1>
            <p className="text-muted-foreground">
              {loading ? t('search.searching') : `${filteredResults.length} ${t('search.properties_found')}`}
            </p>
          </div>
          
          <div className={`flex items-center space-x-4 mt-4 lg:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t('search.filters')}
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t('search.sort_by')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">{t('search.price_low_high')}</SelectItem>
                <SelectItem value="price-desc">{t('search.price_high_low')}</SelectItem>
                <SelectItem value="rating">{t('search.rating')}</SelectItem>
                <SelectItem value="distance">{t('search.distance')}</SelectItem>
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
          {/* {showFilters && (
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
          )} */}

          {/* Results Grid */}
          <div className="flex-1">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {loading ? (
                <div className="text-center py-8">Loading hotels...</div>
              ) : (
                filteredResults.map((hotel) => (
                  <HotelCard 
                    key={hotel.id} 
                    hotel={hotel} 
                    onClick={() => handleHotelClick(hotel.id)}
                  />
                ))
              )}
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