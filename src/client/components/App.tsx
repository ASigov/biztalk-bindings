import React, { useState } from 'react';
import axios from 'axios';
import { Bindings, Application } from '../../shared/model';
import ApplicationsPanel from './ApplicationsPanel';
import SendPortsPanel from './SendPortsPanel';
import ReceiveLocationsPanel from './ReceiveLocatoinsPanel';
import OpenBindingsFilePanel from './OpenBindingsFilePanel';
import GeneratePanel from './GeneratePanel';

const App = (): JSX.Element => {
  const [bindings, setBindings] = useState<Bindings>();
  const [selectedApp, setSelectedApp] = useState<Application>();

  const handleFileOpen = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append('file', file);
    const response = await axios.post(`${window.location.origin}/upload`, data);
    const newBindings = response.data as Bindings;
    setBindings(newBindings);
    setSelectedApp(newBindings && newBindings.applications[0]);
  };

  return (
    <div className="container">
      <OpenBindingsFilePanel onFileOpen={handleFileOpen} />
      <ApplicationsPanel
        apps={bindings && bindings.applications}
        selectedApp={selectedApp}
        onSelectedAppChange={setSelectedApp}
      />
      <SendPortsPanel sendPorts={selectedApp && selectedApp.sendPorts} />
      <ReceiveLocationsPanel
        receiveLocations={selectedApp && selectedApp.receiveLocations}
      />
      <GeneratePanel appName={selectedApp ? selectedApp.name : ''} />
    </div>
  );
};

export default App;
