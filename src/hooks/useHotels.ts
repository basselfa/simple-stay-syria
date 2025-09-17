import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Hotel {
  id: string;
  name: string;
  description?: string;
  location: string;
  price_per_night: number;
  rating?: number;
  image_url?: string;
  amenities?: string[];
  available_rooms?: number;
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
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchHotels = async (destination?: string) => {
    try {
      setLoading(true);
      let query = supabase.from('hotels').select('*');
      
      if (destination) {
        query = query.ilike('location', `%${destination}%`);
      }
      
      const { data, error } = await query.order('rating', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (err) {
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