import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Moon, Sun } from 'lucide-react'

type AuthPageProps = { page: 'login' | 'signup' | 'demo' }
const DEMO_EMAIL = 'demo@unmind.app'
const DEMO_PASSWORD = 'UnmindDemo123!'
const DEMO_NAME = 'Student'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AuthPage({ page }: AuthPageProps) {
  const isSignup = page === 'signup'
  const isDemo = page === 'demo'
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light')
  const [name, setName] = useState(isDemo ? DEMO_NAME : '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [recovery, setRecovery] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('unmind-theme', theme) } catch { /* Theme persistence is optional. */ }
  }, [theme])

  function enter(mode: 'demo' | 'guest', displayName = name.trim()) {
    try {
      sessionStorage.setItem('unmind-session', mode)
      if (displayName) sessionStorage.setItem('unmind-display-name', displayName)
      else sessionStorage.removeItem('unmind-display-name')
    } catch { /* The main site remains available if storage is blocked. */ }
    window.location.assign('/#home')
  }

  async function authenticateDemo(candidateEmail: string, candidatePassword: string, displayName = name.trim()) {
    setErrors({})
    if (candidateEmail !== DEMO_EMAIL || candidatePassword !== DEMO_PASSWORD) {
      setErrors({ form: 'Those details don’t match the sample login. You can use the demo credentials below.' })
      return
    }
    setBusy(true)
    await new Promise(resolve => window.setTimeout(resolve, 350))
    enter('demo', displayName)
  }

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    const next: Record<string, string> = {}
    if (isSignup && !name.trim()) next.name = 'Add the name you would like us to use.'
    if (!email.trim()) next.email = 'Enter your email address.'
    else if (!emailPattern.test(email)) next.email = 'Enter an email address in the usual format.'
    if (!password) next.password = 'Enter your password.'
    else if (isSignup && password.length < 8) next.password = 'Use at least 8 characters.'
    if (isSignup && !confirm) next.confirm = 'Enter your password again.'
    else if (isSignup && password !== confirm) next.confirm = 'These passwords do not match yet.'
    setErrors(next)
    if (Object.keys(next).length) return
    if (!isSignup) { void authenticateDemo(email, password); return }
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      setMessage('Your details passed this page’s checks, but account creation is not connected. Nothing was stored. You can continue with the demo or visit as a guest.')
    }, 350)
  }

  function useDemo() {
    const displayName = name.trim() || DEMO_NAME
    setName(displayName)
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    setMessage('')
    void authenticateDemo(DEMO_EMAIL, DEMO_PASSWORD, displayName)
  }

  const heading = recovery ? 'A gentle note.' : isSignup ? 'Let’s start small.' : isDemo ? 'How are you today?' : 'How are you, today?'
  const supporting = recovery ? 'Password recovery is not connected in this demo.' : isSignup ? "You don't need to have everything figured out. We're glad you're here." : isDemo ? 'No account needed. The sample login works right here.' : "Let's pick up where you left off. Take your time."

  return <div className="auth-page">
    <a className="skip-link" href="#auth-form">Skip to form</a>
    <header className="auth-topbar"><a className="wordmark" href="/#home" aria-label="UNMIND home">UNMIND<span>®</span></a><a className="auth-back" href="/#home"><ArrowLeft size={15}/> Back to UNMIND</a><button className="icon-button theme-button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button></header>
    <main className="auth-layout">
      <aside className="auth-story" aria-label="A quiet thought for your day"><span className="mini-label">A LITTLE SPACE TO BEGIN</span><div className="auth-art-wrap"><img className="auth-art" src="/images/mind-cloud.png" alt="A hand-drawn student sits with a tangled thought cloud overhead."/><span className="auth-art-note">No pressure.<br/>Just a place to begin.</span></div><blockquote>“You don't have to have it all figured out to begin.”</blockquote><span className="auth-story-foot">YOU CAN TAKE THIS AT YOUR OWN PACE</span></aside>
      <section className="auth-form-side" aria-labelledby="auth-title">
        {isDemo && <span className="demo-badge auth-demo-label">DEMO ACCESS · NO ACCOUNT NEEDED</span>}
        <p className="eyebrow">{recovery ? 'ACCOUNT HELP' : isSignup ? 'A PLACE TO START' : 'COME AS YOU ARE'}</p>
        <h1 id="auth-title">{heading}</h1><p className="auth-supporting">{supporting}</p>
        {recovery ? <div className="auth-recovery" role="status"><p>Password recovery isn't connected in this demo yet. You can continue exploring with the sample login.</p><button className="button button-dark" onClick={() => { setRecovery(false); window.location.assign('/demo-login') }}>Go to demo login <ArrowRight size={16}/></button></div> : <form id="auth-form" ref={formRef} onSubmit={validate} noValidate>
          {(isSignup || !recovery) && <div className="auth-field"><label htmlFor="preferred-name">{isSignup ? 'Preferred name' : 'What should we call you? (optional)'}</label><input id="preferred-name" name="name" autoComplete="nickname" value={name} onChange={event => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}/>{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>}
          <div className="auth-field"><label htmlFor="auth-email">Email address</label><input id="auth-email" name="email" type="email" autoComplete="email" inputMode="email" value={email} onChange={event => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}/>{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div>
          <div className="auth-field"><label htmlFor="auth-password">Password</label><div className="password-control"><input id="auth-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={event => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : isSignup ? 'password-hint' : undefined}/><button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{isSignup && <span className="field-hint" id="password-hint">At least 8 characters.</span>}{errors.password && <span className="field-error" id="password-error">{errors.password}</span>}</div>
          {isSignup && <div className="auth-field"><label htmlFor="confirm-password">Confirm password</label><div className="password-control"><input id="confirm-password" name="confirm" type={showConfirm ? 'text' : 'password'} autoComplete="new-password" value={confirm} onChange={event => setConfirm(event.target.value)} aria-invalid={Boolean(errors.confirm)} aria-describedby={errors.confirm ? 'confirm-error' : undefined}/><button type="button" className="password-toggle" aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'} aria-pressed={showConfirm} onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.confirm && <span className="field-error" id="confirm-error">{errors.confirm}</span>}</div>}
          {errors.form && <p className="auth-alert" role="alert">{errors.form}</p>}{message && <p className="auth-success" role="status">{message}</p>}
          <button className="button button-dark auth-submit" type="submit" disabled={busy}>{busy ? 'One moment…' : isSignup ? 'Create my account' : 'Sign in'} {!busy && <ArrowRight size={16}/>}</button>
          {!isSignup && !isDemo && <button type="button" className="auth-text-button forgot-link" onClick={() => { setRecovery(true); setErrors({}); setMessage('') }}>Forgot your password?</button>}
        </form>}
        {isSignup && <p className="auth-privacy">Your personal thoughts deserve care. Share only what you’re comfortable sharing. Registration does not ask for private journal entries or health information.</p>}
        {!isSignup && !recovery && <section className="demo-box" aria-labelledby="demo-title"><div><span className="mini-label">JUST EXPLORING?</span><h2 id="demo-title">Try the demo.</h2><p>Take a look around UNMIND without creating an account.</p></div><dl><div><dt>Name for your welcome</dt><dd>{name.trim() || DEMO_NAME}</dd></div><div><dt>Email</dt><dd>{DEMO_EMAIL}</dd></div><div><dt>Password</dt><dd>{DEMO_PASSWORD}</dd></div></dl><button type="button" className="button button-outline demo-use" disabled={busy} onClick={useDemo}>Use demo account <ArrowRight size={15}/></button><button type="button" className="auth-text-button guest-link" onClick={() => enter('guest')}>Explore as guest <ArrowRight size={14}/></button></section>}
        <p className="auth-switch">{isSignup ? <>Already have an account? <a href="/login">Sign in</a></> : <>New here? <a href="/signup">Create an account</a></>}</p>
        <p className="auth-disclaimer">{isSignup ? <>Or <a href="/demo-login">continue with demo access</a>.</> : <>This is a frontend demo. No real account or private student data is used. <a href="/demo-login">Demo login</a></>}</p>
      </section>
    </main>
  </div>
}
