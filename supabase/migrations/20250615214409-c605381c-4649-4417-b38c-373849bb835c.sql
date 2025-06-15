
-- Ensure public photo gallery bucket exists
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Ensure public bucket for YouTube video thumbnails exists
insert into storage.buckets (id, name, public)
values ('youtube_thumbnails', 'youtube_thumbnails', true)
on conflict (id) do nothing;
