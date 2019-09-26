import { XMLDocumentCB } from 'xmlbuilder';
import { ReceivePort } from '../../shared/model';
import writeReceiveLocation from './writeReceiveLocation';

const writeReceivePort = (
  feed: XMLDocumentCB,
  rp: ReceivePort,
  appName: string,
): void => {
  feed
    .ele('ReceivePort', {
      Name: rp.name,
      IsTwoWay: 'false', // dynamic
      BindingOption: '1', // local
    })
    .ele('Description', { 'xsi:nil': 'true' })
    .up()
    .ele('ReceiveLocations');
  rp.receiveLocations.forEach((rl): void => writeReceiveLocation(feed, rl));
  feed
    .up()
    .ele('SendPipelineData', { 'xsi:nil': true })
    .up()
    .ele('Authentication', 0)
    .up()
    .ele('Tracking', 0)
    .up()
    .ele('Transforms')
    .up()
    .ele('RouteFailedMessage', false)
    .up()
    .ele('ApplicationName', appName)
    .up()
    .up();
};

export default writeReceivePort;
