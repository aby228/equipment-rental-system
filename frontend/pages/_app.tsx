import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ModalProvider } from '@/providers/modal-provider'
import MinimalHeader from '@/components/native/nav/minimal-header'
import MinimalFooter from '@/components/native/minimal-footer'
import '../src/app/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider />
      <ModalProvider />
      <MinimalHeader />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Component {...pageProps} />
      </main>
      <MinimalFooter />
    </ThemeProvider>
  )
} 