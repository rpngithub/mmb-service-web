import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { updateProfile } from '@/api/profileService'
import ChipSelector from '@/components/ui/ChipSelector'
import { getBusinesses } from '@/api/businessService'


const OTHER_INDUSTRY_OPTIONS = [
  { value: -1, label: '📌 Other' },
]

export default function ProfilePage() {
  const { user, business, subscription, freeTrial } = useAuth()
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)
  const [industry, setIndustry] = useState([business?.business_id || ''])
  const [businesses, setBusinesses] = useState([]);

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
  

  const { register, handleSubmit, reset, setFocus, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        businessName: business?.brand_name || '',
        otherIndustry: business?.business_other || '',
        website: business?.website || '',
      })
    }
  }, [user, business, reset])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        userBusiness: {
          brand_name: data.businessName,
          business_id: industry[0] === -1 ? null : industry[0],
          business_other: industry[0] === -1 ? data.otherIndustry : null,
          website: data.website,
        },
      })
      showToast('✅ Profile updated successfully!')
    } catch {
      showToast('❌ Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const userName = user?.name || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  const handleIndustryChange = (selected) => {
    setIndustry(selected)
    if (selected[0] === -1) {
      setFocus('otherIndustry')
    } else {
      setValue('otherIndustry', '')
    }
  }

  return (
    <div className="db-page active">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title">My <span className="text-gradient">Profile</span></h1>
          <p className="db-page-subtitle">Manage your personal and business information</p>
        </div>
      </div>

      <div className="db-profile-card db-card">
        <div className="db-profile-avatar-section">
          <div className="db-profile-avatar">{userInitial}</div>
          <div>
            <h3>{userName}</h3>
            <p>{subscription ? subscription.plan_name : (freeTrial ? 'Free Plan' : 'Unsubscribed')} Member</p>
          </div>
        </div>

        <form className="db-profile-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="db-form-row">
            <div className="db-form-group">
              <label htmlFor="profName">Full Name</label>
              <input id="profName" type="text" {...register('name')} />
            </div>
            <div className="db-form-group">
              <label htmlFor="profEmail">Email</label>
              <input id="profEmail" type="email" {...register('email')} />
            </div>
          </div>
          <div className="db-form-row">
            <div className="db-form-group">
              <label htmlFor="profMobile">
                Mobile <span className="db-locked-hint">🔒 Change in Settings</span>
              </label>
              <input id="profMobile" type="tel" disabled readOnly {...register('mobile')} />
            </div>
            <div className="db-form-group">
              <label htmlFor="profBusiness">Business Name</label>
              <input id="profBusiness" type="text" placeholder="Your business name" {...register('businessName')} />
            </div>
          </div>
          <div className="db-form-group">
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
                
              </div>
              <div className="db-form-row"> </div>
              <div className="db-form-group">
                <label htmlFor="profWebsite">Website</label>
                <input id="profWebsite" type="url" placeholder="https://yourbrand.com" {...register('website')} />
              </div>

          <button type="submit" className="db-save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {toast && (
        <div className="db-toast-container">
          <div className="db-toast">{toast}</div>
        </div>
      )}
    </div>
  )
}
