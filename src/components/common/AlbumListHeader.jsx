import React from 'react';
import PropTypes from 'prop-types';
import AlbumListFilter from 'components/album/list/AlbumListFilter';
import 'assets/style/_albumListHeader.css';

const propTypes = {
  onFilterInputChange: PropTypes.func,
  onFilterSubmit: PropTypes.func,
  suggestions: PropTypes.arr,
};

const defaultProps = {
  onFilterInputChange: () => {},
  onFilterSubmit: () => {},
  suggestions: [],
};

function AlbumListHeader(props) {
  const { onFilterInputChange, onFilterSubmit, suggestions } = props;

  return (
    <div className="bornfight-albumListHeader__header">
      <p>Album List</p>
      <AlbumListFilter
        onFilterInputChange={onFilterInputChange}
        onFilterSubmit={onFilterSubmit}
        suggestions={suggestions}
      />
    </div>
  );
}

AlbumListHeader.propTypes = propTypes;
AlbumListHeader.defaultProps = defaultProps;

export default AlbumListHeader;
