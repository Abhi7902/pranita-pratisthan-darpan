
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const AdminTimelineTab = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [form, setForm] = useState({
    year: '', title: '', description: '', icon: '', color: ''
  });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('timeline_events').select('*').order('year', { ascending: false });
    setEvents(data || []);
    if (error) toast.error('Failed to fetch events');
  };

  const handleAdd = async () => {
    if (!form.year || !form.title) {
      toast.error('Year and title required');
      return;
    }
    try {
      await supabase.from('timeline_events').insert(form);
      setForm({ year: '', title: '', description: '', icon: '', color: '' });
      toast.success('Event Added!');
      fetchEvents();
    } catch {
      toast.error('Failed to add event');
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('timeline_events').delete().eq('id', id);
    toast.success('Deleted event');
    fetchEvents();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Event Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <Input placeholder="Year" value={form.year}
            onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
          <Input placeholder="Title" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <Input placeholder="Icon class name (optional)" className="mb-2"
          value={form.icon}
          onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
        <Input placeholder="Color class (optional)" className="mb-2"
          value={form.color}
          onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
        <Textarea placeholder="Description" rows={2}
          value={form.description}
          className="mb-2"
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <Button onClick={handleAdd}>Add Event</Button>

        <div className="space-y-4 mt-6">
          {events.map(evt => (
            <div key={evt.id} className="border p-3 rounded space-y-1">
              <div className="font-bold">{evt.year}: {evt.title}</div>
              <div className="text-sm">{evt.description}</div>
              <div className="text-xs text-gray-400">{evt.icon} {evt.color}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 mt-2"
                onClick={() => handleDelete(evt.id)}
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

export default AdminTimelineTab;
