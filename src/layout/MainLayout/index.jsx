import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MainLayout = ({ children }) => (
  <>
    {children}
  </>
);

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
