import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const API_URL = 'https://functions.poehali.dev/9aabc1f9-9077-4e2d-999a-326723834f4c';

interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
  created_at: string;
}

const Stars = ({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        disabled={!interactive}
        onClick={() => onChange?.(s)}
        className={interactive ? 'cursor-pointer' : 'cursor-default'}
      >
        <Icon
          name="Star"
          size={interactive ? 24 : 16}
          className={s <= rating ? 'text-primary fill-primary' : 'text-border'}
        />
      </button>
    ))}
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', service: '', rating: 5, text: '' });

  const fetchReviews = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setReviews(JSON.parse(data).reviews ?? []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSent(true);
      setFormOpen(false);
      setForm({ name: '', service: '', rating: 5, text: '' });
      fetchReviews();
    } finally {
      setSending(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-secondary/40">
      <div className="container mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Мнения клиентов</p>
            <h2 className="font-display text-4xl sm:text-5xl">Отзывы</h2>
          </div>
          <Button onClick={() => { setFormOpen(true); setSent(false); }} className="rounded-full px-7 shrink-0">
            <Icon name="PenLine" size={18} className="mr-2" /> Написать отзыв
          </Button>
        </div>

        {sent && (
          <div className="mb-8 flex items-center gap-3 bg-accent text-accent-foreground rounded-xl px-5 py-4 text-sm">
            <Icon name="CheckCircle2" size={20} className="text-primary" />
            Спасибо! Ваш отзыв опубликован.
          </div>
        )}

        {formOpen && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-10 animate-fade-in">
            <h3 className="font-display text-2xl mb-6">Ваш отзыв</h3>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Ваше имя *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Например, Анна"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Услуга</label>
                  <input
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    placeholder="Например, Маникюр"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Оценка *</label>
                <Stars rating={form.rating} interactive onChange={(r) => setForm({ ...form, rating: r })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Текст отзыва *</label>
                <textarea
                  required
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder="Расскажите о вашем опыте..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={sending} className="rounded-full px-8">
                  {sending ? 'Отправляем...' : 'Опубликовать'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setFormOpen(false)} className="rounded-full px-6">
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border animate-pulse h-44" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="MessageSquare" size={40} className="mx-auto mb-4 opacity-30" />
            <p>Пока нет отзывов. Будьте первым!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card rounded-2xl p-6 border border-border flex flex-col gap-3 hover-scale">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-display text-lg font-semibold shrink-0">
                    {r.name[0]}
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <div>
                  <p className="font-medium text-sm">{r.name}</p>
                  {r.service && <p className="text-xs text-primary">{r.service}</p>}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.text}</p>
                <p className="text-xs text-muted-foreground/60">{formatDate(r.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
