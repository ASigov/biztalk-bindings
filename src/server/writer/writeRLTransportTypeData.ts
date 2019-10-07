import { XMLDocumentCB } from 'xmlbuilder';
import { ReceiveLocation } from '../../shared/model';
import writeRLAdapterConfigFile from './writeRLAdapterConfigFile';
import writeRLAdapterConfigNSoftwareFtp from './writeRLAdapterConfigNSoftwareFtp';
import writeRLAdapterConfigNSoftwareSftp from './writeRLAdapterConfigNSoftwareSftp';

const writeRLTransportTypeData = (
  feed: XMLDocumentCB,
  rl: ReceiveLocation,
): void => {
  feed.ele('ReceiveLocationTransportTypeData');

  if (rl.adapterName === 'FILE') {
    writeRLAdapterConfigFile(feed, rl.adapterConfig);
  } else if (
    rl.adapterName === 'nsoftware.FTP v4' ||
    rl.adapterName === 'nsoftware.FTP 2016'
  ) {
    writeRLAdapterConfigNSoftwareFtp(feed, rl.adapterConfig, rl.address);
  } else if (
    rl.adapterName === 'nsoftware.SFTP v4' ||
    rl.adapterName === 'nsoftware.SFTP 2016'
  ) {
    writeRLAdapterConfigNSoftwareSftp(feed, rl.adapterConfig, rl.address);
  } else {
    throw new Error(
      `Error when writing ReceiveLocationTransportTypeData. Unknown adapter name ${rl.adapterName}`,
    );
  }

  feed.up();
};

export default writeRLTransportTypeData;
