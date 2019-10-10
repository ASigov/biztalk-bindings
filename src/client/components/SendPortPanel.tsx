import React, { useState } from 'react';
import { SendPort } from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import SendPortEditor from './SendPortEditor';
import SendPortList from './SendPortList';

interface SendPortPanelProps {
  sps: SendPort[];
  templates: SendPortTemplate[];
  onAdd: (sp: SendPort) => void;
  onEdit: (sp: SendPort, spIndex: number) => void;
  onDelete: (sp: SendPort) => void;
}

const SendPortPanel = (props: SendPortPanelProps): JSX.Element => {
  const { sps, templates, onAdd, onEdit, onDelete } = props;

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  const handleAddClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  const handleSubmitClick = (sp: SendPort): void => {
    setEditorVisible(!editorVisible);
    onAdd(sp);
  };

  const handleCancelClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  return (
    <>
      <div className="row mt-3 align-items-center">
        <div className="col-auto">
          <h4>
            Send Ports
            <span className="badge badge-secondary ml-2">{sps.length}</span>
          </h4>
        </div>
        {!editorVisible && (
          <div className="col-auto">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleAddClick}
            >
              Add
            </button>
          </div>
        )}
      </div>
      {editorVisible && (
        <div className="row">
          <div className="col">
            <SendPortEditor
              templates={templates}
              onSubmit={handleSubmitClick}
              onCancel={handleCancelClick}
            />
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <SendPortList
            sps={sps}
            templates={templates}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default SendPortPanel;
