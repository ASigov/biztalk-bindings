import React, { useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';

interface OpenFileProps {
  label: string;
  onFileOpen: (file: File) => void;
}

const useBsCustomFileInput = (): void => {
  useEffect((): (() => void) => {
    bsCustomFileInput.init();
    return (): void => bsCustomFileInput.destroy();
  }, []);
};

const OpenFile = (props: OpenFileProps): JSX.Element => {
  const { label, onFileOpen } = props;
  useBsCustomFileInput();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.files) {
      onFileOpen(event.target.files[0]);
    }
  };

  return (
    <div className="custom-file">
      <input
        className="custom-file-input"
        id="input-file"
        type="file"
        onChange={handleInputChange}
      />
      <label className="custom-file-label" htmlFor="input-file">
        {label}
      </label>
    </div>
  );
};

export default OpenFile;
