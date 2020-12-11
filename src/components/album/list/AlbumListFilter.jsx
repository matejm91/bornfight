import React from 'react';
import 'src/assets/style/_albumListFilter.css';
import PropTypes from 'prop-types';
import {withRouter} from'react-router';

const propTypes = {
  handleAlbumSuggestions: PropTypes.func,
  onFilterInputChange: PropTypes.func,
  suggestions: PropTypes.array,
  handleFilterSubmit: PropTypes.func,
  onFilterSubmit: PropTypes.func,
};

const defaultProps = {
  suggestions: [],
};

class AlbumListFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    }
  }

  handleAlbumSuggestions = (e) => {
    this.props.onFilterInputChange(e.target.value);

    this.setState({
      filterValue: e.target.value,
    });
  }

  handleFilteredItemClick = (id) => {
    this.props.history.push(`/artist/${id}`);
  }

  handleFilterSubmit = (e) => {
    e.preventDefault();
    this.props.onFilterSubmit(this.state.filterValue);

    this.setState({
      filterValue: '',
    });
  }

  render() {
    const {suggestions} = this.props;
    return (
      <div className='bornfight-albumListFilter__search'>
        <form onSubmit={this.handleFilterSubmit}>
          <i className="material-icons">search</i>
        <input className='bornfight-albumListFilter__input' type='text' placeholder='Search' onChange={this.handleAlbumSuggestions} />
        {suggestions.length > 0 && (
          <ul className='bornfight-albumListFilter__suggestionList'>
            {suggestions.map((suggestion, index) => (<li className='bornfight-albumListFilter__suggestionListItem' key={index} onClick={() => this.handleFilteredItemClick(suggestion.artistId)}>{suggestion.title}</li>))}
          </ul>
        )}
        </form>
      </div>
    )
  }
}

AlbumListFilter.propTypes = propTypes;
AlbumListFilter.defaultProps = defaultProps;

export default withRouter(AlbumListFilter);
