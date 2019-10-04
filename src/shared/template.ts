export interface ApplicationTemplate {
  name: string;
  receivePortTemplates: ReceivePortTemplate[];
  sendPortTemplates: SendPortTemplate[];
}

export interface ReceivePortTemplate {
  name: string;
  receiveLocationTemplates: ReceiveLocationTemplate[];
}

export interface ReceiveLocationTemplate {
  namePrefix: string;
}

export interface SendPortTemplate {
  name: string;
  namePrefix: string;
  filterTemplate?: SendPortFilterTemplate;
}

export interface SendPortFilterTemplate {
  property: string;
  valuePrefix: string;
}

const ApplicationTemplates: ApplicationTemplate[] = [
  {
    name: 'OCCM.EDI.Router',
    receivePortTemplates: [
      {
        name: 'EDI.Router.ReceivePort',
        receiveLocationTemplates: [{ namePrefix: 'EDI.Router.RL.' }],
      },
    ],
    sendPortTemplates: [
      {
        name: 'Default',
        namePrefix: 'EDI.Router.SP.',
        filterTemplate: {
          property: 'BTS.ReceivePortName',
          valuePrefix: 'EDI.Router.SP.',
        },
      },
    ],
  },
];

export default ApplicationTemplates;
