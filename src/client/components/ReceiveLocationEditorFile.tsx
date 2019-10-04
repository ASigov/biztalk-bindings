import React from 'react';
import { AdapterConfigReceiveFile } from '../../shared/model';
import InputText from './InputText';

interface ReceiveLocationEditorFileProps {
  config: AdapterConfigReceiveFile;
  onChange: (config: AdapterConfigReceiveFile) => void;
}

const ReceiveLocationEditorFile = (
  props: ReceiveLocationEditorFileProps,
): JSX.Element => {
  const { config, onChange } = props;

  const handleFilePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigReceiveFile = {
      path: newPath,
      fileMask: config.fileMask,
    };
    onChange(newConfig);
  };

  const handleFileMaskChange = (newFileMask: string): void => {
    const newConfig: AdapterConfigReceiveFile = {
      path: config.path,
      fileMask: newFileMask,
    };
    onChange(newConfig);
  };

  return (
    <>
      <div className="form-group">
        <InputText
          id="receiveLocationFilePath"
          label="Path"
          value={config.path}
          onChange={handleFilePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationFileMask"
          label="File mask"
          value={config.fileMask}
          onChange={handleFileMaskChange}
        />
      </div>
    </>
  );
};

export default ReceiveLocationEditorFile;
