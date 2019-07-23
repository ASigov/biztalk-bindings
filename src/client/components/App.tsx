import React from 'react';

import * as bindings from '../../shared/bindings';
import Dropdown from './Dropdown';
import Listbox from './Listbox';

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
  const [app, setApp] = React.useState<bindings.Application>(
    model.applications[0],
  );
  const [SPs, setSPs] = React.useState<bindings.SendPort[]>([]);
  const [RLs, setRLs] = React.useState<bindings.ReceiveLocation[]>([]);

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-3">
          <div className="custom-file">
            <label className="custom-file-label" htmlFor="customFile">
              Choose bindings file
              <input
                className="custom-file-input"
                type="file"
                id="customFile"
              />
            </label>
          </div>
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
            Items={model.applications}
            SelectedItem={app}
            OnSelectionChanged={setApp}
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
            Items={app.sendPorts}
            SelectedItems={SPs}
            OnSelectionChanged={setSPs}
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
            Items={app.receiveLocations}
            SelectedItems={RLs}
            OnSelectionChanged={setRLs}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <button className="btn btn-primary btn-lg btn-block" type="button">
            Generate OCCM.EDI.Router bindings
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
