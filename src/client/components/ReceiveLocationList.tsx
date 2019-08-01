import React from 'react';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationListProps {
  receiveLocations?: ReceiveLocation[];
  selectedReceiveLocations: ReceiveLocation[];
  onSelectionChanged: (selectedReceiveLocations: ReceiveLocation[]) => void;
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const {
    receiveLocations,
    selectedReceiveLocations,
    onSelectionChanged,
  } = props;

  const handleClick = (
    receiveLocation: ReceiveLocation,
    isSelected: boolean,
  ): void => {
    if (isSelected) {
      onSelectionChanged(
        selectedReceiveLocations.filter(
          (i): boolean => i.name !== receiveLocation.name,
        ),
      );
    } else {
      onSelectionChanged(selectedReceiveLocations.concat(receiveLocation));
    }
  };

  return (
    <div className="list-group">
      {receiveLocations &&
        receiveLocations.map(
          (receiveLocation): JSX.Element => {
            const isSelected = selectedReceiveLocations.includes(
              receiveLocation,
            );
            return (
              <button
                className={`list-group-item list-group-item-action${
                  isSelected ? ' active' : ''
                }`}
                type="button"
                key={receiveLocation.name}
                onClick={(): void => handleClick(receiveLocation, isSelected)}
              >
                {receiveLocation.name}
                <br />
                <small>
                  {receiveLocation.adapterName} - {receiveLocation.address}
                </small>
              </button>
            );
          },
        )}
    </div>
  );
};

export default ReceiveLocationList;
