import React from 'react';

const SortButtonsAndDownloadLink = ({ phoneNumbers, fileName, link, sortNumbers }) => (
  <div className="sort-div">
    <div className="sort-buttons">
      <span className="text-off-white">Sort</span>

      <button className="btn" onClick={() => sortNumbers(phoneNumbers, 'asc')}>
        <i className="fa fa-caret-up"></i>
      </button>

      <button className="btn" onClick={() => sortNumbers(phoneNumbers, 'desc')}>
        <i className="fa fa-caret-down"></i>
      </button>
    </div>
    
    <div className="download">
      <a href={link} download={fileName}>Download File</a>
    </div>
  </div>
);

export default SortButtonsAndDownloadLink;
