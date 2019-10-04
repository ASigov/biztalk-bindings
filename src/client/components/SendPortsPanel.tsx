import React, { useState } from 'react';
import { SendPort } from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import SendPortEditor from './SendPortEditor';
import SendPortList from './SendPortList';

interface SendPortsPanel {
  sps?: SendPort[];
  templates: SendPortTemplate[];
  onAdd: (sp: SendPort) => void;
}

const SendPortsPanel = (props: SendPortsPanel): JSX.Element => {
  const { sps, templates, onAdd } = props;

  const count = sps ? sps.length : 0;

  const handleEditorSubmit = (sp: SendPort): void => {
    onAdd(sp);
  };

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
          <SendPortEditor templates={templates} onSubmit={handleEditorSubmit} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SendPortList sps={sps} />
        </div>
      </div>
    </>
  );
};

export default SendPortsPanel;
