import React from 'react';
import { AdapterConfigSendNSoftwareSftp } from '../../shared/model';
import InputText from './InputText';

interface SendPortEditorNSoftwareSftpProps {
  config: AdapterConfigSendNSoftwareSftp;
  onChange: (config: AdapterConfigSendNSoftwareSftp) => void;
}

const SendPortEditorNSoftwareSftp = (
  props: SendPortEditorNSoftwareSftpProps,
): JSX.Element => {
  const { config, onChange } = props;

  const handlePathChange = (newPath: string): void => {
    const newConfig: AdapterConfigSendNSoftwareSftp = {
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
    const newConfig: AdapterConfigSendNSoftwareSftp = {
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
    const newConfig: AdapterConfigSendNSoftwareSftp = {
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
      const newConfig: AdapterConfigSendNSoftwareSftp = {
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
    const newConfig: AdapterConfigSendNSoftwareSftp = {
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
    const newConfig: AdapterConfigSendNSoftwareSftp = {
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
          id="sendPortNSoftwareSftpPath"
          label="Path"
          value={config.path}
          onChange={handlePathChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareSftpFileName"
          label="File name"
          value={config.fileName}
          onChange={handleFileNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareSftpServer"
          label="Server"
          value={config.server}
          onChange={handleServerChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareSftpPort"
          label="Port"
          value={config.port.toString()}
          onChange={handlePortChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareSftpUserName"
          label="User"
          value={config.userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="form-group">
        <InputText
          id="sendPortNSoftwareSftpSsoAffiliate"
          label="SSO Affiliate"
          value={config.ssoAffiliate}
          onChange={handleSsoAffiliateChange}
        />
      </div>
    </>
  );
};

export default SendPortEditorNSoftwareSftp;
