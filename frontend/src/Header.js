import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
};

function Header(props) {
  const { title } = props;

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

Header.propTypes = propTypes;
export default Header;
