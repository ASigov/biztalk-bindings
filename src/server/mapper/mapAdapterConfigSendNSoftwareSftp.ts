import SendPortState from '../parser/SendPortState';
import { AdapterConfigSendNSoftwareSftp } from '../../shared/model';
import parseAdapterConfig from './parseAdapterConfig';

const mapAdapterConfigSendNSoftwareSftp = (
  state: SendPortState,
): AdapterConfigSendNSoftwareSftp => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileName: config.Config.RemoteFile.text,
    server: config.Config.SSHHost.text,
    port: config.Config.SSHPort.text,
    userName: config.Config.SSHUser.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
  };
};

export default mapAdapterConfigSendNSoftwareSftp;
