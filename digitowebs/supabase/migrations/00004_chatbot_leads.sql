-- ============================================================
-- Chatbot leads + automated 2-day follow-up
-- ============================================================
-- Every lead captured by the AI chatbox is stored here so a
-- scheduled job (/api/followup-cron) can email a friendly
-- follow-up 2 days later if the client hasn't been converted.

CREATE TABLE IF NOT EXISTS public.chatbot_leads (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT,
  email              TEXT,
  services           TEXT,
  budget             TEXT,
  details            TEXT,
  source             TEXT NOT NULL DEFAULT 'chatbot',
  follow_up_sent     BOOLEAN NOT NULL DEFAULT false,
  follow_up_sent_at  TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fast lookup for the cron job: "un-followed-up leads, oldest first"
CREATE INDEX IF NOT EXISTS idx_leads_followup
  ON public.chatbot_leads (follow_up_sent, created_at);

-- RLS — writes/reads happen only through our server API (service role)
ALTER TABLE public.chatbot_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_insert_leads"
  ON public.chatbot_leads FOR INSERT
  TO service_role WITH CHECK (true);

CREATE POLICY "service_select_leads"
  ON public.chatbot_leads FOR SELECT
  TO service_role USING (true);

CREATE POLICY "service_update_leads"
  ON public.chatbot_leads FOR UPDATE
  TO service_role USING (true) WITH CHECK (true);
