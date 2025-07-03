
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
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Since we're using auth_user_id in the new schema, let's fetch the stats
        const [bookmarksResponse, notificationsResponse, submissionsResponse] = await Promise.all([
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

        setStats({
          bookmarksCount: bookmarksResponse.count || 0,
          notificationsCount: notificationsResponse.count || 0,
          submissionsCount: submissionsResponse.count || 0
        });
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
