import React from 'react';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationListItemProps {
  rl: ReceiveLocation;
  onDelete: (rl: ReceiveLocation) => void;
}

const ReceiveLocationListItem = (
  props: ReceiveLocationListItemProps,
): JSX.Element => {
  const { rl, onDelete } = props;

  const handleDeleteClick = (): void => {
    onDelete(rl);
  };

  return (
    <div className="row">
      <div className="col overflow-hidden">
        {rl.name}
        <br />
        <small className="text-muted">{rl.address}</small>
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

export default ReceiveLocationListItem;
