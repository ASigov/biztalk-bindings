import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceiveNSoftwareFtp } from '../../shared/model';
import parseAdapterConfig from './parseAdapterConfig';

const mapAdapterConfigReceiveNSoftwareFtp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareFtp => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileMask: config.Config.FileMask.text,
    server: config.Config.FTPServer.text,
    port: config.Config.FTPPort.text,
    userName: config.Config.User.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
    pollingInterval: config.Config.PollingInterval.text,
  };
};

export default mapAdapterConfigReceiveNSoftwareFtp;
