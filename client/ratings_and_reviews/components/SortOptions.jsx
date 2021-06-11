import React from 'react';

function SortOptions(props) {
  return (
  <select className="sortingOptions">
    <option value="newest">newest</option>
    <option value="relevance">relevance</option>
    <option value="helpful">helpful</option>
  </select>
  )
}

export default SortOptions;