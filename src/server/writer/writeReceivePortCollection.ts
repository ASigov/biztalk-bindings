import { XMLDocumentCB } from 'xmlbuilder';
import { ReceivePort } from '../../shared/model';
import writeReceivePort from './writeReceivePort';

const writeReceivePortCollection = (
  feed: XMLDocumentCB,
  rpArray: ReceivePort[],
  appName: string,
): void => {
  const collection = feed.ele('ReceivePortCollection');
  rpArray.forEach((rp): void => writeReceivePort(collection, rp, appName));
  collection.up();
};

export default writeReceivePortCollection;
