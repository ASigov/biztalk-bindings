import React from 'react';
import InputFile from './InputFile';

interface LoadBindingsPanelProps {
  onFileOpen: (file: File) => void;
}

const LoadBindingsPanel = (props: LoadBindingsPanelProps): JSX.Element => {
  const { onFileOpen } = props;

  return (
    <div className="row">
      <div className="col mt-3">
        <InputFile label="Open bindings file" onChange={onFileOpen} />
      </div>
    </div>
  );
};

export default LoadBindingsPanel;
