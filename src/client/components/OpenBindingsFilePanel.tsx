import React from 'react';
import InputFile from './InputFile';

interface OpenBindingsFilePanelProps {
  onFileOpen: (file: File) => void;
}

const OpenBindingsFilePanel = (
  props: OpenBindingsFilePanelProps,
): JSX.Element => {
  const { onFileOpen } = props;

  return (
    <div className="row">
      <div className="col mt-3">
        <InputFile
          id="bindings-input-file"
          label="Open bindings file"
          onChange={onFileOpen}
        />
      </div>
    </div>
  );
};

export default OpenBindingsFilePanel;
