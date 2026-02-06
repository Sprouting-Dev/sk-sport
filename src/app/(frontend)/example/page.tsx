import { Button } from '@/components/button'

import ColorSwatches from './ColorSwatches'
// import '../styles.css'

const variants = ['primary', 'secondary', 'ghost', 'outline', 'link', 'gradient'] as const

const sizes = ['sm', 'md'] as const

export default function ExamplePage() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 pt-10">
        <section>
          <h1 className="h1 mb-2">Theme colors</h1>
          <p className="body-md text-base-content/80">DaisyUI theme tokens used across the UI.</p>
          <div className="mt-4">
            <ColorSwatches
              tokens={[
                '--color-base-100',
                '--color-base-200',
                '--color-base-300',
                '--color-base-content',
                '--color-primary',
                '--color-primary-content',
                '--color-secondary',
                '--color-secondary-content',
                '--color-accent',
                '--color-accent-content',
                '--color-neutral',
                '--color-neutral-content',
                '--color-info',
                '--color-info-content',
                '--color-success',
                '--color-success-content',
                '--color-warning',
                '--color-warning-content',
                '--color-error',
                '--color-error-content',
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="h2 mb-3">Typography</h2>
          <div className="space-y-4 rounded-xl border border-base-300 p-4 bg-white">
            <div className="h1">Heading 1 - Rajdhani</div>
            <div className="h2">Heading 2 - Rajdhani</div>
            <div className="h3">Heading 3 - Rajdhani</div>
            <p className="body-lg">Body Large - Noto Sans Thai</p>
            <p className="body-md">Body Medium - Noto Sans Thai</p>
            <p className="body-sm">Body Small - Noto Sans Thai</p>
          </div>
        </section>
        <div className="w-full px-6 pb-10">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 pt-10">
            <section>
              <h1 className="h1 mb-2">Component showcase</h1>
              <p className="body-md text-base-content/80">
                DaisyUI-backed components with project typography.
              </p>
            </section>

            <section className="space-y-4 rounded-xl border border-base-300 bg-white p-4">
              <h2 className="h2 mb-1">Buttons</h2>
              <p className="body-sm text-base-content/70">Variants</p>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {variants.map((variant) => (
                  <Button key={variant} variant={variant} size="sm">
                    {variant}
                  </Button>
                ))}

                {variants.map((variant) => (
                  <Button
                    key={variant}
                    variant={variant}
                    size="sm"
                    className="w-full"
                    shape="circle"
                  >
                    {variant}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4">
                <Button asChild variant="outline" wide>
                  <a href="https://example.com" target="_blank" rel="noreferrer">
                    As Child Link
                  </a>
                </Button>
                <Button variant="outline" shape="circle" wide>
                  Circle
                </Button>
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-base-300 bg-white p-4">
              <div>
                <h2 className="h2 mb-1">Sizes</h2>
                <p className="body-sm text-base-content/70">sm / md </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button key={size} size={size} variant="primary">
                    {size}
                  </Button>
                ))}
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-base-300 bg-white  p-4">
              <div>
                <h2 className="h2 mb-1">Shapes & states</h2>
                <p className="body-sm text-base-content/70">square, circle, loading, disabled</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button shape="square" variant="secondary" size="sm">
                  SQ
                </Button>
                <Button shape="circle" variant="secondary" size="sm">
                  C
                </Button>
                <Button variant="primary" loading>
                  Loading
                </Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-base-300 bg-white  p-4">
              <div>
                <h2 className="h2 mb-1">Width</h2>
                <p className="body-sm text-base-content/70">wide, full width</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button wide>Wide button</Button>
                <Button fullWidth>Full width button</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
