
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  description: string;
  details: string;
  image_url: string;
}

const AdminProjectsTab = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: '', description: '', details: '', image: null as File | null
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects(data || []);
    if (error) toast.error('Project fetch failed');
  };

  const handleAdd = async () => {
    if (!form.name || !form.description || !form.image) {
      toast.error('Name, desc, and image required');
      return;
    }
    setUploading(true);
    try {
      const ext = (form.image as File).name.split('.').pop();
      const filename = `project_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('gallery')
        .upload(filename, form.image as File, { upsert: true });
      if (uploadErr) throw uploadErr;
      const { data: { publicUrl } } = supabase.storage
        .from('gallery').getPublicUrl(filename);

      const { error } = await supabase.from('projects').insert({
        name: form.name,
        description: form.description,
        details: form.details,
        image_url: publicUrl,
        image_path: filename
      });
      if (error) throw error;
      setForm({ name: '', description: '', details: '', image: null });
      toast.success('Project added');
      fetchProjects();
    } catch {
      toast.error('Failed to add project');
    }
    setUploading(false);
  };

  const handleDelete = async (proj: Project) => {
    try {
      await supabase.from('projects').delete().eq('id', proj.id);
      toast.success('Project removed');
      fetchProjects();
    } catch {
      toast.error('Remove failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program/Project Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Input placeholder="Name" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input placeholder="Description" value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <Input placeholder="Details" value={form.details}
            onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
          <Input type="file" accept="image/*"
            onChange={e => setForm(f => ({ ...f, image: e.target.files?.[0] || null }))}
            disabled={uploading}
          />
        </div>
        <Button onClick={handleAdd} disabled={uploading || !form.name || !form.description || !form.image}>
          Add Program
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {projects.map(proj => (
            <div key={proj.id} className="border rounded p-3">
              {proj.image_url && <img src={proj.image_url} alt={proj.name} className="w-full h-32 object-cover mb-2 rounded" />}
              <div className="font-bold">{proj.name}</div>
              <div className="text-xs text-gray-500">{proj.description}</div>
              <div className="text-xs mt-2">{proj.details}</div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 mt-2"
                onClick={() => handleDelete(proj)}
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

export default AdminProjectsTab;
