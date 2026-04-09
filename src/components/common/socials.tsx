import React from 'react'
import { FacebookIcon, InstagramIcon, YouTubeIcon, LineIcon } from '@/components/icons'
import { SOCIAL_URLS } from '@/const/contact'

export const socialLinks = [
  {
    label: 'Facebook',
    href: SOCIAL_URLS.facebook ?? '#',
    icon: <FacebookIcon />,
  },
  {
    label: 'Instagram',
    href: SOCIAL_URLS.instagram ?? '#',
    icon: <InstagramIcon />,
  },
  {
    label: 'YouTube',
    href: SOCIAL_URLS.youtube ?? '#',
    icon: <YouTubeIcon />,
  },
  {
    label: 'LINE',
    href: SOCIAL_URLS.line ?? '#',
    icon: <LineIcon />,
  },
]
