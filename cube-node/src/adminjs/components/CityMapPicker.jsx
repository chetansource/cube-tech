import React from 'react';
import { Box, Label, Select } from '@adminjs/design-system';

// City coordinates as % position on the 868x868 map SVG image
// Determined empirically by visual analysis - map uses non-linear projection
const CITY_COORDINATES = {
  'Delhi': { x: 32, y: 25 },
  'Mumbai': { x: 19, y: 51 },
  'Bangalore': { x: 37, y: 75 },
  'Chennai': { x: 42, y: 75 },
  'Hyderabad': { x: 38, y: 65 },
  'Kolkata': { x: 67, y: 43 },
  'Pune': { x: 22, y: 56 },
  'Ahmedabad': { x: 13, y: 44 },
  'Lucknow': { x: 40, y: 31 },
  'Jaipur': { x: 25, y: 30 },
  'Chandigarh': { x: 28, y: 18 },
  'Bhopal': { x: 30, y: 43 },
  'Patna': { x: 52, y: 33 },
  'Bhubaneswar': { x: 52, y: 50 },
  'Thiruvananthapuram': { x: 30, y: 88 },
  'Kochi': { x: 28, y: 83 },
  'Guwahati': { x: 72, y: 25 },
  'Dehradun': { x: 32, y: 17 },
  'Shimla': { x: 29, y: 16 },
  'Srinagar': { x: 25, y: 6 },
  'Jammu': { x: 24, y: 10 },
  'Ranchi': { x: 52, y: 40 },
  'Raipur': { x: 42, y: 48 },
  'Gandhinagar': { x: 13, y: 44 },
  'Panaji': { x: 20, y: 60 },
  'Imphal': { x: 78, y: 30 },
  'Shillong': { x: 73, y: 26 },
  'Aizawl': { x: 76, y: 30 },
  'Kohima': { x: 78, y: 27 },
  'Agartala': { x: 74, y: 30 },
  'Itanagar': { x: 76, y: 22 },
  'Gangtok': { x: 68, y: 24 },
  'Dispur': { x: 73, y: 26 },
  'Amaravati': { x: 44, y: 63 },
  'Noida': { x: 33, y: 26 },
  'Gurugram': { x: 31, y: 26 },
  'Surat': { x: 15, y: 50 },
  'Vadodara': { x: 14, y: 47 },
  'Nagpur': { x: 38, y: 48 },
  'Indore': { x: 25, y: 44 },
  'Coimbatore': { x: 33, y: 80 },
  'Visakhapatnam': { x: 50, y: 58 },
  'Madurai': { x: 36, y: 83 },
  'Varanasi': { x: 46, y: 33 },
  'Kanpur': { x: 39, y: 32 },
  'Mysuru': { x: 34, y: 78 },
  'Mangaluru': { x: 27, y: 76 },
  'Jodhpur': { x: 17, y: 31 },
  'Udaipur': { x: 18, y: 37 },
  'Agra': { x: 34, y: 29 },
};

const cityOptions = Object.keys(CITY_COORDINATES)
  .sort()
  .map((city) => ({ value: city, label: city }));

const CityMapPicker = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';

  const handleChange = (selected) => {
    const city = selected?.value || '';
    onChange(property.path, city);

    if (city && CITY_COORDINATES[city]) {
      const coords = CITY_COORDINATES[city];
      onChange('mapPosition.x', coords.x);
      onChange('mapPosition.y', coords.y);
    }
  };

  const selectedOption = value ? { value, label: value } : null;

  return (
    <Box mb="lg">
      <Label htmlFor={property.path}>{property.label}</Label>
      <Select
        id={property.path}
        value={selectedOption}
        options={cityOptions}
        onChange={handleChange}
        isClearable
      />
      {value && CITY_COORDINATES[value] && (
        <Box mt="sm" style={{ fontSize: '12px', color: '#666' }}>
          Coordinates: X={CITY_COORDINATES[value].x}, Y={CITY_COORDINATES[value].y}
        </Box>
      )}
    </Box>
  );
};

export default CityMapPicker;
