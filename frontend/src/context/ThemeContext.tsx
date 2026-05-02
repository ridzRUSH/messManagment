/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'mess-theme'

const AppThemeContext = createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
} | null>(null)

function readThemeFromDom(): Theme {
  const d = document.documentElement.dataset.theme
  return d === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readThemeFromDom)

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    document.documentElement.dataset.theme = t
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(AppThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
