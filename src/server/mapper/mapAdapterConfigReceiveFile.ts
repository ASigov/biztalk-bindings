import path from 'path';
import ReceiveLocationState from '../parser/ReceiveLocationState';
import { AdapterConfigReceiveFile } from '../../shared/model';

const mapAdapterConfigReceiveFile = (
  state: ReceiveLocationState,
): AdapterConfigReceiveFile => {
  return {
    path: path.dirname(state.address),
    fileMask: path.basename(state.address),
  };
};

export default mapAdapterConfigReceiveFile;
