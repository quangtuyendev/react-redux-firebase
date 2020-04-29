import PropTypes from 'prop-types';
import React from 'react';

import { CarouselProvider } from '../../../../commons/CarouselProvider/CarouselProvider';
import { threeSidePerRowSettings } from '../../../../constants/carousel';

PostList.propTypes = {
  children: PropTypes.element.isRequired,
};

export const PostList = ({ children }) => {
  return (
    <section id="section-post-related">
      <div className="row">
        <h2 className="heading-title--main--medium u-center-text  u-margin-bottom-medium">
          You may also like
        </h2>
      </div>
      <div className="row">
        <CarouselProvider settings={threeSidePerRowSettings}>
          {children}
        </CarouselProvider>
      </div>
    </section>
  );
};
