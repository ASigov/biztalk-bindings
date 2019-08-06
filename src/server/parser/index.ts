import { Parser, XmlAttributes } from 'node-expat';
import ParserState from './ParserState';

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
  } else if (
    name === 'TransportType' &&
    state.pathEndsWith('PrimaryTransport') &&
    attr.Name
  ) {
    state.setSPAdapterName(attr.Name);
  } else if (name === 'ReceiveLocationTransportType' && attr.Name) {
    state.setRLAdapterName(attr.Name);
  }
  state.pathPush(name);
};

const handleEndElement = (state: ParserState): void => {
  state.pathPop();
};

const handleText = (state: ParserState, text: string): void => {
  if (state.pathEndsWith('SendPort', 'ApplicationName')) {
    state.setSPApplicationName(text);
  } else if (state.pathEndsWith('ReceivePort', 'ApplicationName')) {
    state.setRPApplicationName(text);
  } else if (state.pathEndsWith('PrimaryTransport', 'Address')) {
    state.setSPAddress(text);
  } else if (state.pathEndsWith('ReceiveLocation', 'Address')) {
    state.setRLAddress(text);
  } else if (state.pathEndsWith('TransportTypeData')) {
    state.setSPTransportTypeData(text);
  } else if (state.pathEndsWith('ReceiveLocationTransportTypeData')) {
    state.setRLTransportTypeData(text);
  }
};

const parse = (data: Buffer): Promise<ParserState> => {
  return new Promise<ParserState>((resolve, reject): void => {
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
        resolve(state);
      })
      .on('error', (error): void => {
        reject(error);
      });
    parser.write(data);
    parser.end();
  });
};

export default parse;
