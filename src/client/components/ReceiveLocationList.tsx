import React from 'react';
import { ReceiveLocation } from '../../shared/model';
import ReceiveLocationListItem from './ReceiveLocationListItem';

interface ReceiveLocationListProps {
  rls?: ReceiveLocation[];
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const { rls } = props;

  return (
    <ul className="list-group">
      {rls &&
        rls.map(
          (rl): JSX.Element => {
            return (
              <li className="list-group-item" key={rl.name}>
                <ReceiveLocationListItem rl={rl} />
              </li>
            );
          },
        )}
    </ul>
  );
};

export default ReceiveLocationList;
