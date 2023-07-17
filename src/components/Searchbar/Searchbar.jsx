import {Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
export class Searchbar extends Component {
  static propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
  };

  handleOnSubmit = event => {
    event.preventDefault();

    // чи можна забирати дані з інпуту таким чином ? чи  індекс [1] може змінитися з часом, або в інших браузерах?
    const searchValue = event.currentTarget[1].value.trim();
     if (searchValue === '') {
       Notiflix.Notify.info('Please fill out this field');
     }
    if (searchValue !== '') {
      this.props.handleOnSubmit(searchValue);
      event.currentTarget.reset();
    }
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleOnSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            
          />
        </form>
      </header>
    );
  }
}
