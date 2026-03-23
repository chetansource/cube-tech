import React from 'react';
import { Box, Label, Select } from '@adminjs/design-system';

// City coordinates mapped to SVG viewBox 0-100 for the India map
const CITY_COORDINATES = {
  // Metro cities
  'Delhi': { x: 48, y: 28 },
  'Mumbai': { x: 35, y: 52 },
  'Bangalore': { x: 42, y: 72 },
  'Chennai': { x: 50, y: 72 },
  'Hyderabad': { x: 46, y: 60 },
  'Kolkata': { x: 62, y: 44 },
  'Pune': { x: 37, y: 56 },
  'Ahmedabad': { x: 32, y: 42 },

  // State capitals
  'Lucknow': { x: 52, y: 33 },
  'Jaipur': { x: 40, y: 33 },
  'Chandigarh': { x: 45, y: 22 },
  'Bhopal': { x: 45, y: 44 },
  'Patna': { x: 58, y: 35 },
  'Bhubaneswar': { x: 58, y: 50 },
  'Thiruvananthapuram': { x: 40, y: 82 },
  'Kochi': { x: 39, y: 78 },
  'Guwahati': { x: 68, y: 32 },
  'Dehradun': { x: 47, y: 22 },
  'Shimla': { x: 44, y: 20 },
  'Srinagar': { x: 39, y: 12 },
  'Jammu': { x: 41, y: 15 },
  'Ranchi': { x: 58, y: 42 },
  'Raipur': { x: 52, y: 48 },
  'Gandhinagar': { x: 32, y: 41 },
  'Panaji': { x: 35, y: 62 },
  'Imphal': { x: 72, y: 35 },
  'Shillong': { x: 68, y: 34 },
  'Aizawl': { x: 70, y: 38 },
  'Kohima': { x: 72, y: 33 },
  'Agartala': { x: 68, y: 38 },
  'Itanagar': { x: 70, y: 28 },
  'Gangtok': { x: 62, y: 30 },
  'Dispur': { x: 68, y: 32 },
  'Amaravati': { x: 46, y: 64 },

  // Major tier-2 cities
  'Noida': { x: 49, y: 29 },
  'Gurugram': { x: 47, y: 29 },
  'Surat': { x: 33, y: 48 },
  'Vadodara': { x: 33, y: 45 },
  'Nagpur': { x: 46, y: 48 },
  'Indore': { x: 40, y: 44 },
  'Coimbatore': { x: 42, y: 76 },
  'Visakhapatnam': { x: 54, y: 58 },
  'Madurai': { x: 44, y: 80 },
  'Varanasi': { x: 54, y: 35 },
  'Kanpur': { x: 51, y: 33 },
  'Mysuru': { x: 41, y: 74 },
  'Mangaluru': { x: 37, y: 72 },
  'Jodhpur': { x: 34, y: 33 },
  'Udaipur': { x: 35, y: 38 },
  'Agra': { x: 48, y: 32 },
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
