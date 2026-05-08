import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { useOtpTimer } from '@/hooks/useOtpTimer'
import { signupStep1, signupStep2 } from '@/api/authService'
import { updateProfile } from '@/api/profileService'
import { activateFreeTrial, createCheckout, verifyPayment } from '@/api/subscriptionService'
import { openRazorpayCheckout } from '@/utils/razorpay'
import { getBusinesses } from '@/api/businessService'
import ChipSelector from '@/components/ui/ChipSelector'
import StyleCardSelector from '@/components/ui/StyleCardSelector'
import OtpInput from '@/components/ui/OtpInput'
import TagsInput from '@/components/ui/TagsInput'
import WhatsAppFAB from '@/components/common/WhatsAppFAB'
import '@/styles/register.css'

const TOTAL_STEPS = 4

// const INDUSTRY_OPTIONS = [
//   { value: 'Cafe / Restaurant', label: '☕ Cafe / Restaurant' },
//   { value: 'Real Estate', label: '🏠 Real Estate' },
//   { value: 'Fashion', label: '👗 Fashion' },
//   { value: 'Beauty', label: '💄 Beauty' },
//   { value: 'Fitness', label: '💪 Fitness' },
//   { value: 'Education', label: '📚 Education' },
//   { value: 'Healthcare', label: '🏥 Healthcare' },
//   { value: 'E-commerce', label: '🛒 E-commerce' },
//   { value: 'Personal Brand', label: '👤 Personal Brand' },
//   { value: 'Other', label: '📌 Other' },
// ]
const OTHER_INDUSTRY_OPTIONS = [
  { value: -1, label: '📌 Other' },
]

const POST_TYPE_OPTIONS = [
  { value: 'Promotions', label: '📢 Promotions' },
  { value: 'Offers', label: '🏷️ Offers' },
  { value: 'Educational', label: '📖 Educational' },
  { value: 'Quotes', label: '💬 Quotes' },
  { value: 'Product posts', label: '📦 Product posts' },
  { value: 'Reels', label: '🎬 Reels' },
]

const TONE_OPTIONS = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Fun', label: 'Fun' },
  { value: 'Premium', label: 'Premium' },
  { value: 'Informative', label: 'Informative' },
]

