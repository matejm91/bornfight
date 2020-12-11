import React from 'react';
import PropTypes from 'prop-types';
import 'src/assets/style/_albumListHeader.css';
import AlbumListFilter from "src/components/album/list/AlbumListFilter";

const propTypes = {
  onFilterInputChange: PropTypes.func,
  onFilterSubmit: PropTypes.func,
  suggestions: PropTypes.array,
};

class AlbumListHeader extends React.Component {
  render () {
    const {onFilterInputChange, onFilterSubmit, suggestions} = this.props;

    return (
      <div className='bornfight-albumListHeader__header'>
        <p>Album List</p>
        <AlbumListFilter onFilterInputChange={onFilterInputChange} onFilterSubmit={onFilterSubmit} suggestions={suggestions}/>
      </div>
    );
  }
}

AlbumListHeader.propTypes = propTypes;

export default AlbumListHeader;