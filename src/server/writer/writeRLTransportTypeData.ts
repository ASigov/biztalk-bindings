import { XMLDocumentCB } from 'xmlbuilder';
import { ReceiveLocation } from '../../shared/model';
import writeRLAdapterConfigFile from './writeRLAdapterConfigFile';

const writeRLTransportTypeData = (
  feed: XMLDocumentCB,
  rl: ReceiveLocation,
): void => {
  feed.ele('ReceiveLocationTransportTypeData');

  if (rl.adapterName === 'FILE') {
    writeRLAdapterConfigFile(feed, rl.adapterConfig);
  } else {
    throw new Error(
      `Error when writing ReceiveLocationTransportTypeData. Unknown adapter name ${rl.adapterName}`,
    );
  }

  feed.up();
};

export default writeRLTransportTypeData;
