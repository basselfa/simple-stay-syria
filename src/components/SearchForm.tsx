import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar as CalendarIcon, Users, Search } from "lucide-react";
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

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const { t, isRTL } = useLanguage();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  // Get today's date at start of day
  const today = startOfDay(new Date());
  // Get tomorrow's date
  const tomorrow = addDays(today, 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      checkIn,
      checkOut,
      guests
    });
  };

  // Handle check-in date selection
  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    // If check-out is before the new check-in date, clear it
    if (date && checkOut && checkOut < date) {
      setCheckOut(undefined);
    }
  };

  return (
    <div className={`bg-card rounded-2xl p-6 search-shadow border border-border/20 ${isRTL ? 'text-right' : 'text-left'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="relative">
            <MapPin className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={t('search.destination')}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={isRTL ? 'pr-10' : 'pl-10'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Check-in */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {checkIn ? format(checkIn, "MMM dd") : t('search.checkin')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={handleCheckInSelect}
                initialFocus
                disabled={(date) => date < today}
              />
            </PopoverContent>
          </Popover>

          {/* Check-out */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                {checkOut ? format(checkOut, "MMM dd") : t('search.checkout')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => {
                  // If check-in is selected, check-out can't be before or equal to check-in
                  if (checkIn) {
                    return date <= checkIn;
                  }
                  // If no check-in selected, check-out can't be before tomorrow
                  return date < tomorrow;
                }}
              />
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