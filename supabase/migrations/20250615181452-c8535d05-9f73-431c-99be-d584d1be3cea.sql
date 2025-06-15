
-- Add project_id column to photo_gallery for linking to projects
ALTER TABLE public.photo_gallery
ADD COLUMN project_id UUID;

-- Add foreign key constraint: photo_gallery.project_id -> projects.id
ALTER TABLE public.photo_gallery
ADD CONSTRAINT fk_photo_gallery_project
FOREIGN KEY (project_id) REFERENCES projects(id);

-- Optionally allow the 'category' field to be nullable (if you want to keep both fields during transition)
ALTER TABLE public.photo_gallery
ALTER COLUMN category DROP NOT NULL;

-- (Optional future step after backfill) To ensure project_id is always set:
-- ALTER TABLE public.photo_gallery
-- ALTER COLUMN project_id SET NOT NULL;
