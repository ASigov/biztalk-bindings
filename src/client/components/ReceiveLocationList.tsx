import React from 'react';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationListProps {
  receiveLocations?: ReceiveLocation[];
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const { receiveLocations } = props;

  return (
    <ul className="list-group">
      {receiveLocations &&
        receiveLocations.map(
          (rl): JSX.Element => {
            return (
              <li className="list-group-item" key={rl.name}>
                <div className="row">
                  <div className="col overflow-hidden">
                    {rl.name}
                    <br />
                    <small className="text-muted">{rl.address}</small>
                  </div>
                  <div className="col-auto align-self-center">
                    <button className="btn btn-secondary mr-3" type="button">
                      Edit
                    </button>
                    <button className="btn btn-secondary" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          },
        )}
    </ul>
  );
};

export default ReceiveLocationList;
