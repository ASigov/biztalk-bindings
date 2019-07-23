import React from 'react';
import { HasName } from '../../shared/bindings';

interface DropdownProps<T extends HasName> {
  Items: T[];
  SelectedItem: T;
  OnSelectionChanged: (item: T) => void;
}

const Dropdown = <T extends HasName>(props: DropdownProps<T>): JSX.Element => {
  const { Items, SelectedItem, OnSelectionChanged } = props;
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {SelectedItem.name}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {Items.map(
          (item): JSX.Element => (
            <button
              className="dropdown-item"
              type="button"
              key={item.name}
              onClick={(): void => OnSelectionChanged(item)}
            >
              {item.name}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Dropdown;
