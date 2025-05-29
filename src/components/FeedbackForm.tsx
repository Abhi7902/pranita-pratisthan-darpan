
import { useState } from 'react';
import { Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
    suggestion: ''
  });

  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.feedback) {
      toast.error('कृपया नाव आणि प्रतिक्रिया भरा');
      return;
    }

    console.log('Feedback submitted:', formData);
    toast.success('तुमची प्रतिक्रिया यशस्वीरीत्या पाठवली गेली!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      rating: 0,
      feedback: '',
      suggestion: ''
    });
  };

  const handleStarClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
            प्रतिक्रिया फॉर्म
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            तुमच्या मतामत आणि सुचना आमच्यासाठी अतिशय महत्वाच्या आहेत
          </p>
        </div>

        <div className="bg-white rounded-lg cultural-shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  नाव *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="तुमचे नाव लिहा"
                  className="border-marathi-orange/30 focus:border-marathi-orange"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ईमेल
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="तुमचा ईमेल पत्ता"
                  className="border-marathi-orange/30 focus:border-marathi-orange"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आमच्या कार्याला रेटिंग द्या
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredStar || formData.rating)
                          ? 'text-marathi-orange fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                तुमची प्रतिक्रिया *
              </label>
              <Textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                placeholder="आमच्या कार्याबद्दल तुमची प्रतिक्रिया लिहा..."
                rows={4}
                className="border-marathi-orange/30 focus:border-marathi-orange"
                required
              />
            </div>

            {/* Suggestions */}
            <div>
              <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-2">
                सुचना (पर्यायी)
              </label>
              <Textarea
                id="suggestion"
                value={formData.suggestion}
                onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                placeholder="आमच्या कार्यात सुधारणेसाठी तुमच्या सुचना..."
                rows={3}
                className="border-marathi-orange/30 focus:border-marathi-orange"
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-marathi-orange hover:bg-marathi-deepOrange text-white px-8 py-3 text-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                प्रतिक्रिया पाठवा
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg cultural-shadow p-6">
            <h3 className="text-xl font-bold text-marathi-orange mb-4">
              आमच्याशी संपर्क साधा
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <strong>फोन:</strong> +91 98765 43210
              </div>
              <div>
                <strong>ईमेल:</strong> info@pranitapratishthan.org
              </div>
              <div>
                <strong>पत्ता:</strong> मुख्य कार्यालय, पुणे
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
