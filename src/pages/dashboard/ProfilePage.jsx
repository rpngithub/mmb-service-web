import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { updateProfile } from '@/api/profileService'
import { useState } from 'react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        businessName: user.userBusiness?.brand_name || '',
        industry: user.userBusiness?.design_preferences?.industry?.[0] || '',
        website: user.userBusiness?.website || '',
      })
    }
  }, [user, reset])

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
            <p>{user?.subscription?.plan?.name || 'Free Plan'} Member</p>
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
          <div className="db-form-row">
            <div className="db-form-group">
              <label htmlFor="profIndustry">Industry</label>
              <input id="profIndustry" type="text" placeholder="e.g. Fashion, Fitness" {...register('industry')} />
            </div>
            <div className="db-form-group">
              <label htmlFor="profWebsite">Website</label>
              <input id="profWebsite" type="url" placeholder="https://yourbrand.com" {...register('website')} />
            </div>
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
