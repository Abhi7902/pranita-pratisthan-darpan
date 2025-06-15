
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface YouTubeVideo {
  id: string;
  title: string;
  video_id: string;
  thumbnail_url: string;
  description: string;
}

const AdminYouTubeTab = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [title, setTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Failed to load videos');
    setVideos(data || []);
  };

  const handleAdd = async () => {
    if (!title || !videoId) {
      toast.error('Title and videoId required');
      return;
    }
    setUploading(true);
    try {
      let thumbUrl = '';
      if (thumbnail) {
        const ext = thumbnail.name.split('.').pop();
        const filename = `youtube_thumb_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase
          .storage.from('youtube_thumbnails').upload(filename, thumbnail, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: { publicUrl } } = supabase.storage
          .from('youtube_thumbnails').getPublicUrl(filename);
        thumbUrl = publicUrl;
      }
      const { error } = await supabase.from('youtube_videos').insert({
        title,
        video_id: videoId,
        description: desc,
        thumbnail_url: thumbUrl,
        is_news: false
      });
      if (error) throw error;
      setTitle('');
      setVideoId('');
      setDesc('');
      setThumbnail(null);
      toast.success('Video added');
      fetchVideos();
    } catch {
      toast.error('Failed to add video');
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('youtube_videos').delete().eq('id', id);
      toast.success('Deleted');
      fetchVideos();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Video Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Input placeholder="Video Title" value={title}
            onChange={e => setTitle(e.target.value)} />
          <Input placeholder="YouTube Video ID" value={videoId}
            onChange={e => setVideoId(e.target.value)} />
          <Input placeholder="Description" value={desc}
            onChange={e => setDesc(e.target.value)} />
          <Input type="file" accept="image/*"
            onChange={e => setThumbnail(e.target.files?.[0] || null)}
            />
        </div>
        <Button onClick={handleAdd} disabled={uploading}>Add Video</Button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {videos.map(vid => (
            <div key={vid.id} className="border rounded p-3">
              {vid.thumbnail_url &&
                <img src={vid.thumbnail_url} alt={vid.title} className="w-full h-32 object-cover rounded mb-2" />}
              <div className="font-bold">{vid.title}</div>
              <div className="text-xs text-gray-700">{vid.video_id}</div>
              <div className="text-xs text-gray-500 mb-2">{vid.description}</div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600"
                onClick={() => handleDelete(vid.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminYouTubeTab;
