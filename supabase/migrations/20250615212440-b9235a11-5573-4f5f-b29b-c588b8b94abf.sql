
-- Create a public storage bucket for president and secretary photos
insert into storage.buckets (id, name, public)
values ('president_secretary', 'president_secretary', true)
on conflict (id) do nothing;
