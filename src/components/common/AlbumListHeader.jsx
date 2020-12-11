import React from 'react';
import '../../assets/style/_albumListHeader.css';
import AlbumListFilter from "../album/list/AlbumListFilter";
import PropTypes from 'prop-types';

const propTypes = {
  onFilterAlbums: PropTypes.func,
  suggestions: PropTypes.array,
};

class AlbumListHeader extends React.Component {
  render () {
    const {onFilterAlbums, suggestions} = this.props;

    return (
      <div className='bornfight-albumListHeader__header'>
        <p>Album List</p>
        <AlbumListFilter onFilterAlbums={onFilterAlbums} suggestions={suggestions}/>
      </div>
    );
  }
}

AlbumListHeader.propTypes = propTypes;

export default AlbumListHeader;