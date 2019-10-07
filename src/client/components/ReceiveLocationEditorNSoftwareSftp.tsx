import React from 'react';
import { AdapterConfigReceiveNSoftwareSftp } from '../../shared/model';
import InputText from './InputText';

interface ReceiveLocationEditorNSoftwareSftpProps {
  config: AdapterConfigReceiveNSoftwareSftp;
  onChange: (config: AdapterConfigReceiveNSoftwareSftp) => void;
}

const ReceiveLocationEditorNSoftwareSftp = (
  props: ReceiveLocationEditorNSoftwareSftpProps,
): JSX.Element => {
  const { config, onChange } = props;

  const handlePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareSftp = {
      path: newPath,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    };
    onChange(newConfig);
  };

  const handleFileMaskChange = (newFileMask: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareSftp = {
      path: config.path,
      fileMask: newFileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    };
    onChange(newConfig);
  };

  const handleServerChange = (newServer: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareSftp = {
      path: config.path,
      fileMask: config.fileMask,
      server: newServer,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    };
    onChange(newConfig);
  };

  const handlePortChange = (newPort: string): void => {
    const newPortNumber = Number(newPort);
    if (!Number.isNaN(newPortNumber)) {
      const newConfig: AdapterConfigReceiveNSoftwareSftp = {
        path: config.path,
        fileMask: config.fileMask,
        server: config.server,
        port: newPortNumber,
        userName: config.userName,
        ssoAffiliate: config.ssoAffiliate,
        pollingInterval: config.pollingInterval,
      };
      onChange(newConfig);
    }
  };

  const handleUserNameChange = (newUserName: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareSftp = {
      path: config.path,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: newUserName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    };
    onChange(newConfig);
  };

  const handleSsoAffiliateChange = (newSsoAffiliate: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareSftp = {
      path: config.path,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: newSsoAffiliate,
      pollingInterval: config.pollingInterval,
    };
    onChange(newConfig);
  };

  const handlePollingIntervalChange = (newPollingInterval: string): void => {
    const newPollingIntervalNumber = Number(newPollingInterval);
    if (!Number.isNaN(newPollingIntervalNumber)) {
      const newConfig: AdapterConfigReceiveNSoftwareSftp = {
        path: config.path,
        fileMask: config.fileMask,
        server: config.server,
        port: config.port,
        userName: config.userName,
        ssoAffiliate: config.ssoAffiliate,
        pollingInterval: newPollingIntervalNumber,
      };
      onChange(newConfig);
    }
  };

  return (
    <>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpPath"
          label="Path"
          value={config.path}
          onChange={handlePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpFileName"
          label="File mask"
          value={config.fileMask}
          onChange={handleFileMaskChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpServer"
          label="Server"
          value={config.server}
          onChange={handleServerChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpPort"
          label="Port"
          value={config.port.toString()}
          onChange={handlePortChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpUserName"
          label="User"
          value={config.userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpSsoAffiliate"
          label="SSO Affiliate"
          value={config.ssoAffiliate}
          onChange={handleSsoAffiliateChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareSftpPollingInterval"
          label="Polling interval"
          value={config.pollingInterval.toString()}
          onChange={handlePollingIntervalChange}
        />
      </div>
    </>
  );
};

export default ReceiveLocationEditorNSoftwareSftp;
