import React from 'react';
import { HasName } from '../../shared/bindings';

interface ListboxProps<T extends HasName> {
  Items: T[];
  SelectedItems: T[];
  OnSelectionChanged: (selectedItems: T[]) => void;
}

const Listbox = <T extends HasName>(props: ListboxProps<T>): JSX.Element => {
  const { Items, SelectedItems, OnSelectionChanged } = props;

  const handleClick = (item: T, isSelected: boolean): void => {
    if (isSelected) {
      OnSelectionChanged(
        SelectedItems.filter((i): boolean => i.name !== item.name),
      );
    } else {
      OnSelectionChanged(SelectedItems.concat(item));
    }
  };

  return (
    <div className="list-group">
      {Items.map(
        (item): JSX.Element => {
          const isSelected = SelectedItems.includes(item);
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
