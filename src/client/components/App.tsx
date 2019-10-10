import React, { useState } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import {
  Application,
  ReceiveLocation,
  SendPort,
  ReceivePort,
} from '../../shared/model';
import {
  applicationTemplates,
  ApplicationTemplate,
  applicationFactory,
} from '../../shared/template';
import ApplicationTemplatesPanel from './ApplicationTemplatesPanel';
import SendPortPanel from './SendPortPanel';
import ReceiveLocationPanel from './ReceiveLocationPanel';
import GeneratePanel from './GeneratePanel';

const App = (): JSX.Element => {
  const [appTemplate, setAppTemplate] = useState<ApplicationTemplate>(
    applicationTemplates[0],
  );
  const [app, setApp] = useState<Application>(applicationFactory(appTemplate));

  const receiveLocations = app.receivePorts
    .map((rp): ReceiveLocation[] => rp.receiveLocations)
    .reduce((prev, curr): ReceiveLocation[] => prev.concat(curr), []);

  const handleTemplateChange = (newTemplate: ApplicationTemplate): void => {
    setAppTemplate(newTemplate);
    setApp(applicationFactory(newTemplate));
  };

  const handleAddSP = (newSP: SendPort): void => {
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts,
      sendPorts: app.sendPorts.concat(newSP),
    };
    setApp(newApp);
  };

  const handleEditSP = (updatedSP: SendPort, spIndex: number): void => {
    app.sendPorts[spIndex] = updatedSP;
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts,
      sendPorts: app.sendPorts,
    };
    setApp(newApp);
  };

  const handleDeleteSP = (deletedSP: SendPort): void => {
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts,
      sendPorts: app.sendPorts.filter((sp): boolean => sp !== deletedSP),
    };
    setApp(newApp);
  };

  const handleAddRL = (
    newRL: ReceiveLocation,
    receivePortName: string,
  ): void => {
    // Check if receive port already exists
    const receivePort = app.receivePorts.find(
      (rp): boolean => rp.name === receivePortName,
    );
    if (receivePort) {
      receivePort.receiveLocations.push(newRL);
      const newApp: Application = {
        name: app.name,
        receivePorts: app.receivePorts,
        sendPorts: app.sendPorts,
      };
      setApp(newApp);
    } else {
      const newApp: Application = {
        name: app.name,
        receivePorts: app.receivePorts.concat({
          name: receivePortName,
          receiveLocations: [newRL],
        }),
        sendPorts: app.sendPorts,
      };
      setApp(newApp);
    }
  };

  const handleEditRL = (
    updatedRL: ReceiveLocation,
    rlIndex: number,
    receivePortName: string,
  ): void => {
    const receivePort = app.receivePorts.find(
      (rp): boolean => rp.name === receivePortName,
    );
    if (receivePort) {
      receivePort.receiveLocations[rlIndex] = updatedRL;
      const newApp: Application = {
        name: app.name,
        receivePorts: app.receivePorts,
        sendPorts: app.sendPorts,
      };
      setApp(newApp);
    }
  };

  const handleDeleteRL = (deletedRL: ReceiveLocation): void => {
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts
        .map(
          (rp): ReceivePort => ({
            name: rp.name,
            receiveLocations: rp.receiveLocations.filter(
              (rl): boolean => rl.name !== deletedRL.name,
            ),
          }),
        )
        .filter((rp): boolean => rp.receiveLocations.length > 0),
      sendPorts: app.sendPorts,
    };
    setApp(newApp);
  };

  const handleGenerate = async (): Promise<void> => {
    const payload: Application = app; // TODO

    const response = await axios.post(
      `${window.location.origin}/generate`,
      payload,
      {
        responseType: 'blob',
        validateStatus: (): boolean => true,
      },
    );

    if (response.status === 500) {
      const reader = new FileReader();
      reader.onload = (): void => alert(reader.result);
      reader.readAsText(response.data);
    } else {
      await FileSaver.saveAs(response.data, 'temp.xml');
    }
  };

  return (
    <div className="container">
      <ApplicationTemplatesPanel
        templates={applicationTemplates}
        selectedTemplate={appTemplate}
        onChange={handleTemplateChange}
      />
      <SendPortPanel
        sps={app.sendPorts}
        templates={appTemplate.sendPortTemplates}
        onAdd={handleAddSP}
        onEdit={handleEditSP}
        onDelete={handleDeleteSP}
      />
      <ReceiveLocationPanel
        rls={receiveLocations}
        templates={appTemplate.receiveLocationTemplates}
        onAdd={handleAddRL}
        onEdit={handleEditRL}
        onDelete={handleDeleteRL}
      />
      <GeneratePanel app={app} onGenerate={handleGenerate} />
    </div>
  );
};

export default App;
