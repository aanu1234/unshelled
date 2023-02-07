import "./home.css";
import * as api from "../../api";
import { useState, useEffect, useReducer } from "react";

// components
import Backdrop from "../../components/backdrop";
import Navbar from "../../components/navbar/Navbar";
import OrderTable from "../../components/table/OrderTable";
import Pagination from "../../components/pagination/Pagination";

// reducers
import OrderReducer, { initalState } from "../../reducers";
import { FETCH_ALL, VIEW_ORDER } from "../../reducers/constants";
import ProductView from "../modal/ProductView";

// ------------------------------------------------------

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispatch] = useReducer(OrderReducer, initalState);
  const [open, setOpen] = useState(false);

  const handleProductView = (e, product) => {
    e.preventDefault();
    dispatch({ type: VIEW_ORDER, payload: product });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.getOrderItems();
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { products, productsPerPage, totalProducts } = state;

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Backdrop loading />;

  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Order Items</div>
          <OrderTable
            products={currentProducts}
            loading={loading}
            viewProduct={handleProductView}
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalProducts}
            paginate={handlePaginate}
          />
        </div>
      </div>
      <ProductView
        open={open}
        handleClose={handleClose}
        product={state.product}
      />
    </div>
  );
};

export default Home;
