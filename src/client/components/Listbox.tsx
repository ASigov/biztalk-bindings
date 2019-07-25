import React from 'react';
import { HasName } from '../../shared/bindings';

interface ListboxProps<T extends HasName> {
  items?: T[];
  selectedItems: T[];
  onSelectionChanged: (selectedItems: T[]) => void;
}

const Listbox = <T extends HasName>(props: ListboxProps<T>): JSX.Element => {
  const { items, selectedItems, onSelectionChanged } = props;

  const handleClick = (item: T, isSelected: boolean): void => {
    if (isSelected) {
      onSelectionChanged(
        selectedItems.filter((i): boolean => i.name !== item.name),
      );
    } else {
      onSelectionChanged(selectedItems.concat(item));
    }
  };

  return (
    <div className="list-group">
      {items &&
        items.map(
          (item): JSX.Element => {
            const isSelected = selectedItems.includes(item);
            return (
              <button
                className={`list-group-item list-group-item-action${
                  isSelected ? ' active' : ''
                }`}
                type="button"
                key={item.name}
                onClick={(): void => handleClick(item, isSelected)}
              >
                {item.name}
              </button>
            );
          },
        )}
    </div>
  );
};

export default Listbox;
