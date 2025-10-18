import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TopUpAccount() {
  const [amount, setAmount] = useState('100.00');
  const [currency, setCurrency] = useState('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencies = ['USD', 'EUR', 'LKR'];
  
  const exchangeRates = {
    USD: 0.955,
    EUR: 1.05,
    LKR: 0.0027,
  };

  const tokenAmount = (parseFloat(amount) * exchangeRates[currency]).toFixed(2);

  return (
   
        <div className="min-h-screen text-white flex items-start justify-center pt-20 px-4">

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Up Your Account</h1>
          <p className="text-gray-400">Add funds to purchase more tokens.</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Amount</label>
            <div className="relative">
              <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700 px-4 py-3">
                <span className="text-gray-400 mr-2">{currency === 'LKR' ? '₨' : '$'}</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none text-lg"
                  placeholder="0.00"
                />
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center text-gray-400 hover:text-white transition-colors ml-2"
                >
                  <span className="mr-1">{currency}</span>
                  <ChevronDown size={16} />
                </button>
              </div>

              {showCurrencyDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-32">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-gray-700 rounded-full p-2">
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">You'll get</label>
            <div className="bg-gray-900 rounded-lg border border-gray-700 px-4 py-3 flex items-center justify-between">
              <span className="text-xl font-semibold">{tokenAmount} TKN</span>
              <span className="text-sm text-gray-400">
                1 {currency} = {exchangeRates[currency]} TKN
              </span>
            </div>
          </div>

          <button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-lg transition-colors">
            Confirm & Add Cash
          </button>
        </div>
      </div>
    </div>
  );
}
