import SendPortState from '../parser/SendPortState';
import parseTransportTypeData from '../parser/parseTransportTypeData';
import { AdapterConfigSendNSoftwareSftp } from '../../shared/model';

interface AdapterConfig {
  Config: Config;
}

interface Config {
  AfterConnect: string;
  AfterPut: string;
  Append: string;
  BeforePut: string;
  ConnectionLifetime: number;
  Firewall: Firewall;
  Other: string;
  Overwrite: string;
  RemoteFile: string;
  RemotePath: string;
  RemoteTempPath: string;
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
  Store: string;
  StorePassword: string;
  StoreType: number;
  Subject: string;
  AcceptAny: string;
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

const mapAdapterConfigSendNSoftwareSftp = (
  state: SendPortState,
): AdapterConfigSendNSoftwareSftp => {
  const config = parseTransportTypeData<AdapterConfig>(state.transportTypeData);
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
