'use client'
import { FormEvent, useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState('')

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = String(data.get('username') ?? '').trim().toLowerCase()
    const password = String(data.get('password') ?? '').trim().toLowerCase()

    if (username === 'admin' && password === 'admin') {
      window.localStorage.setItem('umbrella-role', 'admin')
      window.location.assign('/admin')
      return
    }

    if (username === 'staff' && password === 'staff') {
      window.localStorage.setItem('umbrella-role', 'staff')
      window.location.assign('/staff')
      return
    }

    setError('Use admin/admin or staff/staff.')
  }

  return (
    <main className="grid min-h-screen bg-[#090909] px-6 py-12 text-[#F5E6C8] sm:px-10">
      <section className="m-auto w-full max-w-md border border-[#C9A84C]/20 bg-[#111010] p-7">
        <Link href="/" className="mb-8 inline-block border-b border-[#C9A84C]/35 pb-1 text-xs uppercase tracking-widest text-[#C9A84C] no-underline">Back home</Link>
        <div className="mb-5 flex items-center gap-4"><div className="h-px w-8 bg-[#C9A84C]"/><span className="text-xs uppercase tracking-widest text-[#C9A84C]">Staff Access</span></div>
        <h1 style={{fontFamily:'Georgia,serif'}} className="mb-8 text-4xl font-normal">Umbrella Login</h1>
        <form onSubmit={login} className="grid gap-4">
          <label>
            <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">Username</span>
            <input name="username" className="h-12 w-full border border-[#C9A84C]/20 bg-[#090909] px-4 outline-none focus:border-[#C9A84C]"/>
          </label>
          <label>
            <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">Password</span>
            <input name="password" type="password" className="h-12 w-full border border-[#C9A84C]/20 bg-[#090909] px-4 outline-none focus:border-[#C9A84C]"/>
          </label>
          {error && <div className="text-xs uppercase tracking-widest text-[#C9A84C]">{error}</div>}
          <button className="mt-3 cursor-pointer border border-[#C9A84C] bg-[#C9A84C] px-6 py-4 text-xs uppercase tracking-widest text-[#090909]">Login</button>
        </form>
      </section>
    </main>
  )
}
