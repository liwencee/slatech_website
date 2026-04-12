-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update own profile (non-role fields)"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE USING (public.is_admin());

-- ARTICLES
CREATE POLICY "Published articles are visible to everyone"
  ON public.articles FOR SELECT USING (status = 'published');

CREATE POLICY "Admins and editors can view all articles"
  ON public.articles FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins and editors can create articles"
  ON public.articles FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "Authors can update own articles"
  ON public.articles FOR UPDATE
  USING (author_id = auth.uid() AND public.is_admin_or_editor())
  WITH CHECK (author_id = auth.uid() AND public.is_admin_or_editor());

CREATE POLICY "Admins can update any article"
  ON public.articles FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE USING (public.is_admin());

-- CATEGORIES
CREATE POLICY "Categories are visible to everyone"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage categories"
  ON public.categories FOR ALL USING (public.is_admin_or_editor());

-- TAGS
CREATE POLICY "Tags are visible to everyone"
  ON public.tags FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage tags"
  ON public.tags FOR ALL USING (public.is_admin_or_editor());

-- ARTICLE_TAGS
CREATE POLICY "Article tags are visible to everyone"
  ON public.article_tags FOR SELECT USING (true);

CREATE POLICY "Admins and editors can manage article tags"
  ON public.article_tags FOR ALL USING (public.is_admin_or_editor());

-- MEDIA
CREATE POLICY "Media is visible to authenticated users"
  ON public.media FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins and editors can upload media"
  ON public.media FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "Admins can delete media"
  ON public.media FOR DELETE USING (public.is_admin());

-- SITE SETTINGS
CREATE POLICY "Site settings are readable by everyone"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL USING (public.is_admin());

-- PROJECTS
CREATE POLICY "Published projects are visible to everyone"
  ON public.projects FOR SELECT USING (status = 'published');

CREATE POLICY "Admins and editors can view all projects"
  ON public.projects FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "Admins and editors can manage projects"
  ON public.projects FOR ALL USING (public.is_admin_or_editor());
