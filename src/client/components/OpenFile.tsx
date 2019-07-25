import React, { useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';

interface OpenFileProps {
  label: string;
  onFileOpen: (file: File) => void;
}

const OpenFile = (props: OpenFileProps): JSX.Element => {
  const { label, onFileOpen } = props;
  useEffect((): (() => void) => {
    bsCustomFileInput.init();
    return (): void => bsCustomFileInput.destroy();
  }, []);

  const handleInputFile = (
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
        id="inputGroupFile01"
        type="file"
        onChange={handleInputFile}
      />
      <label className="custom-file-label" htmlFor="inputGroupFile01">
        {label}
      </label>
    </div>
  );
};

export default OpenFile;