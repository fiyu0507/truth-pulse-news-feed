-- Fix security issues by enabling RLS on tables that need it

-- Enable RLS on tables that are missing it
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsarticles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newssources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factchecks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmark_categories ENABLE ROW LEVEL SECURITY;

-- Add policies for public read access where appropriate
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view published news articles" ON public.newsarticles
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Anyone can view news sources" ON public.newssources
  FOR SELECT USING (status = true);

CREATE POLICY "Anyone can view fact checks" ON public.factchecks
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Anyone can view bookmark categories" ON public.bookmark_categories
  FOR SELECT USING (true);

-- Admin policies for management
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage news articles" ON public.newsarticles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage news sources" ON public.newssources
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage settings" ON public.settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view analytics" ON public.analytics
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage fact checks" ON public.factchecks
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage bookmark categories" ON public.bookmark_categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;