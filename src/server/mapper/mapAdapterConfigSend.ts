import SendPortState from '../parser/SendPortState';
import { AdapterConfigSend } from '../../shared/model';
import mapAdapterConfigSendFile from './mapAdapterConfigSendFile';
import mapAdapterConfigSendNSoftwareFtp from './mapAdapterConfigSendNSoftwareFtp';
import mapAdapterConfigSendNSoftwareSftp from './mapAdapterConfigSendNSoftwareSftp';

const mapAdapterConfigSend = (state: SendPortState): AdapterConfigSend => {
  switch (state.adapterName) {
    case 'FILE':
      return mapAdapterConfigSendFile(state);
    case 'nsoftware.FTP v4':
      return mapAdapterConfigSendNSoftwareFtp(state);
    case 'nsoftware.FTP 2016':
      return mapAdapterConfigSendNSoftwareFtp(state);
    case 'nsoftware.SFTP v4':
      return mapAdapterConfigSendNSoftwareSftp(state);
    case 'nsoftware.SFTP 2016':
      return mapAdapterConfigSendNSoftwareSftp(state);
    default:
      return undefined;
  }
};

export default mapAdapterConfigSend;
