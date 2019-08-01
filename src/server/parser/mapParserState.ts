import ParserState from './ParserState';
import {
  SendPort,
  ReceiveLocation,
  Application,
  Bindings,
} from '../../shared/model';
import ReceiveLocationState from './ReceiveLocationState';

const getApplicationNames = (state: ParserState): string[] => {
  return state.receivePorts
    .map((rp): string => rp.applicationName)
    .concat(state.sendPorts.map((sp): string => sp.applicationName))
    .filter((val, index, self): boolean => self.indexOf(val) === index);
};

const mapSendPorts = (
  state: ParserState,
  applicationName: string,
): SendPort[] => {
  return state.sendPorts
    .filter((sp): boolean => sp.applicationName === applicationName)
    .map(
      (sp): SendPort => ({
        name: sp.name,
        address: sp.address,
        adapterName: sp.adapterName,
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

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
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

const mapApplications = (state: ParserState): Application[] => {
  return getApplicationNames(state)
    .map(
      (name): Application => ({
        name,
        sendPorts: mapSendPorts(state, name),
        receiveLocations: mapReceiveLocations(state, name),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

const mapParserState = (state: ParserState): Bindings => ({
  applications: mapApplications(state),
});

export default mapParserState;
