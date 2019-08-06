import SendPortState from '../parser/SendPortState';
import { AdapterConfigSendNSoftwareFtp } from '../../shared/model';
import parseAdapterConfig from './parseAdapterConfig';

const mapAdapterConfigNSoftwareFtpSend = (
  state: SendPortState,
): AdapterConfigSendNSoftwareFtp => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileName: config.Config.RemoteFile.text,
    server: config.Config.FTPServer.text,
    port: config.Config.FTPPort.text,
    userName: config.Config.User.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
  };
};

export default mapAdapterConfigNSoftwareFtpSend;
