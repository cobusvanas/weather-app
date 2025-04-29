import { searchCountry } from '../Countries';

jest.mock('../CountryData', () => ({
  CountryData: [
    { country_code: 'US', state_code: 'CA', name: 'California' },
    { country_code: 'US', state_code: 'NY', name: 'New York' },
    { country_code: 'CA', state_code: 'ON', name: 'Ontario' },
  ],
}));

describe('searchCountry', () => {
  it('should return the correct country data when a match is found', () => {
    const result = searchCountry('US', 'CA');
    expect(result).toEqual({ country_code: 'US', state_code: 'CA', name: 'California' });
  });

  it('should return null when no match is found', () => {
    const result = searchCountry('US', 'TX');
    expect(result).toBeNull();
  });

  it('should return null when the input is invalid', () => {
    const result = searchCountry('', '');
    expect(result).toBeNull();
  });

  it('should handle case sensitivity correctly', () => {
    const result = searchCountry('ca', 'on');
    expect(result).toBeNull(); // Assuming the function is case-sensitive
  });
});
