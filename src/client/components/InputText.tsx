import React from 'react';

interface InputTextProps {
  id: string;
  label: string;
  value?: string;
  onChange: (newValue: string) => void;
  readOnly?: boolean;
}

const InputText = (props: InputTextProps): JSX.Element => {
  const { id, label, value, onChange, readOnly } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="form-control"
        type="text"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </>
  );
};

export default InputText;
