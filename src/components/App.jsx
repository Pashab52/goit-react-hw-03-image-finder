import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImg } from "Service/image-service";
import { ImageGallery } from "./ImageGallery/ImageGallery";




export class App extends Component {
  state = {
    searchValue: '',
    imagesData: null,
    page: 1,
  };

  handleOnSubmit = searchValue =>
    this.setState({ searchValue, imagesData: [], page: 1 });

  async componentDidUpdate(prevProps, prevState) {
    console.log('prevState', prevState)
    console.log('this.state', this.state);
    if (prevState.searchValue !== this.state.searchValue && this.state.searchValue !== ''){
      const imagesData = await fetchImg(this.state.searchValue, this.state.page);
      const normImageData = this.normlazizeImagesData(imagesData.hits);
      this.setState(prevState => ({
        imagesData: [...prevState.imagesData, ...normImageData],
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



  render() {
    return (
      <div>

        <Searchbar handleOnSubmit={this.handleOnSubmit} />
        {this.state.imagesData && <ImageGallery images={ this.state.imagesData} />}
         
       
         
      </div>
    );
  }
};

