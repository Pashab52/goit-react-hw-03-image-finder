import { createPortal } from 'react-dom';
import { Component } from 'react';

export class Modal extends Component {

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', (event) => {
      console.log(event.code)
    })
  }



  modalRoot = document.querySelector('#modal-root');

  render() {
    return createPortal(
      <div className="overlay">
        <div >{this.props.children}</div>
      </div>, this.modalRoot);
  }
}
