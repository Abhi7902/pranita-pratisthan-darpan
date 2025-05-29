
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  const projects = [
    'शिक्षण सेवा',
    'आरोग्य सेवा', 
    'महिला सक्षमीकरण',
    'कृषी विकास',
    'पर्यावरण संरक्षण',
    'युवा विकास'
  ];

  const navItems = [
    { id: 'home', label: 'मुख्यपृष्ठ' },
    { id: 'gallery', label: 'छायाचित्र दालन' },
    { id: 'news', label: 'बातम्या व प्रसारमाध्यम' },
    { id: 'youtube', label: 'YouTube विंडो' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg border-b-4 border-marathi-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
              <h1 className="text-2xl font-bold saffron-gradient bg-clip-text text-transparent">
                प्रणिता प्रतिष्ठान
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-marathi-orange border-b-2 border-marathi-orange'
                    : 'text-gray-700 hover:text-marathi-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-marathi-orange"
                >
                  प्रकल्प <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-marathi-orange/20">
                {projects.map((project) => (
                  <DropdownMenuItem 
                    key={project}
                    className="hover:bg-marathi-orange/10 cursor-pointer"
                  >
                    {project}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              onClick={() => onNavigate('admin')}
              className="bg-marathi-orange hover:bg-marathi-deepOrange text-white"
            >
              Admin Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-marathi-orange"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t-2 border-marathi-orange/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeSection === item.id
                      ? 'text-marathi-orange bg-marathi-orange/10'
                      : 'text-gray-700 hover:text-marathi-orange hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-700 mb-2">प्रकल्प</p>
                {projects.map((project) => (
                  <button 
                    key={project}
                    className="block px-3 py-1 text-sm text-gray-600 hover:text-marathi-orange w-full text-left"
                  >
                    {project}
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={() => {
                  onNavigate('admin');
                  setIsOpen(false);
                }}
                className="mx-3 my-2 bg-marathi-orange hover:bg-marathi-deepOrange text-white w-auto"
              >
                Admin Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
