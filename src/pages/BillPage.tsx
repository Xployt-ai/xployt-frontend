// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { Info } from "lucide-react";

const BillPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-6">
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
            <option>LKR</option>
            <option>USD</option>
          </select>
        </div>
      </header>

      {/* Main Container with gray border */}
      <div className="w-full max-w-5xl bg-zinc-900 rounded-lg shadow-lg border border-zinc-700 grid md:grid-cols-2 overflow-hidden">
        {/* Left: Billing Form */}
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Checkout Details
            <Info className="w-4 h-4 text-zinc-500" />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* White Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2.5 rounded transition shadow-sm text-sm hover:bg-zinc-200"
            >
              Complete Payment
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="p-8 bg-zinc-900/60 border-l border-zinc-700">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Plan</span>
              <span className="text-white">Pro Monthly</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span className="text-white">1 Month</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-white">- LKR 0.00</span>
            </div>
          </div>

          <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between text-base font-semibold text-white">
            <span>Total</span>
            <span>LKR 3,500.00</span>
          </div>

          {/* Security Info */}
          <div className="mt-6 text-xs text-zinc-500 flex items-start gap-2">
            <Info className="w-3 h-3 mt-0.5" />
            <p>
              All payments are securely processed and encrypted. We do not store
              your card information.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded shadow-sm">
              <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div>
                <div className="text-xs font-semibold leading-tight text-white">
                  Secure
                </div>
                <div className="text-xs text-zinc-400 leading-tight">
                  Payment
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded shadow-sm">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div className="text-xs font-bold text-white">SSL Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-8 text-center text-xs text-zinc-500 border-t border-zinc-800 pt-4">
        <p>
          By proceeding, you agree to Xployt.ai’s Terms of Service and Privacy
          Policy.
        </p>
        <p className="pt-2 text-zinc-600">
          © Xployt.ai 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BillPage;
