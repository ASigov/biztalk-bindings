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

const trimEnd = (inputString: string, charToTrim: string): string => {
  let str = inputString;
  while (str.charAt(str.length - 1) === charToTrim) {
    str = str.substring(0, str.length - 1);
  }
  return str;
};

const trimStart = (inputString: string, charToTrim: string): string => {
  let str = inputString;
  while (str.charAt(0) === charToTrim) {
    str = str.substring(1);
  }
  return str;
};

export const formatSendFileAddress = (
  config: AdapterConfigSendFile,
): string => {
  const path = trimEnd(config.path.replace(/\//g, '\\'), '\\');
  return `${path}\\${config.fileName}`;
};

export const formatSendNSoftwareFtpAddress = (
  config: AdapterConfigSendNSoftwareFtp,
): string => {
  const path = trimStart(trimEnd(config.path.replace(/\\/g, '/'), '/'), '/');
  return `FTP://${config.userName}@${config.server}:${config.port}/${path}/${config.fileName}`;
};

export const formatSendNSoftwareSftpAddress = (
  config: AdapterConfigSendNSoftwareSftp,
): string => {
  const path = trimStart(trimEnd(config.path.replace(/\\/g, '/'), '/'), '/');
  return `SFTP://${config.userName}@${config.server}:${config.port}/${path}/${config.fileName}`;
};

export const formatReceiveFileAddress = (
  config: AdapterConfigReceiveFile,
): string => {
  const path = trimEnd(config.path.replace(/\//g, '\\'), '\\');
  return `${path}\\${config.fileMask}`;
};

export const formatReceiveNSoftwareFtpAddress = (
  config: AdapterConfigReceiveNSoftwareFtp,
): string => {
  const path = trimStart(trimEnd(config.path.replace(/\\/g, '/'), '/'), '/');
  return `FTP://${config.userName}@${config.server}:${config.port}/${path}/${config.fileMask}`;
};

export const formatReceiveNSoftwareSftpAddress = (
  config: AdapterConfigReceiveNSoftwareSftp,
): string => {
  const path = trimStart(trimEnd(config.path.replace(/\\/g, '/'), '/'), '/');
  return `SFTP://${config.userName}@${config.server}:${config.port}/${path}/${config.fileMask}`;
};

export const defaultAdapterConfigSendFile = (
  sp?: SendPort,
): AdapterConfigSendFile => {
  if (sp && sp.adapterName === 'FILE') {
    return sp.adapterConfig as AdapterConfigSendFile;
  }

  return {
    path: '',
    fileName: '%SourceFileName%',
  };
};

export const defaultAdapterConfigSendNSoftwareFtp = (
  sp?: SendPort,
): AdapterConfigSendNSoftwareFtp => {
  if (
    sp &&
    (sp.adapterName === 'nsoftware.FTP v4' ||
      sp.adapterName === 'nsoftware.FTP 2016')
  ) {
    return sp.adapterConfig as AdapterConfigSendNSoftwareFtp;
  }

  return {
    path: '',
    fileName: '%SourceFileName%',
    server: '',
    port: 21,
    userName: '',
    ssoAffiliate: '',
  };
};

export const defaultAdapterConfigSendNSoftwareSftp = (
  sp?: SendPort,
): AdapterConfigSendNSoftwareSftp => {
  if (
    sp &&
    (sp.adapterName === 'nsoftware.SFTP v4' ||
      sp.adapterName === 'nsoftware.SFTP 2016')
  ) {
    return sp.adapterConfig as AdapterConfigSendNSoftwareSftp;
  }

  return {
    path: '',
    fileName: '%SourceFileName%',
    server: '',
    port: 22,
    userName: '',
    ssoAffiliate: '',
  };
};

export const defaultAdapterConfigReceiveFile = (
  rl?: ReceiveLocation,
): AdapterConfigReceiveFile => {
  if (rl && rl.adapterName === 'FILE') {
    return rl.adapterConfig as AdapterConfigReceiveFile;
  }

  return {
    path: '',
    fileMask: '*.*',
  };
};

export const defaultAdapterConfigReceiveNSoftwareFtp = (
  rl?: ReceiveLocation,
): AdapterConfigReceiveNSoftwareFtp => {
  if (
    rl &&
    (rl.adapterName === 'nsoftware.FTP v4' ||
      rl.adapterName === 'nsoftware.FTP 2016')
  ) {
    return rl.adapterConfig as AdapterConfigReceiveNSoftwareFtp;
  }

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

export const defaultAdapterConfigReceiveNSoftwareSftp = (
  rl?: ReceiveLocation,
): AdapterConfigReceiveNSoftwareSftp => {
  if (
    rl &&
    (rl.adapterName === 'nsoftware.SFTP v4' ||
      rl.adapterName === 'nsoftware.SFTP 2016')
  ) {
    return rl.adapterConfig as AdapterConfigReceiveNSoftwareSftp;
  }

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
