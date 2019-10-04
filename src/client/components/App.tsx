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

  const handleSelectTemplate = (template: ApplicationTemplate): void => {
    setAppTemplate(template);
    const newApp: Application = {
      name: template.name,
      receivePorts: [],
      sendPorts: [],
    };
    setApp(newApp);
  };

  const handleAddSP = (sp: SendPort): void => {
    const newApp: Application = {
      name: app.name,
      receivePorts: app.receivePorts,
      sendPorts: app.sendPorts.concat(sp),
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
        onSelect={handleSelectTemplate}
      />
      <SendPortsPanel
        sps={app.sendPorts}
        templates={appTemplate.sendPortTemplates}
        onAdd={handleAddSP}
      />
      <ReceiveLocationsPanel rls={receiveLocations} />
      <GeneratePanel app={app} onGenerate={handleGenerate} />
    </div>
  );
};

export default App;
