
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserStats {
  bookmarksCount: number;
  notificationsCount: number;
  submissionsCount: number;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    bookmarksCount: 0,
    notificationsCount: 0,
    submissionsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      console.log('Fetching user stats for user:', user?.id);
      
      if (!user) {
        console.log('No user found, setting loading to false');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch stats with proper error handling for each query
        const [bookmarksResponse, notificationsResponse, submissionsResponse] = await Promise.allSettled([
          supabase
            .from('bookmarks')
            .select('*', { count: 'exact', head: true })
            .eq('auth_user_id', user.id),
          supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('auth_user_id', user.id)
            .eq('is_read', false),
          supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('auth_user_id', user.id)
        ]);

        const bookmarksCount = bookmarksResponse.status === 'fulfilled' ? bookmarksResponse.value.count || 0 : 0;
        const notificationsCount = notificationsResponse.status === 'fulfilled' ? notificationsResponse.value.count || 0 : 0;
        const submissionsCount = submissionsResponse.status === 'fulfilled' ? submissionsResponse.value.count || 0 : 0;

        console.log('Stats fetched:', { bookmarksCount, notificationsCount, submissionsCount });

        setStats({
          bookmarksCount,
          notificationsCount,
          submissionsCount
        });

        // Log any individual errors without failing the entire operation
        if (bookmarksResponse.status === 'rejected') {
          console.warn('Bookmarks query failed:', bookmarksResponse.reason);
        }
        if (notificationsResponse.status === 'rejected') {
          console.warn('Notifications query failed:', notificationsResponse.reason);
        }
        if (submissionsResponse.status === 'rejected') {
          console.warn('Submissions query failed:', submissionsResponse.reason);
        }

      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user statistics');
        // Set default values on error
        setStats({
          bookmarksCount: 0,
          notificationsCount: 0,
          submissionsCount: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  return { stats, loading, error };
};
