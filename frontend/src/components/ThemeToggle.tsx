import { useTheme } from '../context/ThemeContext'
import styles from './ThemeToggle.module.css'

type Props = {
  /** Use high-contrast styling on dark blue hero backgrounds */
  variant?: 'default' | 'onDark'
  className?: string
}

export function ThemeToggle({ variant = 'default', className }: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      className={`${styles.toggle} ${variant === 'onDark' ? styles.onDark : ''} ${className ?? ''}`.trim()}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
        </svg>
      )}
    </button>
  )
}
