import React, { useState } from 'react';
import { ReceiveLocation } from '../../shared/model';
import ReceiveLocationEditor from './ReceiveLocationEditor';
import { ReceiveLocationTemplate } from '../../shared/template';

interface ReceiveLocationListItemProps {
  rl: ReceiveLocation;
  rlIndex: number;
  templates: ReceiveLocationTemplate[];
  onEdit: (rl: ReceiveLocation, rlIndex: number, rp: string) => void;
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationListItem = (
  props: ReceiveLocationListItemProps,
): JSX.Element => {
  const { rl, rlIndex, templates, onEdit, onDelete } = props;

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  const handleEditClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  const handleDeleteClick = (): void => {
    onDelete(rl);
  };

  const handleSubmit = (newRL: ReceiveLocation, rp: string): void => {
    onEdit(newRL, rlIndex, rp);
  };

  const handleCancel = (): void => {
    setEditorVisible(!editorVisible);
  };

  return (
    <>
      <div className="row">
        <div className="col overflow-hidden">
          {rl.name}
          <br />
          <small className="text-muted">{rl.address}</small>
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
        <ReceiveLocationEditor
          initialRL={rl}
          templates={templates}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ReceiveLocationListItem;
