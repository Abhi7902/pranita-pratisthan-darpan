
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  image_url: string;
  category?: string | null;
  project_id?: string | null;
  created_at: string;
}

const AdminPhotoGalleryTab = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('photo_gallery')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Failed to load gallery');
    setPhotos(data || []);
  };

  const handleAddPhoto = async () => {
    if (!title || !image) {
      toast.error('Photo and title required');
      return;
    }
    setUploading(true);
    try {
      const ext = image.name.split('.').pop();
      const filename = `gallery_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filename, image, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filename);

      const { error } = await supabase
        .from('photo_gallery')
        .insert({
          title,
          category,
          image_url: publicUrl,
          image_path: filename
        });
      if (error) throw error;
      setTitle('');
      setCategory('');
      setImage(null);
      toast.success('Photo added');
      fetchPhotos();
    } catch (error) {
      toast.error('Failed to add photo');
    }
    setUploading(false);
  };

  const handleDeletePhoto = async (photo: Photo) => {
    try {
      if (photo.image_url) {
        // Try to extract filename for removal
        const parts = photo.image_url.split('/');
        const filename = parts[parts.length - 1];
        await supabase.storage.from('gallery').remove([filename]);
      }
      await supabase.from('photo_gallery').delete().eq('id', photo.id);
      toast.success('Photo removed');
      fetchPhotos();
    } catch {
      toast.error('Failed to remove photo');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo Gallery Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Photo title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            placeholder="Category (optional)"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            disabled={uploading}
          />
        </div>
        <Button onClick={handleAddPhoto} disabled={uploading || !title || !image}>
          Add Photo
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {photos.map(photo => (
            <div key={photo.id} className="rounded shadow p-3 flex flex-col items-center relative">
              <img src={photo.image_url} alt={photo.title} className="w-full h-48 object-cover mb-2 rounded" />
              <div className="font-bold">{photo.title}</div>
              <div className="text-xs text-gray-600">{photo.category}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 text-red-600" 
                onClick={() => handleDeletePhoto(photo)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPhotoGalleryTab;