const BRANDING_OPTIONS = [
  { value: 'READY', label: 'Full branding ready' },
  { value: 'ONLY_LOGO', label: 'Only logo' },
  { value: 'NEED_HELP', label: 'Need help' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [txnData, setTxnData] = useState({ user_id: '', transaction_id: '' })
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [businesses, setBusinesses] = useState([]);

  // Step 2–4 local state
  const [industry, setIndustry] = useState([])
  const [postTypes, setPostTypes] = useState([])
  const [designStyles, setDesignStyles] = useState([])
  const [tones, setTones] = useState([])
  const [branding, setBranding] = useState([])
  const [refLinks, setRefLinks] = useState([])
  const [delivery, setDelivery] = useState('WhatsApp')
  const [files, setFiles] = useState([])

  const fileInputRef = useRef(null)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const { remaining, canResend, start: startTimer } = useOtpTimer(30)

    useEffect(() => {
    // Fetch business options on component mount
    getBusinesses()
      .then(({ data }) => {
        const options = data.map((b) => ({ value: b.id, label: b.name }))
        options.push(...OTHER_INDUSTRY_OPTIONS)
        setBusinesses(options)
      })
      .catch((err) => console.error('Failed to load business options:', err))
  }, [])

  const { register, handleSubmit, getValues, trigger, setValue, setFocus, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', mobile: '', businessName: '', businessDesc: '', websiteUrl: '', otherIndustry: '' },
  })

  const progress = (step / TOTAL_STEPS) * 100

  const sendOtp = async () => {
    const valid = await trigger(['name', 'email', 'mobile'])
    if (!valid) return
    const { name, email, mobile } = getValues()
    setLoading(true)
    setApiError('')
    try {
      const { data } = await signupStep1({ name, email, mobile })
      setTxnData({ user_id: data.user_id, transaction_id: data.transaction_id })
      setOtpSent(true)
      setOtp(data.otp) // For testing purposes, remove in production
      startTimer()
    } catch (err) {
      setApiError(err.response?.data?.error || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (otp.length !== 6) { setOtpError('Please enter the 6-digit OTP'); return }
    setLoading(true)
    setOtpError('')
    try {
      const { data } = await signupStep2({ ...txnData, otp })
      login(data.accessToken, null)
      setStep(2)
    } catch (err) {
      setOtpError(err.response?.data?.error || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const submitAll = async () => {
    const { businessName, businessDesc, websiteUrl, otherIndustry } = getValues()
    setLoading(true)
    setApiError('')
    // add logic to handle max files
    if (files.length > 5) {
      setApiError('You can upload a maximum of 5 files.')
      setLoading(false)
      return
    }

    try {
      await updateProfile({
        userBusiness: {
          business_id: industry[0] || -1,
          business_other: industry[0] === -1 ? otherIndustry : '',
          brand_name: businessName,
          description: businessDesc,
          website: websiteUrl,
          design_preferences: {
            postType: postTypes,
            designStyle: designStyles,
            contentTone: tones,
          },
          referenceLinks: refLinks,
          delivery_preference: delivery,
          branding_status: branding[0] || '',
        },
      }, files)

      const activateData = localStorage.getItem('activate')
      if (activateData) {
        const plan = JSON.parse(activateData)
        const { data: order } = await createCheckout(plan.id)
        await openRazorpayCheckout({
          order,
          user,
          onSuccess: async (paymentData) => {
            try {
              await verifyPayment(paymentData)
              localStorage.removeItem('activate')
              setStep(5)
            } catch {
              setApiError('Payment verified but subscription activation failed. Contact support.')
            }
          },
          onError: (err) => {
            if (err.message !== 'Payment cancelled') {
              setApiError('Payment failed. Please try again.')
            }
          },
        })
      } else {
        await activateFreeTrial()
        setStep(5)
      }
    } catch (err) {
      setApiError(err.response?.data?.error || 'Failed to save details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleIndustryChange = (selected) => {
    setIndustry(selected)
    if (selected[0] === -1) {
      setFocus('otherIndustry')
    } else {
      setValue('otherIndustry', '')
    }
  }

  const waNumber = import.meta.env.VITE_WA_NUMBER || '916380271857'
  const waLink = `https://wa.me/${waNumber}?text=Hi%2C%20I%27ve%20registered%20on%20MMB%20and%20I%27m%20excited%20to%20receive%20my%20free%20designs!`

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div className="reg-topbar">
        <Link to="/" className="reg-logo">
          <img src="/images/mmb-logo.svg" alt="MMB" />
        </Link>
        <Link to="/signin" className="reg-topbar-link">
          Already have an account? <strong>Sign In</strong>
        </Link>
      </div>

      <div className="reg-wrapper">
        <div className="reg-card">
          {/* Progress */}
          {step <= TOTAL_STEPS && (
            <>
              <div className="reg-progress">
                <div className="reg-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="reg-step-label">Step {step} of {TOTAL_STEPS}</div>
            </>
          )}

          {/* ===== STEP 1: Contact + OTP ===== */}
          {step === 1 && (
            <div className="reg-step active">
              <div className="reg-step-header">
                <div className="header-content">
                  <h2>Let's get started 🚀</h2>
                  <p>Enter your details to receive your free designs</p>
                </div>
              </div>

              <div className="reg-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  {...register('name')}
                />
              </div>

              <div className="reg-form-group">
                <label htmlFor="email">Email ID <span className="req">*</span></label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <span className="field-error">{errors.email.message}</span>}
              </div>

              <div className="reg-form-group">
                <label htmlFor="mobile">Mobile Number <span className="req">*</span></label>
                <div className="phone-input">
                  <span className="phone-prefix">+91</span>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    autoComplete="tel"
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
                    })}
                  />
                </div>
                {errors.mobile && <span className="field-error">{errors.mobile.message}</span>}
              </div>

              {apiError && <p className="field-error" style={{ marginBottom: '12px' }}>{apiError}</p>}

              {!otpSent ? (
                <button className="reg-btn primary" onClick={sendOtp} disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              ) : (
                <>
                  <OtpInput value={otp} onChange={setOtp} error={otpError} />
                  <p className="reg-micro">
                    Didn't receive?{' '}
                    {canResend ? (
                      <a href="#" onClick={(e) => { e.preventDefault(); sendOtp() }}>Resend OTP</a>
                    ) : (
                      <span>Resend in {remaining}s</span>
                    )}
                  </p>
                  <button className="reg-btn primary" onClick={verifyOtp} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP →'}
                  </button>
                </>
              )}
              <p className="reg-micro" style={{ marginTop: '16px' }}>
                We'll use this to send your designs and updates
              </p>
            </div>
          )}

          {/* ===== STEP 2: Business Details ===== */}
          {step === 2 && (
            <div className="reg-step active">
              <div className="reg-step-header">
                <div className="header-content">
                  <h2>Tell us about your business</h2>
                </div>
                <a href="#" className="skip-link" onClick={(e) => { e.preventDefault(); setStep(3) }}>Skip →</a>
              </div>

              <div className="reg-form-group">
                <label htmlFor="businessName">Business Name</label>
                <input id="businessName" type="text" placeholder="Bloom Boutique" {...register('businessName')} />
              </div>
              <div className="reg-form-group">
                <label htmlFor="businessDesc">What does your business do?</label>
                <textarea id="businessDesc" placeholder="We sell handmade jewellery online..." rows={3} {...register('businessDesc')} />
              </div>
              <div className="reg-form-group">
                <label htmlFor="websiteUrl">Website <span className="optional">(optional)</span></label>
                <input id="websiteUrl" type="url" placeholder="https://yourbrand.com" {...register('websiteUrl')} />
              </div>
              <div className="reg-form-group">
                <label>Industry</label>
                <ChipSelector options={businesses} mode="single" value={industry} onChange={handleIndustryChange} />
                {industry[0] === -1 && (
                  <input
                    type="text"
                    placeholder="Please specify your industry"
                    style={{ marginTop: '8px' }}
                    {...register('otherIndustry')}
                  />
                )}
                {errors.otherIndustry && <span className="field-error">{errors.otherIndustry.message}</span>}
              </div>

              <div className="reg-btn-row">
                <button className="reg-btn secondary" onClick={() => setStep(1)}>← Back</button>
                <button className="reg-btn primary" onClick={() => setStep(3)}>Next →</button>
              </div>
            </div>
          )}

          {/* ===== STEP 3: Content Preferences ===== */}
          {step === 3 && (
            <div className="reg-step active">
              <div className="reg-step-header">
                <div className="header-content">
                  <h2>What kind of designs do you prefer?</h2>
                </div>
                <a href="#" className="skip-link" onClick={(e) => { e.preventDefault(); setStep(4) }}>Skip →</a>
              </div>

              <div className="reg-form-group">
                <label>Post Type</label>
                <p className="help-text">Select what kind of posts you want us to create for you.</p>
                <ChipSelector options={POST_TYPE_OPTIONS} mode="multi" value={postTypes} onChange={setPostTypes} />
              </div>

              <div className="reg-form-group">
                <label>Design Style <span className="select-limit-note">Select up to 2</span></label>
                <p className="help-text">Choose a visual aesthetic that fits your brand identity. <strong>Maximum 2 styles.</strong></p>
                <StyleCardSelector value={designStyles} onChange={setDesignStyles} />
              </div>

              <div className="reg-form-group">
                <label>Content Tone <span className="select-limit-note">Select up to 2</span></label>
                <p className="help-text">How should your brand sound to your audience? <strong>Maximum 2 tones.</strong></p>
                <ChipSelector options={TONE_OPTIONS} mode="multi" max={2} value={tones} onChange={setTones} />
              </div>

              <div className="reg-form-group">
                <label>Branding Status</label>
                <p className="help-text">Let us know if you already have a logo, fonts, and colors.</p>
                <ChipSelector options={BRANDING_OPTIONS} mode="single" value={branding} onChange={setBranding} />
              </div>

              <div className="reg-btn-row">
                <button className="reg-btn secondary" onClick={() => setStep(2)}>← Back</button>
                <button className="reg-btn primary" onClick={() => setStep(4)}>Next →</button>
              </div>
            </div>
          )}

          {/* ===== STEP 4: References & Delivery ===== */}
          {step === 4 && (
            <div className="reg-step active">
              <div className="reg-step-header">
                <div className="header-content">
                  <h2>Final details</h2>
                </div>
              </div>

              <div className="reg-form-group">
                <label>Reference Links</label>
                <p className="help-text">Press Enter or type a comma to add multiple links.</p>
                <TagsInput
                  value={refLinks}
                  onChange={setRefLinks}
                  placeholder="Instagram pages or competitors you like"
                />
              </div>

              <div className="reg-form-group">
                <label>Upload Assets </label>
                <p className="help-text">Maximum 5 files. Accepted formats: images, PDF, AI, PSD.</p>
                <div
                  className="upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const droppedFiles = Array.from(e.dataTransfer.files)
                    if (files.length + droppedFiles.length > 5) {
                      setApiError('You can upload a maximum of 5 files.')
                      return
                    }
                    setFiles((prev) => [...prev, ...droppedFiles])
                  }}
                >
                  <div className="upload-icon">📁</div>
                  <p>Drag & drop your logo, images here</p>
                  <span>or <strong>browse files</strong></span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.ai,.psd"
                    hidden
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files)
                      if (files.length + selectedFiles.length > 5) {
                        setApiError('You can upload a maximum of 5 files.')
                        return
                      }
                      setFiles((prev) => [...prev, ...selectedFiles])
                    }}
                  />
                </div>
                {files.length > 0 && (
                  <div className="uploaded-files">
                    {files.map((f, i) => (
                      <div key={i} className="uploaded-file-item">
                        📄 {f.name}
                        <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="reg-form-group">
                <label>Delivery Preference</label>
                <div className="radio-group row">
                  {['Whatsapp', 'Email'].map((opt) => (
                    <label key={opt} className="radio-item">
                      <input
                        type="radio"
                        name="delivery"
                        value={opt}
                        checked={delivery === opt}
                        onChange={() => setDelivery(opt)}
                      />
                      <span className="radio-custom"></span>
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {apiError && <p className="field-error" style={{ marginBottom: '12px' }}>{apiError}</p>}

              <div className="reg-btn-row">
                <button className="reg-btn secondary" onClick={() => setStep(3)}>← Back</button>
                <button className="reg-btn primary" onClick={submitAll} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit →'}
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 5: Success ===== */}
          {step === 5 && (
            <div className="reg-step active">
              <div className="success-screen">
                <div className="success-icon">🎉</div>
                <h2>You're all set!</h2>
                <p>
                  We're working on your <strong>3 FREE designs</strong>.<br />
                  You'll receive them within <strong>48 hours</strong>.
                </p>
                <a href={waLink} target="_blank" rel="noopener" className="reg-btn primary whatsapp-btn">
                  💬 Continue on WhatsApp
                </a>
                <p className="reg-micro" style={{ marginTop: '12px' }}>
                  Need immediate help? Message us directly on WhatsApp.
                </p>
                <Link to="/" className="reg-btn secondary" style={{ marginTop: '12px' }}>
                  Go to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <WhatsAppFAB />
    </div>
  )
}
