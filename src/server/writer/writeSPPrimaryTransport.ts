import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';
import writeTransportType from './writeTransportType';
import writeSPTransportTypeData from './writeSPTransportTypeData';
import writeSendHandler from './writeSendHandler';

const writeSPPrimaryTransport = (feed: XMLDocumentCB, sp: SendPort): void => {
  feed
    .ele('PrimaryTransport')
    .ele('Address', sp.address)
    .up();
  writeTransportType(feed, sp.adapterName);
  writeSPTransportTypeData(feed, sp);
  feed
    .ele('RetryCount', 3)
    .up()
    .ele('RetryInterval', 5)
    .up()
    .ele('ServiceWindowEnabled', false)
    .up()
    .ele('FromTime', '2000-01-01T21:00:00')
    .up()
    .ele('ToTime', '2000-01-01T20:59:59')
    .up()
    .ele('Primary', true)
    .up()
    .ele('OrderedDelivery', false)
    .up()
    .ele('DeliveryNotification', 1)
    .up();
  writeSendHandler(feed, sp.adapterName);
  feed.up();
};

export default writeSPPrimaryTransport;
