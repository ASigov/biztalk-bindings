import React from 'react';
import { ReceiveLocation } from '../../shared/model';

interface ReceiveLocationListItemProps {
  rl: ReceiveLocation;
}

const ReceiveLocationListItem = (
  props: ReceiveLocationListItemProps,
): JSX.Element => {
  const { rl } = props;

  const handleDeleteClick = (): void => {
    alert('todo');
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
