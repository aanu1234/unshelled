import PropTypes from "prop-types";

const Header = ({ title }) => {
  return (
    <header className="header text-center mt-2">
      <h4>{title}</h4>
    </header>
  );
};

Header.defaultProps = {
  title: "Order Items",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
