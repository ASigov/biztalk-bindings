import React, { useState } from 'react';
import { SendPort } from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import SendPortEditor from './SendPortEditor';

interface SendPortListItemProps {
  sp: SendPort;
  spIndex: number;
  templates: SendPortTemplate[];
  onEdit: (sp: SendPort, spIndex: number) => void;
  onDelete: (sp: SendPort) => void;
}

const SendPortListItem = (props: SendPortListItemProps): JSX.Element => {
  const { sp, spIndex, templates, onEdit, onDelete } = props;

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  const handleEditClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  const handleDeleteClick = (): void => {
    onDelete(sp);
  };

  const handleSubmit = (updatedSP: SendPort): void => {
    onEdit(updatedSP, spIndex);
  };

  const handleCancel = (): void => {
    setEditorVisible(!editorVisible);
  };

  return (
    <>
      <div className="row">
        <div className="col overflow-hidden">
          {sp.name}
          <br />
          <small className="text-muted">{sp.address}</small>
        </div>
        <div className="col-auto align-self-center">
          <div className="btn-group" role="group">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {editorVisible && (
        <SendPortEditor
          initialSP={sp}
          templates={templates}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default SendPortListItem;
