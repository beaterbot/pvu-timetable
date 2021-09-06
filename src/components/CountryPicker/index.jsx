import {
  Button, CaretDownIcon, Option, SelectMenu,
} from 'evergreen-ui';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

const CountryPicker = ({ data, selected, onSelect }) => {
  const { t } = useTranslation();

  return (
    <SelectMenu
      options={data.map((item) => ({ label: item.name, value: item.name }))}
      filterPlaceholder={t('search')}
      hasTitle={false}
      hasFilter
      closeOnSelect
      selected={selected.name}
      onSelect={
          (item) => {
            if (onSelect) {
              const country = data.find((c) => c.name === item.value);
              onSelect(country);
            }
          }
        }
      itemRenderer={
          (props) => {
            const country = data.find((c) => c.name === props.item.value);
            return (
              <Option {...props}>
                <ReactCountryFlag countryCode={country.countryCode} svg />&nbsp;{ country.name }
              </Option>
            );
          }
        }
    >
      <Button iconAfter={CaretDownIcon}>
        {selected && (<><ReactCountryFlag countryCode={selected.countryCode} svg />&nbsp;{selected.name}</>)}
        {!selected && ('Seleccionar país')}
      </Button>
    </SelectMenu>
  );
};

export default CountryPicker;
