import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  currencyCode: string;
  exchangeRate: number;
  isLoading: boolean;
  formatPrice: (priceInINR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currencyCode: 'INR',
  exchangeRate: 1,
  isLoading: true,
  formatPrice: (price) => `₹${price.toFixed(2)}`,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCurrency = async () => {
      try {
        let targetCurrency = 'INR';
        let detected = false;

        // --- LAYER 1: ipapi.co (Simple Text Endpoint) ---
        if (!detected) {
            try {
                console.log("Attempting Layer 1 (ipapi.co)...");
                const response = await fetch('https://ipapi.co/currency/', { method: 'GET' });
                if (response.ok) {
                    const text = await response.text();
                    const cleanText = text.trim().toUpperCase();
                    if (cleanText && cleanText.length === 3) {
                        targetCurrency = cleanText;
                        detected = true;
                        console.log("Layer 1 Success:", targetCurrency);
                    }
                }
            } catch (e) {
                console.warn("Layer 1 failed.");
            }
        }

        // --- LAYER 2: ipwho.is (JSON Endpoint) ---
        if (!detected) {
            try {
                console.log("Attempting Layer 2 (ipwho.is)...");
                const response = await fetch('https://ipwho.is/');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.currency && data.currency.code) {
                        targetCurrency = data.currency.code;
                        detected = true;
                        console.log("Layer 2 Success:", targetCurrency);
                    }
                }
            } catch (e) {
                console.warn("Layer 2 failed.");
            }
        }

        // --- LAYER 3: freeipapi.com (JSON Backup) ---
        if (!detected) {
            try {
                console.log("Attempting Layer 3 (freeipapi.com)...");
                const response = await fetch('https://freeipapi.com/api/json');
                if (response.ok) {
                    const data = await response.json();
                    if (data.currency && data.currency.code) {
                        targetCurrency = data.currency.code;
                        detected = true;
                        console.log("Layer 3 Success:", targetCurrency);
                    }
                }
            } catch (e) {
                console.warn("Layer 3 failed.");
            }
        }

        // If we still think it's INR, we stop here to save resources
        if (targetCurrency === 'INR') {
            console.log("User is in India or detection failed. Staying in INR.");
            setIsLoading(false);
            return;
        }

        // --- FETCH EXCHANGE RATES ---
        // We have a target currency (e.g. USD), now get the rate relative to INR
        try {
            console.log(`Fetching exchange rate for INR -> ${targetCurrency}...`);
            const rateResponse = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
            const rateData = await rateResponse.json();
            
            if (rateData && rateData.rates && rateData.rates[targetCurrency]) {
                const rate = rateData.rates[targetCurrency];
                console.log(`Exchange Rate Found: 1 INR = ${rate} ${targetCurrency}`);
                
                setCurrencyCode(targetCurrency);
                setExchangeRate(rate);
            } else {
                console.error(`Rate for ${targetCurrency} not found in API.`);
            }
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);
        }

      } catch (error) {
        console.error("Critical error in CurrencyContext:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initCurrency();
  }, []);

  const formatPrice = (priceInINR: number) => {
    if (typeof priceInINR !== 'number' || isNaN(priceInINR)) return '₹0.00';

    const convertedPrice = priceInINR * exchangeRate;
    
    try {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(convertedPrice);
    } catch (e) {
        return `₹${priceInINR.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currencyCode, exchangeRate, isLoading, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
