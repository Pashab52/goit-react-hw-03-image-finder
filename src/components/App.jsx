import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImg } from "Service/image-service";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";




export class App extends Component {
  state = {
    searchValue: '',
    imagesData: null,
    page: 1,
    showBtnLoadMore: false,
    identicalValue: false,
    showLoader: false,
  };

  handleOnSubmit = searchValue =>
    this.setState({
      searchValue,
      imagesData: [],
      page: 1,
      showBtnLoadMore: false,
      showLoader: true,
    });

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
        showLoader: false
      }));
    }
  }

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
      showLoader: true
    }));
  };

  render() {
    return (
      
      <div >
        <Searchbar handleOnSubmit={this.handleOnSubmit} />
        {this.state.imagesData && (
          <ImageGallery images={this.state.imagesData} />
        )}
        {this.state.showLoader && <Loader />}

        {this.state.showBtnLoadMore &&
          this.state.imagesData.length > 0 &&
          !this.state.showLoader && (
            <Button onClick={this.handleOnLoadMoreBtn} />
          )}
      </div>
    );
  }
};

