import React from 'react';
import InputFile from './InputFile';

interface OpenBindingsFilePanelProps {
  onOpenFile: (file: File) => void;
}

const OpenBindingsFilePanel = (
  props: OpenBindingsFilePanelProps,
): JSX.Element => {
  const { onOpenFile } = props;

  return (
    <div className="row">
      <div className="col mt-3">
        <InputFile
          id="bindings-input-file"
          label="Open bindings file"
          onChange={onOpenFile}
        />
      </div>
    </div>
  );
};

export default OpenBindingsFilePanel;
