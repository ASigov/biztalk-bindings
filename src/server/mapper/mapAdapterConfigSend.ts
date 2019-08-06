import SendPortState from '../parser/SendPortState';
import { AdapterConfigSend } from '../../shared/model';
import mapAdapterConfigSendFile from './mapAdapterConfigSendFile';
import mapAdapterConfigSendNSoftwareFtp from './mapAdapterConfigSendNSoftwareFtp';
import mapAdapterConfigSendNSoftwareSftp from './mapAdapterConfigSendNSoftwareSftp';

interface MapperDictionary {
  [adapter: string]: (state: SendPortState) => AdapterConfigSend;
}

const mappers: MapperDictionary = {
  FILE: mapAdapterConfigSendFile,
  'nsoftware.FTP v4': mapAdapterConfigSendNSoftwareFtp,
  'nsoftware.FTP 2016': mapAdapterConfigSendNSoftwareFtp,
  'nsoftware.SFTP v4': mapAdapterConfigSendNSoftwareSftp,
  'nsoftware.SFTP 2016': mapAdapterConfigSendNSoftwareSftp,
};

const mapAdapterConfigSend = (state: SendPortState): AdapterConfigSend => {
  const mapper = mappers[state.adapterName];
  return mapper ? mapper(state) : undefined;
};

export default mapAdapterConfigSend;
