import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from 'src/components/album/view/AlbumItem';
import ArtistAlbumListHeader from "src/components/common/ArtistAlbumListHeader";
import AlbumListHeader from "src/components/common/AlbumListHeader";

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
    if (this.props.match.params.artistId) {
      this.fetchArtistsAlbumList(this.props.match.params.artistId);
    } else {
      this.fetchData();
    }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.artistId !== this.props.match.params.artistId && this.props.match.params.artistId) {
      this.fetchArtistsAlbumList(this.props.match.params.artistId);

      this.setState({ suggestions: [] });
    }

    if (prevProps.match.params.artistId !== this.props.match.params.artistId && !this.props.match.params.artistId) {
      this.fetchData();

      this.setState({ suggestions: [] });
    }
  }

  fetchData = () => {
    fetch(`http://localhost:3004/albums?_limit=${this.state.limit}`)
      .then(res => res.json())
      .then(
        albums => {
          fetch('http://localhost:3004/artists')
            .then(res => res.json())
            .then(artists => {
              let alteredAlbums = albums.map(album => {
                album.artist = artists.find(artist => artist.id === album.artistId);
                return album;
              });
              
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

  fetchArtistsAlbumList = (artistId) => {
    fetch(`http://localhost:3004/albums/?artistId=${parseInt(artistId)}&_limit=${this.state.limit}`)
    .then(res => res.json())
    .then(
      albums => {
        fetch('http://localhost:3004/artists')
          .then(res => res.json())
          .then(artists => {
            let alteredAlbums = albums.map(album => {
              album.artist = artists.find(artist => artist.id === album.artistId);
              return album;
            });
            
            this.setState({
              artistTitle: alteredAlbums[0].artist.title,
              albumList: alteredAlbums,
            });
          });
      },
      error => {
        this.setState({
          error
        });
      }
    );
  }

  fetchFilteredAlbumList = (filterValue) => {
    fetch(`http://localhost:3004/albums/?q=${filterValue}&_limit=${this.state.limit}`)
    .then(res => res.json())
    .then(
      albums => {
        fetch('http://localhost:3004/artists')
          .then(res => res.json())
          .then(artists => {
            let alteredAlbums = albums.map(album => {
              album.artist = artists.find(artist => artist.id === album.artistId);
              return album;
            });
            
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

    delete albumToEdit.artist;

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

  handleFilterInputChange = (searchInput) => {
    if (searchInput.trim() === '') {
      this.setState({ suggestions: [] });
    } else {
      const suggestionAlbumTitles = this.state.albumList.filter(album => album.title.toLowerCase().startsWith(searchInput.toLowerCase()));
      this.setState({ suggestions: suggestionAlbumTitles });
    }
  }

  handleFilterSubmit = (filterValue) => {
    this.fetchFilteredAlbumList(filterValue);
  }


  render() {
    const {artistTitle, suggestions, albumList} = this.state;
    const {artistId} = this.props.match.params;

    return (
      <React.Fragment>
        {artistId ?
          <ArtistAlbumListHeader artistTitle={artistTitle} /> :
          <AlbumListHeader onFilterInputChange={this.handleFilterInputChange} onFilterSubmit={this.handleFilterSubmit} suggestions={suggestions}/>
        }
        {albumList.length > 0 &&
        albumList.map((album, index) =>
          (<AlbumItem album={album} key={index} onAddToFavorites={this.handleAddToFavorites} onRemoveFromFavorites={this.handleRemoveFromFavorites} isInArtistView={artistId ? true : false} />)
        )}
      </React.Fragment>
    );
  }
}

AlbumList.defaultProps = defaultProps;
AlbumList.propTypes = propTypes;

export default AlbumList;