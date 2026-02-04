-- 3. CHAT HISTORY TABLE
-- Stores conversation history between user and AI
create table if not exists public.chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  code_snippet text, -- Optional: store code separately if parsed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (if not already on)
alter table public.chat_history enable row level security;

-- Policies for Chat History (drop first to allow re-running safely)
drop policy if exists "Users can view their own chat history." on chat_history;
create policy "Users can view their own chat history."
  on chat_history for select
  using ( auth.uid() = user_id );

drop policy if exists "Users can insert their own chat messages." on chat_history;
create policy "Users can insert their own chat messages."
  on chat_history for insert
  with check ( auth.uid() = user_id );
