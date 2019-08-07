import SendPortState from '../parser/SendPortState';
import { AdapterConfigSendNSoftwareFtp } from '../../shared/model';
import parseTransportTypeData from '../parser/parseTransportTypeData';

const mapAdapterConfigNSoftwareFtpSend = (
  state: SendPortState,
): AdapterConfigSendNSoftwareFtp => {
  const config = parseTransportTypeData(state.transportTypeData);
  return {
    path: config.Config.RemotePath,
    fileName: config.Config.RemoteFile,
    server: config.Config.FTPServer,
    port: config.Config.FTPPort,
    userName: config.Config.User,
    ssoAffiliate: config.Config.SSOAffiliate,
  };
};

export default mapAdapterConfigNSoftwareFtpSend;
