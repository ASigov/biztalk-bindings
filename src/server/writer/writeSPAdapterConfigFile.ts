import xmlbuilder, { XMLDocumentCB } from 'xmlbuilder';
import { AdapterConfigSendFile, AdapterConfigSend } from '../../shared/model';

const writeSPAdapterConfigFile = (
  feed: XMLDocumentCB,
  adapterConfig: AdapterConfigSend,
): void => {
  const config = adapterConfig as AdapterConfigSendFile;
  feed.text(
    xmlbuilder
      .create('CustomProps', { headless: true })
      .ele('UseTempFileOnWrite', { vt: 11 }, 0)
      .up()
      .ele('AllowCacheOnWrite', { vt: 11 }, 0)
      .up()
      .ele('CopyMode', { vt: 19 }, 1)
      .up()
      .ele('FileName', { vt: 8 }, config.fileName)
      .end(),
  );
};

export default writeSPAdapterConfigFile;
