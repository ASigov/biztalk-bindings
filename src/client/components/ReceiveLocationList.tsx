import React from 'react';
import { ReceiveLocation } from '../../shared/model';
import { ReceiveLocationTemplate } from '../../shared/template';
import ReceiveLocationListItem from './ReceiveLocationListItem';

interface ReceiveLocationListProps {
  rls: ReceiveLocation[];
  templates: ReceiveLocationTemplate[];
  onEdit: (rl: ReceiveLocation, rlIndex: number, rp: string) => void;
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationList = (props: ReceiveLocationListProps): JSX.Element => {
  const { rls, templates, onEdit, onDelete } = props;

  return (
    <ul className="list-group">
      {rls.map(
        (rl, rlIndex): JSX.Element => (
          <li className="list-group-item" key={rl.name}>
            <ReceiveLocationListItem
              rl={rl}
              rlIndex={rlIndex}
              templates={templates}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ),
      )}
    </ul>
  );
};

export default ReceiveLocationList;
