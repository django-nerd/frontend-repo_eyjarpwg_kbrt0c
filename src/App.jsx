import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { BarChart3, LineChart, ShieldCheck, Send, Download, CheckCircle2, Moon, Sun, MessageCircle, Globe2, Sparkles, ArrowRight, Layers } from 'lucide-react'

function useTheme() {
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'))
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

const T = {
  en: {
    heroTitle: 'BizEdge — Smart Accounting & Billing',
    heroSub: 'Modern, fast, and insight-driven for small and medium businesses',
    getStarted: 'Get Started',
    seeDemo: 'See Demo',
    features: 'Core Capabilities',
    dashboard: 'Business Insights Dashboard',
    onboarding: 'Guided Onboarding',
    brand: 'Branding Kit',
    testBackend: 'Backend Test',
  },
  hi: {
    heroTitle: 'BizEdge — स्मार्ट अकाउंटिंग और बिलिंग',
    heroSub: 'छोटे और मध्यम व्यवसायों के लिए आधुनिक, तेज़ और insights से भरपूर',
    getStarted: 'शुरू करें',
    seeDemo: 'डेमो देखें',
    features: 'मुख्य क्षमताएँ',
    dashboard: 'बिज़नेस इनसाइट्स डैशबोर्ड',
    onboarding: 'गाइडेड ऑनबोर्डिंग',
    brand: 'ब्रांडिंग किट',
    testBackend: 'बैकएंड टेस्ट',
  },
}

const brand = {
  name: 'BizEdge',
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    accent: '#22d3ee',
    darkBg: '#0a0b0f',
    glass: 'rgba(255,255,255,0.08)'
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif'
  },
  vibe: 'Trustworthy, bold, tech-forward with glassmorphism and subtle motion',
}

