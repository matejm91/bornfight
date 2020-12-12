/* eslint-disable react/button-has-type */
import React from 'react';
import 'assets/style/_albumEntry.css';
import moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
  album: PropTypes.obj,
  releaseDate: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  artistId: PropTypes.string,
  favorite: PropTypes.string,
  isInArtistView: PropTypes.bool,
  onAddToFavorites: PropTypes.func,
  onRemoveFromFavorites: PropTypes.func,
};

const defaultProps = {
  album: {},
  releaseDate: '',
  imageUrl: '',
  price: '',
  title: '',
  artistId: '',
  favorite: '',
  isInArtistView: false,
  onAddToFavorites: () => {},
  onRemoveFromFavorites: () => {},
};

class AlbumItem extends React.Component {
  handleAddToFavorites = () => {
    const { onAddToFavorites, album } = this.props;

    onAddToFavorites(album.id);
  };

  handleRemoveFromFavorites = () => {
    const { onRemoveFromFavorites, album } = this.props;

    onRemoveFromFavorites(album.id);
  };

  render() {
    const { album, isInArtistView } = this.props;

    return (
      <div className="bornfight-albumItem__entry">
        <div className="bornfight-albumItem__entry-imgColumn">
          <img alt={album.title} src={album.imageUrl} />
        </div>
        <div className="bornfight-albumItem__entry-artistTitleColumn">
          <p className="bornfight-albumItem__entry-titleColumn">
            {album.title}
          </p>
          <p className="bornfight-albumItem__entry-artistColumn">
            {isInArtistView ? (
              album.artist.title
            ) : (
              <a href={`/artist/${album.artistId}`}>{album.artist.title}</a>
            )}
          </p>
        </div>
        <div className="bornfight-albumItem__entry-releasedColumn">
          Released: {moment(album.releaseDate).format('YYYY')}
        </div>
        <div className="bornfight-albumItem__entry-priceColumn">
          {album.price}
        </div>
        <div className="bornfight-albumItem__entry-favoriteColumn">
          {album.favorite ? (
            <button
              type="button"
              onClick={this.handleRemoveFromFavorites}
              className="bornfight-albumItem__entry-removeFavoriteButton"
            >
              Remove favorite
            </button>
          ) : (
            <button
              type="button"
              onClick={this.handleAddToFavorites}
              className="bornfight-albumItem__entry-favoriteButton"
            >
              Mark as favorite
            </button>
          )}
        </div>
      </div>
    );
  }
}

AlbumItem.propTypes = propTypes;
AlbumItem.defaultProps = defaultProps;

export default AlbumItem;
