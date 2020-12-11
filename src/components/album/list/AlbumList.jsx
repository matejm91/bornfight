import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from '../view/AlbumItem';
import ArtistAlbumListHeader from "../../common/ArtistAlbumListHeader";
import AlbumListHeader from "../../common/AlbumListHeader";

const propTypes = {
  fetchData: PropTypes.func,
  artistId: PropTypes.string,
};

const defaultProps = {
  fetchData: () => {}
};

class AlbumList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumList: [],
      limit: 10,
      artistTitle: '',
      suggestions: [],
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.artistId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.artistId !== this.props.match.params.artistId) {
      this.fetchData(this.props.match.params.artistId);

      this.setState({ suggestions: [] });
    }
  }

  fetchData = (artistId) => {
    fetch(`http://localhost:3004/albums?_limit=${this.state.limit}`)
      .then(res => res.json())
      .then(
        albums => {
          fetch('http://localhost:3004/artists')
            .then(res => res.json())
            .then(artists => {
              let alteredAlbums;
              if (artistId) {
                alteredAlbums = albums.filter(album => {
                  if (album.artistId.toString() === artistId) {
                    album.artist = artists.find(artist => artist.id === album.artistId);
                    return album;
                  }
                });

                this.setState({
                  artistTitle: alteredAlbums[0].artist.title,
                });
              } else {
                alteredAlbums = albums.map(album => {
                  album.artist = artists.find(artist => artist.id === album.artistId);
                  return album;
                });
              }
              this.setState({albumList: alteredAlbums});
            });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  handleAddToFavorites = (albumId) => {
    let albumToEdit = this.state.albumList.filter(album => album.id === albumId)[0];

    albumToEdit.favorite = true;

    return fetch(`http://localhost:3004/albums/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(albumToEdit)
    })
      .then(res => {
        this.fetchData(this.props.match.params.artistId);
        return res.json()
      })
      .catch(err => err);
  }

  handleRemoveFromFavorites = (albumId) => {
    let albumToEdit = this.state.albumList.filter(album => album.id === albumId)[0];

    albumToEdit.favorite = false;

    return fetch(`http://localhost:3004/albums/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(albumToEdit)
    })
      .then(res => {
        this.fetchData(this.props.match.params.artistId);
        return res.json()
      })
      .catch(err => err);
  }

  handleFilterAlbums = (searchInput) => {
    if (searchInput.trim() === '') {
      this.setState({ suggestions: [] });
    } else {
      const suggestionAlbumTitles = this.state.albumList.filter(album => album.title.toLowerCase().startsWith(searchInput.toLowerCase()));
      this.setState({ suggestions: suggestionAlbumTitles });
    }
  }


  render() {
    const {artistTitle, suggestions, albumList} = this.state;
    const {artistId} = this.props.match.params;

    return (
      <React.Fragment>
        {artistId ?
          <ArtistAlbumListHeader artistTitle={artistTitle} /> :
          <AlbumListHeader onFilterAlbums={this.handleFilterAlbums} suggestions={suggestions}/>
        }
        {albumList.length &&
        albumList.map((album, index) =>
          (<AlbumItem album={album} key={index} onAddToFavorites={this.handleAddToFavorites} onRemoveFromFavorites={this.handleRemoveFromFavorites} />)
        )}
      </React.Fragment>
    );
  }
}

AlbumList.defaultProps = defaultProps;
AlbumList.propTypes = propTypes;

export default AlbumList;