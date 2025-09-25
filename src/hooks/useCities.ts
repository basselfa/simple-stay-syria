import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCities = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch unique cities from hotels table
      const { data, error } = await supabase
        .from('hotels')
        .select('city')
        .order('city');

      if (error) {
        console.error('Error fetching cities:', error);
        throw error;
      }

      // Extract unique cities and sort them
      const uniqueCities = [...new Set((data || []).map(hotel => hotel.city))]
        .filter(city => city && city.trim() !== '') // Remove empty/null cities
        .sort();

      console.log('Fetched cities from database:', uniqueCities);
      setCities(uniqueCities);
    } catch (err) {
      console.error('Error in fetchCities:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    cities,
    loading,
    error,
    refetch: fetchCities
  };
};
