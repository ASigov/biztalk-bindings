import React from 'react';
import OpenFile from './OpenFile';

interface LoadBindingsPanelProps {
  onFileOpen: (file: File) => void;
}

const LoadBindingsPanel = (props: LoadBindingsPanelProps): JSX.Element => {
  return (
    <div className="row">
      <div className="col mt-3">
        <OpenFile label="Open bindings file" {...props} />
      </div>
    </div>
  );
};

export default LoadBindingsPanel;
