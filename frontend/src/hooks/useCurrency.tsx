'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type SupportedCurrency = 'USD' | 'GHS'

interface CurrencyContextValue {
  currency: SupportedCurrency
  setCurrency: (c: SupportedCurrency) => void
  toggleCurrency: () => void
  convertFromUSD: (amountUsd: number) => number
  formatCurrency: (amountUsd: number) => string
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD')

  const usdToGhsRate = useMemo(() => {
    const env = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_USD_TO_GHS : undefined
    const parsed = env ? parseFloat(env) : NaN
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 15.5
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('currency') as SupportedCurrency | null
      if (saved === 'USD' || saved === 'GHS') {
        setCurrencyState(saved)
      }
    } catch {}
  }, [])

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c)
    try {
      localStorage.setItem('currency', c)
    } catch {}
  }

  const toggleCurrency = () => setCurrency(currency === 'USD' ? 'GHS' : 'USD')

  const convertFromUSD = (amountUsd: number) => {
    if (!Number.isFinite(amountUsd)) return 0
    return currency === 'USD' ? amountUsd : amountUsd * usdToGhsRate
  }

  const formatCurrency = (amountUsd: number) => {
    const amount = convertFromUSD(amountUsd)
    const fmt = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-GH', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      maximumFractionDigits: 2,
    })
    return fmt.format(amount)
  }

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    toggleCurrency,
    convertFromUSD,
    formatCurrency,
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}


