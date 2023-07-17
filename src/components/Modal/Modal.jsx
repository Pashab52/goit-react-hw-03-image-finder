import { createPortal } from 'react-dom';
import { Component } from 'react';

export class Modal extends Component {

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.props.onModalClose();
      }
    })
  }

  handleOverlayClick=(event)=> {
    if (event.currentTarget === event.target) {
    this.props.onModalClose();
  }
}

  modalRoot = document.querySelector('#modal-root');

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div>{this.props.children}</div>
      </div>,
      this.modalRoot
    );
  }
}
