import { COPYRIGHT_TEXT, COPYRIGHT_YEAR } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10 text-center">
      <p className="text-sm text-foreground-muted">
        © {COPYRIGHT_YEAR} {COPYRIGHT_TEXT}
      </p>
    </footer>
  )
}
