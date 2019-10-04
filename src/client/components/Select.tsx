import React, { useState } from 'react';

interface SelectProps<T> {
  id: string;
  label: string;
  items: T[];
  selectedItem?: T;
  onChange: (item: T) => void;
  formatter: (item: T) => string;
}

const Select = <T extends {}>(props: SelectProps<T>): JSX.Element => {
  const { id, label, items, selectedItem, onChange, formatter } = props;

  const [value, setValue] = useState<number>(
    selectedItem && items.includes(selectedItem)
      ? items.indexOf(selectedItem)
      : 0,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newValue: number = parseInt(e.target.value, 10);
    setValue(newValue);
    onChange(items[newValue]);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={handleChange}
      >
        {items.map(
          (item, index): JSX.Element => (
            <option value={index} key={formatter(item)}>
              {formatter(item)}
            </option>
          ),
        )}
      </select>
    </>
  );
};

export default Select;
