/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import 'assets/style/_albumListFilter.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const propTypes = {
  onFilterInputChange: PropTypes.func,
  suggestions: PropTypes.arr,
  onFilterSubmit: PropTypes.func,
};

const defaultProps = {
  onFilterInputChange: () => {},
  suggestions: [],
  onFilterSubmit: () => {},
};

class AlbumListFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    };
  }

  handleAlbumSuggestions = (e) => {
    const { onFilterInputChange } = this.props;

    onFilterInputChange(e.target.value);

    this.setState({
      filterValue: e.target.value,
    });
  };

  handleFilteredItemClick = (id) => {
    const { history } = this.props;

    history.push(`/artist/${id}`);
  };

  handleFilterSubmit = (e) => {
    e.preventDefault();
    const { onFilterSubmit } = this.props;
    const { filterValue } = this.state;

    onFilterSubmit(filterValue);

    this.setState({
      filterValue: '',
    });
  };

  render() {
    const { suggestions } = this.props;
    return (
      <div className="bornfight-albumListFilter__search">
        <form onSubmit={this.handleFilterSubmit}>
          <i className="material-icons">search</i>
          <input
            className="bornfight-albumListFilter__input"
            type="text"
            placeholder="Search"
            onChange={this.handleAlbumSuggestions}
          />
          {suggestions.length > 0 && (
            <ul className="bornfight-albumListFilter__suggestionList">
              {suggestions.map((suggestion) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  className="bornfight-albumListFilter__suggestionListItem"
                  key={suggestion.id}
                  onClick={() =>
                    this.handleFilteredItemClick(suggestion.artistId)
                  }
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    );
  }
}

AlbumListFilter.propTypes = propTypes;
AlbumListFilter.defaultProps = defaultProps;

export default withRouter(AlbumListFilter);
