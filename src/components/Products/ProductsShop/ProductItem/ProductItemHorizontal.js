import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from 'slug';

import * as actions from '../../../../actions';
import { TIMER_VALUES } from '../../../../constants';
import { formatter, renderRating } from '../../../../utils';
import ProductView from '../../../ProductView/ProductView';
import CartSideBar from '../../../Sidebars/CartSideBar/CartSideBar';

ProductItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  subTitle: PropTypes.string,
  rating: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  sizes: PropTypes.array,
  category: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
  addToWishList: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

ProductItem.defaultProps = {
  id: '',
  title: '',
  price: 0,
  images: [],
  subTitle: '',
  rating: 0,
  sizes: [],
  category: '',
};

const ProductItem = ({
  id,
  title,
  images,
  subTitle,
  price,
  rating,
  showModal,
  sizes,
  category,
  addToCart,
  addToWishList,
  hideModal,
  toggleLoading,
}) => {
  const handleAddToWishList = () => {
    toggleLoading(TIMER_VALUES.main, () => {
      addToWishList({ id, title, price, images, category });
    });
  };

  const handleAddToCart = product => {
    toggleLoading(TIMER_VALUES.main, () => {
      addToCart(product);
      showModal(<CartSideBar />);
    });
  };

  return (
    <div className="col u-width-full">
      <div className="product u-d-flex-center">
        <div className="product__box-image">
          <Link to={`/product/${slug(title.toLowerCase())}.${id}`}>
            <img
              className="product__img u-width-full"
              src={images[0]}
              alt={title}
            />
          </Link>
          <i onClick={handleAddToWishList} className="far fa-heart u-suggest" />
        </div>
        <div className="product__details">
          <span className="product__heading">{subTitle}</span>
          <Link
            to={`/product/${slug(title.toLowerCase())}.${id}`}
            className="product__title product__title--small"
          >
            {title}
          </Link>
          <div className="u-d-flex-center">
            <span className="product__price">{formatter.format(price)}</span>
            <div className="product__rating">{renderRating(rating)}</div>
          </div>
          <div className="product__hidden">
            <button
              type="button"
              onClick={() =>
                handleAddToCart({
                  id,
                  title,
                  price,
                  images,
                  category,
                  subTitle,
                })
              }
              className="btn btn--small btn--secondary"
            >
              <i className="fas fa-cart-plus" />
              Add to cart
            </button>
            <button
              type="button"
              onClick={() =>
                showModal(
                  <ProductView
                    hideModal={hideModal}
                    productCurrent={{
                      id,
                      images,
                      price,
                      rating,
                      sizes,
                      title,
                      category,
                    }}
                    modal
                  />,
                )
              }
              className="btn btn--small btn--link"
            >
              <i className="far fa-eye" />
              Quick view
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions)(ProductItem);
