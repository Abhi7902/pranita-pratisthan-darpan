-- Create feedback table
CREATE TABLE public.feedback (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    contact_number TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_read BOOLEAN NOT NULL DEFAULT false
);

-- Create news table
CREATE TABLE public.news (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    author TEXT,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create photo_gallery table
CREATE TABLE public.photo_gallery (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    image_url TEXT NOT NULL,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    details TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create timeline_events table
CREATE TABLE public.timeline_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Award',
    color TEXT DEFAULT 'bg-marathi-orange',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create youtube_videos table
CREATE TABLE public.youtube_videos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    video_id TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create popup_events table
CREATE TABLE public.popup_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT false,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT,
    banner_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mel_users table
CREATE TABLE public.mel_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popup_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mel_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Anyone can view feedback" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Anyone can view photo gallery" ON public.photo_gallery FOR SELECT USING (true);
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view timeline events" ON public.timeline_events FOR SELECT USING (true);
CREATE POLICY "Anyone can view youtube videos" ON public.youtube_videos FOR SELECT USING (true);
CREATE POLICY "Anyone can view popup events" ON public.popup_events FOR SELECT USING (true);

-- MEL users need restricted access
CREATE POLICY "MEL users can view other users" ON public.mel_users FOR SELECT USING (true);

-- Admin policies for content management (these would need proper auth implementation)
CREATE POLICY "Admin can manage news" ON public.news FOR ALL USING (true);
CREATE POLICY "Admin can manage photo gallery" ON public.photo_gallery FOR ALL USING (true);
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Admin can manage timeline events" ON public.timeline_events FOR ALL USING (true);
CREATE POLICY "Admin can manage youtube videos" ON public.youtube_videos FOR ALL USING (true);
CREATE POLICY "Admin can manage popup events" ON public.popup_events FOR ALL USING (true);
CREATE POLICY "Admin can manage mel users" ON public.mel_users FOR ALL USING (true);
CREATE POLICY "Admin can manage feedback" ON public.feedback FOR ALL USING (true);