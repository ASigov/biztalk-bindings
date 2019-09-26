import xmlbuilder, { XMLDocumentCB } from 'xmlbuilder';
import {
  AdapterConfigReceiveFile,
  AdapterConfigReceive,
} from '../../shared/model';

const writeRLAdapterConfigFile = (
  feed: XMLDocumentCB,
  adapterConfig: AdapterConfigReceive,
): void => {
  const config = adapterConfig as AdapterConfigReceiveFile;
  feed.text(
    xmlbuilder
      .create('CustomProps', { headless: true })
      .ele('RenameReceivedFiles', { vt: 11 }, 0)
      .up()
      .ele('RemoveReceivedFileDelay', { vt: 19 }, 10)
      .up()
      .ele('RemoveReceivedFileMaxInterval', { vt: 19 }, 300000)
      .up()
      .ele('FileMask', { vt: 8 }, config.fileMask)
      .up()
      .ele('FileNetFailRetryInt', { vt: 19 }, 5)
      .up()
      .ele('RemoveReceivedFileRetryCount', { vt: 19 }, 5)
      .up()
      .ele('BatchSizeInBytes', { vt: 19 }, 102400)
      .up()
      .ele('PollingInterval', { vt: 19 }, 60000)
      .up()
      .ele('FileNetFailRetryCount', { vt: 19 }, 5)
      .up()
      .ele('BatchSize', { vt: 19 }, 20)
      .end(),
  );
};

export default writeRLAdapterConfigFile;
