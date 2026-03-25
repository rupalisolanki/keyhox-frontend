import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Server, Navigation, AlertTriangle, Loader } from 'lucide-react';

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  org: string;
  timezone: string;
}

const LocationDetails: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.reason || 'Error fetching location');
        }
        setLocationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader className="animate-spin text-[#16a34a] mb-4" size={48} />
        <p className="text-gray-600 font-medium">Detecting your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-red-50 p-6 rounded-full mb-6">
            <AlertTriangle className="text-red-500" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Detect Location</h2>
        <p className="text-gray-600 max-w-md mb-8">{error}</p>
        <button 
            onClick={() => window.location.reload()}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#16a34a]/20"
        >
            Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6">
            <Globe size={16} /> Geo-Location Services
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Your Digital Footprint</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We've detected the following details based on your current internet connection.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Map Placeholder or Header */}
        <div className="bg-[#1e2025] p-8 text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
                </svg>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                        <MapPin size={32} className="text-[#16a34a]" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{locationData?.city}</h2>
                        <p className="text-gray-400 text-lg">{locationData?.region}, {locationData?.country_name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-1">IP Address</div>
                    <div className="text-2xl font-mono font-bold text-[#16a34a]">{locationData?.ip}</div>
                </div>
            </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <Navigation size={20} className="text-[#16a34a]" /> Location Details
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Country Code</div>
                        <div className="font-bold text-gray-900">{locationData?.country_code}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Timezone</div>
                        <div className="font-bold text-gray-900">{locationData?.timezone}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Latitude</div>
                        <div className="font-bold text-gray-900">{locationData?.latitude}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Longitude</div>
                        <div className="font-bold text-gray-900">{locationData?.longitude}</div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <Server size={20} className="text-[#16a34a]" /> Network Information
                </h3>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-2">Internet Service Provider (ISP)</div>
                    <div className="font-bold text-gray-900 text-lg">{locationData?.org}</div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-blue-800 text-sm leading-relaxed">
                        <strong className="block mb-1">Note:</strong>
                        This information is retrieved from your public IP address. It represents the location of your internet connection point, which might differ slightly from your exact physical location.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
