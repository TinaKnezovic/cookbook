import React from 'react';

function ListItems(props) {
  const { items, deleteItem } = props;
  const listItems = items.map((item, i) => {
    return (
      <li key={i}>
        {item}{' '}
        <span>
          <button
            className="deleteButton"
            onClick={() => {
              deleteItem(item);
            }}
          >
            X
          </button>
        </span>
      </li>
    );
  });
  return <ul>{listItems}</ul>;
}

export default ListItems;
