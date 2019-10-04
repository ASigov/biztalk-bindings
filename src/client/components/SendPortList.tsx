import React from 'react';
import { SendPort } from '../../shared/model';
import SendPortListItem from './SendPortListItem';

interface SendPortListProps {
  sps?: SendPort[];
}

const SendPortList = (props: SendPortListProps): JSX.Element => {
  const { sps } = props;

  return (
    <ul className="list-group">
      {sps &&
        sps.map(
          (sp): JSX.Element => {
            return (
              <li className="list-group-item" key={sp.name}>
                <SendPortListItem sp={sp} />
              </li>
            );
          },
        )}
    </ul>
  );
};

export default SendPortList;
