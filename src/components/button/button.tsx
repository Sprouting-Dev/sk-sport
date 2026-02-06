import React from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'outline' | 'gradient'
export type ButtonSize = 'sm' | 'md'
export type ButtonShape = 'square' | 'circle'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  fullWidth?: boolean
  wide?: boolean
  noAnimation?: boolean
  loading?: boolean
  disabled?: boolean
}

export type ButtonProps = ButtonBaseProps &
  (
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | React.HTMLAttributes<HTMLElement>
  ) & {
    asChild?: boolean
  }

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  link: 'btn-link',
  outline: 'btn-outline',
  gradient: 'btn-gradient-solid-border text-primary hover:text-primary-content',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-lg',
}

const typographyClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm-typo',
  md: 'btn-lg-typo',
}

const getButtonClasses = ({
  className,
  variant,
  size,
  shape,
  fullWidth,
  wide,
  noAnimation,
  loading,
  disabled,
}: {
  className?: string
  variant: ButtonVariant
  size: ButtonSize
  shape?: ButtonShape
  fullWidth?: boolean
  wide?: boolean
  noAnimation?: boolean
  loading?: boolean
  disabled?: boolean
}) =>
  cn(
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    variant === 'link' ? 'btn-link-typo' : typographyClasses[size],
    shape === 'square' && 'btn-square',
    shape === 'circle' && 'btn-circle',
    fullWidth && 'btn-block',
    wide && 'btn-wide',
    noAnimation && 'no-animation',
    loading && 'loading',
    disabled && 'btn-disabled',
    className,
  )

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'gradient',
      size = 'md',
      shape,
      fullWidth,
      wide,
      noAnimation,
      loading,
      disabled,
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading)

    const classes = getButtonClasses({
      className,
      variant,
      size,
      shape,
      fullWidth,
      wide,
      noAnimation,
      loading,
      disabled: isDisabled,
    })

    if (asChild) {
      const child = React.Children.only(children)
      if (!React.isValidElement(child)) return null

      const childProps = child.props as { className?: string }
      const typedChild = child as React.ReactElement<
        { className?: string } & Record<string, unknown>
      >

      return React.cloneElement(typedChild, {
        ...(child.props as Record<string, unknown>),
        ...(props as Record<string, unknown>),
        className: cn(childProps?.className, classes),
        'aria-disabled': isDisabled || undefined,
        'data-loading': loading || undefined,
      })
    }

    if ('href' in props && typeof props.href === 'string') {
      const { onClick, tabIndex, ...anchorProps } =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(classes, isDisabled && 'pointer-events-none')}
          aria-disabled={isDisabled || undefined}
          data-loading={loading || undefined}
          tabIndex={isDisabled ? -1 : tabIndex}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            onClick?.(e)
          }}
          {...anchorProps}
        >
          {variant === 'gradient' ? (
            <span className="btn-gradient-inner">{children}</span>
          ) : (
            children
          )}
        </a>
      )
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={classes}
        disabled={isDisabled}
        data-loading={loading || undefined}
        {...buttonProps}
      >
        {variant === 'gradient' ? <span className="btn-gradient-inner">{children}</span> : children}
      </button>
    )
  },
)

Button.displayName = 'Button'
