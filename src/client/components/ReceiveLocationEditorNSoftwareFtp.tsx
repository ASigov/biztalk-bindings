import React from 'react';
import { AdapterConfigReceiveNSoftwareFtp } from '../../shared/model';
import InputText from './InputText';

interface ReceiveLocationEditorNSoftwareFtpProps {
  config: AdapterConfigReceiveNSoftwareFtp;
  onChange: (config: AdapterConfigReceiveNSoftwareFtp) => void;
}

const ReceiveLocationEditorNSoftwareFtp = (
  props: ReceiveLocationEditorNSoftwareFtpProps,
): JSX.Element => {
  const { config, onChange } = props;

  const handlePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareFtp = {
      path: newPath,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    }
    onChange(newConfig);
  };

  const handleFileMaskChange = (newFileMask: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareFtp = {
      path: config.path,
      fileMask: newFileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    }
    onChange(newConfig);
  };

  const handleServerChange = (newServer: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareFtp = {
      path: config.path,
      fileMask: config.fileMask,
      server: newServer,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    }
    onChange(newConfig);
  };

  const handlePortChange = (newPort: string): void => {
    const newPortNumber = Number(newPort);
    if (!Number.isNaN(newPortNumber)) {
      const newConfig: AdapterConfigReceiveNSoftwareFtp = {
        path: config.path,
        fileMask: config.fileMask,
        server: config.server,
        port: newPortNumber,
        userName: config.userName,
        ssoAffiliate: config.ssoAffiliate,
        pollingInterval: config.pollingInterval,
      }
      onChange(newConfig);
    }
  };

  const handleUserNameChange = (newUserName: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareFtp = {
      path: config.path,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: newUserName,
      ssoAffiliate: config.ssoAffiliate,
      pollingInterval: config.pollingInterval,
    }
    onChange(newConfig);
  };

  const handleSsoAffiliateChange = (newSsoAffiliate: string): void => {
    const newConfig: AdapterConfigReceiveNSoftwareFtp = {
      path: config.path,
      fileMask: config.fileMask,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: newSsoAffiliate,
      pollingInterval: config.pollingInterval,
    }
    onChange(newConfig);
  };

  const handlePollingIntervalChange = (newPollingInterval: string): void => {
    const newPollingIntervalNumber = Number(newPollingInterval);
    if (!Number.isNaN(newPollingIntervalNumber)) {
      const newConfig: AdapterConfigReceiveNSoftwareFtp = {
        path: config.path,
        fileMask: config.fileMask,
        server: config.server,
        port: config.port,
        userName: config.userName,
        ssoAffiliate: config.ssoAffiliate,
        pollingInterval: newPollingIntervalNumber,
      }
      onChange(newConfig);
    }
  };

  return (
    <>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpPath"
          label="Path"
          value={config.path}
          onChange={handlePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpFileName"
          label="File mask"
          value={config.fileMask}
          onChange={handleFileMaskChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpServer"
          label="Server"
          value={config.server}
          onChange={handleServerChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpPort"
          label="Port"
          value={config.port.toString()}
          onChange={handlePortChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpUserName"
          label="User"
          value={config.userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpSsoAffiliate"
          label="SSO Affiliate"
          value={config.ssoAffiliate}
          onChange={handleSsoAffiliateChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="receiveLocationNSoftwareFtpPollingInterval"
          label="Polling interval"
          value={config.pollingInterval.toString()}
          onChange={handlePollingIntervalChange}
        />
      </div>
    </>
  );
};

export default ReceiveLocationEditorNSoftwareFtp;
