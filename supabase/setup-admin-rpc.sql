-- 1. Cria a função secreta para adicionar administradores (ignorando RLS pro momento, já que é Security Definer)
CREATE OR REPLACE FUNCTION admin_create_user(admin_email text, admin_password text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );
  
  -- Para constar caso você queira extrair em identidades
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) 
  SELECT 
    gen_random_uuid(),
    id,
    format('{"sub":"%s","email":"%s"}', id, admin_email)::jsonb,
    'email',
    id::text,
    now(),
    now(),
    now()
  FROM auth.users
  WHERE email = admin_email;

END;
$$;
