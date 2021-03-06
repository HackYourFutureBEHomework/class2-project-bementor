import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/page-container.css';

const PageContainer = (props) => {
  const classes = props.className;
  return (
    <div className={`page-container ${classes}`}>
      {props.children}
    </div>
  );
};

PageContainer.defaultProps = {
  className: '',
  children: <p />
};

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default PageContainer;
