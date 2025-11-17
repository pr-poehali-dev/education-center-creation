import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://example.com/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: '✅ Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        setIsDialogOpen(false);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const courses = [
    {
      id: 1,
      title: 'Web-разработка',
      description: 'Создание современных сайтов и приложений',
      duration: '4 месяца',
      level: 'Начальный',
      price: '45 000 ₽',
      color: 'bg-primary',
      icon: 'Code2',
      students: 124
    },
    {
      id: 2,
      title: 'UX/UI Дизайн',
      description: 'Проектирование интерфейсов и пользовательского опыта',
      duration: '3 месяца',
      level: 'Средний',
      price: '38 000 ₽',
      color: 'bg-accent',
      icon: 'Palette',
      students: 89
    },
    {
      id: 3,
      title: 'Data Science',
      description: 'Анализ данных и машинное обучение',
      duration: '6 месяцев',
      level: 'Продвинутый',
      price: '55 000 ₽',
      color: 'bg-secondary',
      icon: 'BarChart3',
      students: 67
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Продвижение бизнеса в интернете',
      duration: '2 месяца',
      level: 'Начальный',
      price: '32 000 ₽',
      color: 'bg-orange',
      icon: 'TrendingUp',
      students: 156
    }
  ];

  const schedule = [
    { day: 'Понедельник', time: '18:00 - 20:00', course: 'Web-разработка', room: 'Аудитория 101' },
    { day: 'Вторник', time: '19:00 - 21:00', course: 'UX/UI Дизайн', room: 'Аудитория 203' },
    { day: 'Среда', time: '18:00 - 20:00', course: 'Data Science', room: 'Аудитория 105' },
    { day: 'Четверг', time: '19:00 - 21:00', course: 'Digital Marketing', room: 'Аудитория 201' },
    { day: 'Пятница', time: '18:00 - 20:00', course: 'Web-разработка', room: 'Аудитория 101' },
    { day: 'Суббота', time: '10:00 - 14:00', course: 'Все курсы', room: 'Практика' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 трендов в веб-разработке 2024',
      excerpt: 'Обзор самых актуальных технологий и подходов',
      date: '15 ноября 2024',
      readTime: '5 мин'
    },
    {
      id: 2,
      title: 'Как выбрать первый курс программирования',
      excerpt: 'Полное руководство для начинающих',
      date: '12 ноября 2024',
      readTime: '7 мин'
    },
    {
      id: 3,
      title: 'Карьера в IT: с чего начать',
      excerpt: 'Практические советы от экспертов индустрии',
      date: '8 ноября 2024',
      readTime: '6 мин'
    }
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl">EduCenter</span>
          </div>
          
          <nav className="hidden md:flex gap-6 animate-fade-in">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('courses')} className="text-sm font-medium hover:text-primary transition-colors">
              Курсы
            </button>
            <button onClick={() => scrollToSection('schedule')} className="text-sm font-medium hover:text-primary transition-colors">
              Расписание
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-sm font-medium hover:text-primary transition-colors">
              Блог
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animate-fade-in bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                <Icon name="Phone" size={16} className="mr-2" />
                Связаться
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Записаться на курс</DialogTitle>
                <DialogDescription>
                  Заполните форму и мы свяжемся с вами для консультации
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input 
                    id="name" 
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Курс *</Label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите курс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web-разработка</SelectItem>
                      <SelectItem value="design">UX/UI Дизайн</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Комментарий</Label>
                  <Textarea 
                    id="message"
                    placeholder="Расскажите о вашем опыте и целях"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 md:py-32 px-4">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  🚀 Онлайн обучение нового уровня
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                  Освой навыки
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"> будущего</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Современные онлайн-курсы от практикующих специалистов. 
                  Начни карьеру в IT с поддержкой менторов и реальными проектами в портфолио.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white h-12 px-8">
                        Выбрать курс
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button size="lg" variant="outline" className="h-12 px-8 border-2 hover:bg-muted">
                    <Icon name="Play" size={18} className="mr-2" />
                    Смотреть видео
                  </Button>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">436+</div>
                    <div className="text-sm text-muted-foreground">Студентов</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">12</div>
                    <div className="text-sm text-muted-foreground">Курсов</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-orange bg-clip-text text-transparent">95%</div>
                    <div className="text-sm text-muted-foreground">Довольных</div>
                  </div>
                </div>
              </div>
              <div className="relative animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="https://cdn.poehali.dev/projects/e8169486-2039-4674-a17b-badfde2df5d9/files/e8b0d827-1d74-44ed-8ca8-9e898d039fac.jpg" 
                  alt="Students learning" 
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="py-20 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Популярные направления
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши курсы</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Выбери направление и начни карьеру в IT. Все курсы включают практику и поддержку менторов.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <Card 
                  key={course.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up border-2 hover:border-primary/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={course.icon as any} size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.level}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icon name="Users" size={14} />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-2xl font-bold mb-3">{course.price}</div>
                      <Button className="w-full" variant="outline">
                        Узнать больше
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                Планируй обучение
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Расписание занятий</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Удобный график занятий с учетом твоей загруженности
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="week" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="week">Недельное расписание</TabsTrigger>
                    <TabsTrigger value="calendar">Календарь</TabsTrigger>
                  </TabsList>
                  <TabsContent value="week" className="space-y-4">
                    {schedule.map((item, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{item.day}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Icon name="Clock" size={14} />
                                {item.time}
                              </CardDescription>
                            </div>
                            <Badge className="bg-primary/10 text-primary">{item.course}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="MapPin" size={14} />
                            <span>{item.room}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="calendar">
                    <Card>
                      <CardContent className="pt-6">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border w-full"
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary to-accent text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Записаться на курс</CardTitle>
                    <CardDescription className="text-white/90">
                      Оставь заявку и получи консультацию
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-white text-primary hover:bg-white/90">
                          Оставить заявку
                          <Icon name="Send" size={16} className="ml-2" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      Ближайший старт
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Web-разработка</span>
                      <Badge>25 ноября</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">UX/UI Дизайн</span>
                      <Badge>1 декабря</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Data Science</span>
                      <Badge>10 декабря</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="py-20 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-orange/10 text-orange border-orange/20">
                Полезные материалы
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Блог</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Статьи, советы и новости из мира IT-образования
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Icon name="Calendar" size={14} />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Icon name="Clock" size={14} />
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group/btn px-0">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 px-4">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in-up">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Свяжитесь с нами
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
                <p className="text-lg text-muted-foreground">
                  Остались вопросы? Мы всегда на связи!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Телефон</CardTitle>
                    <CardDescription className="text-base">+7 (999) 123-45-67</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <CardTitle>Email</CardTitle>
                    <CardDescription className="text-base">info@educenter.ru</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon name="MapPin" size={24} className="text-secondary" />
                    </div>
                    <CardTitle>Адрес</CardTitle>
                    <CardDescription className="text-base">Москва, ул. Примерная, 123</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="mt-8 bg-gradient-to-br from-muted to-background">
                <CardHeader>
                  <CardTitle>Социальные сети</CardTitle>
                  <CardDescription>Следи за новостями в наших соцсетях</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    <Button size="icon" variant="outline" className="h-12 w-12 rounded-full hover:bg-primary hover:text-white transition-colors">
                      <Icon name="Youtube" size={20} />
                    </Button>
                    <Button size="icon" variant="outline" className="h-12 w-12 rounded-full hover:bg-accent hover:text-white transition-colors">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button size="icon" variant="outline" className="h-12 w-12 rounded-full hover:bg-secondary hover:text-white transition-colors">
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4 bg-muted/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <span className="font-bold">EduCenter</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EduCenter. Все права защищены.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;