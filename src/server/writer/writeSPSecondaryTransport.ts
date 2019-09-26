import { XMLDocumentCB } from 'xmlbuilder';

const writeSPSecondaryTransport = (feed: XMLDocumentCB): void => {
  feed
    .ele('SecondaryTransport')
    .ele('Address')
    .up()
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
    .ele('OrderedDelivery', false)
    .up()
    .ele('DeliveryNotification', 1)
    .up()
    .ele('SendHandler', { 'xsi:nil': true })
    .up()
    .up();
};

export default writeSPSecondaryTransport;
