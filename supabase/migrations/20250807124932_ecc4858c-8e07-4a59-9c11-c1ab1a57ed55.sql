-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('website-images', 'website-images', true);

-- Create website configuration tables
CREATE TABLE public.website_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'AVANCE - E-book Educativo',
  description TEXT,
  whatsapp_number TEXT DEFAULT '5511999999999',
  purchase_link TEXT DEFAULT 'https://pay.hotmart.com/example',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hero section table
CREATE TABLE public.hero_section (
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

-- Create benefits table
CREATE TABLE public.benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
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

-- Create target audience table
CREATE TABLE public.target_audience (
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

-- Create thank you page table
CREATE TABLE public.thank_you_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Obrigado pela sua compra!',
  subtitle TEXT NOT NULL DEFAULT 'Seu e-book será enviado em instantes',
  instructions TEXT NOT NULL DEFAULT 'Verifique seu e-mail (incluindo a pasta de spam)',
  support_text TEXT NOT NULL DEFAULT 'Precisa de ajuda? Entre em contato conosco',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial data
INSERT INTO website_config (title, description, whatsapp_number, purchase_link) VALUES 
('AVANCE - E-book Educativo', 'E-book interativo para desenvolvimento infantil', '5511999999999', 'https://pay.hotmart.com/example');

INSERT INTO hero_section (title, subtitle, description_1, description_2, description_3) VALUES 
('E-BOOK INTERATIVO EDUCATIVO', 'PARA CRIANÇAS DE 4 A 8 ANOS', 'Estimule o desenvolvimento cognitivo e criativo da sua criança', 'Com atividades lúdicas e educativas', 'Desenvolvido por especialistas em educação');

INSERT INTO benefits (title, description, icon_name, order_index) VALUES 
('Jogos Interativos', 'Atividades lúdicas que estimulam o aprendizado de forma divertida e envolvente', 'gamepad', 1),
('Desenvolvimento da Lógica', 'Exercícios que trabalham o raciocínio lógico e resolução de problemas', 'brain', 2),
('Coordenação Motora', 'Atividades que desenvolvem habilidades motoras finas e grossas', 'hand', 3),
('Leitura e Escrita', 'Estímulo ao desenvolvimento da alfabetização e linguagem', 'book', 4);

INSERT INTO packages (name, description, order_index) VALUES 
('MIDDLE', 'Pacote básico com atividades fundamentais para desenvolvimento inicial', 1),
('RICH', 'Pacote intermediário com conteúdo ampliado e exercícios diversificados', 2),
('SUPER', 'Pacote avançado com recursos extras e atividades especializadas', 3),
('EXPERT', 'Pacote completo com todo o conteúdo e suporte personalizado', 4);

INSERT INTO testimonials (name, role, text, initials, category, order_index) VALUES 
('Maria Silva', 'Mãe de 2 crianças', 'Excelente material! Meus filhos adoraram as atividades e desenvolveram muito com o e-book.', 'MS', 'Pais', 1),
('Prof. João Santos', 'Professor de Educação Infantil', 'Material muito bem estruturado, uso em sala de aula e os resultados são incríveis.', 'JS', 'Professores', 2),
('Ana Costa', 'Psicopedagoga', 'Recomendo para todos os pais. O conteúdo é didático e estimula o desenvolvimento integral.', 'AC', 'Especialistas', 3);

INSERT INTO target_audience (
  title, intro_text, cta_text, cta_subtext,
  card_1_title, card_1_description, card_1_detail,
  card_2_title, card_2_description, card_2_detail,
  card_3_title, card_3_description, card_3_detail,
  card_4_title, card_4_description, card_4_detail
) VALUES (
  'Para quem é este E-book?',
  'Desenvolvido especialmente para crianças em fase de desenvolvimento cognitivo e motor',
  'Garante já o seu E-book e transforme o aprendizado da sua criança!',
  'Acesso imediato + Suporte completo + Garantia de 7 dias',
  'Pais Dedicados', 'Que buscam estimular o desenvolvimento dos filhos de forma lúdica', 'Atividades pensadas para interação família-criança',
  'Professores', 'Que querem recursos educativos inovadores para sala de aula', 'Material didático complementar alinhado à BNCC',
  'Crianças 4-8 anos', 'Em fase de desenvolvimento cognitivo e motor', 'Atividades adequadas para cada faixa etária',
  'Terapeutas', 'Que trabalham com desenvolvimento infantil', 'Exercícios terapêuticos e educativos especializados'
);

INSERT INTO thank_you_config (title, subtitle, instructions, support_text) VALUES 
('Obrigado pela sua compra!', 'Seu e-book será enviado em instantes', 'Verifique seu e-mail (incluindo a pasta de spam)', 'Precisa de ajuda? Entre em contato conosco');

-- Create storage policies for images
CREATE POLICY "Public access to website images" ON storage.objects
  FOR SELECT USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'website-images');

CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'website-images');

-- Create update trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_website_config_updated_at
  BEFORE UPDATE ON public.website_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hero_section_updated_at
  BEFORE UPDATE ON public.hero_section
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_benefits_updated_at
  BEFORE UPDATE ON public.benefits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_target_audience_updated_at
  BEFORE UPDATE ON public.target_audience
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_thank_you_config_updated_at
  BEFORE UPDATE ON public.thank_you_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();