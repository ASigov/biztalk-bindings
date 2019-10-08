import React, { useState } from 'react';
import { ReceiveLocation } from '../../shared/model';
import { ReceiveLocationTemplate } from '../../shared/template';
import ReceiveLocationEditor from './ReceiveLocationEditor';
import ReceiveLocationList from './ReceiveLocationList';

interface ReceiveLocationPanelProps {
  rls: ReceiveLocation[];
  templates: ReceiveLocationTemplate[];
  onAdd: (rl: ReceiveLocation, rp: string) => void;
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationPanel = (
  props: ReceiveLocationPanelProps,
): JSX.Element => {
  const { rls, templates, onAdd, onDelete } = props;

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

  const handleAddClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  const handleSubmitClick = (rl: ReceiveLocation, rp: string): void => {
    setEditorVisible(!editorVisible);
    onAdd(rl, rp);
  };

  const handleCancelClick = (): void => {
    setEditorVisible(!editorVisible);
  };

  return (
    <>
      <div className="row  mt-3">
        <div className="col-auto">
          <h4>
            Receive Locations
            <span className="badge badge-secondary ml-2">{rls.length}</span>
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
            <ReceiveLocationEditor
              templates={templates}
              onSubmit={handleSubmitClick}
              onCancel={handleCancelClick}
            />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          <ReceiveLocationList rls={rls} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
};

export default ReceiveLocationPanel;
