import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from 'components/album/view/AlbumItem';
import ArtistAlbumListHeader from 'components/common/ArtistAlbumListHeader';
import AlbumListHeader from 'components/common/AlbumListHeader';

const propTypes = {
  artistId: PropTypes.string,
};

const defaultProps = {
  artistId: '',
};

class AlbumListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumList: [],
      limit: 10,
      artistTitle: '',
      suggestions: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.artistId) {
      this.fetchArtistsAlbumList(match.params.artistId);
    } else {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (
      prevProps.match.params.artistId !== match.params.artistId &&
      match.params.artistId
    ) {
      this.fetchArtistsAlbumList(match.params.artistId);

      this.resetSuggestionsState();
    }

    if (
      prevProps.match.params.artistId !== match.params.artistId &&
      !match.params.artistId
    ) {
      this.fetchData();

      this.resetSuggestionsState();
    }
  }

  fetchData = () => {
    const { limit } = this.state;

    fetch(`http://localhost:3004/albums?_limit=${limit}`)
      .then((res) => res.json())
      .then(
        (albums) => {
          fetch('http://localhost:3004/artists')
            .then((res) => res.json())
            .then((artists) => {
              const alteredAlbums = albums.map((album) => {
                const alteredAlbum = { ...album };
                alteredAlbum.artist = artists.find(
                  (artist) => artist.id === album.artistId
                );
                return alteredAlbum;
              });

              this.setState({ albumList: alteredAlbums });
            });
        },
        (error) => error
      );
  };

  fetchArtistsAlbumList = (artistId) => {
    const { limit } = this.state;

    fetch(
      `http://localhost:3004/albums/?artistId=${parseInt(
        artistId,
        10
      )}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then(
        (albums) => {
          fetch('http://localhost:3004/artists')
            .then((res) => res.json())
            .then((artists) => {
              const alteredAlbums = albums.map((album) => {
                const alteredAlbum = { ...album };
                alteredAlbum.artist = artists.find(
                  (artist) => artist.id === album.artistId
                );
                return alteredAlbum;
              });

              this.setState({
                artistTitle: alteredAlbums[0].artist.title,
                albumList: alteredAlbums,
              });
            });
        },
        (error) => error
      );
  };

  fetchFilteredAlbumList = (filterValue) => {
    const { limit } = this.state;

    fetch(`http://localhost:3004/albums/?q=${filterValue}&_limit=${limit}`)
      .then((res) => res.json())
      .then(
        (albums) => {
          fetch('http://localhost:3004/artists')
            .then((res) => res.json())
            .then((artists) => {
              const alteredAlbums = albums.map((album) => {
                const alteredAlbum = { ...album };
                alteredAlbum.artist = artists.find(
                  (artist) => artist.id === album.artistId
                );
                return alteredAlbum;
              });

              this.setState({ albumList: alteredAlbums });
            });
        },
        (error) => error
      );
  };

  handleAddToFavorites = (albumId) => {
    const { albumList } = this.state;
    const { match } = this.props;

    const albumToEdit = albumList.filter((album) => album.id === albumId)[0];

    albumToEdit.favorite = true;

    delete albumToEdit.artist;

    return fetch(`http://localhost:3004/albums/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(albumToEdit),
    })
      .then((res) => {
        this.fetchData(match.params.artistId);
        return res.json();
      })
      .catch((err) => err);
  };

  handleRemoveFromFavorites = (albumId) => {
    const { albumList } = this.state;
    const { match } = this.props;

    const albumToEdit = albumList.filter((album) => album.id === albumId)[0];

    albumToEdit.favorite = false;

    return fetch(`http://localhost:3004/albums/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(albumToEdit),
    })
      .then((res) => {
        this.fetchData(match.params.artistId);
        return res.json();
      })
      .catch((err) => err);
  };

  handleFilterInputChange = (searchInput) => {
    const { albumList } = this.state;

    if (searchInput.trim() === '') {
      this.setState({ suggestions: [] });
    } else {
      const suggestionAlbumTitles = albumList.filter((album) =>
        album.title.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      this.setState({ suggestions: suggestionAlbumTitles });
    }
  };

  handleFilterSubmit = (filterValue) => {
    this.fetchFilteredAlbumList(filterValue);
  };

  resetSuggestionsState = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { artistTitle, suggestions, albumList } = this.state;
    const { match } = this.props;

    return (
      <>
        {match.params.artistId ? (
          <ArtistAlbumListHeader artistTitle={artistTitle} />
        ) : (
          <AlbumListHeader
            onFilterInputChange={this.handleFilterInputChange}
            onFilterSubmit={this.handleFilterSubmit}
            suggestions={suggestions}
          />
        )}
        {albumList.length > 0 &&
          albumList.map((album) => (
            <AlbumItem
              album={album}
              key={album.id}
              onAddToFavorites={this.handleAddToFavorites}
              onRemoveFromFavorites={this.handleRemoveFromFavorites}
              isInArtistView={!!match.params.artistId}
            />
          ))}
      </>
    );
  }
}

AlbumListContainer.defaultProps = defaultProps;
AlbumListContainer.propTypes = propTypes;

export default AlbumListContainer;
