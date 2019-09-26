import { XMLDocumentCB } from 'xmlbuilder';
import { ReceiveLocation } from '../../shared/model';
import writeRLTransportType from './writeRLTransportType';
import writeRLTransportTypeData from './writeRLTransportTypeData';
import writeRLReceivePipeline from './writeRLReceivePipeline';
import writeReceiveHandler from './writeReceiveHandler';

const writeReceiveLocation = (
  feed: XMLDocumentCB,
  rl: ReceiveLocation,
): void => {
  feed
    .ele('ReceiveLocation', { Name: rl.name })
    .ele('Description', { 'xsi:nil': true })
    .up()
    .ele('Address', rl.address)
    .up()
    .ele('PublicAddress')
    .up()
    .ele('Primary', false)
    .up()
    .ele('ReceiveLocationServiceWindowEnabled', false)
    .up()
    .ele('ReceiveLocationFromTime', '2000-01-01T21:00:00')
    .up()
    .ele('ReceiveLocationToTime', '2000-01-01T20:59:59')
    .up()
    .ele('ReceiveLocationStartDateEnabled', false)
    .up()
    .ele('ReceiveLocationStartDate', '2000-01-01T21:00:00')
    .up()
    .ele('ReceiveLocationEndDateEnabled', false)
    .up()
    .ele('ReceiveLocationEndDate', '2000-01-01T21:00:00')
    .up();
  writeRLTransportType(feed, rl.adapterName);
  writeRLTransportTypeData(feed, rl);
  writeRLReceivePipeline(feed, rl);
  feed
    .ele('ReceivePipelineData', { 'xsi:nil': true })
    .up()
    .ele('SendPipeline', { 'xsi:nil': true })
    .up()
    .ele('SendPipelineData', { 'xsi:nil': true })
    .up()
    .ele('Enable', false)
    .up();
  writeReceiveHandler(feed, rl.adapterName);
  feed.up();
};

export default writeReceiveLocation;
