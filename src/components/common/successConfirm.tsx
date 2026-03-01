import React from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'
import { Button } from '../button'

export interface SuccessConfirmProps {
  title: string
  description: React.ReactNode
  buttonText: string
  onButtonClick: () => void
  icon?: React.ReactNode
  buttonClassName?: string
  children?: React.ReactNode
}

export const SuccessConfirm: React.FC<SuccessConfirmProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  icon,
  buttonClassName,
  children,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-center">
      {icon || <CheckCircleIcon className="h-16 w-16 text-success md:h-20 md:w-20" weight="fill" />}
      
      <h2 className="text-base-content mt-2">{title}</h2>
      
      <p className="body-sm text-base-content/70 mt-4">
        {description}
      </p>

      {children && (
        <div className="w-full max-w-125 pt-2">
          {children}
        </div>
      )}
      
      <Button
        onClick={onButtonClick}
        variant="primary"
        size="md"
        className={`rounded-xl btn-block h-12 md:h-15 max-w-125 mt-2 md:mt-6 ${buttonClassName || ''}`}
      >
        {buttonText}
      </Button>
    </div>
  )
}