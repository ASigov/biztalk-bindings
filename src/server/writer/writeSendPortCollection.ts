import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';
import writeSendPort from './writeSendPort';

const writeSendPortCollection = (
  feed: XMLDocumentCB,
  spArray: SendPort[],
  appName: string,
): void => {
  const collection = feed.ele('SendPortCollection');
  spArray.forEach((sp): void => writeSendPort(collection, sp, appName));
  collection.up();
};

export default writeSendPortCollection;
