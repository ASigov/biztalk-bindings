import React from 'react';
import { SendPort } from '../../shared/model';

interface SendPortListProps {
  sendPorts?: SendPort[];
  selectedSendPorts: SendPort[];
  onSelectionChanged: (selectedSendPorts: SendPort[]) => void;
}

const SendPortList = (props: SendPortListProps): JSX.Element => {
  const { sendPorts, selectedSendPorts } = props;

  return (
    <div className="list-group">
      {sendPorts &&
        sendPorts.map(
          (sp, id): JSX.Element => {
            const isSelected = selectedSendPorts.includes(sp);
            return (
              <>
                <button
                  className={`list-group-item list-group-item-action${
                    isSelected ? ' active' : ''
                  }`}
                  type="button"
                  key={sp.name}
                  data-toggle="collapse"
                  data-target={`#sp-details-${id}`}
                  aria-expanded="false"
                  aria-controls={`sp-details-${id}`}
                >
                  {sp.name}
                  <br />
                  <small>
                    {sp.adapterName} - {sp.address}
                  </small>
                </button>
                <div className="collapse" id={`sp-details-${id}`}>
                  <div className="card card-body">
                    <pre>{JSON.stringify(sp.adapterConfig, null, 2)}</pre>
                  </div>
                </div>
              </>
            );
          },
        )}
    </div>
  );
};

export default SendPortList;
