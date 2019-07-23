import React from 'react';

const App: React.FC = (): JSX.Element => (
  <div className="container">
    <div className="row">
      <div className="col mt-3">
        <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Choose bindings file
            <input className="custom-file-input" type="file" id="customFile" />
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
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            OCCM.EDI.Router
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" type="button">
              OCCM.EDI.Billing.In
            </button>
            <button className="dropdown-item" type="button">
              OCCM.EDI.Billing.Out
            </button>
            <button className="dropdown-item" type="button">
              OCCM.EDI.Router
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col mt-3">
        <h4>Send Ports</h4>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="list-group">
          <button
            className="list-group-item list-group-item-action active"
            type="button"
          >
            EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.IN
          </button>
          <button
            className="list-group-item list-group-item-action"
            type="button"
          >
            EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.OUT
          </button>
          <button
            className="list-group-item list-group-item-action"
            type="button"
          >
            EDI.Router.SP.ROUTER.WCEDI.TIN.TRP.WC.R.OUT
          </button>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col mt-3">
        <h4>Receive Locations</h4>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="list-group">
          <button
            className="list-group-item list-group-item-action active"
            type="button"
          >
            EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.IN
          </button>
          <button
            className="list-group-item list-group-item-action"
            type="button"
          >
            EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.OUT
          </button>
          <button
            className="list-group-item list-group-item-action"
            type="button"
          >
            EDI.Router.RL.ROUTER.WCEDI.TIN.TRP.WC.R.OUT
          </button>
        </div>
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

export default App;
