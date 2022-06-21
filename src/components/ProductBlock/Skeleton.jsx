import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    className="product-block"
    speed={3}
    width={280}
    height={422}
    viewBox="0 0 280 422"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="494" y="487" rx="6" ry="6" width="145" height="20" />
    <rect x="0" y="429" rx="6" ry="6" width="508" height="18" />
    <rect x="0" y="461" rx="6" ry="6" width="584" height="18" />
    <rect x="0" y="519" rx="6" ry="6" width="584" height="18" />
    <rect x="0" y="551" rx="6" ry="6" width="555" height="18" />
    <rect x="0" y="583" rx="6" ry="6" width="508" height="18" />
    <rect x="0" y="615" rx="6" ry="6" width="584" height="18" />
    <rect x="0" y="673" rx="6" ry="6" width="584" height="18" />
    <rect x="0" y="705" rx="6" ry="6" width="555" height="18" />
    <rect x="0" y="737" rx="6" ry="6" width="508" height="18" />
    <rect x="0" y="769" rx="6" ry="6" width="584" height="18" />
    <rect x="133" y="293" rx="0" ry="0" width="1" height="2" />
    <circle cx="583" cy="365" r="260" />
    <rect x="60" y="10" rx="0" ry="0" width="160" height="200" />
    <rect x="0" y="237" rx="0" ry="0" width="280" height="43" />
    <rect x="0" y="300" rx="0" ry="0" width="280" height="39" />
    <rect x="0" y="366" rx="0" ry="0" width="80" height="45" />
    <rect x="150" y="366" rx="0" ry="0" width="130" height="45" />
  </ContentLoader>
);

export default Skeleton;
