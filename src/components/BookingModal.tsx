import { useEffect } from 'react';
import Icon from '@/components/ui/icon';

const YCLIENTS_COMPANY_ID = 'n1300562';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';

    const scriptId = 'yclients-widget-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://w1142.yclients.com/widgetJS';
      script.async = true;
      document.body.appendChild(script);
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const notConfigured = YCLIENTS_COMPANY_ID === 'COMPANY_ID';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <p className="uppercase tracking-[0.25em] text-[11px] text-primary">Онлайн-запись</p>
            <h3 className="font-display text-2xl">Салон «Малина»</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
          {notConfigured ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent flex items-center justify-center text-primary">
                <Icon name="CalendarHeart" size={30} />
              </div>
              <h4 className="font-display text-2xl mb-3">Виджет почти готов</h4>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                Чтобы запустить онлайн-запись, нужно подставить ваш ID компании из личного кабинета YClients. Пришлите его — и форма заработает сразу.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/79895958645" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  <Icon name="MessageCircle" size={18} /> Записаться через WhatsApp
                </a>
                <a href="tel:+79895958645" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-border text-sm font-medium hover:bg-secondary transition-colors">
                  <Icon name="Phone" size={18} /> Позвонить
                </a>
              </div>
            </div>
          ) : (
            <iframe
              title="Онлайн-запись YClients"
              src={`https://${YCLIENTS_COMPANY_ID}.yclients.com/`}
              width="100%"
              height="600"
              frameBorder="0"
              allow="payment"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;