import path from 'path';
import SendPortState from '../parser/SendPortState';
import { AdapterConfigSendFile } from '../../shared/model';

const mapAdapterConfigSendFile = (
  state: SendPortState,
): AdapterConfigSendFile => {
  return {
    path: path.dirname(state.address),
    fileName: path.basename(state.address),
  };
};

export default mapAdapterConfigSendFile;
