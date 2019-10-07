import React, { useState } from 'react';
import {
  ReceiveLocation,
  AdapterConfigReceiveFile,
  AdapterConfigReceiveNSoftwareFtp,
  AdapterConfigReceiveNSoftwareSftp,
} from '../../shared/model';
import {
  ReceiveLocationTemplate,
  receiveLocationFactory,
  defaultAdapterConfigReceiveFile,
  defaultAdapterConfigReceiveNSoftwareFtp,
  defaultAdapterConfigReceiveNSoftwareSftp,
} from '../../shared/template';
import Select from './Select';
import InputText from './InputText';
import ReceiveLocationEditorFile from './ReceiveLocationEditorFile';
import ReceiveLocationEditorNSoftwareFtp from './ReceiveLocationEditorNSoftwareFtp';
import ReceiveLocationEditorNSoftwareSftp from './ReceiveLocationEditorNSoftwareSftp';

interface ReceiveLocationEditorProps {
  templates: ReceiveLocationTemplate[];
  onAdd: (rl: ReceiveLocation, rp: string) => void;
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
  const [nSoftwareSftpConfig, setNSoftwareSftpConfig] = useState<
    AdapterConfigReceiveNSoftwareSftp
  >(defaultAdapterConfigReceiveNSoftwareSftp());

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
      newRL.address = fileConfig.path + fileConfig.fileMask;
    } else if (
      newAdapterName === 'nsoftware.FTP v4' ||
      newAdapterName === 'nsoftware.FTP 2016'
    ) {
      newRL.adapterConfig = nSoftwareFtpConfig;
      newRL.address = `FTP://${nSoftwareFtpConfig.userName}@${nSoftwareFtpConfig.server}:${nSoftwareFtpConfig.port}${nSoftwareFtpConfig.path}${nSoftwareFtpConfig.fileMask}`;
    } else if (
      newAdapterName === 'nsoftware.SFTP v4' ||
      newAdapterName === 'nsoftware.SFTP 2016'
    ) {
      newRL.adapterConfig = nSoftwareSftpConfig;
      newRL.address = `SFTP://${nSoftwareSftpConfig.userName}@${nSoftwareSftpConfig.server}:${nSoftwareSftpConfig.port}${nSoftwareSftpConfig.path}${nSoftwareSftpConfig.fileMask}`;
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

  const handleNSoftwareFtpConfigChange = (
    newConfig: AdapterConfigReceiveNSoftwareFtp,
  ): void => {
    const newRL: ReceiveLocation = {
      name: rl.name,
      address: rl.address,
      adapterName: rl.adapterName,
      adapterConfig: rl.adapterConfig,
    };

    if (
      newRL.adapterName === 'nsoftware.FTP v4' ||
      newRL.adapterName === 'nsoftware.FTP 2016'
    ) {
      newRL.address = `FTP://${newConfig.userName}@${newConfig.server}:${newConfig.port}${newConfig.path}${newConfig.fileMask}`;
      newRL.adapterConfig = newConfig;

      setNSoftwareFtpConfig(newConfig);
      setRL(newRL);
    }
  };

  const handleNSoftwareSftpConfigChange = (
    newConfig: AdapterConfigReceiveNSoftwareSftp,
  ): void => {
    const newRL: ReceiveLocation = {
      name: rl.name,
      address: rl.address,
      adapterName: rl.adapterName,
      adapterConfig: rl.adapterConfig,
    };

    if (
      newRL.adapterName === 'nsoftware.SFTP v4' ||
      newRL.adapterName === 'nsoftware.SFTP 2016'
    ) {
      newRL.address = `SFTP://${newConfig.userName}@${newConfig.server}:${newConfig.port}${newConfig.path}${newConfig.fileMask}`;
      newRL.adapterConfig = newConfig;

      setNSoftwareSftpConfig(newConfig);
      setRL(newRL);
    }
  };

  const handleAddClick = (): void => {
    onAdd(rl, template.receivePort);
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
          items={template.adapters}
          selectedItem={template.adapters[0]}
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
      {(rl.adapterName === 'nsoftware.FTP v4' ||
        rl.adapterName === 'nsoftware.FTP 2016') && (
        <ReceiveLocationEditorNSoftwareFtp
          config={nSoftwareFtpConfig}
          onChange={handleNSoftwareFtpConfigChange}
        />
      )}
      {(rl.adapterName === 'nsoftware.SFTP v4' ||
        rl.adapterName === 'nsoftware.SFTP 2016') && (
        <ReceiveLocationEditorNSoftwareSftp
          config={nSoftwareSftpConfig}
          onChange={handleNSoftwareSftpConfigChange}
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
