import React from 'react';
import SendPortList from './SendPortList';
import { SendPort } from '../../shared/model';

interface SendPortsPanel {
  sendPorts?: SendPort[];
}

const SendPortsPanel = (props: SendPortsPanel): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>Send Ports</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SendPortList {...props} />
        </div>
      </div>
    </>
  );
};

export default SendPortsPanel;
