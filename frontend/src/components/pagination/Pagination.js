import "./pagination.css";
import { Link } from "react-router-dom";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <Link to="#" key={number} onClick={() => paginate(number)}>
          {number}
        </Link>
      ))}
      <span className="count">of {totalProducts}</span>
    </div>
  );
};

export default Pagination;
