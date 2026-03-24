import React from 'react';
import { Box, Label, Select } from '@adminjs/design-system';

// City coordinates as % position on the 868x868 map SVG image
// Determined empirically by visual analysis - map uses non-linear projection
const CITY_COORDINATES = {
  'Agartala': { x: 92.17, y: 55.30 },
  'Agra': { x: 48.39, y: 41.47 },
  'Ahmedabad': { x: 34.56, y: 52.99 },
  'Aizawl': { x: 94.47, y: 61.05 },
  'Amaravati': { x: 59.91, y: 74.88 },
  'Bangalore': { x: 57.60, y: 85.25 },
  'Bhopal': { x: 50.69, y: 55.30 },
  'Bhubaneswar': { x: 69.12, y: 66.82 },
  'Chandigarh': { x: 46.08, y: 28.80 },
  'Chennai': { x: 64.52, y: 92.17 },
  'Coimbatore': { x: 59.91, y: 95.62 },
  'Dehradun': { x: 48.39, y: 34.56 },
  'Delhi': { x: 47.23, y: 38.02 },
  'Dispur': { x: 87.56, y: 49.54 },
  'Gandhinagar': { x: 33.41, y: 50.69 },
  'Gangtok': { x: 80.64, y: 40.32 },
  'Gurugram': { x: 47.23, y: 39.17 },
  'Guwahati': { x: 86.40, y: 49.54 },
  'Hyderabad': { x: 59.91, y: 69.12 },
  'Imphal': { x: 94.47, y: 51.84 },
  'Indore': { x: 48.39, y: 57.60 },
  'Itanagar': { x: 89.86, y: 43.78 },
  'Jaipur': { x: 43.78, y: 43.78 },
  'Jammu': { x: 43.78, y: 20.74 },
  'Jodhpur': { x: 40.32, y: 48.39 },
  'Kanpur': { x: 54.14, y: 43.78 },
  'Kochi': { x: 55.30, y: 94.47 },
  'Kohima': { x: 95.62, y: 49.54 },
  'Kolkata': { x: 71.43, y: 55.30 },
  'Lucknow': { x: 55.30, y: 41.47 },
  'Madurai': { x: 62.21, y: 96.77 },
  'Mangaluru': { x: 52.99, y: 87.56 },
  'Mumbai': { x: 41.47, y: 69.12 },
  'Mysuru': { x: 56.45, y: 87.56 },
  'Nagpur': { x: 57.60, y: 59.91 },
  'Noida': { x: 48.39, y: 38.59 },
  'Panaji': { x: 48.39, y: 78.34 },
  'Patna': { x: 63.36, y: 46.08 },
  'Pune': { x: 43.78, y: 73.73 },
  'Raipur': { x: 62.21, y: 62.21 },
  'Ranchi': { x: 66.82, y: 57.60 },
  'Shimla': { x: 44.93, y: 29.95 },
  'Shillong': { x: 87.56, y: 52.99 },
  'Srinagar': { x: 41.47, y: 13.82 },
  'Surat': { x: 36.87, y: 57.60 },
  'Thiruvananthapuram': { x: 57.60, y: 99.08 },
  'Udaipur': { x: 41.47, y: 51.84 },
  'Vadodara': { x: 35.71, y: 55.30 },
  'Varanasi': { x: 59.91, y: 48.39 },
  'Visakhapatnam': { x: 69.12, y: 71.43 },
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
