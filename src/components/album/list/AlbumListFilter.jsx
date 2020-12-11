import React from 'react';
import '../../../assets/style/_albumListFilter.css';
import PropTypes from 'prop-types';
import {withRouter} from'react-router';

const propTypes = {
  handleFilterAlbums: PropTypes.func,
  onFilterAlbums: PropTypes.func,
  suggestions: PropTypes.array,
};

const defaultProps = {
  suggestions: [],
};

class AlbumListFilter extends React.Component {
  handleFilterAlbums = (e) => {
    this.props.onFilterAlbums(e.target.value);
  }

  handleFilteredItemClick = (id) => {
    this.props.history.push(`/artist/${id}`);
  }

  render() {
    const {suggestions} = this.props;
    return (
      <div className='bornfight-albumListFilter__search'>
        <i className="material-icons">search</i>
        <input className='bornfight-albumListFilter__input' type='text' placeholder='Search' onChange={this.handleFilterAlbums} />
        {suggestions.length > 0 && (
          <ul className='bornfight-albumListFilter__suggestionList'>
            {suggestions.map((suggestion, index) => (<li className='bornfight-albumListFilter__suggestionListItem' key={index} onClick={() => this.handleFilteredItemClick(suggestion.artistId)}>{suggestion.title}</li>))}
          </ul>
        )}
      </div>
    )
  }
}

AlbumListFilter.propTypes = propTypes;
AlbumListFilter.defaultProps = defaultProps;

export default withRouter(AlbumListFilter);
