
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'शिक्षण सेवा कार्यक्रम',
      category: 'शिक्षण'
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'आरोग्य शिबिर',
      category: 'आरोग्य'
    },
    {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'महिला सक्षमीकरण कार्यशाळा',
      category: 'सक्षमीकरण'
    },
    {
      url: 'https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'कृषी प्रशिक्षण',
      category: 'कृषी'
    },
    {
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'पर्यावरण संवर्धन',
      category: 'पर्यावरण'
    },
    {
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'युवा विकास कार्यक्रम',
      category: 'युवा'
    }
  ];

  const categories = ['सर्व', 'शिक्षण', 'आरोग्य', 'सक्षमीकरण', 'कृषी', 'पर्यावरण', 'युवा'];
  const [selectedCategory, setSelectedCategory] = useState('सर्व');

  const filteredPhotos = selectedCategory === 'सर्व' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    const totalImages = filteredPhotos.length;
    
    if (direction === 'prev') {
      setSelectedImage(currentIndex > 0 ? currentIndex - 1 : totalImages - 1);
    } else {
      setSelectedImage(currentIndex < totalImages - 1 ? currentIndex + 1 : 0);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
            छायाचित्र दालन
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            आमच्या समाजसेवेच्या कार्यांची झलक
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-marathi-orange text-white cultural-shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-marathi-orange/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cultural-shadow cursor-pointer transition-transform hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg font-bold mb-2">{photo.title}</h3>
                  <span className="text-sm bg-marathi-orange px-3 py-1 rounded-full">
                    {photo.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-marathi-orange z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-marathi-orange z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-marathi-orange z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="max-w-4xl max-h-[90vh] w-full">
              <img
                src={filteredPhotos[selectedImage].url}
                alt={filteredPhotos[selectedImage].title}
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-xl font-bold">{filteredPhotos[selectedImage].title}</h3>
                <span className="text-marathi-orange">{filteredPhotos[selectedImage].category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
