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

  const handlePathChange = (newPath: string): void => {};

  const handleFileMaskChange = (newFileMask: string): void => {};

  const handleServerChange = (newServer: string): void => {};

  const handlePortChange = (newPort: string): void => {};

  const handleUserNameChange = (newUserName: string): void => {};

  const handleSsoAffiliateChange = (newSsoAffiliate: string): void => {};

  const handlePollingIntervalChange = (newPollingInterval: string): void => {};

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
