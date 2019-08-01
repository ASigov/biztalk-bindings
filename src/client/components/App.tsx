import React, { useState } from 'react';
import axios from 'axios';
import {
  Bindings,
  Application,
  SendPort,
  ReceiveLocation,
} from '../../shared/model';
import ApplicationPicker from './ApplicationPicker';
import SendPortList from './SendPortList';
import ReceiveLocationList from './ReceiveLocationList';
import OpenFile from './OpenFile';

const App: React.FC = (): JSX.Element => {
  const [bindings, setBindings] = useState<Bindings>();
  const [selectedApp, setSelectedApp] = useState<Application>();
  const [selectedSPs, setSelectedSPs] = useState<SendPort[]>([]);
  const [selectedRLs, setSelectedRLs] = useState<ReceiveLocation[]>([]);

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
      <div className="row">
        <div className="col mt-3">
          <OpenFile label="Open bindings file" onFileOpen={handleOpenFile} />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <h4>Application</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ApplicationPicker
            apps={bindings && bindings.applications}
            selectedApp={selectedApp}
            onSelectionChanged={setSelectedApp}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <h4>Send Ports</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SendPortList
            sendPorts={selectedApp && selectedApp.sendPorts}
            selectedSendPorts={selectedSPs}
            onSelectionChanged={setSelectedSPs}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <h4>Receive Locations</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ReceiveLocationList
            receiveLocations={selectedApp && selectedApp.receiveLocations}
            selectedReceiveLocations={selectedRLs}
            onSelectionChanged={setSelectedRLs}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <button className="btn btn-primary btn-lg btn-block" type="button">
            {`Generate ${selectedApp ? selectedApp.name : ''} bindings`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
