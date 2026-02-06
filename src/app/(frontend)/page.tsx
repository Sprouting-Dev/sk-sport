import { ButtonLink } from '@/components/button'

import './styles.css'

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="h1">Welcome</h1>
      <p className="body-md text-base-content/80">
        View theme colors and typography examples.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/example" size="lg" variant="primary">
          Open examples
        </ButtonLink>
        <ButtonLink href="/components" size="lg" variant="outline">
          Component showcase
        </ButtonLink>
      </div>
    </div>
  )
}
