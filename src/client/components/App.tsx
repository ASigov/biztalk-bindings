import React, { useState } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import {
  Application,
  ReceivePort,
  ReceiveLocation,
  SendPort,
} from '../../shared/model';
import ApplicationTemplates, {
  ApplicationTemplate,
} from '../../shared/template';
import ApplicationTemplatesPanel from './ApplicationTemplatesPanel';
import SendPortsPanel from './SendPortsPanel';
import ReceiveLocationsPanel from './ReceiveLocatoinsPanel';
import GeneratePanel from './GeneratePanel';

const createDefaultApp = (template: ApplicationTemplate): Application => {
  return {
    name: template.name,
    receivePorts: [],
    sendPorts: [],
  };
};

const App = (): JSX.Element => {
  const [appTemplate, setAppTemplate] = useState<ApplicationTemplate>(
    ApplicationTemplates[0],
  );
  const [app, setApp] = useState<Application>(createDefaultApp(appTemplate));

  const receiveLocations = app.receivePorts
    .map((rp): ReceiveLocation[] => rp.receiveLocations)
    .reduce((prev, curr): ReceiveLocation[] => prev.concat(curr), []);

  const handleTemplateChange = (newTemplate: ApplicationTemplate): void => {
    setAppTemplate(newTemplate);
    setApp(createDefaultApp(newTemplate));
  };

  const handleAddSP = (newSP: SendPort): void => {
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts,
      sendPorts: app.sendPorts.concat(newSP),
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
        templates={ApplicationTemplates}
        selectedTemplate={appTemplate}
        onChange={handleTemplateChange}
      />
      <SendPortsPanel
        sps={app.sendPorts}
        templates={appTemplate.sendPortTemplates}
        onAdd={handleAddSP}
        onDelete={handleDeleteSP}
      />
      <ReceiveLocationsPanel rls={receiveLocations} />
      <GeneratePanel app={app} onGenerate={handleGenerate} />
    </div>
  );
};

export default App;
