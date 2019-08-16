import React, { useState } from 'react';
import axios from 'axios';
import { Bindings, Application } from '../../shared/model';
import ApplicationPanel from './ApplicationPanel';
import SendPortsPanel from './SendPortsPanel';
import ReceiveLocationsPanel from './ReceiveLocatoinsPanel';
import LoadBindingsPanel from './LoadBindingsPanel';
import GeneratePanel from './GeneratePanel';

const App = (): JSX.Element => {
  const [bindings, setBindings] = useState<Bindings>();
  const [selectedApp, setSelectedApp] = useState<Application>();

  const handleOpenFile = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append('file', file);
    const response = await axios.post(`${window.location.origin}/upload`, data);
    const newBindings = response.data as Bindings;
    setBindings(newBindings);
    setSelectedApp(newBindings && newBindings.applications[0]);
  };

  return (
    <div className="container">
      <LoadBindingsPanel onFileOpen={handleOpenFile} />
      <ApplicationPanel
        apps={bindings && bindings.applications}
        selectedApp={selectedApp}
        setSelectedApp={setSelectedApp}
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
