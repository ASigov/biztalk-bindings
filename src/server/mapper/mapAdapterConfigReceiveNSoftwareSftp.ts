import ReceiveLocationState from '../parser/ReceiveLocationState';
import parseTransportTypeData from '../parser/parseTransportTypeData';
import { AdapterConfigReceiveNSoftwareSftp } from '../../shared/model';

interface AdapterConfig {
  Config: Config;
}

interface Config {
  AfterConnect: string;
  AfterGet: string;
  BeforeGet: string;
  DeleteMode: number;
  ErrorThreshold: number;
  FileMask: string;
  Firewall: Firewall;
  MaxBatchSize: number;
  MaxFileCount: number;
  MaxFileSize: number;
  Other: string;
  PersistentConnection: string;
  PollingInterval: number;
  RemotePath: string;
  RuntimeLicense: string;
  SSHAcceptServerHostKey: SSHAcceptServerHostKey;
  SSHAuthMode: number;
  SSHCert: SSHCert;
  SSHCompressionAlgorithms: string;
  SSHHost: string;
  SSHPassword: string;
  SSHPort: number;
  SSHUser: string;
  SSOAffiliate: string;
  TempPath: string;
  Timeout: number;
  TransportLog: TransportLog;
  URIIdentity: string;
  uri: string;
}

interface Firewall {
  AutoDetect: string;
  FirewallType: number;
  Host: string;
  Password: string;
  Port: number;
  User: string;
}

interface SSHAcceptServerHostKey {
  AcceptAny: string;
  StoreType: number;
  Store: string;
  Subject: string;
  StorePassword: string;
}

interface SSHCert {
  Store: string;
  StorePassword: string;
  StoreType: number;
  Subject: string;
}

interface TransportLog {
  Location: string;
  LogMode: number;
  LogType: number;
}

const mapAdapterConfigReceiveNSoftwareSftp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareSftp => {
  const config = parseTransportTypeData<AdapterConfig>(state.transportTypeData);
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
