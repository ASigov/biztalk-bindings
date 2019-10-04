import React from 'react';
import { SendPort } from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import SendPortEditor from './SendPortEditor';
import SendPortList from './SendPortList';

interface SendPortsPanel {
  sps: SendPort[];
  templates: SendPortTemplate[];
  onAdd: (sp: SendPort) => void;
  onDelete: (sp: SendPort) => void;
}

const SendPortsPanel = (props: SendPortsPanel): JSX.Element => {
  const { sps, templates, onAdd, onDelete } = props;

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>
            Send Ports
            <span className="badge badge-secondary ml-2">{sps.length}</span>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SendPortEditor templates={templates} onAdd={onAdd} />
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
