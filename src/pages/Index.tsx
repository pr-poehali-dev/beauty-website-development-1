import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/BookingModal';

const HERO_IMG = 'https://cdn.poehali.dev/projects/e2a9d400-6e95-4f8a-b6ce-da4780370807/files/cdfe2676-4cec-428a-8fa2-b2d8abe92df9.jpg';

const services = [
  {
    icon: 'Scissors',
    title: 'Уход за волосами',
    desc: 'Ботокс, кератин, биксипластия — восстановление и блеск волос',
    items: [
      { name: 'Ботокс для волос', price: 'от 3 500 ₽' },
      { name: 'Кератиновое выпрямление', price: 'от 4 000 ₽' },
      { name: 'Биксипластия', price: 'от 4 500 ₽' },
    ],
  },
  {
    icon: 'Palette',
    title: 'Стрижки и колористика',
    desc: 'Окрашивания и стрижки любой сложности',
    items: [
      { name: 'Женская стрижка', price: 'от 1 800 ₽' },
      { name: 'Окрашивание в один тон', price: 'от 3 000 ₽' },
      { name: 'Сложное окрашивание', price: 'от 6 500 ₽' },
    ],
  },
  {
    icon: 'Hand',
    title: 'Ногтевой сервис',
    desc: 'Маникюр и педикюр премиального качества',
    items: [
      { name: 'Маникюр с покрытием', price: 'от 2 200 ₽' },
      { name: 'Педикюр с покрытием', price: 'от 2 800 ₽' },
      { name: 'Дизайн (1 ноготь)', price: 'от 150 ₽' },
    ],
  },
  {
    icon: 'Zap',
    title: 'Аппаратная косметология',
    desc: 'Лазерная эпиляция на современном оборудовании',
    items: [
      { name: 'Лазерная эпиляция (зона)', price: 'от 700 ₽' },
      { name: 'Подмышки', price: 'от 900 ₽' },
      { name: 'Всё тело', price: 'от 7 500 ₽' },
    ],
  },
  {
    icon: 'Eye',
    title: 'Взгляд · Lash & Brow',
    desc: 'Наращивание и ламинирование ресниц, коррекция бровей',
    items: [
      { name: 'Наращивание ресниц', price: 'от 2 500 ₽' },
      { name: 'Ламинирование ресниц', price: 'от 2 200 ₽' },
      { name: 'Коррекция бровей', price: 'от 800 ₽' },
    ],
  },
  {
    icon: 'Sparkles',
    title: 'Перманентный макияж',
    desc: 'Перманент бровей и губ — естественно и стойко',
    items: [
      { name: 'Перманент бровей', price: 'от 7 000 ₽' },
      { name: 'Перманент губ', price: 'от 8 000 ₽' },
      { name: 'Коррекция', price: 'от 3 000 ₽' },
    ],
  },
  {
    icon: 'Flower2',
    title: 'Тело · Массаж',
    desc: 'Расслабляющий и оздоровительный массаж',
    items: [
      { name: 'Классический массаж', price: 'от 3 000 ₽' },
      { name: 'Антицеллюлитный', price: 'от 3 500 ₽' },
      { name: 'Релакс-массаж', price: 'от 3 200 ₽' },
    ],
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBooking = () => setBookingOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <span className="font-display text-3xl font-semibold text-primary leading-none">Малина</span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">территория красоты</span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors">Услуги</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">О салоне</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            <Button onClick={openBooking} className="rounded-full px-6">Записаться</Button>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-5 py-4 flex flex-col gap-4 text-sm animate-fade-in">
            <button onClick={() => scrollTo('services')} className="text-left">Услуги</button>
            <button onClick={() => scrollTo('about')} className="text-left">О салоне</button>
            <button onClick={() => scrollTo('contacts')} className="text-left">Контакты</button>
            <Button onClick={openBooking} className="rounded-full w-full">Записаться</Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-16 min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Интерьер салона красоты Малина" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        </div>
        <div className="container mx-auto px-5 relative">
          <div className="max-w-xl animate-fade-in">
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-5">ЖК Алхимово · Москва</p>
            <h1 className="font-display text-5xl sm:text-7xl font-medium leading-[1.05] mb-6">
              Территория красоты, где вам рады
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Уход за волосами, ногтевой сервис, косметология и взгляд — всё для вашей естественной красоты в одном пространстве.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={openBooking} size="lg" className="rounded-full px-8 text-base">
                Записаться онлайн
              </Button>
              <Button onClick={() => scrollTo('services')} variant="outline" size="lg" className="rounded-full px-8 text-base">
                Услуги и цены
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About / USP */}
      <section id="about" className="py-20 sm:py-28">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Award', title: 'Мастера-эксперты', text: 'Команда профессионалов с опытом и любовью к делу' },
              { icon: 'ShieldCheck', title: 'Безопасность', text: 'Стерильность инструментов и сертифицированные материалы' },
              { icon: 'Heart', title: 'Комфорт', text: 'Уютная атмосфера, в которую хочется возвращаться' },
            ].map((f) => (
              <div key={f.title} className="text-center px-4">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent flex items-center justify-center text-primary">
                  <Icon name={f.icon} size={26} />
                </div>
                <h3 className="font-display text-2xl mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Prices */}
      <section id="services" className="py-20 sm:py-28 bg-secondary/40">
        <div className="container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Прайс-лист</p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4">Услуги и цены</h2>
            <p className="text-muted-foreground">Полный спектр бьюти-услуг под одной крышей. Финальная стоимость зависит от сложности и длины волос.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card rounded-2xl p-7 border border-border hover-scale">
                <div className="w-12 h-12 mb-5 rounded-full bg-accent flex items-center justify-center text-primary">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{s.desc}</p>
                <ul className="space-y-3 mb-6">
                  {s.items.map((it) => (
                    <li key={it.name} className="flex items-baseline justify-between gap-3 text-sm">
                      <span>{it.name}</span>
                      <span className="flex-1 border-b border-dotted border-border mb-1" />
                      <span className="font-medium text-primary whitespace-nowrap">{it.price}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={openBooking} variant="outline" className="w-full rounded-full">
                  Записаться
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts + Map */}
      <section id="contacts" className="py-20 sm:py-28">
        <div className="container mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Контакты</p>
              <h2 className="font-display text-4xl sm:text-5xl mb-8">Приходите в гости</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Icon name="MapPin" className="text-primary shrink-0 mt-1" size={22} />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ЖК «Алхимово», ул. Уточкина, д. 8, к. 2</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Clock" className="text-primary shrink-0 mt-1" size={22} />
                  <div>
                    <p className="font-medium">Режим работы</p>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="Phone" className="text-primary shrink-0 mt-1" size={22} />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <a href="tel:+79895958645" className="text-muted-foreground hover:text-primary transition-colors">+7 (989) 595-86-45</a>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button onClick={openBooking} className="rounded-full px-7">
                  <Icon name="CalendarHeart" size={18} className="mr-2" /> Онлайн-запись
                </Button>
                <a href="https://wa.me/79895958645" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full px-6">
                    <Icon name="MessageCircle" size={18} className="mr-2" /> WhatsApp
                  </Button>
                </a>
                <a href="tel:+79895958645">
                  <Button variant="outline" className="rounded-full px-6">
                    <Icon name="Phone" size={18} className="mr-2" /> Позвонить
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-[400px] shadow-sm">
              <iframe
                title="Карта — салон Малина, ЖК Алхимово"
                src="https://yandex.ru/map-widget/v1/?ll=37.567%2C55.520&z=14&text=Москва%2C%20улица%20Уточкина%2C%208к2"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-display text-3xl font-semibold">Малина</span>
            <p className="text-background/60 text-sm mt-2 max-w-xs">Территория красоты в ЖК «Алхимово». Эстетика, уход и профессионализм.</p>
          </div>
          <div className="text-sm text-background/70 space-y-1">
            <p>ул. Уточкина, д. 8, к. 2, Москва</p>
            <p>Ежедневно 9:00–21:00</p>
            <a href="tel:+79895958645" className="hover:text-background/90 transition-colors">+7 (989) 595-86-45</a>
          </div>
          <div className="flex gap-3 items-start">
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"><Icon name="Instagram" size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"><Icon name="Send" size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"><Icon name="MessageCircle" size={18} /></a>
          </div>
        </div>
        <div className="container mx-auto px-5 mt-8 pt-6 border-t border-background/10 text-xs text-background/50">
          © 2026 Салон красоты «Малина». Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;