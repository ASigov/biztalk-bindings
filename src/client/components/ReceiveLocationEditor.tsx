import React, { useState } from 'react';
import {
  ReceiveLocation,
  AdapterConfigReceiveFile,
  AdapterConfigReceiveNSoftwareFtp,
} from '../../shared/model';
import {
  ReceiveLocationTemplate,
  receiveLocationFactory,
  receiveAdapterNames,
  defaultAdapterConfigReceiveFile,
  defaultAdapterConfigReceiveNSoftwareFtp,
} from '../../shared/template';
import Select from './Select';
import InputText from './InputText';
import ReceiveLocationEditorFile from './ReceiveLocationEditorFile';

interface ReceiveLocationEditorProps {
  templates: ReceiveLocationTemplate[];
  onAdd: (rl: ReceiveLocation) => void;
}

const ReceiveLocationEditor = (
  props: ReceiveLocationEditorProps,
): JSX.Element => {
  const { templates, onAdd } = props;

  const [template, setTemplate] = useState<ReceiveLocationTemplate>(
    templates[0],
  );
  const [rl, setRL] = useState<ReceiveLocation>(
    receiveLocationFactory(template),
  );
  const [fileConfig, setFileConfig] = useState<AdapterConfigReceiveFile>(
    defaultAdapterConfigReceiveFile(),
  );
  const [nSoftwareFtpConfig, setNSoftwareFtpConfig] = useState<
    AdapterConfigReceiveNSoftwareFtp
  >(defaultAdapterConfigReceiveNSoftwareFtp());

  const handleProfileNameChange = (newProfileName: string): void => {
    const newRL: ReceiveLocation = {
      name: template.receiveLocationPrefix + newProfileName,
      address: rl.address,
      adapterName: rl.adapterName,
      adapterConfig: rl.adapterConfig,
    };

    setRL(newRL);
  };

  const handleAdapterNameChange = (newAdapterName: string): void => {
    const newRL: ReceiveLocation = {
      name: rl.name,
      address: rl.address,
      adapterName: newAdapterName,
      adapterConfig: rl.adapterConfig,
    };

    if (newAdapterName === 'FILE') {
      newRL.adapterConfig = fileConfig;
    } else if (
      newAdapterName === 'nsoftware.FTP v4' ||
      newAdapterName === 'nsoftware.FTP 2016'
    ) {
      newRL.adapterConfig = nSoftwareFtpConfig;
    }

    setRL(newRL);
  };

  const handleFileConfigChange = (
    newConfig: AdapterConfigReceiveFile,
  ): void => {
    const newRL: ReceiveLocation = {
      name: rl.name,
      address: rl.address,
      adapterName: rl.adapterName,
      adapterConfig: rl.adapterConfig,
    };

    if (newRL.adapterName === 'FILE') {
      newRL.address = newConfig.path + newConfig.fileMask;
      newRL.adapterConfig = newConfig;

      setFileConfig(newConfig);
      setRL(newRL);
    }
  };

  const handleAddClick = (): void => {
    alert('todo');
  };

  return (
    <>
      <div className="form-group">
        <Select
          id="sendPortTemplate"
          label="Template"
          items={templates}
          selectedItem={template}
          onChange={setTemplate}
          formatter={(t): string => t.templateName}
        />
      </div>
      <div className="form-group">
        <InputText
          id="profileName"
          label="Profile name"
          onChange={handleProfileNameChange}
        />
      </div>
      <div className="form-group">
        <Select
          id="sendPortAdapter"
          label="Adapter"
          items={receiveAdapterNames}
          selectedItem={receiveAdapterNames[0]}
          onChange={handleAdapterNameChange}
          formatter={(a): string => a}
        />
      </div>
      {rl.adapterName === 'FILE' && (
        <ReceiveLocationEditorFile
          config={fileConfig}
          onChange={handleFileConfigChange}
        />
      )}
      <button
        className="btn btn-primary mb-3"
        type="button"
        onClick={handleAddClick}
      >
        Add
      </button>
    </>
  );
};

export default ReceiveLocationEditor;
