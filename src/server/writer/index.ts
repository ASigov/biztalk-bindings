import xmlbuilder from 'xmlbuilder';
import stream from 'stream';
import { Application } from '../../shared/model';
import writeHeaders from './writeHeaders';
import writeSendPortCollection from './writeSendPortCollection';
import writeReceivePortCollection from './writeReceivePortCollection';

const writeBindings = (
  app: Application,
  outputStream: stream.Writable,
): void => {
  const feed = xmlbuilder.begin((chunk): boolean => outputStream.write(chunk));
  writeHeaders(feed);
  writeSendPortCollection(feed, app.sendPorts, app.name);
  writeReceivePortCollection(feed, app.receivePorts, app.name);
  feed.end();
};

export default writeBindings;
