import React from 'react';
import InputText from './InputText';
import { AdapterConfigSendFile } from '../../shared/model';

interface SendPortEditorFileProps {
  config: AdapterConfigSendFile;
  onChange: (config: AdapterConfigSendFile) => void;
}

const SendPortEditorFile = (props: SendPortEditorFileProps): JSX.Element => {
  const { config, onChange } = props;

  const handleFilePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigSendFile = {
      path: newPath,
      fileName: config.fileName,
    };
    onChange(newConfig);
  };

  const handleFileNameChange = (newFileName: string): void => {
    const newConfig: AdapterConfigSendFile = {
      path: config.path,
      fileName: newFileName,
    };
    onChange(newConfig);
  };

  return (
    <>
      <div className="form-group">
        <InputText
          id="sendPortFilePath"
          label="Path"
          value={config.path}
          onChange={handleFilePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortFileName"
          label="File name"
          value={config.fileName}
          onChange={handleFileNameChange}
        />
      </div>
    </>
  );
};

export default SendPortEditorFile;
