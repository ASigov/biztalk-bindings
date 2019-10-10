import { ReceiveLocation } from '../../shared/model';
import mapAdapterConfigReceive from './mapAdapterConfigReceive';
import ReceivePortState from '../parser/ReceivePortState';

const mapReceiveLocations = (
  receivePort: ReceivePortState,
): ReceiveLocation[] => {
  return receivePort.receiveLocations
    .map(
      (rl): ReceiveLocation => ({
        name: rl.name,
        profileName: '',
        address: rl.address,
        adapterName: rl.adapterName,
        adapterConfig: mapAdapterConfigReceive(rl),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapReceiveLocations;
