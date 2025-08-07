-- Enable RLS on all tables and create public access policies since this is a public website
ALTER TABLE public.website_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.target_audience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thank_you_config ENABLE ROW LEVEL SECURITY;

-- Create public read policies (website content is public)
CREATE POLICY "Public can read website config" ON public.website_config FOR SELECT USING (true);
CREATE POLICY "Public can read hero section" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Public can read benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Public can read packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read target audience" ON public.target_audience FOR SELECT USING (true);
CREATE POLICY "Public can read thank you config" ON public.thank_you_config FOR SELECT USING (true);

-- Create admin policies for updates (unrestricted for now since this is a demo)
CREATE POLICY "Allow all updates to website config" ON public.website_config FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to hero section" ON public.hero_section FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to benefits" ON public.benefits FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to packages" ON public.packages FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to target audience" ON public.target_audience FOR UPDATE USING (true);
CREATE POLICY "Allow all updates to thank you config" ON public.thank_you_config FOR UPDATE USING (true);

-- Fix the function search path issue
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;