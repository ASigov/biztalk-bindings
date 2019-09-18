import xmlbuilder, { XMLDocumentCB } from 'xmlbuilder';
import stream from 'stream';
import { Application, SendPort } from '../../shared/model';

const writeHeaders = (doc: XMLDocumentCB): XMLDocumentCB => {
  return doc
    .dec('1.0', 'utf-8')
    .ele('BindingInfo', {
      Attribute:
        'Microsoft.BizTalk.Deployment, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
      Version: '3.5.1.0',
      BindingStatus: 'NoBindings', // dynamic
      BoundEndpoints: '0', // dynaimc
      TotalEndpoints: '0', // dynamic
    })
    .ele('Timestamp', new Date().toISOString())
    .up();
};

const writeSendPort = (feed: XMLDocumentCB, sp: SendPort): void => {
  feed
    .ele('SendPort', {
      Name: sp.name,
      IsStatic: 'true',
      IsTwoWay: 'false', // dynamic
      BindingOption: '0', // dynamic
    })
    .up();
};

const writeSendPortCollection = (
  feed: XMLDocumentCB,
  spArray: SendPort[],
): void => {
  const collection = feed.ele('SendPortCollection');
  spArray.map((sp): void => writeSendPort(collection, sp));
  collection.up();
};

const ReceivePortCollection = (feed: XMLDocumentCB): void => {
  feed.ele('ReceivePortCollection').up();
};

const writeBindings = (
  app: Application,
  outputStream: stream.Writable,
): void => {
  const doc = xmlbuilder.begin((chunk): boolean => outputStream.write(chunk));
  const feed = writeHeaders(doc);
  writeSendPortCollection(feed, app.sendPorts);
  ReceivePortCollection(feed);
  feed.up();
};

export default writeBindings;
