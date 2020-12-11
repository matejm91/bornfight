import React from 'react';
import 'src/assets/style/_albumEntry.css';
import moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
  album: PropTypes.object,
  releaseDate: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  artistId: PropTypes.string,
  favorite: PropTypes.string,
  isInArtistView: PropTypes.bool,
  handleAddToFavorites: PropTypes.func,
  handleRemoveFromFavorites: PropTypes.func,
};

const defaultProps= {

};

class AlbumItem extends React.Component {
  handleAddToFavorites = () => {
    this.props.onAddToFavorites(this.props.album.id);
  }

  handleRemoveFromFavorites = () => {
    this.props.onRemoveFromFavorites(this.props.album.id);
  }

  render() {
    const {album, isInArtistView} = this.props;

    return (
      <div className="bornfight-albumItem__entry">
        <div className="bornfight-albumItem__entry-imgColumn">
          <img alt={album.title} src={album.imageUrl} />
        </div>
        <div className="bornfight-albumItem__entry-artistTitleColumn">
          <p className="bornfight-albumItem__entry-titleColumn">{album.title}</p>
          <p className="bornfight-albumItem__entry-artistColumn">
            {
              isInArtistView ?
              album.artist.title :
              <a href={`/artist/${album.artistId}`}>{album.artist.title}</a>
            }
          </p>
        </div>
        <div className="bornfight-albumItem__entry-releasedColumn">
          Released: {moment(album.releaseDate).format('YYYY')}
        </div>
        <div className="bornfight-albumItem__entry-priceColumn">
          {album.price}
        </div>
        <div className="bornfight-albumItem__entry-favoriteColumn">
          {album.favorite ?
            <button onClick={this.handleRemoveFromFavorites} className="bornfight-albumItem__entry-removeFavoriteButton">Remove favorite</button> :
            <button onClick={this.handleAddToFavorites} className="bornfight-albumItem__entry-favoriteButton">Mark as favorite</button>
          }
        </div>
      </div>
    );
  }
};

AlbumItem.propTypes = propTypes;
AlbumItem.defaultProps = defaultProps;


export default AlbumItem;