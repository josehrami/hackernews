import React from 'react';
import './index.css';

const SelectedItem = ({
item
}) =>
<div className="table-right">
<span>{item.author}</span>
<span>{item.num_comments}</span>
<span>{item.points}</span>
</div>

export default SelectedItem;
