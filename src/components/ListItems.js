import React from 'react';

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="list">
        <p>
          <input
            type="text"
            value={item}
            onChange={(e) => {
              props.setUpdate(e.target.value);
            }}
          />
          <span>
            <button
              className="deleteButton"
              onClick={() => {
                props.deleteItem(item);
              }}
            >
              X
            </button>
          </span>
        </p>
      </div>
    );
  });
  return <div>{listItems}</div>;
}

export default ListItems;
