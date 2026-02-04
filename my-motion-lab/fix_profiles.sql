-- Fix for "violates foreign key constraint" error
-- This manually creates profile rows for users who signed up BEFORE the trigger was created.

insert into public.profiles (id, email, full_name, avatar_url)
select 
  id, 
  email, 
  raw_user_meta_data->>'full_name', 
  raw_user_meta_data->>'avatar_url'
from auth.users
where id not in (select id from public.profiles);

-- Verify it worked
select count(*) as profiles_created from public.profiles;
