import React from 'react'
import { FacebookIcon, YouTubeIcon, LineIcon } from '@/components/icons'
import { SOCIAL_URLS } from '@/const/contact'

export const socialLinks = [
  {
    label: 'Facebook',
    href: SOCIAL_URLS.facebook ?? '#',
    icon: <FacebookIcon />,
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
