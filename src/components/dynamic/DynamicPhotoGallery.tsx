
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

interface Photo {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

const DynamicPhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  // State to handle popup dialog and currently selected photo
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('photo_gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPhotos(data || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading photos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              छायाचित्र दालन
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
            <p className="text-gray-600">अद्याप कोणतेही फोटो उपलब्ध नाहीत.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            छायाचित्र दालन
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            आमच्या संस्थेच्या विविध कार्यक्रमांचे आणि उपक्रमांचे छायाचित्र
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Dialog key={photo.id} open={isDialogOpen && selectedPhoto?.id === photo.id} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setSelectedPhoto(null);
            }}>
              <DialogTrigger asChild>
                <Card 
                  tabIndex={0}
                  className="cultural-shadow hover:shadow-xl transition-shadow duration-300 outline-none cursor-pointer"
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setIsDialogOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPhoto(photo);
                      setIsDialogOpen(true);
                    }
                  }}
                  aria-label={photo.title + ' enlarge'}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{photo.title}</h3>
                      <p className="text-sm text-gray-600">{photo.category}</p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              {/* Modal for large image */}
              <DialogContent className="max-w-xl w-full bg-white shadow-lg rounded-lg p-0">
                {selectedPhoto?.id === photo.id && (
                  <div>
                    <img
                      src={selectedPhoto.image_url}
                      alt={selectedPhoto.title}
                      className="w-full max-h-[60vh] object-contain rounded-t-lg"
                    />
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-2xl text-marathi-orange mb-2">{selectedPhoto.title}</h3>
                      <p className="text-md text-gray-700">{selectedPhoto.category}</p>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicPhotoGallery;

