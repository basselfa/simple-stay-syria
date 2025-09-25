import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Hotel {
  id: string;
  name: string;
  description?: string | null;
  city: string;
  address: string;
  min_price?: number; // computed from rooms
}

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      console.log('Fetching all hotels...');
      
      // Fetch hotels and minimum room price per hotel
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, description, city, address');

      console.log('All hotels query result:', { data, error });

      if (error) {
        console.error('Supabase error in fetchHotels:', error);
        throw error;
      }
      
      const hotelsData: Hotel[] = data || [];
      console.log('Total hotels found:', hotelsData.length);

      // For each hotel, get min room price (could be optimized with RPC/view if needed)
      const withPrices = await Promise.all(
        hotelsData.map(async (h) => {
          const { data: roomAgg } = await supabase
            .from('rooms')
            .select('price')
            .eq('hotel_id', h.id)
            .order('price', { ascending: true })
            .limit(1);
          return { ...h, min_price: roomAgg && roomAgg.length > 0 ? Number(roomAgg[0].price) : undefined };
        })
      );

      console.log('Hotels with prices:', withPrices);
      setHotels(withPrices);
    } catch (err) {
      console.error('Fetch hotels error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchHotels = async (destination?: string) => {
    try {
      setLoading(true);
      console.log('Searching for destination:', destination);
      
      let query = supabase.from('hotels').select('id, name, description, city, address');
      
      if (destination) {
        // Match by city or address - try different approaches
        console.log('Filtering by destination:', destination);
        query = query.or(`city.ilike.%${destination}%,address.ilike.%${destination}%`);
      }
      
      const { data, error } = await query;
      console.log('Query result:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      const hotelsData: Hotel[] = data || [];
      console.log('Found hotels:', hotelsData.length);
      
      const withPrices = await Promise.all(
        hotelsData.map(async (h) => {
          const { data: roomAgg } = await supabase
            .from('rooms')
            .select('price')
            .eq('hotel_id', h.id)
            .order('price', { ascending: true })
            .limit(1);
          return { ...h, min_price: roomAgg && roomAgg.length > 0 ? Number(roomAgg[0].price) : undefined };
        })
      );
      
      console.log('Hotels with prices:', withPrices);
      setHotels(withPrices);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    searchHotels
  };
};