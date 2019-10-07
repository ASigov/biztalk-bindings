import {
  Application,
  ReceiveLocation,
  SendPort,
  AdapterConfigReceive,
  AdapterConfigReceiveFile,
  AdapterConfigReceiveNSoftwareFtp,
  AdapterConfigReceiveNSoftwareSftp,
  AdapterConfigSend,
  AdapterConfigSendFile,
  AdapterConfigSendNSoftwareFtp,
  AdapterConfigSendNSoftwareSftp,
} from './model';

export interface ApplicationTemplate {
  applicationName: string;
  receiveLocationTemplates: ReceiveLocationTemplate[];
  sendPortTemplates: SendPortTemplate[];
}

export interface ReceiveLocationTemplate {
  templateName: string;
  receiveLocationPrefix: string;
  receivePort: string;
  adapters: string[];
}

export interface SendPortTemplate {
  templateName: string;
  sendPortPrefix: string;
  filterTemplate?: SendPortFilterTemplate;
  adapters: string[];
}

export interface SendPortFilterTemplate {
  property: string;
  valuePrefix: string;
}

export const defaultAdapterConfigSendFile = (): AdapterConfigSendFile => {
  return {
    path: '',
    fileName: '%SourceFileName%',
  };
};

export const defaultAdapterConfigSendNSoftwareFtp = (): AdapterConfigSendNSoftwareFtp => {
  return {
    path: '',
    fileName: '%SourceFileName%',
    server: '',
    port: 21,
    userName: '',
    ssoAffiliate: '',
  };
};

export const defaultAdapterConfigSendNSoftwareSftp = (): AdapterConfigSendNSoftwareSftp => {
  return {
    path: '',
    fileName: '%SourceFileName%',
    server: '',
    port: 22,
    userName: '',
    ssoAffiliate: '',
  };
};

export const defaultAdapterConfigReceiveFile = (): AdapterConfigReceiveFile => {
  return {
    path: '',
    fileMask: '*.*',
  };
};

export const defaultAdapterConfigReceiveNSoftwareFtp = (): AdapterConfigReceiveNSoftwareFtp => {
  return {
    path: '',
    fileMask: '*.*',
    server: '',
    port: 21,
    userName: '',
    ssoAffiliate: '',
    pollingInterval: 600,
  };
};

export const defaultAdapterConfigReceiveNSoftwareSftp = (): AdapterConfigReceiveNSoftwareSftp => {
  return {
    path: '',
    fileMask: '*.*',
    server: '',
    port: 22,
    userName: '',
    ssoAffiliate: '',
    pollingInterval: 600,
  };
};

export const defaultAdapterConfigSend = (
  adapterName: string,
): AdapterConfigSend => {
  if (adapterName === 'FILE') {
    return defaultAdapterConfigSendFile();
  }

  if (
    adapterName === 'nsoftware.FTP v4' ||
    adapterName === 'nsoftware.FTP 2016'
  ) {
    return defaultAdapterConfigSendNSoftwareFtp();
  }

  if (
    adapterName === 'nsoftware.SFTP v4' ||
    adapterName === 'nsoftware.SFTP 2016'
  ) {
    return defaultAdapterConfigSendNSoftwareSftp();
  }

  throw new Error(
    `Error when creating default adapter config for send port. Unknown adapter name ${adapterName}`,
  );
};

export const defaultAdapterConfigReceive = (
  adapterName: string,
): AdapterConfigReceive => {
  if (adapterName === 'FILE') {
    return defaultAdapterConfigReceiveFile();
  }

  if (
    adapterName === 'nsoftware.FTP v4' ||
    adapterName === 'nsoftware.FTP 2016'
  ) {
    return defaultAdapterConfigReceiveNSoftwareFtp();
  }

  if (
    adapterName === 'nsoftware.SFTP v4' ||
    adapterName === 'nsoftware.SFTP 2016'
  ) {
    return defaultAdapterConfigReceiveNSoftwareSftp();
  }

  throw new Error(
    `Error when creating default adapter config for receive location. Unknown adapter name ${adapterName}`,
  );
};

export const sendPortFactory = (template: SendPortTemplate): SendPort => {
  const sp: SendPort = {
    name: template.sendPortPrefix,
    address: '',
    adapterName: template.adapters[0],
    adapterConfig: defaultAdapterConfigSend(template.adapters[0]),
  };

  if (template.filterTemplate) {
    sp.filter = {
      property: template.filterTemplate.property,
      value: template.filterTemplate.valuePrefix,
    };
  }

  return sp;
};

export const receiveLocationFactory = (
  template: ReceiveLocationTemplate,
): ReceiveLocation => {
  const rl: ReceiveLocation = {
    name: template.receiveLocationPrefix,
    address: '',
    adapterName: template.adapters[0],
    adapterConfig: defaultAdapterConfigReceive(template.adapters[0]),
  };

  return rl;
};

export const applicationFactory = (
  template: ApplicationTemplate,
): Application => {
  return {
    name: template.applicationName,
    receivePorts: [],
    sendPorts: [],
  };
};

export const applicationTemplates: ApplicationTemplate[] = [
  {
    applicationName: 'OCCM.EDI.Router',
    receiveLocationTemplates: [
      {
        templateName: 'Default',
        receiveLocationPrefix: 'EDI.Router.RL.',
        receivePort: 'EDI.Router.ReceivePort',
        adapters: [
          'FILE',
          'nsoftware.FTP v4',
          'nsoftware.FTP 2016',
          'nsoftware.SFTP v4',
          'nsoftware.SFTP 2016',
        ],
      },
    ],
    sendPortTemplates: [
      {
        templateName: 'Default',
        sendPortPrefix: 'EDI.Router.SP.',
        filterTemplate: {
          property: 'BTS.ReceivePortName',
          valuePrefix: 'EDI.Router.SP.',
        },
        adapters: [
          'FILE',
          'nsoftware.FTP v4',
          'nsoftware.FTP 2016',
          'nsoftware.SFTP v4',
          'nsoftware.SFTP 2016',
        ],
      },
    ],
  },
];
