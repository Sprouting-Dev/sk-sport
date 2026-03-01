'use client'

import React, { useState } from 'react'
import { Button } from '../button'
import { SuccessConfirm } from '@/components/common'
import { socialLinks } from '@/components/layout'
import {
  MapPinAreaIcon,
  EnvelopeIcon,
  PhoneIcon,
  CircleNotchIcon,
  ClockIcon,
} from '@phosphor-icons/react'

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const contactDetails = [
    {
      Icon: MapPinAreaIcon,
      title: 'Head Office',
      detail: '123, Main St. Anytown, USA',
    },
    {
      Icon: EnvelopeIcon,
      title: 'Email us',
      detail: 'juieb34@gmail.com',
    },
    {
      Icon: PhoneIcon,
      title: 'Call us',
      detail: '06-55883919',
    },
  ]

  const openHours = [
    { day: 'Monday - Friday', time: '9 am - 8 pm' },
    { day: 'Saturday', time: '9 am - 5 pm' },
    { day: 'Sunday', time: '9 am - 6 pm' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Please enter your name'
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number'
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format'
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      console.error('Submission failed', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-8 px-8 md:py-16">
      <div className="flex flex-col overflow-hidden rounded-4xl bg-primary-content shadow-lg md:flex-row">
        <div className="flex w-full flex-col bg-gradient-to-br from-base-200 to-error-content py-12 px-8 md:w-5/12 lg:py-16 lg:px-12">
          <h2 className="mb-2 md:mb-8 text-base-content">Get in touch</h2>
          <p className="body-md mb-8 text-base-content">
            Let&apos;s keep the conversation going! <br />
            You can find my contact details right here.
          </p>

          <div className="mb-8 space-y-6">
            {contactDetails.map((info, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex h-10 w-10 md:h-12.5 md:w-12.5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content">
                  <info.Icon className="h-6 w-6 md:h-7.5 md:w-7.5" weight="fill" />
                </div>
                <div>
                  <p className="body-md text-primary">{info.title}</p>
                  <p className="body-md text-base-content">{info.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="mb-8 border-primary hidden md:block" />

          <div className="mb-8">
            <p className="mb-2 md:mb-4 body-md text-base-content">Follow our social media</p>
            <div className="flex gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-wrapper flex h-8 w-8 md:h-10.5 md:w-10.5 items-center justify-center rounded-full bg-primary text-primary-content transition hover:scale-110 "
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 md:mb-8 body-md text-base-content">Open Hours</p>
            <div className="space-y-3 body-sm text-base-content">
              {openHours.map((schedule, idx) => (
                <div key={idx} className="flex justify-between">
                  <div className="flex flex-row gap-1 md:gap-2">
                    <ClockIcon className="h-4 w-4 md:h-6 md:w-6 text-primary" weight="fill" />
                    {schedule.day}
                  </div>
                  <span>{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-8 flex w-full flex-col rounded-t-4xl bg-primary-content p-8 md:mt-0 md:w-7/12 lg:py-16 lg:px-12 md:rounded-none">
          <h2 className="mb-8 text-primary">Send us message</h2>

          {isSuccess ? (
            <SuccessConfirm
              title="Thank You!"
              description={
                <>
                  Your message has been sent successfully.
                  <br />
                  We will get back to you soon.
                </>
              }
              buttonText="Send Another Message"
              buttonClassName='rounded-2xl'
              onButtonClick={() => setIsSuccess(false)}
            />
          ) : (
            <form onSubmit={handleSubmit} className="flex h-full flex-col space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 md:mb-2 body-sm text-primary">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`rounded-xl body-sm border bg-secondary-content p-3 outline-none transition-all ${
                      errors.name
                        ? 'border-error bg-error-content'
                        : 'border-transparent focus:border-secondary focus:ring-1 focus:ring-secondary'
                    }`}
                  />
                  {errors.name && <span className="mt-1 text-xs text-error">{errors.name}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 md:mb-2 body-sm text-primary">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className={`rounded-xl body-sm border bg-secondary-content p-3 outline-none transition-all ${
                      errors.phone
                        ? 'border-error bg-error-content'
                        : 'border-transparent focus:border-secondary focus:ring-1 focus:ring-secondary'
                    }`}
                  />
                  {errors.phone && <span className="mt-1 text-xs text-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 md:mb-2 body-sm text-primary">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`rounded-xl body-sm border bg-secondary-content p-3 outline-none transition-all ${
                    errors.email
                      ? 'border-error bg-error-content'
                      : 'border-transparent focus:border-secondary focus:ring-1 focus:ring-secondary'
                  }`}
                />
                {errors.email && <span className="mt-1 text-xs text-error">{errors.email}</span>}
              </div>

              <div className="flex flex-col">
                <label className="mb-1 md:mb-2 body-sm text-primary">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={5}
                  className={`min-h-18 md:min-h-38 rounded-xl body-sm border bg-secondary-content p-3 outline-none transition-all resize-none ${
                    errors.message
                      ? 'border-error bg-error-content'
                      : 'border-transparent focus:border-secondary focus:ring-1 focus:ring-secondary'
                  }`}
                />
                {errors.message && (
                  <span className="mt-1 text-xs text-error">{errors.message}</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="md"
                className="rounded-2xl w-full transition-all disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <CircleNotchIcon size={24} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Messages'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
