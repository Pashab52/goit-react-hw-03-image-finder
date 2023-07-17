import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImg } from "Service/image-service";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";




export class App extends Component {
  state = {
    searchValue: '',
    imagesData: null,
    page: 1,
    showBtnLoadMore: false,
    showLoader: false,
    showModal: false,
    modalData:null
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (
      prevState.searchValue !== this.state.searchValue ||
      // this.state.searchValue !== ''
      prevState.page !== this.state.page
    ) {
      const imagesData = await fetchImg(
        this.state.searchValue,
        this.state.page
      );
      console.log(imagesData.totalHits);
      const normImageData = this.normlazizeImagesData(imagesData.hits);
      this.setState(prevState => ({
        imagesData: [...prevState.imagesData, ...normImageData],
        showBtnLoadMore: this.state.page < Math.ceil(imagesData.totalHits / 12),
        showLoader: false,
      }));
    }
  }

  handleOnSubmit = searchValue =>
    this.setState({
      searchValue,
      imagesData: [],
      page: 1,
      showBtnLoadMore: false,
      showLoader: true,
    });

  normlazizeImagesData(imagesData) {
    return imagesData.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleOnLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showLoader: true,
    }));
  };



  //понясніть, будь ласка, чому ця функція працює тільки, як стрілочна і не має доступу до state? 
  handleImageClick=(modalSrc, alt)=>{
    // console.log(this.state)
    this.toggleModal(); 
    this.setState({
      modalData: { src: modalSrc, alt: alt },
    });
  }
// а ось ця працює і як стрілочна, і як звичайна.
  toggleModal() {
  //  console.log(this.state);
   this.setState({ showModal: !this.state.showModal})
  }


  render() {
    return (
      <div>
        <Searchbar handleOnSubmit={this.handleOnSubmit} />
        {this.state.imagesData && (
          <ImageGallery
            images={this.state.imagesData}
            onImgClick={this.handleImageClick}
          />
        )}
        {this.state.showLoader && <Loader />}

        {this.state.showBtnLoadMore &&
          this.state.imagesData.length > 0 &&
          !this.state.showLoader && (
            <Button onClick={this.handleOnLoadMoreBtn} />
          )}

        {this.state.showModal && (
          <Modal>
            <img
              className="modal"
              src={this.state.modalData.src}
              alt={this.state.modalData.alt}
            />
          </Modal>
        )}
      </div>
    );
  }
};

