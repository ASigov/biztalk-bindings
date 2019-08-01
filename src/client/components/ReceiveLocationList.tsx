import React from 'react';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationListProps {
  receiveLocations?: ReceiveLocation[];
  selectedReceiveLocations: ReceiveLocation[];
  onSelectionChanged: (selectedReceiveLocations: ReceiveLocation[]) => void;
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const { receiveLocations, selectedReceiveLocations } = props;

  return (
    <div className="list-group">
      {receiveLocations &&
        receiveLocations.map(
          (rl, id): JSX.Element => {
            const isSelected = selectedReceiveLocations.includes(rl);
            return (
              <>
                <button
                  className={`list-group-item list-group-item-action${
                    isSelected ? ' active' : ''
                  }`}
                  type="button"
                  key={rl.name}
                  data-toggle="collapse"
                  data-target={`#rl-details-${id}`}
                  aria-expanded="false"
                  aria-controls={`rl-details-${id}`}
                >
                  {rl.name}
                  <br />
                  <small>
                    {rl.adapterName} - {rl.address}
                  </small>
                </button>
                <div className="collapse" id={`rl-details-${id}`}>
                  <div className="card card-body">
                    <pre>{JSON.stringify(rl.adapterConfig, null, 2)}</pre>
                  </div>
                </div>
              </>
            );
          },
        )}
    </div>
  );
};

export default ReceiveLocationList;
