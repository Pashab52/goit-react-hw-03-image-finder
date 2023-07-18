import {Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';


export class Searchbar extends Component {
  static propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleOnChangeInput = event => {
    this.setState({ searchValue: event.currentTarget.value });
  };

  // Виправив! Але виліз один косяк, якщо два рази вводити одне і те саме значення для пошуку(до речі в задачі з нашого практичного заняття теж він присутній).
  // Виправив то додатковою перевіркою(передача пропса з апп). Це дуже класна практика щось перероблювати, але чи дійсно є потреба робити контрольовану форму,
  //  якщо є тільки один інпут для пошуку? Дякую!  ПС: вибачте за ті записки у коді :)
  handleOnSubmit = event => {
    event.preventDefault();
    if (
      this.props.prevSearchValue === this.state.searchValue &&
      this.state.searchValue !== ''
    ) {
      Notiflix.Notify.info(
        'Нou already searched for this, please enter a different search word'
      );
      this.setState({ searchValue: '' });
    } else {
      const searchValue = this.state.searchValue.trim();

      if (searchValue === '') {
        Notiflix.Notify.info('Please fill out this field');
      }
      if (searchValue !== '') {
        this.props.handleOnSubmit(searchValue);
        this.setState({ searchValue: '' });
      }
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
            onChange={this.handleOnChangeInput}
            value={this.state.searchValue}
          />
        </form>
      </header>
    );
  }
}
