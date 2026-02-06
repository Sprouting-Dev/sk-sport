import ColorSwatches from './ColorSwatches'
import '../styles.css'

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
          <div className="space-y-4 rounded-xl border border-base-300 bg-base-100 p-4">
            <div className="h1">Heading 1 - Rajdhani</div>
            <div className="h2">Heading 2 - Rajdhani</div>
            <div className="h3">Heading 3 - Rajdhani</div>
            <p className="body-lg">Body Large - Noto Sans Thai</p>
            <p className="body-md">Body Medium - Noto Sans Thai</p>
            <p className="body-sm">Body Small - Noto Sans Thai</p>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary btn-lg-typo">Button Large</button>
              <button className="btn btn-secondary btn-sm-typo">Button Small</button>
              <button className="btn btn-link btn-link-typo">Button Link</button>
              <button className="btn btn-gradient-solid-border btn-sm-typo text-primary">
                Gradient
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
