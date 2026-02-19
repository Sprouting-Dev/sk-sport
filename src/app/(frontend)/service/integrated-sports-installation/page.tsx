'use client'

import { useTranslations } from 'next-intl'
import { ServiceHero } from '@/components/hero/serviceHero'

export default function IntegratedSportsInstallation() {
  const t = useTranslations('Service.IntegratedInstallation')

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc="/integrated-sports-installation.png"
        titleLine1={t('titleLine1')}
        showCta={false}
        contentPosition="bottom"
      />
    </main>
  )
}
