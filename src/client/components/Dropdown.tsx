import React from 'react';

interface DropdownProps<T> {
  id: string;
  items?: T[];
  selectedItem?: T;
  onSelect: (item: T) => void;
  format: (item: T) => string;
}

const Dropdown = <T extends {}>(props: DropdownProps<T>): JSX.Element => {
  const { id, items, selectedItem, onSelect, format } = props;

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedItem ? format(selectedItem) : 'Select ...'}
      </button>
      <div className="dropdown-menu" aria-labelledby={id}>
        {items &&
          items.map(
            (item): JSX.Element => (
              <button
                className="dropdown-item"
                type="button"
                key={format(item)}
                onClick={(): void => onSelect(item)}
              >
                {format(item)}
              </button>
            ),
          )}
      </div>
    </div>
  );
};

export default Dropdown;
