import React from 'react';
import { SendPort } from '../../shared/model';

interface SendPortListProps {
  sendPorts?: SendPort[];
}

const SendPortList = (props: SendPortListProps): JSX.Element => {
  const { sendPorts } = props;

  return (
    <ul className="list-group">
      {sendPorts &&
        sendPorts.map(
          (sp): JSX.Element => {
            return (
              <li className="list-group-item" key={sp.name}>
                {sp.name}
                <br />
                <small className="text-muted">{sp.address}</small>
              </li>
            );
          },
        )}
    </ul>
  );
};

export default SendPortList;
