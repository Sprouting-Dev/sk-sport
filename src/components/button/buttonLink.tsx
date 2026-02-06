import React from 'react'
import Link from 'next/link'

import { Button, type ButtonProps } from './button'

export type ButtonLinkProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> &
  Omit<ButtonProps, 'asChild' | 'children' | 'href'> & {
    children: React.ReactNode
  }

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, children, ...props }, ref) => (
    <Button asChild {...props}>
      <Link href={href} ref={ref}>
        {children}
      </Link>
    </Button>
  ),
)

ButtonLink.displayName = 'ButtonLink'
