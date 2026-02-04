-- Enable UUID extension (usually enabled by default, but good to ensure)
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
-- This table matches the auth.users table and stores public user data.
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Trigger to automatically create a profile when a new user signs up via Auth
-- (Optional but highly recommended)
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. ANIMATIONS TABLE
-- Stores user-created animations
create table public.animations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'Untitled Animation',
  
  -- The core CSS code generated or written
  css_code text,
  
  -- JSON to store specific parameters (duration, easing, etc.) 
  -- useful if you want to reload the "editor" state
  settings jsonb default '{}'::jsonb,
  
  -- Type of animation (e.g., 'fade', 'slide', 'custom')
  type text default 'custom',
  
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.animations enable row level security;

-- Policies for Animations
create policy "Animations are viewable by everyone if public."
  on animations for select
  using ( is_public = true );

create policy "Users can view their own animations."
  on animations for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own animations."
  on animations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own animations."
  on animations for update
  using ( auth.uid() = user_id );

-- 3. CHAT HISTORY TABLE
-- Stores conversation history between user and AI
create table public.chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  code_snippet text, -- Optional: store code separately if parsed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.chat_history enable row level security;

-- Policies for Chat History
create policy "Users can view their own chat history."
  on chat_history for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own chat messages."
  on chat_history for insert
  with check ( auth.uid() = user_id );

-- 4. SAVED ANIMATIONS (Updates/Clarification)
-- The 'animations' table already exists above.
-- We will use it to store "Saved Projects" / "Favorites".
