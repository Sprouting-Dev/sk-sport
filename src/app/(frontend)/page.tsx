import Link from 'next/link'
import './styles.css'

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="h1">Welcome</h1>
      <p className="body-md text-base-content/80">
        View theme colors and typography examples.
      </p>
      <Link className="btn btn-primary btn-lg-typo" href="/example">
        Open examples
      </Link>
    </div>
  )
}
