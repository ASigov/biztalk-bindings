import { Parser, XmlAttributes } from 'node-expat';
import ParserState from './ParserState';
import ReceiveLocationState from './ReceiveLocationState';
import {
  Bindings,
  Application,
  SendPort,
  ReceiveLocation,
} from '../../shared/model';

const handleStartElement = (
  state: ParserState,
  name: string,
  attr: XmlAttributes,
): void => {
  if (name === 'SendPort' && attr.Name) {
    state.addSendPort(attr.Name);
  } else if (name === 'ReceivePort' && attr.Name) {
    state.addReceivePort(attr.Name);
  } else if (name === 'ReceiveLocation' && attr.Name) {
    state.addReceiveLocation(attr.Name);
  }
  state.pathPush(name);
};

const handleEndElement = (state: ParserState): void => {
  state.pathPop();
};

const handleText = (state: ParserState, text: string): void => {
  if (state.pathEndsWith(['SendPort', 'ApplicationName'])) {
    state.setSPApplicationName(text);
  } else if (state.pathEndsWith(['ReceivePort', 'ApplicationName'])) {
    state.setRPApplicationName(text);
  } else if (state.pathEndsWith(['PrimaryTransport', 'Address'])) {
    state.setSPAddress(text);
  } else if (state.pathEndsWith(['ReceiveLocation', 'Address'])) {
    state.setRLAddress(text);
  }
};

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

const mapParserState = (state: ParserState): Bindings => {
  return {
    applications: mapApplications(state),
  };
};

const parseBindings = (data: Buffer): Promise<Bindings> => {
  return new Promise<Bindings>((resolve, reject): void => {
    const parser = new Parser('UTF-8');
    const state = new ParserState();
    parser
      .on('startElement', (name, attr): void => {
        handleStartElement(state, name, attr);
      })
      .on('endElement', (): void => {
        handleEndElement(state);
      })
      .on('text', (text): void => {
        handleText(state, text);
      })
      .on('end', (): void => {
        const bindings = mapParserState(state);
        resolve(bindings);
      })
      .on('error', (error): void => {
        reject(error);
      });
    parser.write(data);
    parser.end();
  });
};

export default parseBindings;
