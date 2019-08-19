import React from 'react';
import SendPortList from './SendPortList';
import { SendPort } from '../../shared/model';

interface SendPortsPanel {
  sps?: SendPort[];
  onDelete: (sp: SendPort) => void;
}

const SendPortsPanel = (props: SendPortsPanel): JSX.Element => {
  const { sps, onDelete } = props;

  const count = sps ? sps.length : 0;

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>
            Send Ports
            <span className="badge badge-secondary ml-2">{count}</span>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SendPortList sps={sps} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
};

export default SendPortsPanel;
