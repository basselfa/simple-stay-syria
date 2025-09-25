import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Wifi, Car, Coffee, Phone, Mail, Calendar as CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import damascusHotel from "@/assets/damascus-hotel.jpg";
import { supabase } from "@/integrations/supabase/client";

export default function HotelDetails() {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(true);
  const [hotelRow, setHotelRow] = useState<{
    id: string;
    name: string;
    city: string;
    address: string;
    description: string | null;
  } | null>(null);
  const [rooms, setRooms] = useState<Array<{
    id: string;
    type: string;
    price: number;
  }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('id, name, city, address, description')
          .eq('id', id)
          .single();

        if (hotelError) throw hotelError;
        setHotelRow(hotelData);

        const { data: roomData, error: roomsError } = await supabase
          .from('rooms')
          .select('id, type, price')
          .eq('hotel_id', id)
          .order('price', { ascending: true });
        if (roomsError) throw roomsError;
        setRooms((roomData || []).map(r => ({ id: r.id, type: r.type, price: Number(r.price) })));
      } catch (e) {
        console.error('Failed to load hotel details', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const minPrice = useMemo(() => {
    if (!rooms.length) return undefined;
    return rooms[0].price;
  }, [rooms]);

  const amenityIcons: Record<string, JSX.Element> = {
    "Free WiFi": <Wifi className="h-4 w-4" />,
    "Parking": <Car className="h-4 w-4" />,
    "Breakfast": <Coffee className="h-4 w-4" />,
  };

  const handleBooking = (roomType: any) => {
    console.log("Booking room:", roomType, { checkIn, checkOut, guests });
    // Handle booking logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header / Loading / Empty */}
        {loading ? (
          <div className="text-center py-16">Loading hotel details...</div>
        ) : !hotelRow ? (
          <div className="text-center py-16">Hotel not found.</div>
        ) : (
          <>
            {/* Hotel Images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-2">
                <img 
                  src={damascusHotel}
                  alt={hotelRow.name}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                {[damascusHotel, damascusHotel].map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${hotelRow.name} ${index + 2}`}
                    className="w-full h-[190px] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Hotel Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{hotelRow.name}</h1>
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">0</span>
                      <span className="text-muted-foreground">(0 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotelRow.city}, {hotelRow.address}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">About this hotel</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {hotelRow.description || 'No description available.'}
                  </p>
                </div>

                {/* Amenities (placeholder since DB has none yet) */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Free WiFi", "Parking", "Breakfast"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        {amenityIcons[amenity] || <div className="h-4 w-4" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policies (static placeholders) */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Policies</h2>
                  <div className="space-y-2 text-sm">
                    <div><strong>Check-in:</strong> 3:00 PM</div>
                    <div><strong>Check-out:</strong> 12:00 PM</div>
                    <div><strong>Cancellation:</strong> Free cancellation up to 24 hours before check-in</div>
                  </div>
                </div>

                {/* Contact (static placeholders) */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Contact</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">N/A</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">N/A</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {minPrice !== undefined ? `$${minPrice} USD` : 'No rooms available'}
                      </div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>

                    <div className="space-y-4 mb-6">
                  {/* Check-in */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Guests</label>
                    <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} guest{num !== 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                    </div>

                    {/* Room Types */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Available Rooms</h3>
                      {rooms.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No rooms available.</div>
                      ) : (
                        rooms.map((room) => (
                          <div key={room.id} className="border border-border/20 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{room.type}</h4>
                                <p className="text-xs text-muted-foreground">Comfortable room</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">${room.price}</div>
                                <div className="text-xs text-muted-foreground">per night</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {["WiFi", "AC", "TV"].map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full bg-primary hover:bg-primary-hover"
                              onClick={() => handleBooking(room)}
                            >
                              Book Now
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}