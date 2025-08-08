
-- 1) Triggers de updated_at para todas as tabelas de conteúdo
-- (a função public.update_updated_at_column já existe)

drop trigger if exists set_updated_at_website_config on public.website_config;
create trigger set_updated_at_website_config
before update on public.website_config
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_hero_section on public.hero_section;
create trigger set_updated_at_hero_section
before update on public.hero_section
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_benefits on public.benefits;
create trigger set_updated_at_benefits
before update on public.benefits
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_packages on public.packages;
create trigger set_updated_at_packages
before update on public.packages
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_testimonials on public.testimonials;
create trigger set_updated_at_testimonials
before update on public.testimonials
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_target_audience on public.target_audience;
create trigger set_updated_at_target_audience
before update on public.target_audience
for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at_thank_you_config on public.thank_you_config;
create trigger set_updated_at_thank_you_config
before update on public.thank_you_config
for each row execute function public.update_updated_at_column();

-- 2) RLS e Políticas (mantendo leitura pública, liberando CRUD para autenticados)
alter table public.website_config enable row level security;
alter table public.hero_section enable row level security;
alter table public.benefits enable row level security;
alter table public.packages enable row level security;
alter table public.testimonials enable row level security;
alter table public.target_audience enable row level security;
alter table public.thank_you_config enable row level security;

-- Leitura pública (adiciona política com nome único para evitar conflito)
create policy siteavance_public_read_website_config on public.website_config
for select using (true);

create policy siteavance_public_read_hero_section on public.hero_section
for select using (true);

create policy siteavance_public_read_benefits on public.benefits
for select using (true);

create policy siteavance_public_read_packages on public.packages
for select using (true);

create policy siteavance_public_read_testimonials on public.testimonials
for select using (true);

create policy siteavance_public_read_target_audience on public.target_audience
for select using (true);

create policy siteavance_public_read_thank_you_config on public.thank_you_config
for select using (true);

-- CRUD para autenticados
create policy siteavance_auth_insert_website_config on public.website_config
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_website_config on public.website_config
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_website_config on public.website_config
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_hero_section on public.hero_section
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_hero_section on public.hero_section
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_hero_section on public.hero_section
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_benefits on public.benefits
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_benefits on public.benefits
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_benefits on public.benefits
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_packages on public.packages
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_packages on public.packages
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_packages on public.packages
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_testimonials on public.testimonials
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_testimonials on public.testimonials
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_testimonials on public.testimonials
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_target_audience on public.target_audience
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_target_audience on public.target_audience
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_target_audience on public.target_audience
for delete using (auth.uid() is not null);

create policy siteavance_auth_insert_thank_you_config on public.thank_you_config
for insert with check (auth.uid() is not null);

create policy siteavance_auth_update_thank_you_config on public.thank_you_config
for update using (auth.uid() is not null);

create policy siteavance_auth_delete_thank_you_config on public.thank_you_config
for delete using (auth.uid() is not null);

-- 3) Realtime: REPLICA IDENTITY FULL + adicionar à publicação
alter table public.website_config replica identity full;
alter table public.hero_section replica identity full;
alter table public.benefits replica identity full;
alter table public.packages replica identity full;
alter table public.testimonials replica identity full;
alter table public.target_audience replica identity full;
alter table public.thank_you_config replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'website_config'
  ) then
    alter publication supabase_realtime add table public.website_config;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'hero_section'
  ) then
    alter publication supabase_realtime add table public.hero_section;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'benefits'
  ) then
    alter publication supabase_realtime add table public.benefits;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'packages'
  ) then
    alter publication supabase_realtime add table public.packages;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'testimonials'
  ) then
    alter publication supabase_realtime add table public.testimonials;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'target_audience'
  ) then
    alter publication supabase_realtime add table public.target_audience;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'thank_you_config'
  ) then
    alter publication supabase_realtime add table public.thank_you_config;
  end if;
end $$;

-- 4) Storage policies para o bucket website-images
-- Permitir leitura pública
create policy siteavance_storage_public_read_images
on storage.objects for select
using (bucket_id = 'website-images');

-- Inserir apenas autenticados
create policy siteavance_storage_auth_insert_images
on storage.objects for insert
with check (bucket_id = 'website-images' and auth.uid() is not null);

-- Atualizar/Excluir apenas pelo dono
create policy siteavance_storage_auth_update_own_images
on storage.objects for update
using (bucket_id = 'website-images' and owner = auth.uid());

create policy siteavance_storage_auth_delete_own_images
on storage.objects for delete
using (bucket_id = 'website-images' and owner = auth.uid());
