import ParserState from '../parser/ParserState';
import { ReceiveLocation } from '../../shared/model';
import ReceiveLocationState from '../parser/ReceiveLocationState';
import mapAdapterConfigReceive from './mapAdapterConfigReceive';

const mapReceiveLocations = (
  state: ParserState,
  applicationName: string,
): ReceiveLocation[] => {
  return state.receivePorts
    .filter((rp): boolean => rp.applicationName === applicationName)
    .map((rp): ReceiveLocationState[] => rp.receiveLocations)
    .reduce((prev, curr): ReceiveLocationState[] => prev.concat(curr), [])
    .map(
      (rl): ReceiveLocation => ({
        name: rl.name,
        address: rl.address,
        adapterName: rl.adapterName,
        adapterConfig: mapAdapterConfigReceive(rl),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapReceiveLocations;
