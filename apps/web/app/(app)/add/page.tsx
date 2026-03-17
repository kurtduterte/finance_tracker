'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useExpenseStore } from '@/store/expense-store'
import { CategoryGrid } from '@/components/category-grid'
import type { ExpenseCategory, PaymentType, BankProvider } from '@/domain/types'
import { ALL_BANKS, BANK_LABELS } from '@/domain/constants'
import dayjs from 'dayjs'

type Step = 'category' | 'details'

export default function AddPage() {
  const router = useRouter()
  const addExpense = useExpenseStore((s) => s.addExpense)

  const [step, setStep] = useState<Step>('category')
  const [category, setCategory] = useState<ExpenseCategory | undefined>()
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [note, setNote] = useState('')
  const [paymentType, setPaymentType] = useState<PaymentType>('cash')
  const [bank, setBank] = useState<BankProvider | ''>('')
  const [error, setError] = useState('')

  function handleCategorySelect(cat: ExpenseCategory) {
    setCategory(cat)
    setStep('details')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const parsed = parseFloat(amount)
    if (!category) { setError('Select a category'); return }
    if (isNaN(parsed) || parsed <= 0) { setError('Enter a valid amount'); return }
    if (paymentType === 'online' && !bank) { setError('Select a bank/wallet'); return }

    addExpense({
      category,
      amount: parsed,
      date,
      note: note.trim() || undefined,
      paymentType,
      bank: paymentType === 'online' ? (bank as BankProvider) : undefined,
    })
    router.push('/home')
  }

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-12 pb-4 bg-white shadow-sm flex items-center gap-3">
        <button
          onClick={() => step === 'details' ? setStep('category') : router.back()}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F0EEFE' }}
        >
          <span className="material-symbols-rounded text-[20px]" style={{ color: '#7B61FF' }}>
            arrow_back
          </span>
        </button>
        <h1 className="text-xl font-bold text-navy">
          {step === 'category' ? 'Choose Category' : 'Add Expense'}
        </h1>
      </div>

      <div className="px-5 py-6">
        {step === 'category' ? (
          <CategoryGrid selected={category} onSelect={handleCategorySelect} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
            )}

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-navy">Amount (₱)</label>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
                className="h-14 rounded-xl border border-border px-4 text-lg font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-navy">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-navy">Note (optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Lunch at Jollibee"
                className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Payment type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-navy">Payment Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['cash', 'online'] as PaymentType[]).map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => { setPaymentType(pt); if (pt === 'cash') setBank('') }}
                    className="h-11 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      backgroundColor: paymentType === pt ? '#7B61FF' : '#FFFFFF',
                      color: paymentType === pt ? '#FFFFFF' : '#374151',
                      borderColor: paymentType === pt ? '#7B61FF' : '#E5E7EB',
                    }}
                  >
                    {pt === 'cash' ? 'Cash' : 'Online'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank (only if online) */}
            {paymentType === 'online' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-navy">Bank / Wallet</label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value as BankProvider)}
                  className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary transition-all"
                >
                  <option value="">Select...</option>
                  {ALL_BANKS.map((b) => (
                    <option key={b} value={b}>{BANK_LABELS[b]}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="h-14 rounded-2xl text-white font-bold text-base mt-2 transition-opacity"
              style={{ backgroundColor: '#7B61FF' }}
            >
              Save Expense
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
