import SendPortState from '../parser/SendPortState';
import parseTransportTypeData from '../parser/parseTransportTypeData';
import { AdapterConfigSendNSoftwareFtp } from '../../shared/model';

interface AdapterConfig {
  Config: Config;
}

interface Config {
  Account: string;
  AfterConnect: string;
  AfterPut: string;
  Append: string;
  BeforePut: string;
  ConnectionLifetime: number;
  Firewall: Firewall;
  FTPPort: number;
  FTPServer: string;
  Other: string;
  Overwrite: string;
  Passive: string;
  Password: string;
  RemoteFile: string;
  RemotePath: string;
  RemoteTempPath: string;
  RuntimeLicense: string;
  SSLAcceptServerCert: SSLAcceptServerCert;
  SSLCert: SSLCert;
  SSLStartMode: number;
  SSOAffiliate: string;
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
  Store: string;
  StorePassword: string;
  StoreType: number;
  Subject: string;
  AcceptAny: string;
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

const mapAdapterConfigNSoftwareFtpSend = (
  state: SendPortState,
): AdapterConfigSendNSoftwareFtp => {
  const config = parseTransportTypeData<AdapterConfig>(state.transportTypeData);
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