function StatCard({ icon: Icon, label, value, delta }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400"><Icon size={20} /></div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {typeof delta !== 'undefined' && (
          <span className={`text-xs px-2 py-1 rounded-md ${delta >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>{delta >= 0 ? '+' : ''}{delta}%</span>
        )}
      </div>
    </motion.div>
  )
}

function ProgressBar({ value, color }) {
  return (
    <div className="w-full h-2 rounded-full bg-neutral-200/60 dark:bg-white/10 overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: color }} />
    </div>
  )
}

function FeatureItem({ title, desc, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400"><Icon size={18} /></div>
        <div className="font-medium">{title}</div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
    </motion.div>
  )
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! Ask me about invoices, stock, or reports.' }])
  const ask = async () => {
    if (!input.trim()) return
    const q = input
    setMessages(m => [...m, { role: 'user', text: q }])
    setInput('')
    // Local heuristic response (no backend dependency)
    const reply = q.toLowerCase().includes('discount')
      ? 'Based on recent trends, offering a 3-5% discount can boost conversion without hurting margins.'
      : q.includes('stock')
        ? 'Low stock detected on 8 items. Reorder recommendations are available in Insights.'
        : 'You can create invoices, track payments, and see profit in the Insights dashboard.'
    setTimeout(() => setMessages(m => [...m, { role: 'assistant', text: reply }]), 400)
  }
  return (
    <>
      <button id="chat" onClick={() => setOpen(o => !o)} className="fixed bottom-5 right-5 z-40 rounded-full p-3 bg-blue-600 text-white shadow-lg hover:shadow-xl transition">
        <MessageCircle size={20} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-20 right-5 z-40 w-80 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600" />
              <div className="font-medium">BizEdge Assistant</div>
            </div>
            <div className="h-64 overflow-y-auto p-3 space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm p-2 rounded-xl ${m.role === 'assistant' ? 'bg-blue-600/10 text-blue-700 dark:text-blue-300' : 'bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200'} `}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 flex items-center gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && ask()} placeholder="Ask anything..." className="flex-1 text-sm px-3 py-2 rounded-lg bg-neutral-100 dark:bg-white/10 outline-none" />
              <button onClick={ask} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm flex items-center gap-1"><Send size={14} /> Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function DashboardPreview({ backendUrl }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const load = async () => {
      try {
        const base = backendUrl || import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/insights`)
        if (!res.ok) throw new Error('Failed to load insights')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Live insights unavailable — showing demo data.')
        setData({
          top_products: [
            { name: 'POS Machine', qty: 32, revenue: 480000 },
            { name: 'Thermal Paper', qty: 140, revenue: 70000 },
            { name: 'Barcode Scanner', qty: 22, revenue: 110000 },
          ],
          low_stock: [
            { id: '1', name: 'Thermal Paper', stock_qty: 8, low_stock_threshold: 10 },
            { id: '2', name: 'Label Rolls', stock_qty: 3, low_stock_threshold: 5 },
          ],
          totals: { sales: 1250000, purchase: 820000, profit: 430000 },
        })
      }
    }
    load()
  }, [backendUrl])

  const pct = useMemo(() => {
    if (!data) return { profit: 0, sales: 0 }
    const { sales, profit } = data.totals
    return { profit: Math.min(100, Math.round((profit / (sales || 1)) * 100)), sales: 100 }
  }, [data])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard icon={BarChart3} label="Sales (₹)" value={data?.totals?.sales?.toLocaleString() || '—'} delta={8} />
      <StatCard icon={LineChart} label="Profit (₹)" value={data?.totals?.profit?.toLocaleString() || '—'} delta={12} />
      <StatCard icon={ShieldCheck} label="Expenses (₹)" value={data ? (data.totals.sales - data.totals.profit).toLocaleString() : '—'} delta={-3} />

      <div className="md:col-span-2 p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Monthly Performance</div>
          <div className="text-xs text-neutral-500">Animated</div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-xs mb-1">Sales Achievement</div>
            <ProgressBar value={pct.sales} color="linear-gradient(90deg,#2563eb,#7c3aed)" />
          </div>
          <div>
            <div className="text-xs mb-1">Profit Margin</div>
            <ProgressBar value={pct.profit} color="linear-gradient(90deg,#10b981,#22d3ee)" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {(data?.top_products || []).map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="p-3 rounded-lg bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <div className="text-xs text-neutral-500">Top Product</div>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-neutral-500">Revenue: ₹{p.revenue?.toLocaleString?.() ?? p.revenue}</div>
            </motion.div>
          ))}
        </div>
        {error && <div className="mt-3 text-xs text-amber-600">{error}</div>}
      </div>

      <div className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
        <div className="font-medium mb-2">Low Stock Alerts</div>
        <div className="space-y-2">
          {(data?.low_stock || []).map((i, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span>{i.name}</span>
              <span className="text-rose-600">{i.stock_qty ?? '—'} left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Onboarding() {
  const steps = [
    { title: 'Customize your brand', text: 'Logo, colors, invoice templates with GST & QR', icon: Layers },
    { title: 'Add products & parties', text: 'Import via Excel/CSV and start billing', icon: CheckCircle2 },
    { title: 'Share & get paid', text: 'WhatsApp/Email invoices with UPI QR', icon: Send },
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => { const id = setInterval(()=> setIndex(i => (i+1)%steps.length), 2500); return () => clearInterval(id) }, [])
  const StepIcon = steps[index].icon
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6">
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <StepIcon size={22} />
          </div>
          <div className="text-lg font-medium">{steps[index].title}</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{steps[index].text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i===index?'w-6 bg-blue-600':'w-2 bg-neutral-300 dark:bg-white/10'}`} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [language, setLanguage] = useState('en')
  const t = T[language]
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-[#0a0b0f] dark:to-[#0a0b0f] text-neutral-900 dark:text-neutral-100">
      {/* Top navigation */}
      <div className="fixed top-0 left-0 right-0 z-30 border-b border-black/5 dark:border-white/10 backdrop-blur bg-white/70 dark:bg-neutral-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600" />
            <div className="font-bold text-lg"><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Biz</span>Edge</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10">
              <Globe2 size={14} />
              <select className="bg-transparent outline-none" value={language} onChange={(e)=>setLanguage(e.target.value)}>
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" title="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="/test" className="text-sm px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">{t.testBackend}</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t.heroTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-xl">
              {t.heroSub}
            </motion.p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:opacity-95">
                <Sparkles size={16} /> {t.getStarted}
              </a>
              <a href="#features" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10">
                {t.seeDemo} <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} /> GST & QR enabled</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={16} /> Cloud sync</div>
            </div>
          </div>
          <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/20">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-[#0a0b0f]/60" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4"><Layers size={18} className="text-indigo-600" /><h2 className="text-xl font-semibold">{t.features}</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureItem icon={Send} title="Smart Billing & Invoicing" desc="Custom templates, GST, QR payments, WhatsApp/Email share" />
            <FeatureItem icon={BarChart3} title="Inventory Management" desc="Auto stock update, low-stock alerts, barcode ready" />
            <FeatureItem icon={ShieldCheck} title="CRM & Credit Tracking" desc="Customer/Supplier 360°, reminders, statements" />
            <FeatureItem icon={LineChart} title="Reports & Exports" desc="Profit, expenses, cash flow; export to Excel/PDF" />
            <FeatureItem icon={Globe2} title="Multi-user & Cloud" desc="Role-based access, sync across devices" />
            <FeatureItem icon={Sparkles} title="AI Insights" desc="Discount suggestions, reorder guidance, trends" />
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4"><BarChart3 size={18} className="text-blue-600" /><h2 className="text-xl font-semibold">{t.dashboard}</h2></div>
          <DashboardPreview backendUrl={backendUrl} />
        </div>
      </section>

      {/* Onboarding */}
      <section id="onboarding" className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 items-center">
          <Onboarding />
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
            <div className="font-medium mb-2">Multi-platform</div>
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
              <li>• Web app (this demo), Desktop (Electron), Mobile (React Native) ready</li>
              <li>• Offline-first with local cache and sync on reconnect</li>
              <li>• Secure backup & restore with encryption</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white flex items-center gap-2"><Download size={16}/> Download Prototype</button>
              <button className="px-4 py-2 rounded-xl border border-black/5 dark:border-white/10">Export Branding</button>
            </div>
          </div>
        </div>
      </section>

      {/* Branding */}
      <section id="brand" className="mt-16 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl p-6 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
            <div className="font-medium mb-3">Branding Kit</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl" style={{ background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`}} />
              <div>
                <div className="font-semibold">{brand.name}</div>
                <div className="text-xs text-neutral-500">{brand.vibe}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="space-y-1"><div className="h-10 rounded" style={{ background: brand.colors.primary }}></div><div>Primary</div></div>
              <div className="space-y-1"><div className="h-10 rounded" style={{ background: brand.colors.secondary }}></div><div>Secondary</div></div>
              <div className="space-y-1"><div className="h-10 rounded" style={{ background: brand.colors.accent }}></div><div>Accent</div></div>
            </div>
            <div className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">Fonts: {brand.fonts.heading}</div>
          </div>
          <div className="rounded-2xl p-6 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-neutral-500 mb-2">Logo Motion</div>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: `linear-gradient(135deg, ${brand.colors.primary}22, ${brand.colors.secondary}22)`}}>
                <div className="w-6 h-6 rounded-lg" style={{ background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`}} />
                <div className="font-semibold">BizEdge</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />

      <footer className="py-10 border-t border-black/5 dark:border-white/10 text-sm text-neutral-600 dark:text-neutral-400 text-center">
        © {new Date().getFullYear()} BizEdge — Modern Accounting & Billing
      </footer>
    </div>
  )
}
