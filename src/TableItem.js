import React from 'react';
import Button from './Button';

const largeColumn = {
width: '40%',
};
const midColumn = {
width: '30%',
};
const smallColumn = {
width: '10%',
};

const TableItem = ({item,onDismiss, onSelectedItem}) =>
<div key={item.objectID} className="table-row" onMouseOver={() => onSelectedItem(item)} onMouseOut={() => onSelectedItem(null)}>
  <span style={largeColumn}>
    <a href={item.url}>{item.title}</a>
    </span>
    <span style={midColumn}>{item.author}</span>
    <span style={smallColumn}>{item.num_comments}</span>
    <span style={smallColumn}>{item.points}</span>
    <span style={smallColumn}>
    <Button
    onClick={() => onDismiss(item.objectID)}
    className="buttom-inline"
    >
    Dismiss
    </Button>
  </span>
</div>

export default TableItem;
