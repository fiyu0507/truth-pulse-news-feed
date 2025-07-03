
-- Create user profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  location TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create user roles table for role-based access
CREATE TYPE public.app_role AS ENUM ('reader', 'contributor', 'verifier', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'reader',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert profile data
  INSERT INTO public.profiles (id, full_name, location)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'full_name',
    COALESCE(NEW.raw_user_meta_data ->> 'location', 'Not specified')
  );
  
  -- Assign default reader role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'reader');
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile and assign role when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing tables to use auth.users references instead of integer user_id
-- First, let's add a new column that references auth.users
ALTER TABLE public.bookmarks ADD COLUMN auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.notifications ADD COLUMN auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.submissions ADD COLUMN auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create RLS policies for bookmarks
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can create own bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can delete own bookmarks" ON public.bookmarks
  FOR DELETE USING (auth.uid() = auth_user_id);

-- Create RLS policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- Create RLS policies for submissions
CREATE POLICY "Users can view own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can create submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own submissions" ON public.submissions
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- Admin policies for managing all data
CREATE POLICY "Admins can view all bookmarks" ON public.bookmarks
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all notifications" ON public.notifications
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all submissions" ON public.submissions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Verifiers can view all submissions" ON public.submissions
  FOR SELECT USING (public.has_role(auth.uid(), 'verifier'));

CREATE POLICY "Contributors can view all submissions" ON public.submissions
  FOR SELECT USING (public.has_role(auth.uid(), 'contributor'));
