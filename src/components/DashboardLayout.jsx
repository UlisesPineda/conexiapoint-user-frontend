import PropTypes from 'prop-types';
import { DashboardNavbar } from './';

export const DashboardLayout = ({ children }) => {
  return (
    <>
        <DashboardNavbar />
        { children }
    </>
  );
};

DashboardLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
