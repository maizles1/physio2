'use client'

import type { ReactNode } from 'react'
import { gtag } from './GoogleAnalytics'

type MeuhedetContactLinkProps = {
  type: 'phone' | 'whatsapp'
  href: string
  section: string
  className?: string
  children: ReactNode
  target?: string
  rel?: string
}

export default function MeuhedetContactLink({
  type,
  href,
  section,
  className,
  children,
  target,
  rel,
}: MeuhedetContactLinkProps) {
  const handleClick = () => {
    if (type === 'phone') {
      gtag.event('click_to_call', 'engagement', href.replace('tel:', ''), undefined, {
        page: 'meuhedet',
        section,
      })
    } else {
      gtag.event('whatsapp_click', 'engagement', section, undefined, {
        page: 'meuhedet',
        section,
      })
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} target={target} rel={rel}>
      {children}
    </a>
  )
}
