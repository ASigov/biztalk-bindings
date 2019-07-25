import React from 'react';
import { HasName } from '../../shared/bindings';

interface DropdownProps<T extends HasName> {
  items?: T[];
  selectedItem?: T;
  onSelectionChanged: (item: T) => void;
}

const Dropdown = <T extends HasName>(props: DropdownProps<T>): JSX.Element => {
  const { items, selectedItem, onSelectionChanged } = props;
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
        {selectedItem ? selectedItem.name : 'Select ...'}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {items &&
          items.map(
            (item): JSX.Element => (
              <button
                className="dropdown-item"
                type="button"
                key={item.name}
                onClick={(): void => onSelectionChanged(item)}
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
