import React from 'react';
import ReceiveLocationList from './ReceiveLocationList';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationsPanelProps {
  receiveLocations?: ReceiveLocation[];
}

const ReceiveLocationsPanel = (
  props: ReceiveLocationsPanelProps,
): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <div className="row">
            <div className="col">
              <h4>Receive Locations</h4>
            </div>
            <div className="col-auto">
              <button className="btn btn-secondary" type="button">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ReceiveLocationList {...props} />
        </div>
      </div>
    </>
  );
};

export default ReceiveLocationsPanel;
