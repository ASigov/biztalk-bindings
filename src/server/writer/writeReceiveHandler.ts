import { XMLDocumentCB } from 'xmlbuilder';
import writeTransportType from './writeTransportType';

const writeReceiveHandler = (
  feed: XMLDocumentCB,
  adapterName: string,
): void => {
  feed.ele('ReceiveHandler', {
    Name: 'ClusteredHost',
    HostTrusted: false,
  });
  writeTransportType(feed, adapterName);
  feed.up();
};

export default writeReceiveHandler;
