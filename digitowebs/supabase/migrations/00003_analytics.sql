-- ============================================================
-- Analytics: visitor tracking & event logging
-- ============================================================

-- Visitor sessions -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_visitors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id    TEXT NOT NULL,          -- persistent cookie UUID
  session_id    TEXT NOT NULL,          -- per-session UUID
  page          TEXT NOT NULL,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  device        TEXT,                   -- 'mobile' | 'tablet' | 'desktop'
  user_agent    TEXT,
  country       TEXT,
  city          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events (page_view, contact_submit, chatbot_lead, newsletter, whatsapp_click, etc.)
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id    TEXT NOT NULL,
  session_id    TEXT NOT NULL,
  event         TEXT NOT NULL,
  page          TEXT,
  metadata      JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_av_visitor_id   ON public.analytics_visitors (visitor_id);
CREATE INDEX IF NOT EXISTS idx_av_created_at   ON public.analytics_visitors (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ae_visitor_id   ON public.analytics_events   (visitor_id);
CREATE INDEX IF NOT EXISTS idx_ae_event        ON public.analytics_events   (event);
CREATE INDEX IF NOT EXISTS idx_ae_created_at   ON public.analytics_events   (created_at DESC);

-- RLS ---------------------------------------------------------------
ALTER TABLE public.analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   ENABLE ROW LEVEL SECURITY;

-- Only service-role (server) can insert — anon cannot read their own data
-- (all writes go through our API route with the service key)
CREATE POLICY "service_insert_visitors"
  ON public.analytics_visitors FOR INSERT
  TO service_role WITH CHECK (true);

CREATE POLICY "service_select_visitors"
  ON public.analytics_visitors FOR SELECT
  TO service_role USING (true);

CREATE POLICY "service_insert_events"
  ON public.analytics_events FOR INSERT
  TO service_role WITH CHECK (true);

CREATE POLICY "service_select_events"
  ON public.analytics_events FOR SELECT
  TO service_role USING (true);
