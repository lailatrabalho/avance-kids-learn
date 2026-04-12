-- 1. Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('website-images', 'website-images', true) ON CONFLICT DO NOTHING;

-- 2. Create update trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- 3. Create tables
CREATE TABLE IF NOT EXISTS public.website_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'AVANCE - E-book Educativo',
  description TEXT,
  whatsapp_number TEXT DEFAULT '5511999999999',
  purchase_link TEXT DEFAULT 'https://pay.hotmart.com/example',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.hero_section (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'E-BOOK INTERATIVO EDUCATIVO',
  subtitle TEXT NOT NULL DEFAULT 'PARA CRIANÇAS DE 4 A 8 ANOS',
  description_1 TEXT NOT NULL DEFAULT 'Estimule o desenvolvimento cognitivo e criativo da sua criança',
  description_2 TEXT NOT NULL DEFAULT 'Com atividades lúdicas e educativas',
  description_3 TEXT NOT NULL DEFAULT 'Desenvolvido por especialistas em educação',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  initials TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  category TEXT DEFAULT 'Pais',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.target_audience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  intro_text TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  cta_subtext TEXT NOT NULL,
  card_1_title TEXT NOT NULL,
  card_1_description TEXT NOT NULL,
  card_1_detail TEXT NOT NULL,
  card_2_title TEXT NOT NULL,
  card_2_description TEXT NOT NULL,
  card_2_detail TEXT NOT NULL,
  card_3_title TEXT NOT NULL,
  card_3_description TEXT NOT NULL,
  card_3_detail TEXT NOT NULL,
  card_4_title TEXT NOT NULL,
  card_4_description TEXT NOT NULL,
  card_4_detail TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.thank_you_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Obrigado pela sua compra!',
  subtitle TEXT NOT NULL DEFAULT 'Seu e-book será enviado em instantes',
  instructions TEXT NOT NULL DEFAULT 'Verifique seu e-mail (incluindo a pasta de spam)',
  support_text TEXT NOT NULL DEFAULT 'Precisa de ajuda? Entre em contato conosco',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create Triggers
DROP TRIGGER IF EXISTS set_updated_at_website_config ON public.website_config;
CREATE TRIGGER set_updated_at_website_config BEFORE UPDATE ON public.website_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_hero_section ON public.hero_section;
CREATE TRIGGER set_updated_at_hero_section BEFORE UPDATE ON public.hero_section FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_benefits ON public.benefits;
CREATE TRIGGER set_updated_at_benefits BEFORE UPDATE ON public.benefits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_packages ON public.packages;
CREATE TRIGGER set_updated_at_packages BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_testimonials ON public.testimonials;
CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_target_audience ON public.target_audience;
CREATE TRIGGER set_updated_at_target_audience BEFORE UPDATE ON public.target_audience FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_thank_you_config ON public.thank_you_config;
CREATE TRIGGER set_updated_at_thank_you_config BEFORE UPDATE ON public.thank_you_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Insert initial data (only if empty to prevent duplication on re-runs)
INSERT INTO website_config (title, description, whatsapp_number, purchase_link)
SELECT 'AVANCE - E-book Educativo', 'E-book interativo para desenvolvimento infantil', '5511999999999', 'https://pay.hotmart.com/example'
WHERE NOT EXISTS (SELECT 1 FROM website_config);

INSERT INTO hero_section (title, subtitle, description_1, description_2, description_3)
SELECT 'E-BOOK INTERATIVO EDUCATIVO', 'PARA CRIANÇAS DE 4 A 8 ANOS', 'Estimule o desenvolvimento cognitivo e criativo da sua criança', 'Com atividades lúdicas e educativas', 'Desenvolvido por especialistas em educação'
WHERE NOT EXISTS (SELECT 1 FROM hero_section);

INSERT INTO benefits (title, description, icon_name, order_index)
SELECT 'Jogos Interativos', 'Atividades lúdicas que estimulam o aprendizado de forma divertida e envolvente', 'gamepad', 1
WHERE NOT EXISTS (SELECT 1 FROM benefits);
INSERT INTO benefits (title, description, icon_name, order_index)
SELECT 'Desenvolvimento da Lógica', 'Exercícios que trabalham o raciocínio lógico e resolução de problemas', 'brain', 2
WHERE NOT EXISTS (SELECT 1 FROM benefits);
INSERT INTO benefits (title, description, icon_name, order_index)
SELECT 'Coordenação Motora', 'Atividades que desenvolvem habilidades motoras finas e grossas', 'hand', 3
WHERE NOT EXISTS (SELECT 1 FROM benefits);
INSERT INTO benefits (title, description, icon_name, order_index)
SELECT 'Leitura e Escrita', 'Estímulo ao desenvolvimento da alfabetização e linguagem', 'book', 4
WHERE NOT EXISTS (SELECT 1 FROM benefits);

INSERT INTO packages (name, description, order_index)
SELECT 'MIDDLE', 'Pacote básico com atividades fundamentais para desenvolvimento inicial', 1
WHERE NOT EXISTS (SELECT 1 FROM packages);
INSERT INTO packages (name, description, order_index)
SELECT 'RICH', 'Pacote intermediário com conteúdo ampliado e exercícios diversificados', 2
WHERE NOT EXISTS (SELECT 1 FROM packages);
INSERT INTO packages (name, description, order_index)
SELECT 'SUPER', 'Pacote avançado com recursos extras e atividades especializadas', 3
WHERE NOT EXISTS (SELECT 1 FROM packages);
INSERT INTO packages (name, description, order_index)
SELECT 'EXPERT', 'Pacote completo com todo o conteúdo e suporte personalizado', 4
WHERE NOT EXISTS (SELECT 1 FROM packages);

INSERT INTO testimonials (name, role, text, initials, category, order_index)
SELECT 'Maria Silva', 'Mãe de 2 crianças', 'Excelente material! Meus filhos adoraram as atividades e desenvolveram muito com o e-book.', 'MS', 'Pais', 1
WHERE NOT EXISTS (SELECT 1 FROM testimonials);
INSERT INTO testimonials (name, role, text, initials, category, order_index)
SELECT 'Prof. João Santos', 'Professor de Educação Infantil', 'Material muito bem estruturado, uso em sala de aula e os resultados são incríveis.', 'JS', 'Professores', 2
WHERE NOT EXISTS (SELECT 1 FROM testimonials);
INSERT INTO testimonials (name, role, text, initials, category, order_index)
SELECT 'Ana Costa', 'Psicopedagoga', 'Recomendo para todos os pais. O conteúdo é didático e estimula o desenvolvimento integral.', 'AC', 'Especialistas', 3
WHERE NOT EXISTS (SELECT 1 FROM testimonials);

INSERT INTO target_audience (
  title, intro_text, cta_text, cta_subtext,
  card_1_title, card_1_description, card_1_detail,
  card_2_title, card_2_description, card_2_detail,
  card_3_title, card_3_description, card_3_detail,
  card_4_title, card_4_description, card_4_detail
)
SELECT 'Para quem é este E-book?', 'Desenvolvido especialmente para crianças em fase de desenvolvimento cognitivo e motor', 'Garante já o seu E-book e transforme o aprendizado da sua criança!', 'Acesso imediato + Suporte completo + Garantia de 7 dias',
  'Pais Dedicados', 'Que buscam estimular o desenvolvimento dos filhos de forma lúdica', 'Atividades pensadas para interação família-criança',
  'Professores', 'Que querem recursos educativos inovadores para sala de aula', 'Material didático complementar alinhado à BNCC',
  'Crianças 4-8 anos', 'Em fase de desenvolvimento cognitivo e motor', 'Atividades adequadas para cada faixa etária',
  'Terapeutas', 'Que trabalham com desenvolvimento infantil', 'Exercícios terapêuticos e educativos especializados'
WHERE NOT EXISTS (SELECT 1 FROM target_audience);

INSERT INTO thank_you_config (title, subtitle, instructions, support_text)
SELECT 'Obrigado pela sua compra!', 'Seu e-book será enviado em instantes', 'Verifique seu e-mail (incluindo a pasta de spam)', 'Precisa de ajuda? Entre em contato conosco'
WHERE NOT EXISTS (SELECT 1 FROM thank_you_config);

-- 6. Enable RLS and Policies
ALTER TABLE public.website_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.target_audience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thank_you_config ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS siteavance_public_read_website_config ON public.website_config;
CREATE POLICY siteavance_public_read_website_config ON public.website_config FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_hero_section ON public.hero_section;
CREATE POLICY siteavance_public_read_hero_section ON public.hero_section FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_benefits ON public.benefits;
CREATE POLICY siteavance_public_read_benefits ON public.benefits FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_packages ON public.packages;
CREATE POLICY siteavance_public_read_packages ON public.packages FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_testimonials ON public.testimonials;
CREATE POLICY siteavance_public_read_testimonials ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_target_audience ON public.target_audience;
CREATE POLICY siteavance_public_read_target_audience ON public.target_audience FOR SELECT USING (true);

DROP POLICY IF EXISTS siteavance_public_read_thank_you_config ON public.thank_you_config;
CREATE POLICY siteavance_public_read_thank_you_config ON public.thank_you_config FOR SELECT USING (true);

-- Auth CRUD Policies
DROP POLICY IF EXISTS siteavance_auth_insert_website_config ON public.website_config;
CREATE POLICY siteavance_auth_insert_website_config ON public.website_config FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_website_config ON public.website_config;
CREATE POLICY siteavance_auth_update_website_config ON public.website_config FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_hero_section ON public.hero_section;
CREATE POLICY siteavance_auth_insert_hero_section ON public.hero_section FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_hero_section ON public.hero_section;
CREATE POLICY siteavance_auth_update_hero_section ON public.hero_section FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_benefits ON public.benefits;
CREATE POLICY siteavance_auth_insert_benefits ON public.benefits FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_benefits ON public.benefits;
CREATE POLICY siteavance_auth_update_benefits ON public.benefits FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_packages ON public.packages;
CREATE POLICY siteavance_auth_insert_packages ON public.packages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_packages ON public.packages;
CREATE POLICY siteavance_auth_update_packages ON public.packages FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_testimonials ON public.testimonials;
CREATE POLICY siteavance_auth_insert_testimonials ON public.testimonials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_testimonials ON public.testimonials;
CREATE POLICY siteavance_auth_update_testimonials ON public.testimonials FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_target_audience ON public.target_audience;
CREATE POLICY siteavance_auth_insert_target_audience ON public.target_audience FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_target_audience ON public.target_audience;
CREATE POLICY siteavance_auth_update_target_audience ON public.target_audience FOR UPDATE USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_auth_insert_thank_you_config ON public.thank_you_config;
CREATE POLICY siteavance_auth_insert_thank_you_config ON public.thank_you_config FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS siteavance_auth_update_thank_you_config ON public.thank_you_config;
CREATE POLICY siteavance_auth_update_thank_you_config ON public.thank_you_config FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 7. Storage Policies
DROP POLICY IF EXISTS siteavance_storage_public_read_images ON storage.objects;
CREATE POLICY siteavance_storage_public_read_images ON storage.objects FOR SELECT USING (bucket_id = 'website-images');

DROP POLICY IF EXISTS siteavance_storage_auth_insert_images ON storage.objects;
CREATE POLICY siteavance_storage_auth_insert_images ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS siteavance_storage_auth_update_own_images ON storage.objects;
CREATE POLICY siteavance_storage_auth_update_own_images ON storage.objects FOR UPDATE USING (bucket_id = 'website-images' AND owner = auth.uid());

DROP POLICY IF EXISTS siteavance_storage_auth_delete_own_images ON storage.objects;
CREATE POLICY siteavance_storage_auth_delete_own_images ON storage.objects FOR DELETE USING (bucket_id = 'website-images' AND owner = auth.uid());

-- 8. Realtime configurations
ALTER TABLE public.website_config REPLICA IDENTITY FULL;
ALTER TABLE public.hero_section REPLICA IDENTITY FULL;
ALTER TABLE public.benefits REPLICA IDENTITY FULL;
ALTER TABLE public.packages REPLICA IDENTITY FULL;
ALTER TABLE public.testimonials REPLICA IDENTITY FULL;
ALTER TABLE public.target_audience REPLICA IDENTITY FULL;
ALTER TABLE public.thank_you_config REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'website_config') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.website_config;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'hero_section') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_section;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'benefits') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.benefits;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'packages') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.packages;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'testimonials') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'target_audience') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.target_audience;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'thank_you_config') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.thank_you_config;
  END IF;
END $$;
