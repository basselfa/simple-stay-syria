import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AvailableRoom {
  id: string;
  hotel_id: string;
  type: string;
  price: number;
  created_at: string;
  hotels: {
    id: string;
    name: string;
    city: string;
    address: string;
    description: string | null;
    created_at: string;
  };
}

export const useRoomSearch = () => {
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAvailableRooms = async (destination?: string, checkin?: string, checkout?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Start with base query to get rooms with hotel info
      let query = supabase
        .from('rooms')
        .select(`
          id,
          hotel_id,
          type,
          price,
          created_at,
          hotels!inner(
            id,
            name,
            city,
            address,
            description,
            created_at
          )
        `);

      // Filter by destination if provided
      if (destination) {
        query = query.or(`hotels.city.ilike.%${destination}%,hotels.address.ilike.%${destination}%`);
      }

      const { data: roomsData, error: roomsError } = await query;
      if (roomsError) throw roomsError;

      if (!checkin || !checkout) {
        // No date filtering, return all rooms
        setAvailableRooms((roomsData || []) as AvailableRoom[]);
        return;
      }

      // Generate array of dates between checkin and checkout
      const startDate = new Date(checkin);
      const endDate = new Date(checkout);
      const dates: string[] = [];
      
      for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
        dates.push(date.toISOString().split('T')[0]);
      }

      // Get all room IDs
      const roomIds = (roomsData || []).map(room => room.id);

      if (roomIds.length === 0) {
        setAvailableRooms([]);
        return;
      }

      // Check which rooms have bookings for any of the dates
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('room_id')
        .in('room_id', roomIds)
        .in('booked_date', dates)
        .eq('status', 'confirmed');

      if (bookingsError) throw bookingsError;

      // Get room IDs that are booked
      const bookedRoomIds = new Set((bookingsData || []).map(booking => booking.room_id));

      // Filter out booked rooms
      const availableRoomsData = (roomsData || []).filter(room => 
        !bookedRoomIds.has(room.id)
      ) as AvailableRoom[];

      setAvailableRooms(availableRoomsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAvailableRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    availableRooms,
    loading,
    error,
    searchAvailableRooms
  };
};
