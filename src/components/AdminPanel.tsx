import { useState } from 'react';
import { ArrowLeft, Upload, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAppContext } from '@/contexts/AppContext';

interface AdminPanelProps {
  onBack?: () => void;
}

const AdminPanel = ({ onBack }: AdminPanelProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  
  const {
    timelineEvents,
    addTimelineEvent,
    newsItems,
    addNewsItem,
    youtubeVideos,
    addYouTubeVideo,
    programs,
    addProgram,
    popupData,
    setPopupData
  } = useAppContext();

  // Form states
  const [newVideo, setNewVideo] = useState({ title: '', videoId: '', description: '' });
  const [newNews, setNewNews] = useState({ title: '', summary: '', content: '', author: '', date: '' });
  const [newTimeline, setNewTimeline] = useState({ year: '', title: '', description: '' });
  const [newProgram, setNewProgram] = useState({ name: '', description: '', details: '' });
  const [newPopup, setNewPopup] = useState(popupData);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('यशस्वीरीत्या लॉगिन झाले!');
    } else {
      toast.error('चुकीचे वापरकर्ता नाव किंवा पासवर्ड');
    }
  };

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.videoId) {
      addYouTubeVideo({
        id: Date.now().toString(),
        title: newVideo.title,
        videoId: newVideo.videoId,
        description: newVideo.description
      });
      setNewVideo({ title: '', videoId: '', description: '' });
      toast.success('व्हिडिओ यशस्वीरीत्या जोडला!');
    }
  };

  const handleAddNews = () => {
    if (newNews.title && newNews.content) {
      addNewsItem({
        id: Date.now().toString(),
        title: newNews.title,
        summary: newNews.summary,
        content: newNews.content,
        author: newNews.author,
        date: newNews.date
      });
      setNewNews({ title: '', summary: '', content: '', author: '', date: '' });
      toast.success('बातमी यशस्वीरीत्या जोडली!');
    }
  };

  const handleAddTimeline = () => {
    if (newTimeline.year && newTimeline.title) {
      addTimelineEvent({
        year: newTimeline.year,
        title: newTimeline.title,
        description: newTimeline.description,
        icon: 'Award',
        color: 'bg-marathi-orange'
      });
      setNewTimeline({ year: '', title: '', description: '' });
      toast.success('घटना यशस्वीरीत्या जोडली!');
    }
  };

  const handleAddProgram = () => {
    if (newProgram.name && newProgram.description) {
      addProgram({
        id: Date.now().toString(),
        name: newProgram.name,
        description: newProgram.description,
        details: newProgram.details
      });
      setNewProgram({ name: '', description: '', details: '' });
      toast.success('प्रकल्प यशस्वीरीत्या जोडला!');
    }
  };

  const handleUpdatePopup = () => {
    setPopupData(newPopup);
    toast.success('पॉपअप यशस्वीरीत्या अपडेट केला!');
  };

  if (!isLoggedIn && !onBack) {
    return (
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg cultural-shadow p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-marathi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="h-8 w-8 text-white" />
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
          <div className="flex items-center justify-center gap-4 mb-4">
            {onBack && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBack}
                className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                मागे
              </Button>
            )}
            <h2 className="text-4xl font-bold text-marathi-orange">
              साइट सेटिंग्स
            </h2>
          </div>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          {!onBack && (
            <Button 
              onClick={() => setIsLoggedIn(false)}
              variant="outline"
              className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
            >
              लॉगआउट
            </Button>
          )}
        </div>

        <Tabs defaultValue="popup" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="popup">पॉपअप</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="gallery">फोटो गॅलरी</TabsTrigger>
            <TabsTrigger value="news">बातम्या</TabsTrigger>
            <TabsTrigger value="timeline">टाइमलाइन</TabsTrigger>
            <TabsTrigger value="programs">प्रकल्प</TabsTrigger>
          </TabsList>

          {/* Popup Management - Move to first */}
          <TabsContent value="popup">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">पॉपअप व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newPopup.enabled}
                        onChange={(e) => setNewPopup({...newPopup, enabled: e.target.checked})}
                        className="rounded border-marathi-orange"
                      />
                      <span className="text-sm font-medium">पॉपअप सक्षम करा</span>
                    </label>
                  </div>

                  <Input 
                    placeholder="कार्यक्रमाचे नाव" 
                    value={newPopup.title}
                    onChange={(e) => setNewPopup({...newPopup, title: e.target.value})}
                    className="w-full"
                  />
                  <Input 
                    placeholder="दिनांक आणि वेळ" 
                    value={newPopup.date}
                    onChange={(e) => setNewPopup({...newPopup, date: e.target.value})}
                    className="w-full"
                  />
                  <Input 
                    placeholder="ठिकाण" 
                    value={newPopup.location}
                    onChange={(e) => setNewPopup({...newPopup, location: e.target.value})}
                    className="w-full"
                  />
                  <Input 
                    placeholder="बॅनर इमेज URL (वैकल्पिक)" 
                    value={newPopup.bannerImage || ''}
                    onChange={(e) => setNewPopup({...newPopup, bannerImage: e.target.value})}
                    className="w-full"
                  />
                  <Textarea 
                    placeholder="तपशील" 
                    rows={3} 
                    value={newPopup.description}
                    onChange={(e) => setNewPopup({...newPopup, description: e.target.value})}
                    className="w-full"
                  />
                  
                  <Button 
                    className="bg-marathi-orange hover:bg-marathi-deepOrange text-white w-full"
                    onClick={handleUpdatePopup}
                  >
                    पॉपअप अपडेट करा
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* YouTube Management */}
          <TabsContent value="youtube">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">YouTube व्हिडिओ व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <Input 
                      placeholder="व्हिडिओ शीर्षक" 
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                      className="w-full"
                    />
                    <Input 
                      placeholder="YouTube व्हिडिओ ID" 
                      value={newVideo.videoId}
                      onChange={(e) => setNewVideo({...newVideo, videoId: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <Textarea 
                    placeholder="व्हिडिओ वर्णन" 
                    rows={3} 
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                    className="w-full"
                  />
                  <Button 
                    className="bg-marathi-orange hover:bg-marathi-deepOrange text-white w-full"
                    onClick={handleAddVideo}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    व्हिडिओ जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याचे व्हिडिओ ({youtubeVideos.length})</h3>
                  <div className="space-y-4">
                    {youtubeVideos.map((video) => (
                      <div key={video.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-gray-600">ID: {video.videoId}</p>
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

          {/* News Management */}
          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">बातम्या व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <Input 
                    placeholder="बातमी शीर्षक" 
                    value={newNews.title}
                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                    className="w-full"
                  />
                  <Textarea 
                    placeholder="बातमी सार" 
                    rows={2} 
                    value={newNews.summary}
                    onChange={(e) => setNewNews({...newNews, summary: e.target.value})}
                    className="w-full"
                  />
                  <Textarea 
                    placeholder="संपूर्ण बातमी" 
                    rows={5} 
                    value={newNews.content}
                    onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                    className="w-full"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="लेखक" 
                      value={newNews.author}
                      onChange={(e) => setNewNews({...newNews, author: e.target.value})}
                      className="w-full"
                    />
                    <Input 
                      type="date" 
                      value={newNews.date}
                      onChange={(e) => setNewNews({...newNews, date: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    className="bg-marathi-orange hover:bg-marathi-deepOrange text-white w-full"
                    onClick={handleAddNews}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    बातमी जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याच्या बातम्या ({newsItems.length})</h3>
                  <div className="space-y-4">
                    {newsItems.map((news) => (
                      <div key={news.id} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium">{news.title}</h4>
                        <p className="text-sm text-gray-600">{news.author} - {news.date}</p>
                      </div>
                    ))}
                  </div>
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
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="वर्ष" 
                      value={newTimeline.year}
                      onChange={(e) => setNewTimeline({...newTimeline, year: e.target.value})}
                      className="w-full"
                    />
                    <Input 
                      placeholder="घटना शीर्षक" 
                      value={newTimeline.title}
                      onChange={(e) => setNewTimeline({...newTimeline, title: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <Textarea 
                    placeholder="घटनेचे वर्णन" 
                    rows={3} 
                    value={newTimeline.description}
                    onChange={(e) => setNewTimeline({...newTimeline, description: e.target.value})}
                    className="w-full"
                  />
                  
                  <Button 
                    className="bg-marathi-orange hover:bg-marathi-deepOrange text-white w-full"
                    onClick={handleAddTimeline}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    घटना जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याच्या घटना ({timelineEvents.length})</h3>
                  <div className="space-y-4">
                    {timelineEvents.map((event, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <span>{event.year} - {event.title}</span>
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

          {/* Programs Management */}
          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle className="text-marathi-orange">प्रकल्प व्यवस्थापन</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-w-2xl mx-auto">
                  <Input 
                    placeholder="प्रकल्पाचे नाव" 
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    className="w-full"
                  />
                  <Textarea 
                    placeholder="प्रकल्पाचे वर्णन" 
                    rows={2} 
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    className="w-full"
                  />
                  <Textarea 
                    placeholder="संपूर्ण तपशील" 
                    rows={4} 
                    value={newProgram.details}
                    onChange={(e) => setNewProgram({...newProgram, details: e.target.value})}
                    className="w-full"
                  />
                  
                  <Button 
                    className="bg-marathi-orange hover:bg-marathi-deepOrange text-white w-full"
                    onClick={handleAddProgram}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    प्रकल्प जोडा
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">सध्याचे प्रकल्प ({programs.length})</h3>
                  <div className="space-y-4">
                    {programs.map((program) => (
                      <div key={program.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{program.name}</h4>
                          <p className="text-sm text-gray-600">{program.description}</p>
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
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">फोटो अपलोड करण्यासाठी इथे क्लिक करा</p>
                    <Button className="mt-4 bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                      फोटो निवडा
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="फोटो शीर्षक" className="w-full" />
                    <Input placeholder="श्रेणी" className="w-full" />
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
        </Tabs>
      </div>
    </section>
  );
};

export default AdminPanel;
