
import { useState } from 'react';
import { Lock, Upload, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo login (in real app, this would be secure authentication)
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('यशस्वीरीत्या लॉगिन झाले!');
    } else {
      toast.error('चुकीचे वापरकर्ता नाव किंवा पासवर्ड');
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg cultural-shadow p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-marathi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-marathi-orange">Admin Login</h2>
              <p className="text-gray-600 mt-2">प्रशासकीय पॅनलमध्ये प्रवेश</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  वापरकर्ता नाव
                </label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="admin"
                  className="border-marathi-orange/30 focus:border-marathi-orange"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  पासवर्ड
                </label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="admin123"
                  className="border-marathi-orange/30 focus:border-marathi-orange"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-marathi-orange hover:bg-marathi-deepOrange text-white"
              >
                लॉगिन करा
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Demo: admin / admin123</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            प्रशासकीय पॅनल
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <Button 
            onClick={() => setIsLoggedIn(false)}
            variant="outline"
            className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
          >
            लॉगआउट
          </Button>
        </div>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="gallery">फोटो गॅलरी</TabsTrigger>
            <TabsTrigger value="popup">पॉपअप</TabsTrigger>
            <TabsTrigger value="news">बातम्या</TabsTrigger>
            <TabsTrigger value="timeline">टाइमलाइन</TabsTrigger>
          </TabsList>

          {/* YouTube Management */}
          <TabsContent value="youtube">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">YouTube व्हिडिओ व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="व्हिडिओ शीर्षक" />
                    <Input placeholder="YouTube व्हिडिओ ID" />
                  </div>
                  <Textarea placeholder="व्हिडिओ वर्णन" rows={3} />
                  <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    व्हिडिओ जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याचे व्हिडिओ</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((video) => (
                      <div key={video} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">व्हिडिओ शीर्षक {video}</h4>
                          <p className="text-sm text-gray-600">ID: dQw4w9WgXcQ</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">फोटो गॅलरी व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">फोटो अपलोड करण्यासाठी इथे क्लिक करा</p>
                    <Button className="mt-4 bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                      फोटो निवडा
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="फोटो शीर्षक" />
                    <Input placeholder="श्रेणी" />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याचे फोटो</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((photo) => (
                      <div key={photo} className="relative group">
                        <img 
                          src={`https://images.unsplash.com/photo-155902761${photo}-cd4628902d4a?w=200&h=200&fit=crop`}
                          alt={`Photo ${photo}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button size="sm" variant="outline" className="text-white border-white mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 border-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Popup Management */}
          <TabsContent value="popup">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">पॉपअप व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Input placeholder="कार्यक्रमाचे नाव" />
                  <Input placeholder="दिनांक आणि वेळ" />
                  <Input placeholder="ठिकाण" />
                  <Textarea placeholder="तपशील" rows={3} />
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <p className="text-gray-600 mb-2">पॉपअप इमेज अपलोड करा</p>
                    <Button variant="outline">इमेज निवडा</Button>
                  </div>
                  
                  <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                    पॉपअप अपडेट करा
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Management */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">बातम्या व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Input placeholder="बातमी शीर्षक" />
                  <Textarea placeholder="बातमी सार" rows={2} />
                  <Textarea placeholder="संपूर्ण बातमी" rows={5} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="लेखक" />
                    <Input type="date" />
                  </div>
                  
                  <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    बातमी जोडा
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Management */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">टाइमलाइन व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="वर्ष" />
                    <Input placeholder="घटना शीर्षक" />
                  </div>
                  <Textarea placeholder="घटनेचे वर्णन" rows={3} />
                  
                  <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    घटना जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याच्या घटना</h3>
                  <div className="space-y-4">
                    {['2020 - संस्था स्थापना', '2021 - शिक्षण सेवा', '2022 - आरोग्य शिबिर'].map((event, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <span>{event}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AdminPanel;
