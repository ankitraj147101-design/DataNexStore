const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface WhatsAppConfig {
  businessWhatsAppNumber: string;
  orderBookingEnabled: boolean;
  whatsAppLink: string;
}

export interface OrderItem {
  productName: string;
  productSku?: string;
  quantity?: number;
  price?: number;
}

export interface WhatsAppOrderRequest {
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  deliveryAddress?: string;
  notes?: string;
}

/**
 * Get WhatsApp configuration from backend
 */
export async function getWhatsAppConfig(): Promise<WhatsAppConfig | null> {
  try {
    const response = await fetch(`${API_URL}/whatsapp/config`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Failed to fetch WhatsApp config:', error);
    return null;
  }
}

/**
 * Submit order booking request via WhatsApp
 */
export async function submitWhatsAppOrder(
  request: WhatsAppOrderRequest
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/whatsapp/order-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error('Failed to submit WhatsApp order:', error);
    return {
      success: false,
      message: 'Failed to submit order request. Please try again.',
    };
  }
}

/**
 * Get WhatsApp contact link with optional message
 */
export async function getWhatsAppContactLink(message?: string): Promise<string> {
  try {
    const url = new URL(`${API_URL}/whatsapp/contact-link`);
    if (message) {
      url.searchParams.append('message', message);
    }

    const response = await fetch(url.toString());
    const data = await response.json();
    return data.success ? data.data.whatsappLink : '#';
  } catch (error) {
    console.error('Failed to get WhatsApp link:', error);
    return '#';
  }
}

/**
 * Open WhatsApp chat with business number
 */
export function openWhatsAppChat(phoneNumber: string, message?: string) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  let url = `https://wa.me/${cleanNumber}`;
  
  if (message) {
    url += `?text=${encodeURIComponent(message)}`;
  }
  
  window.open(url, '_blank');
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^0-9+]/g, '');
  if (cleaned.startsWith('+91')) {
    const number = cleaned.substring(3);
    return `+91 ${number.substring(0, 5)} ${number.substring(5)}`;
  }
  return cleaned;
}
