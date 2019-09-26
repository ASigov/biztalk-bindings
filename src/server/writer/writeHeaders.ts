import { XMLDocumentCB } from 'xmlbuilder';

const writeHeaders = (doc: XMLDocumentCB): void => {
  doc
    .dec('1.0', 'utf-8')
    .ele('BindingInfo', {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      Assembly:
        'Microsoft.BizTalk.Deployment, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
      Version: '3.5.1.0',
      BindingStatus: 'NoBindings', // dynamic
      BoundEndpoints: '0', // dynaimc
      TotalEndpoints: '0', // dynamic
    })
    .ele('Timestamp', new Date().toISOString())
    .up();
};

export default writeHeaders;
