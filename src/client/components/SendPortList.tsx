import React from 'react';
import { SendPort } from '../../shared/model';
import { SendPortTemplate } from '../../shared/template';
import SendPortListItem from './SendPortListItem';

interface SendPortListProps {
  sps: SendPort[];
  templates: SendPortTemplate[];
  onEdit: (sp: SendPort, spIndex: number) => void;
  onDelete: (sp: SendPort) => void;
}

const SendPortList = (props: SendPortListProps): JSX.Element => {
  const { sps, templates, onEdit, onDelete } = props;

  return (
    <ul className="list-group">
      {sps.map(
        (sp, spIndex): JSX.Element => (
          <li className="list-group-item" key={sp.name}>
            <SendPortListItem
              sp={sp}
              spIndex={spIndex}
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

export default SendPortList;
