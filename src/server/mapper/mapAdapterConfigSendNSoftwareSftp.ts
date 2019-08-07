import SendPortState from '../parser/SendPortState';
import { AdapterConfigSendNSoftwareSftp } from '../../shared/model';
import parseTransportTypeData from '../parser/parseTransportTypeData';

const mapAdapterConfigSendNSoftwareSftp = (
  state: SendPortState,
): AdapterConfigSendNSoftwareSftp => {
  const config = parseTransportTypeData(state.transportTypeData);
  return {
    path: config.Config.RemotePath,
    fileName: config.Config.RemoteFile,
    server: config.Config.SSHHost,
    port: config.Config.SSHPort,
    userName: config.Config.SSHUser,
    ssoAffiliate: config.Config.SSOAffiliate,
  };
};

export default mapAdapterConfigSendNSoftwareSftp;
