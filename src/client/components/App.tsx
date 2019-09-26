import React, { useState } from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import {
  Bindings,
  Application,
  ReceivePort,
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
    selectedApp.receivePorts
      .map((rp): ReceiveLocation[] => rp.receiveLocations)
      .reduce((prev, curr): ReceiveLocation[] => prev.concat(curr), [])
      .filter((rl): boolean => !deletedRLs.includes(rl.name));

  const handleOpenFile = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append('file', file);
    const response = await axios.post(`${window.location.origin}/upload`, data);
    const newBindings = response.data as Bindings;
    setBindings(newBindings);
    setSelectedApp(newBindings && newBindings.applications[0]);
  };

  const handleSelectApp = (app: Application): void => {
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

  const handleGenerate = async (): Promise<void> => {
    if (selectedApp && receiveLocations && sendPorts) {
      const payload: Application = {
        name: selectedApp.name,
        receivePorts: selectedApp.receivePorts
          .map(
            (rp): ReceivePort => ({
              name: rp.name,
              receiveLocations: rp.receiveLocations.filter(
                (rl): boolean => !deletedRLs.includes(rl.name),
              ),
            }),
          )
          .filter((rp): boolean => rp.receiveLocations.length > 0),
        sendPorts: selectedApp.sendPorts.filter(
          (sp): boolean => !deletedSPs.includes(sp.name),
        ),
      };

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
    }
  };

  return (
    <div className="container">
      <OpenBindingsFilePanel onOpenFile={handleOpenFile} />
      <ApplicationsPanel
        apps={apps}
        selectedApp={selectedApp}
        onSelect={handleSelectApp}
      />
      <SendPortsPanel sps={sendPorts} onDelete={handleDeleteSP} />
      <ReceiveLocationsPanel rls={receiveLocations} onDelete={handleDeleteRL} />
      <GeneratePanel app={selectedApp} onGenerate={handleGenerate} />
    </div>
  );
};

export default App;
