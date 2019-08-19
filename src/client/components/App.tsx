import React, { useState } from 'react';
import axios from 'axios';
import {
  Bindings,
  Application,
  ReceiveLocation,
  SendPort,
} from '../../shared/model';
import ApplicationsPanel from './ApplicationsPanel';
import SendPortsPanel from './SendPortsPanel';
import ReceiveLocationsPanel from './ReceiveLocatoinsPanel';
import OpenBindingsFilePanel from './OpenBindingsFilePanel';
import GeneratePanel from './GeneratePanel';

const App = (): JSX.Element => {
  const [bindings, setBindings] = useState<Bindings>();
  const [selectedApp, setSelectedApp] = useState<Application>();
  const [deletedSPs, setDeletedSPs] = useState<string[]>([]);
  const [deletedRLs, setDeletedRLs] = useState<string[]>([]);

  const apps = bindings && bindings.applications;
  const sendPorts =
    selectedApp &&
    selectedApp.sendPorts.filter(
      (sp): boolean => !deletedSPs.includes(sp.name),
    );
  const receiveLocations =
    selectedApp &&
    selectedApp.receiveLocations.filter(
      (rl): boolean => !deletedRLs.includes(rl.name),
    );

  const handleFileOpen = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append('file', file);
    const response = await axios.post(`${window.location.origin}/upload`, data);
    const newBindings = response.data as Bindings;
    setBindings(newBindings);
    setSelectedApp(newBindings && newBindings.applications[0]);
  };

  const handleSelectedAppChange = (app: Application): void => {
    setSelectedApp(app);
    setDeletedSPs([]);
    setDeletedRLs([]);
  };

  const handleDeleteSP = (sp: SendPort): void => {
    const newDeletedSPs = deletedSPs.concat(sp.name);
    setDeletedSPs(newDeletedSPs);
  };

  const handleDeleteRL = (rl: ReceiveLocation): void => {
    const newDeletedRLs = deletedRLs.concat(rl.name);
    setDeletedRLs(newDeletedRLs);
  };

  return (
    <div className="container">
      <OpenBindingsFilePanel onFileOpen={handleFileOpen} />
      <ApplicationsPanel
        apps={apps}
        selectedApp={selectedApp}
        onSelectedAppChange={handleSelectedAppChange}
      />
      <SendPortsPanel sps={sendPorts} onDelete={handleDeleteSP} />
      <ReceiveLocationsPanel rls={receiveLocations} onDelete={handleDeleteRL} />
      <GeneratePanel appName={selectedApp ? selectedApp.name : ''} />
    </div>
  );
};

export default App;
