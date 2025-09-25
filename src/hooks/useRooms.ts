import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Room {
  id: string;
  hotel_id: string;
  type: string;
  price: number;
  created_at: string;
}

export const useRooms = (hotelId?: string) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hotelId) {
      fetchRooms(hotelId);
    }
  }, [hotelId]);

  const fetchRooms = async (hid: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', hid)
        .order('price', { ascending: true });
      if (error) throw error;
      setRooms((data || []) as Room[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isRoomAvailable = async (roomId: string, checkin: string, checkout: string) => {
    // Generate array of dates between checkin and checkout
    const startDate = new Date(checkin);
    const endDate = new Date(checkout);
    const dates: string[] = [];
    
    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // Check if any of these dates are already booked
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('room_id', roomId)
      .in('booked_date', dates)
      .eq('status', 'confirmed');
    
    if (error) throw error;
    return (data || []).length === 0;
  };

  const createBooking = async (roomId: string, checkin: string, checkout: string) => {
    // Generate array of dates between checkin and checkout
    const startDate = new Date(checkin);
    const endDate = new Date(checkout);
    const dates: string[] = [];
    
    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // Create booking for each date
    const bookings = dates.map(date => ({
      room_id: roomId,
      booked_date: date,
      status: 'confirmed'
    }));
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookings)
      .select('*');
    
    if (error) throw error;
    return data;
  };

  return { rooms, loading, error, fetchRooms, isRoomAvailable, createBooking };
};


