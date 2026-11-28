export const HOME_WHATSAPP_NUMBER = '972508838982'

/** WhatsApp link with a ready-made message. */
export const homeWhatsappHref = (text = 'שלום, אשמח לתאם אבחון') =>
  `https://wa.me/${HOME_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
