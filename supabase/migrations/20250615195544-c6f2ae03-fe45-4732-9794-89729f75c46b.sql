
-- Add a boolean column to distinguish news vs normal YouTube videos
ALTER TABLE public.youtube_videos
ADD COLUMN IF NOT EXISTS is_news boolean NOT NULL DEFAULT false;

-- (Optional) Add a comment to document its purpose
COMMENT ON COLUMN public.youtube_videos.is_news IS
  'If true, the video is treated as news and only displayed in the news section. Otherwise, appears in the main YouTube section.';

-- All existing records will be marked as 'false' (default), which is appropriate for legacy non-news videos.
