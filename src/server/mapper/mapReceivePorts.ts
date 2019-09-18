import ParserState from '../parser/ParserState';
import { ReceivePort } from '../../shared/model';
import mapReceiveLocations from './mapReceiveLocations';

const mapReceivePorts = (
  state: ParserState,
  applicationName: string,
): ReceivePort[] => {
  return state.receivePorts
    .filter((rp): boolean => rp.applicationName === applicationName)
    .map(
      (rp): ReceivePort => ({
        name: rp.name,
        receiveLocations: mapReceiveLocations(rp),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapReceivePorts;
