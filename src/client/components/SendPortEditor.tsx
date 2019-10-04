import React, { useState } from 'react';
import {
  SendPort,
  AdapterConfigSendFile,
  AdapterConfigSendNSoftwareFtp,
} from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import Select from './Select';
import InputText from './InputText';
import SendPortEditorFile from './SendPortEditorFile';
import SendPortEditorNSoftwareFtp from './SendPortEditorNSoftwareFtp';

interface SendPortEditorProps {
  templates: SendPortTemplate[];
  onSubmit: (sp: SendPort) => void;
}

const adapters = ['FILE', 'nsoftware.FTP v4', 'nsoftware.FTP 2016'];

const createDefaultFileConfig = (): AdapterConfigSendFile => {
  return {
    path: '',
    fileName: '%SourceFileName%',
  };
};

const createDefaultNSoftwareFtpConfig = (): AdapterConfigSendNSoftwareFtp => {
  return {
    path: '',
    fileName: '%SourceFileName%',
    server: '',
    port: 21,
    userName: '',
    ssoAffiliate: '',
  };
};

const createDefaultSendPort = (template: SendPortTemplate): SendPort => {
  const sendPort: SendPort = {
    name: template.namePrefix,
    address: '',
    adapterName: adapters[0],
    adapterConfig: undefined,
  };

  if (template.filterTemplate) {
    sendPort.filter = {
      property: template.filterTemplate.property,
      value: template.filterTemplate.valuePrefix,
    };
  }

  if (adapters[0] === 'FILE') {
    sendPort.adapterConfig = createDefaultFileConfig();
  } else if (
    adapters[0] === 'nsoftware.FTP v4' ||
    adapters[0] === 'nsoftware.FTP 2016'
  ) {
    sendPort.adapterConfig = createDefaultNSoftwareFtpConfig();
  }

  return sendPort;
};

const SendPortEditor = (props: SendPortEditorProps): JSX.Element => {
  const { templates, onSubmit } = props;

  const [template, setTemplate] = useState<SendPortTemplate>(templates[0]);
  const [sendPort, setSendPort] = useState<SendPort>(
    createDefaultSendPort(template),
  );
  const [fileConfig, setFileConfig] = useState<AdapterConfigSendFile>(
    createDefaultFileConfig(),
  );
  const [nSoftwareFtpConfig, setNSoftwareFtpConfig] = useState<
    AdapterConfigSendNSoftwareFtp
  >(createDefaultNSoftwareFtpConfig());

  const handleProfileNameChange = (newProfileName: string): void => {
    const newSendPort: SendPort = {
      name: template.namePrefix + newProfileName,
      address: sendPort.address,
      adapterName: sendPort.adapterName,
      adapterConfig: sendPort.adapterConfig,
    };

    if (sendPort.filter && template.filterTemplate) {
      newSendPort.filter = {
        property: sendPort.filter.property,
        value: template.filterTemplate.valuePrefix + newProfileName,
      };
    }

    setSendPort(newSendPort);
  };

  const handleAdapterNameChange = (newAdapterName: string): void => {
    const newSendPort: SendPort = {
      name: sendPort.name,
      address: sendPort.address,
      adapterName: newAdapterName,
      adapterConfig: sendPort.adapterConfig,
      filter: sendPort.filter,
    };

    if (newAdapterName === 'FILE') {
      newSendPort.adapterConfig = fileConfig;
    } else if (
      newAdapterName === 'nsoftware.FTP v4' ||
      newAdapterName === 'nsoftware.FTP 2016'
    ) {
      newSendPort.adapterConfig = nSoftwareFtpConfig;
    }
    setSendPort(newSendPort);
  };

  const handleFileConfigChange = (newConfig: AdapterConfigSendFile): void => {
    const newSendPort: SendPort = {
      name: sendPort.name,
      address: sendPort.address,
      adapterName: sendPort.adapterName,
      adapterConfig: sendPort.adapterConfig,
      filter: sendPort.filter,
    };

    if (newSendPort.adapterName === 'FILE') {
      newSendPort.address = newConfig.path + newConfig.fileName;
    }

    setFileConfig(newConfig);
    setSendPort(newSendPort);
  };

  const handleNSoftwareFtpConfigChange = (
    newConfig: AdapterConfigSendNSoftwareFtp,
  ): void => {
    const newSendPort: SendPort = {
      name: sendPort.name,
      address: sendPort.address,
      adapterName: sendPort.adapterName,
      adapterConfig: sendPort.adapterConfig,
      filter: sendPort.filter,
    };

    if (
      newSendPort.adapterName === 'nsoftware.FTP v4' ||
      newSendPort.adapterName === 'nsoftware.FTP 2016'
    ) {
      newSendPort.address = `FTP://${newConfig.userName}@${newConfig.server}:${newConfig.port}${newConfig.path}${newConfig.fileName}`;
    }

    setNSoftwareFtpConfig(newConfig);
    setSendPort(newSendPort);
  };

  const handleAddClick = (): void => {
    onSubmit(sendPort);
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
          formatter={(t): string => t.name}
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
          items={adapters}
          selectedItem={adapters[0]}
          onChange={handleAdapterNameChange}
          formatter={(a): string => a}
        />
      </div>
      {sendPort.adapterName === 'FILE' && (
        <SendPortEditorFile
          config={fileConfig}
          onChange={handleFileConfigChange}
        />
      )}
      {(sendPort.adapterName === 'nsoftware.FTP v4' ||
        sendPort.adapterName === 'nsoftware.FTP 2016') && (
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
