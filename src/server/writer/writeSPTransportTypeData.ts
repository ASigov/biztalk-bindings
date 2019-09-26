import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';
import writeSPAdapterConfigFile from './writeSPAdapterConfigFile';

const writeSPTransportTypeData = (feed: XMLDocumentCB, sp: SendPort): void => {
  feed.ele('TransportTypeData');

  if (sp.adapterName === 'FILE') {
    writeSPAdapterConfigFile(feed, sp.adapterConfig);
  } else {
    throw new Error(
      `Error when writing TransportTypeData. Unknown adapter ${sp.adapterName}`,
    );
  }

  feed.up();
};

export default writeSPTransportTypeData;
