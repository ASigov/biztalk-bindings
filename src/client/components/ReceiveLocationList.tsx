import React from 'react';
import { ReceiveLocation } from '../../shared/model';
import ReceiveLocationListItem from './ReceiveLocationListItem';

interface ReceiveLocationListProps {
  rls: ReceiveLocation[];
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const { rls, onDelete } = props;

  return (
    <ul className="list-group">
      {rls.map(
        (rl): JSX.Element => (
          <li className="list-group-item" key={rl.name}>
            <ReceiveLocationListItem rl={rl} onDelete={onDelete} />
          </li>
        ),
      )}
    </ul>
  );
};

export default ReceiveLocationList;
