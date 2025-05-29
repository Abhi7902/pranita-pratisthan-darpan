
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Award, Heart } from 'lucide-react';

const ProgramPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { programs } = useAppContext();
  
  const program = programs.find(p => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">प्रकल्प सापडला नाही</h1>
          <Button onClick={() => navigate('/')} className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
            मुख्यपृष्ठावर परत जा
          </Button>
        </div>
      </div>
    );
  }

  const getIcon = (name: string) => {
    if (name.includes('शिक्षण')) return Award;
    if (name.includes('आरोग्य')) return Heart;
    return Users;
  };

  const IconComponent = getIcon(program.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-marathi-orange text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            मुख्यपृष्ठावर परत जा
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold">{program.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 cultural-shadow">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-marathi-orange rounded-full flex items-center justify-center mr-6">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-marathi-orange mb-2">{program.name}</h2>
              <p className="text-lg text-gray-600">{program.description}</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">तपशील</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{program.details}</p>
          </div>

          {program.image && (
            <div className="mt-8">
              <img 
                src={program.image} 
                alt={program.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
            <h3 className="text-xl font-bold text-marathi-orange mb-3">संपर्क माहिती</h3>
            <p className="text-gray-700">
              या प्रकल्पाबद्दल अधिक माहितीसाठी किंवा सहभागी होण्यासाठी कृपया आमच्याशी संपर्क साधा.
            </p>
            <Button className="mt-4 bg-marathi-orange hover:bg-marathi-deepOrange text-white">
              आमच्याशी संपर्क साधा
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
