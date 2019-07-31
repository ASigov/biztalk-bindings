import React from 'react';
import { SendPort } from '../../shared/model';

interface SendPortListProps {
  sendPorts?: SendPort[];
  selectedSendPorts: SendPort[];
  onSelectionChanged: (selectedSendPorts: SendPort[]) => void;
}

const SendPortList = (props: SendPortListProps): JSX.Element => {
  const { sendPorts, selectedSendPorts, onSelectionChanged } = props;

  const handleClick = (sendPort: SendPort, isSelected: boolean): void => {
    if (isSelected) {
      onSelectionChanged(
        selectedSendPorts.filter((i): boolean => i.name !== sendPort.name),
      );
    } else {
      onSelectionChanged(selectedSendPorts.concat(sendPort));
    }
  };

  return (
    <div className="list-group">
      {sendPorts &&
        sendPorts.map(
          (sendPort): JSX.Element => {
            const isSelected = selectedSendPorts.includes(sendPort);
            return (
              <button
                className={`list-group-item list-group-item-action${
                  isSelected ? ' active' : ''
                }`}
                type="button"
                key={sendPort.name}
                onClick={(): void => handleClick(sendPort, isSelected)}
              >
                {sendPort.name}
              </button>
            );
          },
        )}
    </div>
  );
};

export default SendPortList;
