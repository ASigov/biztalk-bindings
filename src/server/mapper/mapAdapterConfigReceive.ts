import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceive } from '../../shared/model';
import mapAdapterConfigReceiveFile from './mapAdapterConfigReceiveFile';
import mapAdapterConfigReceiveNSoftwareFtp from './mapAdapterConfigReceiveNSoftwareFtp';
import mapAdapterConfigReceiveNSoftwareSftp from './mapAdapterConfigReceiveNSoftwareSftp';
import mapAdapterConfigReceiveSchedule from './mapAdapterConfigReceiveSchedule';

const mapAdapterConfigReceive = (
  state: ReceiveLocationState,
): AdapterConfigReceive => {
  switch (state.adapterName) {
    case 'FILE':
      return mapAdapterConfigReceiveFile(state);
    case 'nsoftware.FTP v4':
      return mapAdapterConfigReceiveNSoftwareFtp(state);
    case 'nsoftware.FTP 2016':
      return mapAdapterConfigReceiveNSoftwareFtp(state);
    case 'nsoftware.SFTP v4':
      return mapAdapterConfigReceiveNSoftwareSftp(state);
    case 'nsoftware.SFTP 2016':
      return mapAdapterConfigReceiveNSoftwareSftp(state);
    case 'Schedule':
      return mapAdapterConfigReceiveSchedule(state);
    default:
      return undefined;
  }
};

export default mapAdapterConfigReceive;
