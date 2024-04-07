'use client';

import Select from 'react-select'

import useCountries from '@/app/hooks/useCountries';
import { useState, useEffect } from 'react';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCountries();
  const [isCountrySelected, setIsCountrySelected] = useState(false);

  useEffect(() => {
    setIsCountrySelected(!!value);
  }, [value]);

  const handleSelectChange = (selectedOption: any) => {
    onChange(selectedOption);
    setIsCountrySelected(!!selectedOption);
  };

  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={handleSelectChange}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
      {!isCountrySelected && <span className="text-red-500">Please select a country.</span>}
    </div>
   );
}

 
export default CountrySelect;