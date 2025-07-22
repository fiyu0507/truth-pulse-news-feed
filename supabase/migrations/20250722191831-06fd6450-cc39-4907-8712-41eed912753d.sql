-- Enhanced Bookmarking System
-- Add tags and categories to bookmarks
ALTER TABLE public.bookmarks ADD COLUMN tags TEXT[];
ALTER TABLE public.bookmarks ADD COLUMN category TEXT;
ALTER TABLE public.bookmarks ADD COLUMN notes TEXT;
ALTER TABLE public.bookmarks ADD COLUMN is_read BOOLEAN DEFAULT false;
ALTER TABLE public.bookmarks ADD COLUMN reading_time INTEGER; -- in minutes
ALTER TABLE public.bookmarks ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create bookmark categories table
CREATE TABLE public.bookmark_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default categories
INSERT INTO public.bookmark_categories (name, color) VALUES 
  ('To Read', '#3B82F6'),
  ('Important', '#EF4444'),
  ('Research', '#10B981'),
  ('Entertainment', '#8B5CF6');

-- Create articles table for admin CRUD
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  category TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_breaking BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- estimated reading time in minutes
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Articles policies
CREATE POLICY "Anyone can view published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage their articles" ON public.articles
  FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all articles" ON public.articles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create reading history table
CREATE TABLE public.reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  article_title TEXT NOT NULL,
  article_url TEXT,
  reading_time INTEGER DEFAULT 0, -- time spent reading in seconds
  completed BOOLEAN DEFAULT false,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- Enable RLS on reading history
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

-- Reading history policies
CREATE POLICY "Users can view own reading history" ON public.reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reading history" ON public.reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON public.reading_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reading history" ON public.reading_history
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{"frequency": "weekly", "categories": []}',
  verification_token TEXT,
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on newsletter subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Newsletter policies
CREATE POLICY "Users can manage their own subscription" ON public.newsletter_subscribers
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions" ON public.newsletter_subscribers
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create newsletter campaigns table
CREATE TABLE public.newsletter_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  html_content TEXT,
  subject TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipient_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on newsletter campaigns
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Newsletter campaigns policies
CREATE POLICY "Admins can manage newsletter campaigns" ON public.newsletter_campaigns
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create user engagement metrics table
CREATE TABLE public.user_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- 'page_view', 'article_read', 'bookmark_added', etc.
  metric_value INTEGER DEFAULT 1,
  metadata JSONB,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on user engagement
ALTER TABLE public.user_engagement ENABLE ROW LEVEL SECURITY;

-- User engagement policies
CREATE POLICY "Users can create own engagement data" ON public.user_engagement
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all engagement data" ON public.user_engagement
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_bookmarks_auth_user_id ON public.bookmarks(auth_user_id);
CREATE INDEX idx_bookmarks_tags ON public.bookmarks USING GIN(tags);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at);
CREATE INDEX idx_articles_tags ON public.articles USING GIN(tags);
CREATE INDEX idx_reading_history_user_id ON public.reading_history(user_id);
CREATE INDEX idx_reading_history_viewed_at ON public.reading_history(viewed_at);
CREATE INDEX idx_user_engagement_user_id ON public.user_engagement(user_id);
CREATE INDEX idx_user_engagement_metric_type ON public.user_engagement(metric_type);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_bookmarks_updated_at
    BEFORE UPDATE ON public.bookmarks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newsletter_campaigns_updated_at
    BEFORE UPDATE ON public.newsletter_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();