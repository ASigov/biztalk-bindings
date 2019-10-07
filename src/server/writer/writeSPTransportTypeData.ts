import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';
import writeSPAdapterConfigFile from './writeSPAdapterConfigFile';
import writeSPAdapterConfigNSoftwareFtp from './writeSPAdapterConfigNSoftwareFtp';
import writeSPAdapterConfigNSoftwareSftp from './writeSPAdapterConfigNSoftwareSftp';

const writeSPTransportTypeData = (feed: XMLDocumentCB, sp: SendPort): void => {
  feed.ele('TransportTypeData');

  if (sp.adapterName === 'FILE') {
    writeSPAdapterConfigFile(feed, sp.adapterConfig);
  } else if (
    sp.adapterName === 'nsoftware.FTP v4' ||
    sp.adapterName === 'nsoftware.FTP 2016'
  ) {
    writeSPAdapterConfigNSoftwareFtp(feed, sp.adapterConfig, sp.address);
  } else if (
    sp.adapterName === 'nsoftware.SFTP v4' ||
    sp.adapterName === 'nsoftware.SFTP 2016'
  ) {
    writeSPAdapterConfigNSoftwareSftp(feed, sp.adapterConfig, sp.address);
  } else {
    throw new Error(
      `Error when writing TransportTypeData. Unknown adapter ${sp.adapterName}`,
    );
  }

  feed.up();
};

export default writeSPTransportTypeData;
