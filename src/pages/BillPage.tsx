import React, { useState } from 'react';
import { Info, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [hasCoupon, setHasCoupon] = useState(false);
  const [formData, setFormData] = useState({
    businessPurchase: false,
    email: '',
    firstName: '',
    lastName: '',
    country: 'Sri Lanka',
    district: 'Colombo',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    couponCode: ''
  });

  const productPrice = 4999.00; // LKR
  const vatRate = 0.18; // 18% VAT in Sri Lanka
  const subtotal = productPrice * quantity;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Order submitted:', { ...formData, quantity, total });
    alert('Order submitted successfully!');
  };

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-zinc-900 rounded-lg shadow-2xl overflow-hidden border border-zinc-800">
        {/* Header */}
        <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-5 bg-blue-500 rounded-sm"></div>
              <div className="w-1.5 h-5 bg-blue-400 rounded-sm"></div>
              <div className="w-1.5 h-5 bg-blue-300 rounded-sm"></div>
            </div>
            <span className="text-lg font-bold text-white">XPLOYT</span>
            <span className="text-lg font-light text-zinc-400">.AI</span>
          </div>
          <div className="flex gap-3">
            <select className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>🇱🇰 English</option>
              <option>🇱🇰 සිංහල</option>
              <option>🇱🇰 தமிழ்</option>
            </select>
            <select className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>LKR</option>
              <option>USD</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 divide-x divide-zinc-800">
          {/* Left Column - Billing Form */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-xl font-semibold text-white">Billing information</h2>
              <Info className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="businessPurchase"
                  id="businessPurchase"
                  checked={formData.businessPurchase}
                  onChange={handleInputChange}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-800"
                />
                <label htmlFor="businessPurchase" className="text-xs text-zinc-400">Business purchase</label>
              </div>

              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sriLankanDistricts.map(district => (
                  <option key={district}>{district}</option>
                ))}
              </select>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 border-2 rounded transition ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800'
                    }`}
                  >
                    <span className="text-blue-400 font-bold text-base">VISA</span>
                    <span className="text-orange-400 text-xl leading-none">●●</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center px-3 py-2.5 border-2 rounded transition ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800'
                    }`}
                  >
                    <span className="text-blue-400 font-bold text-base">Pay</span>
                    <span className="text-blue-300 font-bold text-base">Pal</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number *"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-2 gap-3">
  <input
    type="text"
    name="expirationDate"
    placeholder="MM/YY"
    value={formData.expirationDate}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ''); // remove non-digits
      if (value.length > 4) value = value.slice(0, 4); // max 4 digits
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2); // format MM/YY
      setFormData(prev => ({ ...prev, expirationDate: value }));
    }}
    className="px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
  <div className="relative">
    <input
      type="text"
      name="securityCode"
      placeholder="CVV *"
      value={formData.securityCode}
      onChange={handleInputChange}
      className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <Info className="absolute right-2 top-2.5 w-3.5 h-3.5 text-zinc-500" />
  </div>
</div>

                </>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasCoupon"
                  checked={hasCoupon}
                  onChange={(e) => setHasCoupon(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-800"
                />
                <label htmlFor="hasCoupon" className="text-xs text-zinc-400">I have a coupon code</label>
              </div>

              {hasCoupon && (
                <input
                  type="text"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded transition shadow-sm text-sm mt-2"
              >
                Submit 
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="p-6 bg-zinc-900/50">
            <div className="grid grid-cols-3 gap-3 text-xs font-semibold text-zinc-500 mb-4 pb-3 border-b border-zinc-800">
              <div>PRODUCT</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-right">PRICE</div>
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center flex-shrink-0">
                  <div className="w-7 h-9 bg-blue-400/30 rounded-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white mb-0.5">Xployt.ai Pro Plan</h3>
                  <p className="text-xs text-blue-400">Monthly subscription</p>
                </div>
              </div>

            
            </div>

            <div className="border-t border-zinc-800 pt-3 space-y-2">
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Info className="w-3 h-3" />
                <span>VAT (18%): LKR {vat.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-base pt-2 border-t border-zinc-800 text-white">
                <span>Total :</span>
                <span>LKR {total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded shadow-sm">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">✓</div>
                <div>
                  <div className="text-xs font-semibold leading-tight text-white">Secure</div>
                  <div className="text-xs text-zinc-400 leading-tight">Payment</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded shadow-sm">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                <div className="text-xs font-bold text-white">SSL Encrypted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-950 text-white px-6 py-5 border-t border-zinc-800">
          <div className="text-center text-xs text-zinc-500 space-y-1.5">
            <p>By submitting your order, you agree to Xployt.ai's Terms of Service and Privacy Policy.</p>
            <p>All transactions are secured and encrypted. Your payment information is processed securely.</p>
            <p>For support inquiries: support@xployt.ai | +94 11 234 5678</p>
            <p className="pt-2 text-zinc-600">© Xployt.ai 2025. All rights reserved.</p>
          </div>
          <div className="flex justify-center gap-3 text-xs mt-3 pt-3 border-t border-zinc-900">
            <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition">Privacy Policy</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition">Terms of Service</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition">Refund Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}