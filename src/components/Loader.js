import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <>
    <h2 style={{ textAlign: 'center' }}>Loading content</h2>
    <ContentLoader
      speed={3}
      width={400}
      height={150}
      viewBox='0 0 500 150'
      backgroundColor='#12161b'
      foregroundColor='#4d5d71'
      style={{ width: '100%' }}
      {...props}
    >
      <rect x='25' y='15' rx='5' ry='5' width='400' height='10' />
      <rect x='25' y='55' rx='5' ry='5' width='400' height='10' />
      <rect x='25' y='95' rx='5' ry='5' width='400' height='10' />
      <rect x='25' y='135' rx='5' ry='5' width='400' height='10' />
    </ContentLoader>
  </>
);

export default Loader;
