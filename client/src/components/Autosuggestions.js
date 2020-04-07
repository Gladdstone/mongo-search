import React from 'react';

const Autosuggestions = props => {
  const options = props.results.map(r => (
    <li>
      {r._source.site_name}
    </li>
  ));
  return <ul>{options}</ul>;
};

export default Autosuggestions;
