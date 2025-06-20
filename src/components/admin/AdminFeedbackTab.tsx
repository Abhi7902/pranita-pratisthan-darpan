
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { downloadCSV } from '@/utils/csvExport';
import { toast } from 'sonner';

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

  const downloadFeedback = async () => {
    try {
      const feedbackData = feedbacks.map(feedback => ({
        Name: feedback.name,
        Email: feedback.email || '',
        'Contact Number': feedback.contact_number || '',
        Rating: feedback.rating || '',
        Feedback: feedback.feedback,
        Suggestion: feedback.suggestion || '',
        Date: new Date(feedback.created_at).toLocaleDateString()
      }));
      
      downloadCSV(feedbackData, 'Feedback_Data');
    } catch (error) {
      console.error('Error downloading feedback:', error);
      toast.error('Failed to download feedback data');
    }
  };

  const FeedbackDetailsDialog = ({ feedback }: { feedback: Feedback }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Feedback Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700">Name</h4>
              <p>{feedback.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Date</h4>
              <p>{new Date(feedback.created_at).toLocaleDateString()}</p>
            </div>
            {feedback.email && (
              <div>
                <h4 className="font-semibold text-gray-700">Email</h4>
                <p>{feedback.email}</p>
              </div>
            )}
            {feedback.contact_number && (
              <div>
                <h4 className="font-semibold text-gray-700">Contact Number</h4>
                <p>{feedback.contact_number}</p>
              </div>
            )}
            {feedback.rating && (
              <div>
                <h4 className="font-semibold text-gray-700">Rating</h4>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-yellow-500">{feedback.rating}/5</span>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < feedback.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Feedback</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-800">{feedback.feedback}</p>
            </div>
          </div>
          {feedback.suggestion && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Suggestion</h4>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">{feedback.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>User Feedback ({feedbacks.length})</CardTitle>
          <Button onClick={downloadFeedback} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Feedback
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No feedback received yet.</p>
          ) : (
            feedbacks.map(fb => (
              <div key={fb.id} className="p-4 border rounded-lg bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{fb.name}</span>
                    {fb.rating && (
                      <Badge variant="secondary">
                        {fb.rating}/5 ★
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(fb.created_at).toLocaleDateString()}
                    </span>
                    <FeedbackDetailsDialog feedback={fb} />
                  </div>
                </div>
                <div className="text-gray-700 mb-2">
                  <p className="line-clamp-2">{fb.feedback}</p>
                </div>
                {(fb.email || fb.contact_number) && (
                  <div className="text-xs text-gray-400 flex gap-4">
                    {fb.email && <span>Email: {fb.email}</span>}
                    {fb.contact_number && <span>Contact: {fb.contact_number}</span>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFeedbackTab;
