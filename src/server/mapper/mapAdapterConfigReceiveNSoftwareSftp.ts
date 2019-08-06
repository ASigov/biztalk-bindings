import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceiveNSoftwareSftp } from '../../shared/model';
import parseAdapterConfig from './parseAdapterConfig';

const mapAdapterConfigReceiveNSoftwareSftp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareSftp => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileMask: config.Config.FileMask.text,
    server: config.Config.SSHHost.text,
    port: config.Config.SSHPort.text,
    userName: config.Config.SSHUser.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
    pollingInterval: config.Config.PollingInterval.text,
  };
};

export default mapAdapterConfigReceiveNSoftwareSftp;
