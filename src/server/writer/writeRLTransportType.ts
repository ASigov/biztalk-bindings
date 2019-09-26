import { XMLDocumentCB } from 'xmlbuilder';

interface TransportTypeProps {
  Capabilities: number;
  ConfigurationClsid: string;
}

interface TransportTypeLookup {
  [key: string]: TransportTypeProps;
}

const lookup: TransportTypeLookup = {
  FILE: {
    Capabilities: 11,
    ConfigurationClsid: '5e49e3a6-b4fc-4077-b44c-22f34a242fdb',
  },
  ODFile: {
    Capabilities: 22537,
    ConfigurationClsid: '50827f14-80e4-4ae0-8c46-045d3aaf0983',
  },
  Schedule: {
    Capabilities: 9,
    ConfigurationClsid: 'f2faa6a3-45e2-4c09-8024-425e768cc8ef',
  },
  'nsoftware.FTP v4': {
    Capabilities: 15627,
    ConfigurationClsid: '7571227c-f326-4248-a478-8748270376f7',
  },
  'nsoftware.SFTP v4': {
    Capabilities: 15627,
    ConfigurationClsid: '7571227c-f326-4248-a478-8748270376f7',
  },
  'nsoftware.FTP 2016': {
    Capabilities: 15627,
    ConfigurationClsid: '7571227c-f326-4248-a478-8748270376f7',
  },
  'nsoftware.SFTP 2016': {
    Capabilities: 15627,
    ConfigurationClsid: '7571227c-f326-4248-a478-8748270376f7',
  },
};

const writeRLTransportType = (
  feed: XMLDocumentCB,
  adapterName: string,
): void => {
  const transportType = lookup[adapterName];

  if (!transportType) {
    throw new Error(
      `Error when writing ReceiveLocationTransportType. Unknown adapter name ${adapterName}`,
    );
  }

  feed
    .ele('ReceiveLocationTransportType', {
      Name: adapterName,
      Capabilities: transportType.Capabilities,
      ConfigurationClsid: transportType.ConfigurationClsid,
    })
    .up();
};

export default writeRLTransportType;
