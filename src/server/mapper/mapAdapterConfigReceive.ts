import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceive } from '../../shared/model';
import mapAdapterConfigReceiveFile from './mapAdapterConfigReceiveFile';
import mapAdapterConfigReceiveNSoftwareFtp from './mapAdapterConfigReceiveNSoftwareFtp';
import mapAdapterConfigReceiveNSoftwareSftp from './mapAdapterConfigReceiveNSoftwareSftp';
import mapAdapterConfigReceiveSchedule from './mapAdapterConfigReceiveSchedule';

interface MapperDictionary {
  [adapter: string]: (state: ReceiveLocationState) => AdapterConfigReceive;
}

const mappers: MapperDictionary = {
  FILE: mapAdapterConfigReceiveFile,
  'nsoftware.FTP v4': mapAdapterConfigReceiveNSoftwareFtp,
  'nsoftware.FTP 2016': mapAdapterConfigReceiveNSoftwareFtp,
  'nsoftware.SFTP v4': mapAdapterConfigReceiveNSoftwareSftp,
  'nsoftware.SFTP 2016': mapAdapterConfigReceiveNSoftwareSftp,
  Schedule: mapAdapterConfigReceiveSchedule,
};

const mapAdapterConfigReceive = (
  state: ReceiveLocationState,
): AdapterConfigReceive => {
  const mapper = mappers[state.adapterName];
  return mapper ? mapper(state) : undefined;
};

export default mapAdapterConfigReceive;
