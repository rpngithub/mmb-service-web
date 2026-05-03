export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function openRazorpayCheckout({ order, user, onSuccess, onError }) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    onError(new Error('Razorpay SDK failed to load'))
    return
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency || 'INR',
    name: 'Make My Brand',
    description: order.plan?.name || 'Subscription Plan',
    order_id: order.razorpay_order_id,
    prefill: {
      name: user?.name || '',
      email: user?.email || '',
      contact: user?.mobile || '',
    },
    theme: { color: '#ed2024' },
    handler: (response) => {
      onSuccess({
        order_id: order.order_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      })
    },
    modal: { ondismiss: () => onError(new Error('Payment cancelled')) },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}
