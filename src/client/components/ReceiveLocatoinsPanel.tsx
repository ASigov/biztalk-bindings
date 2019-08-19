import React from 'react';
import ReceiveLocationList from './ReceiveLocationList';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationsPanelProps {
  rls?: ReceiveLocation[];
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationsPanel = (
  props: ReceiveLocationsPanelProps,
): JSX.Element => {
  const { rls, onDelete } = props;

  const count = rls ? rls.length : 0;

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>
            Receive Locations
            <span className="badge badge-secondary ml-2">{count}</span>
          </h4>
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

export default ReceiveLocationsPanel;
