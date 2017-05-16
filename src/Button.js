import React, {PropTypes} from 'react';

const Button = ({onClick,className = '',children}) =>
{
  return(
    <button
      onClick={onClick}
      className={className}
      type="button">
      {children}
    </button>
  )
}

// Button.propTypes = {
// onClick: PropTypes.func.isRequired,
// className: PropTypes.string,
// children: PropTypes.node.isRequired,
// };

export default Button;
