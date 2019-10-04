import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';
import writeSPTransmitPipeline from './writeSPTransmitPipeline';
import writeSPPrimaryTransport from './writeSPPrimaryTransport';
import writeSPSecondaryTransport from './writeSPSecondaryTransport';
import writeSPFilter from './writeSPFilter';

const writeSendPort = (
  feed: XMLDocumentCB,
  sp: SendPort,
  appName: string,
): void => {
  feed
    .ele('SendPort', {
      Name: sp.name,
      IsStatic: 'true',
      IsTwoWay: 'false', // dynamic
      BindingOption: '0', // 0 - direct, 1 - local
    })
    .ele('Description', { 'xsi:nil': true })
    .up();
  writeSPTransmitPipeline(feed, sp);
  writeSPPrimaryTransport(feed, sp);
  writeSPSecondaryTransport(feed);
  feed
    .ele('ReceivePipelineData', { 'xsi:nil': true })
    .up()
    .ele('Tracking', 0)
    .up();
  writeSPFilter(feed, sp);
  feed
    .ele('OrderedDelivery', false)
    .up()
    .ele('Priority', 5)
    .up()
    .ele('StopSendingOnFailure', false)
    .up()
    .ele('RouteFailedMessage', false)
    .up()
    .ele('ApplicationName', appName)
    .up()
    .up();
};

export default writeSendPort;
