import React from 'react';
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

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>
            Receive Locations
            <span className="badge badge-secondary ml-2">{rls.length}</span>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ReceiveLocationEditor templates={templates} onAdd={onAdd} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ReceiveLocationList rls={rls} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
};

export default ReceiveLocationPanel;
