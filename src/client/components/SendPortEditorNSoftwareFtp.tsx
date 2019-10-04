import React from 'react';
import { AdapterConfigSendNSoftwareFtp } from '../../shared/model';
import InputText from './InputText';

interface SendPortEditorNSoftwareFtpProps {
  config: AdapterConfigSendNSoftwareFtp;
  onChange: (c: AdapterConfigSendNSoftwareFtp) => void;
}

const SendPortEditorNSoftwareFtp = (
  props: SendPortEditorNSoftwareFtpProps,
): JSX.Element => {
  const { config, onChange } = props;

  const handlePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigSendNSoftwareFtp = {
      path: newPath,
      fileName: config.fileName,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
    };
    onChange(newConfig);
  };

  const handleFileNameChange = (newFileName: string): void => {
    const newConfig: AdapterConfigSendNSoftwareFtp = {
      path: config.path,
      fileName: newFileName,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
    };
    onChange(newConfig);
  };

  const handleServerChange = (newServer: string): void => {
    const newConfig: AdapterConfigSendNSoftwareFtp = {
      path: config.path,
      fileName: config.fileName,
      server: newServer,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: config.ssoAffiliate,
    };
    onChange(newConfig);
  };

  const handlePortChange = (newPort: string): void => {
    const newPortNumber = Number(newPort);
    if (!Number.isNaN(newPortNumber)) {
      const newConfig: AdapterConfigSendNSoftwareFtp = {
        path: config.path,
        fileName: config.fileName,
        server: config.server,
        port: newPortNumber,
        userName: config.userName,
        ssoAffiliate: config.ssoAffiliate,
      };
      onChange(newConfig);
    }
  };

  const handleUserNameChange = (newUserName: string): void => {
    const newConfig: AdapterConfigSendNSoftwareFtp = {
      path: config.path,
      fileName: config.fileName,
      server: config.server,
      port: config.port,
      userName: newUserName,
      ssoAffiliate: config.ssoAffiliate,
    };
    onChange(newConfig);
  };

  const handleSsoAffiliateChange = (newSsoAffiliate: string): void => {
    const newConfig: AdapterConfigSendNSoftwareFtp = {
      path: config.path,
      fileName: config.fileName,
      server: config.server,
      port: config.port,
      userName: config.userName,
      ssoAffiliate: newSsoAffiliate,
    };
    onChange(newConfig);
  };

  return (
    <>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpPath"
          label="Path"
          value={config.path}
          onChange={handlePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpFileName"
          label="File name"
          value={config.fileName}
          onChange={handleFileNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpServer"
          label="Server"
          value={config.server}
          onChange={handleServerChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpPort"
          label="Port"
          value={config.port.toString()}
          onChange={handlePortChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpUserName"
          label="User"
          value={config.userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareFtpSsoAffiliate"
          label="SSO Affiliate"
          value={config.ssoAffiliate}
          onChange={handleSsoAffiliateChange}
        />
      </div>
    </>
  );
};

export default SendPortEditorNSoftwareFtp;
