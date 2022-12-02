import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ThreeCircles } from 'react-loader-spinner';

const API_KEY = '19743646-38e1a9cdaadffbdd4b9ec2ba3';

export class App extends Component {
  state = {
    quote: '',
    pictures: [],
    isLoading: false,
    page: 1,
    maxPage: 0,
    total: 0,
    modal: false,
    largeURL: '',
    alt: '',
  };

  constructor(props) {
    super(props);
    this.returnImage = this.returnImage.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  fetchImages = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.state.quote}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data =>
        this.setState(({ pictures }) => ({
          pictures:
            this.state.page === 1 ? data.hits : [...pictures, ...data.hits],
          maxPage: Math.floor(data.totalHits / 12) + 1,
          total: data.totalHits,
        }))
      )
      .catch(err => console.error(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = data => {
    this.setState(prevState => ({
      page: prevState.page + data,
      isLoading: true,
    }));
  };

  submitButton = quote => {
    this.setState({
      quote: quote,
      isLoading: true,
      page: 1,
    });
  };
  closeModal() {
    return this.setState({ modal: false });
  }

  returnImage(e) {
    const imageURL = e.currentTarget.getAttribute('large');
    const alt = e.currentTarget.getAttribute('alt');
    return this.setState({
      alt: alt,
      largeURL: imageURL,
      modal: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading || this.state.page !== prevState.page) {
      this.fetchImages();
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={quote => this.submitButton(quote)} />

        {this.state.isLoading && <Loader loading={this.state.isLoading} />}

        {this.state.pictures.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              data={this.state.pictures}
              returnImage={this.returnImage}
            />
          </ImageGallery>
        )}
        {this.state.total > 12 && (
          <Button onClick={data => this.loadMore(data)} />
        )}
        {this.state.modal && (
          <Modal
            source={this.state.largeURL}
            alt={this.state.alt}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
