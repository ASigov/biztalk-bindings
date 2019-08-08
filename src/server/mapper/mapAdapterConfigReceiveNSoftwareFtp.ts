import ReceiveLocationState from '../parser/ReceiveLocationState';
import parseTransportTypeData from '../parser/parseTransportTypeData';
import { AdapterConfigReceiveNSoftwareFtp } from '../../shared/model';

interface AdapterConfig {
  Config: Config;
}

interface Config {
  Account: string;
  AfterConnect: string;
  AfterGet: string;
  BeforeGet: string;
  DeleteMode: number;
  ErrorThreshold: number;
  FileMask: string;
  Firewall: Firewall;
  FTPPort: number;
  FTPServer: string;
  MaxBatchSize: number;
  MaxFileCount: number;
  MaxFileSize: number;
  Other: string;
  Passive: string;
  Password: string;
  PersistentConnection: string;
  PollingInterval: number;
  RemotePath: string;
  RuntimeLicense: string;
  SSLAcceptServerCert: SSLAcceptServerCert;
  SSLCert: SSLCert;
  SSLStartMode: number;
  SSOAffiliate: string;
  TempPath: string;
  Timeout: number;
  TransferMode: number;
  TransportLog: TransportLog;
  URIIdentity: string;
  User: string;
  UseSimpleDirList: string;
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

interface SSLAcceptServerCert {
  AcceptAny: string;
  StoreType: number;
  Store: string;
  Subject: string;
  StorePassword: string;
}

interface SSLCert {
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

const mapAdapterConfigReceiveNSoftwareFtp = (
  state: ReceiveLocationState,
): AdapterConfigReceiveNSoftwareFtp => {
  const config = parseTransportTypeData<AdapterConfig>(state.transportTypeData);
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
