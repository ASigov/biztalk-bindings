import React, { useState } from 'react';

import * as bindings from '../../shared/bindings';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import OpenFile from './OpenFile';

const model: bindings.Bindings = {
  applications: [
    {
      name: 'OCCM.EDI.Billing.In',
      sendPorts: [
        {
          name: 'Billing.In.ArchiveSP.BILLING.WCEDI.WC.R.837I.5010.IN',
        },
        {
          name: 'Billing.In.ArchiveSP.BILLING.WCEDI.WC.R.837P.5010.IN',
        },
      ],
      receiveLocations: [
        {
          name: 'Billing.In.InboundRL.BILLING.WCEDI.WC.R.837I.5010.IN',
        },
        {
          name: 'Billing.In.InboundRL.BILLING.WCEDI.WC.R.837P.5010.IN',
        },
      ],
    },
    {
      name: 'OCCM.EDI.Billing.Out',
      sendPorts: [
        {
          name: 'Billing.Out.ScheduleRL.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.BISHOP.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.INTEGRA.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
      ],
      receiveLocations: [
        {
          name: 'Billing.Out.ScheduleRL.BILLING.AMERISYS.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.BISHOP.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.INTEGRA.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
      ],
    },
    {
      name: 'OCCM.EDI.Router',
      sendPorts: [
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.IN',
        },
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.OUT',
        },
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.TIN.TRP.WC.R.OUT',
        },
      ],
      receiveLocations: [
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.IN',
        },
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.OUT',
        },
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.TIN.TRP.WC.R.OUT',
        },
      ],
    },
  ],
};

const App: React.FC = (): JSX.Element => {
  const [app, setApp] = useState<bindings.Application>(model.applications[0]);
  const [SPs, setSPs] = useState<bindings.SendPort[]>([]);
  const [RLs, setRLs] = useState<bindings.ReceiveLocation[]>([]);

  const handleOpenFile = (file: File): void => {
    console.log(
      `File name: ${file.name}, file type: ${file.type}, file size: ${file.size}`,
    );
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
            items={model.applications}
            selectedItem={app}
            onSelectionChanged={setApp}
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
            items={app.sendPorts}
            selectedItems={SPs}
            onSelectionChanged={setSPs}
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
            items={app.receiveLocations}
            selectedItems={RLs}
            onSelectionChanged={setRLs}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <button className="btn btn-primary btn-lg btn-block" type="button">
            {`Generate ${app.name} bindings`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
