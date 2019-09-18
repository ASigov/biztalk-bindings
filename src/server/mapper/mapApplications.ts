import ParserState from '../parser/ParserState';
import { Application } from '../../shared/model';
import mapSendPorts from './mapSendPorts';
import mapReceivePorts from './mapReceivePorts';

const getApplicationNames = (state: ParserState): string[] => {
  return state.receivePorts
    .map((rp): string => rp.applicationName)
    .concat(state.sendPorts.map((sp): string => sp.applicationName))
    .filter((val, index, self): boolean => self.indexOf(val) === index);
};

const mapApplications = (state: ParserState): Application[] => {
  return getApplicationNames(state)
    .map(
      (name): Application => ({
        name,
        sendPorts: mapSendPorts(state, name),
        receivePorts: mapReceivePorts(state, name),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapApplications;
