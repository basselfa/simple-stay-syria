import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarArabic } from "@/components/ui/calendar-arabic";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { MapPin, Calendar as CalendarIcon, Users, Search, Check, ChevronsUpDown } from "lucide-react";
import { format, startOfDay, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  onSearch: (data: SearchData) => void;
}

export interface SearchData {
  destination: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
}

// Available cities
const cities = [
  'Damascus', 'Aleppo', 'Lattakia', 'Homs', 'Hama', 'Tartus', 
  'Raqqa', 'Idlib', 'Daraa', 'Sweida', 'Quneitra', 'Hasaka', 'Kobani'
];

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { t, isRTL, getCityName, formatDate } = useLanguage();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [open, setOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, checkIn, checkOut, guests });
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    setCheckInOpen(false);
    if (date && checkOut && checkOut < date) {
      setCheckOut(undefined);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
    setCheckOutOpen(false);
  };

  return (
    <div className="bg-card rounded-2xl p-6 search-shadow border border-border/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination with Dropdown */}
          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`w-full justify-between ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex items-center">
                    <MapPin className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 text-muted-foreground`} />
                    {destination ? getCityName(destination) : t('search.destination')}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {cities.map((city) => (
                        <CommandItem
                          key={city}
                          value={city}
                          onSelect={(currentValue) => {
                            setDestination(currentValue === destination ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              destination === city ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {getCityName(city)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-in */}
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}>
                <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {checkIn ? formatDate(checkIn) : t('search.checkin')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              {isRTL ? (
                <CalendarArabic 
                  mode="single" 
                  selected={checkIn} 
                  onSelect={handleCheckInSelect}
                  disabled={(date) => date < today}
                  defaultMonth={checkIn || today}
                />
              ) : (
                <Calendar 
                  mode="single" 
                  selected={checkIn} 
                  onSelect={handleCheckInSelect}
                  disabled={(date) => date < today}
                  defaultMonth={checkIn || today}
                  classNames={{
                    day_today: "text-foreground",
                  }}
                />
              )}
            </PopoverContent>
          </Popover>

          {/* Check-out */}
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}>
                <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {checkOut ? formatDate(checkOut) : t('search.checkout')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              {isRTL ? (
                <CalendarArabic 
                  mode="single" 
                  selected={checkOut} 
                  onSelect={handleCheckOutSelect}
                  disabled={(date) => checkIn ? date <= checkIn : date < tomorrow}
                  defaultMonth={checkOut || (checkIn || today)}
                />
              ) : (
                <Calendar 
                  mode="single" 
                  selected={checkOut} 
                  onSelect={handleCheckOutSelect}
                  disabled={(date) => checkIn ? date <= checkIn : date < tomorrow}
                  defaultMonth={checkOut || (checkIn || today)}
                  classNames={{
                    day_today: "text-foreground",
                  }}
                />
              )}
            </PopoverContent>
          </Popover>

          {/* Guests */}
          <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
            <SelectTrigger>
              <Users className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              <SelectValue placeholder={t('search.guests')} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {t('search.guests')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
          <Search className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {t('search.button')}
        </Button>
      </form>
    </div>
  );
};