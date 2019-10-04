import React, { useState } from 'react';
import {
  SendPort,
  AdapterConfigSendFile,
  AdapterConfigSendNSoftwareFtp,
} from '../../shared/model';
import {
  SendPortTemplate,
  sendPortFactory,
  defaultAdapterConfigSendFile,
  defaultAdapterConfigSendNSoftwareFtp,
  sendAdapterNames,
} from '../../shared/template';
import Select from './Select';
import InputText from './InputText';
import SendPortEditorFile from './SendPortEditorFile';
import SendPortEditorNSoftwareFtp from './SendPortEditorNSoftwareFtp';

interface SendPortEditorProps {
  templates: SendPortTemplate[];
  onAdd: (sp: SendPort) => void;
}

const SendPortEditor = (props: SendPortEditorProps): JSX.Element => {
  const { templates, onAdd } = props;

  const [template, setTemplate] = useState<SendPortTemplate>(templates[0]);
  const [sp, setSP] = useState<SendPort>(sendPortFactory(template));
  const [fileConfig, setFileConfig] = useState<AdapterConfigSendFile>(
    defaultAdapterConfigSendFile(),
  );
  const [nSoftwareFtpConfig, setNSoftwareFtpConfig] = useState<
    AdapterConfigSendNSoftwareFtp
  >(defaultAdapterConfigSendNSoftwareFtp());

  const handleProfileNameChange = (newProfileName: string): void => {
    const newSP: SendPort = {
      name: template.sendPortPrefix + newProfileName,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
    };

    if (sp.filter && template.filterTemplate) {
      newSP.filter = {
        property: sp.filter.property,
        value: template.filterTemplate.valuePrefix + newProfileName,
      };
    }

    setSP(newSP);
  };

  const handleAdapterNameChange = (newAdapterName: string): void => {
    const newSP: SendPort = {
      name: sp.name,
      address: sp.address,
      adapterName: newAdapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (newAdapterName === 'FILE') {
      newSP.adapterConfig = fileConfig;
    } else if (
      newAdapterName === 'nsoftware.FTP v4' ||
      newAdapterName === 'nsoftware.FTP 2016'
    ) {
      newSP.adapterConfig = nSoftwareFtpConfig;
    }

    setSP(newSP);
  };

  const handleFileConfigChange = (newConfig: AdapterConfigSendFile): void => {
    const newSP: SendPort = {
      name: sp.name,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (newSP.adapterName === 'FILE') {
      newSP.address = newConfig.path + newConfig.fileName;
      newSP.adapterConfig = newConfig;

      setFileConfig(newConfig);
      setSP(newSP);
    }
  };

  const handleNSoftwareFtpConfigChange = (
    newConfig: AdapterConfigSendNSoftwareFtp,
  ): void => {
    const newSP: SendPort = {
      name: sp.name,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (
      newSP.adapterName === 'nsoftware.FTP v4' ||
      newSP.adapterName === 'nsoftware.FTP 2016'
    ) {
      newSP.address = `FTP://${newConfig.userName}@${newConfig.server}:${newConfig.port}${newConfig.path}${newConfig.fileName}`;
      newSP.adapterConfig = newConfig;

      setNSoftwareFtpConfig(newConfig);
      setSP(newSP);
    }
  };

  const handleAddClick = (): void => {
    onAdd(sp);
  };

  return (
    <>
      {templates.length > 1 && (
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
      )}
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
          items={sendAdapterNames}
          selectedItem={sendAdapterNames[0]}
          onChange={handleAdapterNameChange}
          formatter={(a): string => a}
        />
      </div>
      {sp.adapterName === 'FILE' && (
        <SendPortEditorFile
          config={fileConfig}
          onChange={handleFileConfigChange}
        />
      )}
      {(sp.adapterName === 'nsoftware.FTP v4' ||
        sp.adapterName === 'nsoftware.FTP 2016') && (
        <SendPortEditorNSoftwareFtp
          config={nSoftwareFtpConfig}
          onChange={handleNSoftwareFtpConfigChange}
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

export default SendPortEditor;
