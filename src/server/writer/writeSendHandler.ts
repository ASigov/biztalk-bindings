import { XMLDocumentCB } from 'xmlbuilder';
import writeTransportType from './writeTransportType';

const writeSendHandler = (feed: XMLDocumentCB, adapterName: string): void => {
  feed.ele('SendHandler', {
    Name: 'SendPortsHost',
    HostTrusted: false,
  });
  writeTransportType(feed, adapterName);
  feed.up();
};

export default writeSendHandler;
