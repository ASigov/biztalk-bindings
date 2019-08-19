import React from 'react';
import { SendPort } from '../../shared/model';

interface SendPortListItemProps {
  sp: SendPort;
  onDelete: (sp: SendPort) => void;
}

const SendPortListItem = (props: SendPortListItemProps): JSX.Element => {
  const { sp, onDelete } = props;

  const handleDeleteClick = (): void => {
    onDelete(sp);
  };

  return (
    <div className="row">
      <div className="col overflow-hidden">
        {sp.name}
        <br />
        <small className="text-muted">{sp.address}</small>
      </div>
      <div className="col-auto align-self-center">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SendPortListItem;
