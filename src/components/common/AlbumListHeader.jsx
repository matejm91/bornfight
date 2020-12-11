import React from 'react';
import PropTypes from 'prop-types';
import 'src/assets/style/_albumListHeader.css';
import AlbumListFilter from "src/components/album/list/AlbumListFilter";

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