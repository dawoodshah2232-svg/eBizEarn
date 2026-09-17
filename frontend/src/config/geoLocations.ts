export interface CountryOption {
  code: string;
  label: string;
  currency: string;
  flag: string;
}

export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'GLOBAL', label: 'Worldwide (Global Reach 🌐)', currency: 'USD', flag: '🌐' },
  { code: 'US', label: 'United States 🇺🇸', currency: 'USD', flag: '🇺🇸' },
  { code: 'GB', label: 'United Kingdom 🇬🇧', currency: 'GBP', flag: '🇬🇧' },
  { code: 'AE', label: 'United Arab Emirates 🇦🇪', currency: 'AED', flag: '🇦🇪' },
  { code: 'SA', label: 'Saudi Arabia 🇸🇦', currency: 'SAR', flag: '🇸🇦' },
  { code: 'DE', label: 'Germany / Europe 🇩🇪', currency: 'EUR', flag: '🇩🇪' },
  { code: 'CA', label: 'Canada 🇨🇦', currency: 'CAD', flag: '🇨🇦' },
  { code: 'SG', label: 'Singapore 🇸🇬', currency: 'SGD', flag: '🇸🇬' },
  { code: 'AU', label: 'Australia 🇦🇺', currency: 'AUD', flag: '🇦🇺' },
  { code: 'QA', label: 'Qatar 🇶🇦', currency: 'QAR', flag: '🇶🇦' },
  { code: 'KW', label: 'Kuwait 🇰🇼', currency: 'KWD', flag: '🇰🇼' },
  { code: 'IN', label: 'India 🇮🇳', currency: 'INR', flag: '🇮🇳' },
];

export const REGIONAL_REGIONS: Record<string, Record<string, string[]>> = {
  GLOBAL: {
    'Worldwide (All Regions)': ['Global Remote', 'Tier 1 Global Markets', 'International Chapters', 'Worldwide Open'],
  },
  US: {
    'New York': ['Manhattan', 'Brooklyn', 'Queens', 'Citywide NYC'],
    California: ['Los Angeles', 'San Francisco / Bay Area', 'San Diego', 'Statewide CA'],
    Texas: ['Austin', 'Dallas-Fort Worth', 'Houston', 'Statewide TX'],
    Florida: ['Miami', 'Orlando', 'Tampa', 'Statewide FL'],
    'Nationwide USA': ['All 50 US States'],
  },
  GB: {
    'Greater London': ['Central London', 'City of London', 'Canary Wharf', 'Greater London'],
    Manchester: ['City Centre', 'Salford', 'Greater Manchester'],
    'West Midlands': ['Birmingham', 'Coventry'],
    'Nationwide UK': ['England, Scotland, Wales & NI'],
  },
  AE: {
    Dubai: ['Downtown Dubai', 'Dubai Marina', 'Business Bay', 'DIFC', 'Citywide Dubai'],
    'Abu Dhabi': ['Corniche Area', 'Al Reem Island', 'Yas Island', 'Citywide Abu Dhabi'],
    Sharjah: ['Al Majaz', 'Al Nahda', 'Muwailih Commercial', 'Citywide Sharjah'],
    Ajman: ['Al Nuaimia', 'Ajman Corniche', 'Al Jurf', 'Citywide Ajman'],
    'All UAE': ['UAE Nationwide (All Emirates)'],
  },
  SA: {
    Riyadh: ['Olaya / King Fahd', 'KAFD', 'Al Malqa', 'Citywide Riyadh'],
    Jeddah: ['Corniche', 'Al Rawdah', 'Al Hamra', 'Citywide Jeddah'],
    'Eastern Province': ['Dammam', 'Khobar', 'Dhahran'],
    'Kingdomwide KSA': ['All Saudi Regions'],
  },
  DE: {
    Berlin: ['Mitte', 'Kreuzberg', 'Charlottenburg', 'Citywide Berlin'],
    Bavaria: ['Munich City', 'Nuremberg'],
    'North Rhine-Westphalia': ['Cologne', 'Dusseldorf'],
    'Nationwide Germany': ['All Federal States'],
  },
  CA: {
    Ontario: ['Downtown Toronto', 'Mississauga', 'Ottawa'],
    'British Columbia': ['Vancouver Downtown', 'Burnaby', 'Richmond'],
    'Nationwide Canada': ['All Canadian Provinces'],
  },
  SG: {
    'Singapore Central': ['Marina Bay', 'Orchard', 'Raffles Place', 'Citywide Singapore'],
  },
  AU: {
    'New South Wales': ['Sydney CBD', 'Parramatta', 'North Sydney'],
    Victoria: ['Melbourne CBD', 'Docklands', 'Southbank'],
  },
  QA: {
    Doha: ['West Bay', 'The Pearl-Qatar', 'Lusail City', 'Citywide Doha'],
  },
  KW: {
    'Kuwait City': ['Sharq', 'Salmiya', 'Hawally', 'Citywide Kuwait'],
  },
  IN: {
    Maharashtra: ['Mumbai (BKC / South)', 'Pune'],
    Karnataka: ['Bengaluru Tech Corridor', 'Indiranagar'],
    Delhi: ['New Delhi Central', 'Gurugram Cyber Hub'],
  },
};

export const getCountryFlag = (countryCode: string): string => {
  const found = COUNTRY_OPTIONS.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
  return found ? found.flag : '🌐';
};

export const getCountryCurrency = (countryCode: string): string => {
  const found = COUNTRY_OPTIONS.find((c) => c.code.toUpperCase() === countryCode.toUpperCase());
  return found ? found.currency : 'USD';
};
