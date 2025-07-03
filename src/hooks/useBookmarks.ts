
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Bookmark {
  bookmark_id: number;
  article_id: number;
  saved_at: string;
  // Additional fields for display
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  source?: string;
  category?: string;
}

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('auth_user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;

      // For now, we'll use mock data since we don't have actual articles
      const mockBookmarks: Bookmark[] = (data || []).map((bookmark, index) => ({
        ...bookmark,
        title: `Saved Article ${index + 1}`,
        description: 'This is a saved article description',
        url: 'https://example.com',
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        source: 'Local News',
        category: 'General'
      }));

      setBookmarks(mockBookmarks);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (articleId: number, articleData?: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    source?: string;
    category?: string;
  }) => {
    if (!user) {
      toast.error('Please sign in to bookmark articles');
      return false;
    }

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert({
          article_id: articleId,
          auth_user_id: user.id,
          user_id: 1 // Legacy field, keeping for compatibility
        });

      if (error) throw error;

      toast.success('Article bookmarked successfully');
      fetchBookmarks(); // Refresh bookmarks
      return true;
    } catch (err) {
      console.error('Error adding bookmark:', err);
      toast.error('Failed to bookmark article');
      return false;
    }
  };

  const removeBookmark = async (bookmarkId: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('bookmark_id', bookmarkId)
        .eq('auth_user_id', user.id);

      if (error) throw error;

      toast.success('Bookmark removed');
      fetchBookmarks(); // Refresh bookmarks
      return true;
    } catch (err) {
      console.error('Error removing bookmark:', err);
      toast.error('Failed to remove bookmark');
      return false;
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    refetch: fetchBookmarks
  };
};
