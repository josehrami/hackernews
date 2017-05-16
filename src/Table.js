import React, {PropTypes} from 'react';
import TableItem from './TableItem';

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
const Table = ({ list, onDismiss, onSelectedItem }) =>
<div className="table">
  { list.map(item =>
    <TableItem item={item} onDismiss={onDismiss} onSelectedItem={onSelectedItem}/>
  )}
</div>

Table.propTypes = {
list: PropTypes.arrayOf(
PropTypes.shape({
objectID: PropTypes.string.isRequired,
author: PropTypes.string,
url: PropTypes.string,
num_comments: PropTypes.number,
points: PropTypes.number,
})
).isRequired,
onDismiss: PropTypes.func.isRequired,
};

export default Table;
