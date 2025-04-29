import { CountryData } from './CountryData';

export const searchCountry = (countryCode: string, stateCode: string) => {
  return (
    CountryData.find(
      (entry) => entry.country_code === countryCode && entry.state_code === stateCode
    ) || null
  );
};
