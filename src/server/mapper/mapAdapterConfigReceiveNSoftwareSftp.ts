import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceiveNSoftwareSftp } from '../../shared/model';
import parseTransportTypeData from '../parser/parseTransportTypeData';

const mapAdapterConfigReceiveNSoftwareSftp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareSftp => {
  const config = parseTransportTypeData(state.transportTypeData);
  return {
    path: config.Config.RemotePath,
    fileMask: config.Config.FileMask,
    server: config.Config.SSHHost,
    port: config.Config.SSHPort,
    userName: config.Config.SSHUser,
    ssoAffiliate: config.Config.SSOAffiliate,
    pollingInterval: config.Config.PollingInterval,
  };
};

export default mapAdapterConfigReceiveNSoftwareSftp;
