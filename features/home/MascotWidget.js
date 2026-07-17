'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../hooks/useLanguage';

export default function MascotWidget() {
  const { t } = useLanguage();
  const [msgIndex, setMsgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Total 6 speech bubbles defined in dictionary (mascotMsg0 - mascotMsg5)
  const TOTAL_MESSAGES = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % TOTAL_MESSAGES);
        setIsVisible(true);
      }, 300); // fade out and in transition
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mascot-widget" style={{ margin: '20px 0' }}>
      <div style={{ position: 'relative', width: '55px', height: '55px', flexShrink: 0 }}>
        <Image
          src="/mascot.jpg"
          alt="Buzz - BazaarBee Mascot"
          fill
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
      </div>
      <div className="mascot-bubble">
        <strong style={{ display: 'block', color: 'var(--honey-amber)', fontSize: '12px', fontWeight: 600 }}>
          {t('mascotName')}
        </strong>
        <p style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isVisible ? 1 : 0,
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--charcoal-grey)'
        }}>
          {t(`mascotMsg${msgIndex}`)}
        </p>
      </div>
    </div>
  );
}
