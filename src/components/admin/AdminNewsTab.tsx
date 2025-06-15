
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
}

const AdminNewsTab = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [form, setForm] = useState({
    title: '', summary: '', content: '', date: '', author: ''
  });

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    setNews(data || []);
    if (error) toast.error('News fetch failed');
  };

  const handleAdd = async () => {
    if (!form.title || !form.content) {
      toast.error('Title and content required');
      return;
    }
    try {
      await supabase.from('news').insert(form);
      setForm({ title: '', summary: '', content: '', date: '', author: '' });
      toast.success('News Added!');
      fetchNews();
    } catch {
      toast.error('Failed to add news');
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('news').delete().eq('id', id);
    toast.success('Deleted');
    fetchNews();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>News Administration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
          <Input placeholder="Title" value={form.title} onChange={e =>
            setForm(f => ({ ...f, title: e.target.value }))} />
          <Input placeholder="Summary" value={form.summary} onChange={e =>
            setForm(f => ({ ...f, summary: e.target.value }))} />
          <Input type="date" value={form.date} onChange={e =>
            setForm(f => ({ ...f, date: e.target.value }))} />
        </div>
        <Input placeholder="Author" value={form.author} className="mb-4"
          onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
        <Textarea placeholder="Content" rows={4} className="mb-2"
          value={form.content}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
        <Button onClick={handleAdd}>Add News</Button>

        <div className="space-y-4 mt-8">
          {news.map(article => (
            <div key={article.id} className="p-4 border rounded">
              <div className="font-bold">{article.title}</div>
              <div className="text-sm">{article.summary}</div>
              <div className="text-xs text-gray-600 mb-1">
                {article.date} | {article.author}
              </div>
              <div className="text-xs text-gray-500 line-clamp-3">{article.content}</div>
              <Button 
                variant="outline"
                size="sm"
                className="text-red-600 mt-2"
                onClick={() => handleDelete(article.id)}
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

export default AdminNewsTab;
