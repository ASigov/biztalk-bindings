import React, { useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';

interface InputFileProps {
  label: string;
  onChange: (file: File) => void;
}

const useBsCustomFileInput = (): void => {
  useEffect((): (() => void) => {
    bsCustomFileInput.init();
    return (): void => bsCustomFileInput.destroy();
  }, []);
};

const InputFile = (props: InputFileProps): JSX.Element => {
  const { label, onChange } = props;
  useBsCustomFileInput();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      onChange(event.target.files[0]);
    }
  };

  return (
    <div className="custom-file">
      <input
        className="custom-file-input"
        id="input-file"
        type="file"
        onChange={handleChange}
      />
      <label className="custom-file-label" htmlFor="input-file">
        {label}
      </label>
    </div>
  );
};

export default InputFile;
