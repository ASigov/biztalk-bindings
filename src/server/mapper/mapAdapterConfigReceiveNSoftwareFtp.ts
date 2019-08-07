import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceiveNSoftwareFtp } from '../../shared/model';
import parseTransportTypeData from '../parser/parseTransportTypeData';

const mapAdapterConfigReceiveNSoftwareFtp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareFtp => {
  const config = parseTransportTypeData(state.transportTypeData);
  return {
    path: config.Config.RemotePath,
    fileMask: config.Config.FileMask,
    server: config.Config.FTPServer,
    port: config.Config.FTPPort,
    userName: config.Config.User,
    ssoAffiliate: config.Config.SSOAffiliate,
    pollingInterval: config.Config.PollingInterval,
  };
};

export default mapAdapterConfigReceiveNSoftwareFtp;
