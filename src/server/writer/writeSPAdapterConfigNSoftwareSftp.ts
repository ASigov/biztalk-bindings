import xmlbuilder, { XMLDocumentCB } from 'xmlbuilder';
import {
  AdapterConfigSend,
  AdapterConfigSendNSoftwareSftp,
} from '../../shared/model';

const writeSPAdapterConfigNSoftwareSftp = (
  feed: XMLDocumentCB,
  adapterConfig: AdapterConfigSend,
  address: string,
): void => {
  const config = adapterConfig as AdapterConfigSendNSoftwareSftp;
  feed.text(
    xmlbuilder
      .create('CustomProps', { headless: true })
      .ele('AdapterConfig', { vt: 8 })
      .text(
        xmlbuilder
          .create('Config', { headless: true })
          .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
          .att('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema')
          .ele('AfterConnect')
          .up()
          .ele('AfterPut')
          .up()
          .ele('Append', 'False')
          .up()
          .ele('BeforePut')
          .up()
          .ele('ConnectionLifetime', 0)
          .up()
          .ele('Firewall')
          .ele('AutoDetect', 'False')
          .up()
          .ele('FirewallType', 0)
          .up()
          .ele('Host')
          .up()
          .ele('Password', '******')
          .up()
          .ele('Port', 0)
          .up()
          .ele('User')
          .up()
          .up()
          .ele('Other')
          .up()
          .ele('Overwrite', 'True')
          .up()
          .ele('RemoteFile', config.fileName)
          .up()
          .ele('RemotePath', config.path)
          .up()
          .ele('RemoteTempPath')
          .up()
          .ele('RuntimeLicense')
          .up()
          .ele('SSHAcceptServerHostKey')
          .ele('AcceptAny', 'True')
          .up()
          .ele('StoreType', 0)
          .up()
          .ele('Store', 'MY')
          .up()
          .ele('Subject')
          .up()
          .ele('StorePassword', '******')
          .up()
          .up()
          .ele('SSHAuthMode', 2)
          .up()
          .ele('SSHCert')
          .ele('Store', 'MY')
          .up()
          .ele('StorePassword', '******')
          .up()
          .ele('StoreType', 0)
          .up()
          .ele('Subject')
          .up()
          .up()
          .ele('SSHCompressionAlgorithms', 'none')
          .up()
          .ele('SSHHost', config.server)
          .up()
          .ele('SSHPassword', '******')
          .up()
          .ele('SSHPort', config.port)
          .up()
          .ele('SSHUser', config.userName)
          .up()
          .ele('SSOAffiliate', config.ssoAffiliate)
          .up()
          .ele('Timeout', 60)
          .up()
          .ele('TransportLog')
          .ele('Location', 'Application')
          .up()
          .ele('LogMode', 3)
          .up()
          .ele('LogType', 1)
          .up()
          .up()
          .ele('URIIdentity', 'SFTP://')
          .up()
          .ele('uri', address)
          .end(),
      )
      .end(),
  );
};

export default writeSPAdapterConfigNSoftwareSftp;
