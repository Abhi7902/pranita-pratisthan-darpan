
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navbar = ({ activeSection, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { programs } = useAppContext();

  const navItems = [
    { id: 'home', label: 'मुख्यपृष्ठ', icon: '🏠' },
    { id: 'about', label: 'संस्था माहिती', icon: '📖' },
    { id: 'gallery', label: 'छायाचित्र दालन', icon: '📸' },
    { id: 'news', label: 'बातम्या व प्रसारमाध्यम', icon: '📰' },
    { id: 'youtube', label: 'YouTube विंडो', icon: '🎥' }
  ];

  const handleProgramClick = (programId: string) => {
    navigate(`/program/${programId}`);
  };

  const handleMELClick = () => {
    navigate('/mel');
  };

  return (
    <nav className="fixed top-0 w-full glass-cultural backdrop-blur-xl z-50 cultural-shadow-lg border-b-4 border-cultural">
      {/* Decorative top border */}
      <div className="w-full h-1 cultural-gradient"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center group">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3 hover-lift" onClick={() => onNavigate('home')}>
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Pranita Pratisthan Logo"
                  className="h-10 w-auto"
                  style={{ filter: "drop-shadow(0 2px 8px #E6510055)" }}
                />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-bounce-subtle" />
              </div>
              <div>
                <h1 className="heading-cultural text-xl font-bold text-marathi-orange">
                  प्रणिता प्रतिष्ठान
                </h1>
                <p className="text-xs text-marathi-deepOrange opacity-80">
                  सेवा • संस्कृती • विकास
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white bg-marathi-orange cultural-shadow'
                    : 'text-gray-700 hover:text-marathi-orange hover:bg-orange-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-cultural">{item.label}</span>
                </span>
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-glow"></div>
                )}
              </button>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-700 hover:text-marathi-orange hover:bg-orange-50 text-sm px-4 group border border-orange-200 hover:border-marathi-orange"
                >
                  <span className="mr-2">🚀</span>
                  <span className="text-cultural">प्रकल्प</span>
                  <ChevronDown className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-cultural border-2 border-orange-100 cultural-shadow-lg z-50 min-w-48">
                {programs.map((program) => (
                  <DropdownMenuItem 
                    key={program.id}
                    className="hover:bg-orange-50 cursor-pointer text-cultural py-3 px-4 border-b border-orange-100 last:border-b-0"
                    onClick={() => handleProgramClick(program.id)}
                  >
                    <span className="mr-3">📋</span>
                    {program.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              onClick={handleMELClick}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg cultural-shadow hover-lift border border-blue-200"
            >
              <span className="mr-2">🏥</span>
              MEL
            </Button>

            <Button 
              onClick={() => onNavigate('admin')}
              size="sm"
              className="bg-marathi-orange hover:bg-marathi-deepOrange text-white text-sm px-4 py-2 rounded-lg cultural-shadow hover-lift border border-orange-200"
            >
              <span className="mr-2">⚙️</span>
              Admin
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-marathi-orange p-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden glass-cultural border-t-2 border-orange-100 mt-2 rounded-b-2xl cultural-shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-white bg-marathi-orange cultural-shadow'
                      : 'text-gray-700 hover:text-marathi-orange hover:bg-orange-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-cultural">{item.label}</span>
                </button>
              ))}
              
              <div className="px-4 py-2 border-t border-orange-100">
                <p className="text-xs font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <span>🚀</span>
                  <span className="text-cultural">प्रकल्प</span>
                </p>
                {programs.map((program) => (
                  <button 
                    key={program.id}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-600 hover:text-marathi-orange hover:bg-orange-50 rounded-lg transition-colors"
                    onClick={() => {
                      handleProgramClick(program.id);
                      setIsOpen(false);
                    }}
                  >
                    <span>📋</span>
                    <span className="text-cultural">{program.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 px-4 pt-3 border-t border-orange-100">
                <Button 
                  onClick={() => {
                    handleMELClick();
                    setIsOpen(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm cultural-shadow"
                  size="sm"
                >
                  <span className="mr-2">🏥</span>
                  MEL
                </Button>
                
                <Button 
                  onClick={() => {
                    onNavigate('admin');
                    setIsOpen(false);
                  }}
                  className="flex-1 bg-marathi-orange hover:bg-marathi-deepOrange text-white text-sm cultural-shadow"
                  size="sm"
                >
                  <span className="mr-2">⚙️</span>
                  Admin
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
