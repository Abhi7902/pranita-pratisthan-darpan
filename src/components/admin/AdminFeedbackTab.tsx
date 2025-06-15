
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface Feedback {
  id: string;
  name: string;
  email?: string;
  contact_number?: string;
  feedback: string;
  suggestion?: string;
  rating?: number;
  created_at: string;
}

const AdminFeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => { fetchFeedbacks(); }, []);

  const fetchFeedbacks = async () => {
    const { data } = await supabase.from('feedback').select('*').order('created_at', {ascending: false});
    setFeedbacks(data || []);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {feedbacks.map(fb => (
            <div key={fb.id} className="py-3">
              <div className="flex flex-wrap items-center mb-2">
                <span className="font-bold mr-3">{fb.name}</span>
                {fb.rating && <span>Rating: {fb.rating}/5</span>}
                <span className="text-xs ml-3">{new Date(fb.created_at).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 mb-1"><b>Feedback:</b> {fb.feedback}</div>
              {fb.suggestion && <div className="text-gray-500 mb-1"><b>Suggestion:</b> {fb.suggestion}</div>}
              {(fb.email || fb.contact_number) && (
                <div className="text-xs text-gray-400">
                  {fb.email && `Email: ${fb.email}`}
                  {fb.contact_number && `, Contact: ${fb.contact_number}`}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFeedbackTab;
