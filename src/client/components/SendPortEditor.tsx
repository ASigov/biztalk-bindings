import React, { useState } from 'react';
import {
  SendPort,
  AdapterConfigSendFile,
  AdapterConfigSendNSoftwareFtp,
  AdapterConfigSendNSoftwareSftp,
} from '../../shared/model';
import {
  SendPortTemplate,
  defaultAdapterConfigSendFile,
  defaultAdapterConfigSendNSoftwareFtp,
  defaultAdapterConfigSendNSoftwareSftp,
  formatSendFileAddress,
  formatSendNSoftwareFtpAddress,
  formatSendNSoftwareSftpAddress,
  sendPortFactory,
} from '../../shared/template';
import Select from './Select';
import InputText from './InputText';
import SendPortEditorFile from './SendPortEditorFile';
import SendPortEditorNSoftwareFtp from './SendPortEditorNSoftwareFtp';
import SendPortEditorNSoftwareSftp from './SendPortEditorNSoftwareSftp';

interface SendPortEditorProps {
  initialSP?: SendPort;
  templates: SendPortTemplate[];
  onSubmit: (sp: SendPort) => void;
  onCancel: () => void;
}

const SendPortEditor = (props: SendPortEditorProps): JSX.Element => {
  const { initialSP, templates, onSubmit, onCancel } = props;

  const [template, setTemplate] = useState<SendPortTemplate>(templates[0]);
  const [sp, setSP] = useState<SendPort>(
    initialSP || sendPortFactory(template),
  );
  const [fileConfig, setFileConfig] = useState<AdapterConfigSendFile>(
    defaultAdapterConfigSendFile(sp),
  );
  const [nSoftwareFtpConfig, setNSoftwareFtpConfig] = useState<
    AdapterConfigSendNSoftwareFtp
  >(defaultAdapterConfigSendNSoftwareFtp(sp));
  const [nSoftwareSftpConfig, setNSoftwareSftpConfig] = useState<
    AdapterConfigSendNSoftwareSftp
  >(defaultAdapterConfigSendNSoftwareSftp(sp));

  const handleProfileNameChange = (newProfileName: string): void => {
    const newSP: SendPort = {
      name: template.sendPortPrefix + newProfileName,
      profileName: newProfileName,
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
      profileName: sp.profileName,
      address: sp.address,
      adapterName: newAdapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (newAdapterName === 'FILE') {
      newSP.address = formatSendFileAddress(fileConfig);
      newSP.adapterConfig = fileConfig;
    } else if (
      newAdapterName === 'nsoftware.FTP v4' ||
      newAdapterName === 'nsoftware.FTP 2016'
    ) {
      newSP.address = formatSendNSoftwareFtpAddress(nSoftwareFtpConfig);
      newSP.adapterConfig = nSoftwareFtpConfig;
    } else if (
      newAdapterName === 'nsoftware.SFTP v4' ||
      newAdapterName === 'nsoftware.SFTP 2016'
    ) {
      newSP.address = formatSendNSoftwareSftpAddress(nSoftwareSftpConfig);
      newSP.adapterConfig = nSoftwareSftpConfig;
    }

    setSP(newSP);
  };

  const handleFileConfigChange = (newConfig: AdapterConfigSendFile): void => {
    const newSP: SendPort = {
      name: sp.name,
      profileName: sp.profileName,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (newSP.adapterName === 'FILE') {
      newSP.address = formatSendFileAddress(newConfig);
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
      profileName: sp.profileName,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (
      newSP.adapterName === 'nsoftware.FTP v4' ||
      newSP.adapterName === 'nsoftware.FTP 2016'
    ) {
      newSP.address = formatSendNSoftwareFtpAddress(newConfig);
      newSP.adapterConfig = newConfig;

      setNSoftwareFtpConfig(newConfig);
      setSP(newSP);
    }
  };

  const handleNSoftwareSftpConfigChange = (
    newConfig: AdapterConfigSendNSoftwareSftp,
  ): void => {
    const newSP: SendPort = {
      name: sp.name,
      profileName: sp.profileName,
      address: sp.address,
      adapterName: sp.adapterName,
      adapterConfig: sp.adapterConfig,
      filter: sp.filter,
    };

    if (
      newSP.adapterName === 'nsoftware.SFTP v4' ||
      newSP.adapterName === 'nsoftware.SFTP 2016'
    ) {
      newSP.address = formatSendNSoftwareSftpAddress(newConfig);
      newSP.adapterConfig = newConfig;

      setNSoftwareSftpConfig(newConfig);
      setSP(newSP);
    }
  };

  const handleOKClick = (): void => {
    onSubmit(sp);
  };

  const handleCancelClick = (): void => {
    onCancel();
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
          value={sp.profileName}
          label="Profile name"
          onChange={handleProfileNameChange}
        />
      </div>
      <div className="form-group">
        <Select
          id="sendPortAdapter"
          label="Adapter"
          items={template.adapters}
          selectedItem={template.adapters[0]}
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
      {(sp.adapterName === 'nsoftware.SFTP v4' ||
        sp.adapterName === 'nsoftware.SFTP 2016') && (
        <SendPortEditorNSoftwareSftp
          config={nSoftwareSftpConfig}
          onChange={handleNSoftwareSftpConfigChange}
        />
      )}
      <button
        className="btn btn-primary mb-3"
        type="button"
        onClick={handleOKClick}
      >
        OK
      </button>
      <button
        className="btn btn-secondary mb-3 ml-3"
        type="button"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
    </>
  );
};

export default SendPortEditor;
