import React, { useState } from 'react';
import axios from 'axios';

import {
  Bindings,
  Application,
  SendPort,
  ReceiveLocation,
} from '../../shared/bindings';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import OpenFile from './OpenFile';

const App: React.FC = (): JSX.Element => {
  const [bindings, setBindings] = useState<Bindings>();
  const [selectedApp, setSelectedApp] = useState<Application>();
  const [selectedSPs, setSelectedSPs] = useState<SendPort[]>([]);
  const [selectedRLs, setSelectedRLs] = useState<ReceiveLocation[]>([]);

  const handleOpenFile = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append('file', file);
    try {
      const response = await axios.post('http://localhost:3000/upload', data);
      const newBindings = response.data as Bindings;
      setBindings(newBindings);
      setSelectedApp(newBindings && newBindings.applications[0]);
    } catch (error) {
      console.log(error);
    }
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
          <Dropdown
            items={bindings && bindings.applications}
            selectedItem={selectedApp}
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
          <Listbox
            items={selectedApp && selectedApp.sendPorts}
            selectedItems={selectedSPs}
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
          <Listbox
            items={selectedApp && selectedApp.receiveLocations}
            selectedItems={selectedRLs}
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
