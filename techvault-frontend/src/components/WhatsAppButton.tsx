'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppConfig {
  businessWhatsAppNumber: string;
  orderBookingEnabled: boolean;
  whatsAppLink: string;
}

export default function WhatsAppButton() {
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch WhatsApp configuration from backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/whatsapp/config`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.data);
        }
      })
      .catch(err => console.error('Failed to load WhatsApp config:', err));

    // Show button after scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!config) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      '👋 Hi! I would like to inquire about products on DataNexStore.'
    );
    const whatsappUrl = `https://wa.me/${config.businessWhatsAppNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
    </button>
  );
}
