import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button,Modal, ModalBody, ModalHeader } from "reactstrap";
import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getBookListApi, addNewBookApi, editBookApi, getActiveUsersListApi, lendBookApi } from "../actions/UserAction";
import Book from './Book';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      openAddBookModal: false,
      openEditBookModal: false,
      openLendBookModal: false,
      bookName: "",
      authorName: "",
      publisherName: "",
      bookImage: "",
      bookCategory: "",
      files: [],
      file: null,
      editBookName: '',
      editBookAuthor: '',
      editBookPublisher: '',
      editBookCategory: '',
      editBookId: 0,
      editBookImage: null,
      editFiles: [],
      editFile: null,
      activeUsersList: [],
      selectedUser: 0,
      lendBookId: 0,
     }
  }

  componentDidMount() {
    this.props.getBookListApi();
  }

  addBookModalStatus = () => {
    this.setState({openAddBookModal: !this.state.openAddBookModal});
  }

  editBookModalStatus = () => {
    this.setState({openEditBookModal: !this.state.openEditBookModal});
  }

  lendBookModalStatus = () => {
    this.setState({openLendBookModal: !this.state.openLendBookModal})
  }

  getFiles = (files) => {
    this.setState({ files });
    this.setState({
      file: URL.createObjectURL(files[0].file),
    });
    let base64Value = "";
    base64Value = files[0].base64;
    this.setState({
      bookImage: base64Value,
    });
  };

  getEditFiles = (files) => {
    this.setState({ editFiles: files });
    this.setState({
      editFile: URL.createObjectURL(files[0].file),
    });
    let base64Value = "";
    base64Value = files[0].base64;
    this.setState({
      editBookImage: base64Value,
    });
  };

  lendBookToUser = () => {
    let data = {
      bookId: this.state.lendBookId,
      userId: this.state.selectedUser
    }
    this.props.lendBookApi(data, (res) => {
      this.invokeBookList(res.response);
    })
    this.setState({
      lendBookApi: 0,
      selectedUser: 0,
      openLendBookModal: false
    })
  }

  addNewBook = () => {
    let data = {
      bookName: this.state.bookName,
      bookCategory: this.state.bookCategory,
      authorName: this.state.authorName,
      publisherName: this.state.publisherName,
      bookImage: this.state.bookImage === "" ? null : this.state.bookImage
    }
    console.log(data)
    if(this.state.bookName !== ""){
      this.props.addNewBookApi(data, (res => {
        if(res.response_code === 0){
          this.setState({
            bookName: '',
            bookCategory: '',
            authorName: '',
            publisherName: '',
            bookImage: '',
            file: null,
            files: [],
            openAddBookModal: false
          }, this.props.getBookListApi());
          toast.success(res.response, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }))
    }
  }

  editBook = () => {
    let data = {
      bookId: this.state.editBookId,
      bookName: this.state.editBookName,
      bookCategory: this.state.editBookCategory,
      authorName: this.state.editBookAuthor,
      publisherName: this.state.editBookPublisher,
      bookImage: this.state.editBookImage
    }
    this.props.editBookApi(data, (res) => {
      if(res.response_code === 0){
          this.setState({
            openEditBookModal: false
          });
          this.invokeBookList(res.response);
      }
    })
  }

  renderLendBookModal = () => {
    return(
      <>
        <Modal  isOpen={this.state.openLendBookModal} toggle={this.lendBookModalStatus} className="">
            <ModalHeader toggle={this.lendBookModalStatus}>Lend Book to User</ModalHeader>
            <ModalBody>
              <div className="form-group">
                  <label htmlFor="user-name">Book Name</label>
                  <select
                    className="form-control" 
                    id="user-name" 
                    value={this.state.selectedUser} 
                    onChange={(event)=>{this.setState({selectedUser:parseInt(event.target.value)})}}>
                  <option value={0}>Select the author</option>
                  {this.state.activeUsersList.length &&
                      this.state.activeUsersList.map(user => 
                  <option value={user.userId} key={user.userId}>{user.userName}</option>
                  )}
                  </select>
              </div>
              <Button color="primary" type="submit" onClick={this.lendBookToUser}>Lend</Button>
            </ModalBody>
        </Modal>
      </>
    )
  }

  renderAddBookModal = () => {
    return(
      <>
        <Modal isOpen={this.state.openAddBookModal} toggle={this.addBookModalStatus} className="">
            <ModalHeader toggle={this.addBookModalStatus}>Add New Book</ModalHeader>
            <ModalBody>
            <div className="form-group">
                <label htmlFor="book-name">Book Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="book-name" 
                  placeholder="Enter book name" 
                  required
                  value={this.state.bookName}
                  onChange={(event)=>{this.setState({bookName: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="author-name">Book Author Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="author-name" 
                  placeholder="Enter book author name" 
                  required
                  value={this.state.authorName}
                  onChange={(event)=>{this.setState({authorName: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="publisher-name">Book Publisher Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="publisher-name" 
                  placeholder="Enter book publisher name" 
                  required
                  value={this.state.publisherName}
                  onChange={(event)=>{this.setState({publisherName: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="category-name">Book Category Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="category-name" 
                  placeholder="Enter book category name" 
                  required
                  value={this.state.bookCategory}
                  onChange={(event)=>{this.setState({bookCategory: event.target.value})}}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="cover-image">Book Cover Image</label>
                <br/>
                <FileBase64
                    multiple={true} 
                    onDone={this.getFiles.bind(this)}
                />
            </div>
                <Button color="primary" type="submit" onClick={this.addNewBook}>Add</Button>
                {/* <button type="submit" className="btn-primary" onClick={this.addNewBook()}>Add</button> */}
            </ModalBody>
        </Modal>
      </>
    );
  }

  invokeBookList = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.getBookListApi();
  }

  editBookDetails = (data) => {
    const {bookAuthor, bookCategory, bookId, bookName, bookPublisher, bookImage} = data;
    console.log(data);
    this.setState({
      editBookName: bookName,
      editBookAuthor: bookAuthor,
      editBookPublisher: bookPublisher,
      editBookCategory: bookCategory,
      editBookId: bookId,
      editBookImage: bookImage,
      openEditBookModal: true,
    });
  }

  lendBookForUser = (status, bookId) => {
    console.log(bookId);
    this.setState({
      openLendBookModal: status,
      lendBookId: bookId
    }, this.props.getActiveUsersListApi((res) => {
      console.log(res);
      this.setState({
        activeUsersList: res.response
      })
    }))
  }

  renderEditBookModal = () => {
    return(
      <>
        <Modal isOpen={this.state.openEditBookModal} toggle={this.editBookModalStatus} className="">
            <ModalHeader toggle={this.editBookModalStatus}>Edit Book</ModalHeader>
            <ModalBody>
            <div className="form-group">
                <label htmlFor="book-name">Book Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="book-name" 
                  placeholder="Enter book name" 
                  required
                  value={this.state.editBookName}
                  onChange={(event)=>{this.setState({editBookName: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="author-name">Book Author Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="author-name" 
                  placeholder="Enter book author name" 
                  required
                  value={this.state.editBookAuthor}
                  onChange={(event)=>{this.setState({editBookAuthor: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="publisher-name">Book Publisher Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="publisher-name" 
                  placeholder="Enter book publisher name" 
                  required
                  value={this.state.editBookPublisher}
                  onChange={(event)=>{this.setState({editBookPublisher: event.target.value})}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="category-name">Book Category Name</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="category-name" 
                  placeholder="Enter book category name" 
                  required
                  value={this.state.editBookCategory}
                  onChange={(event)=>{this.setState({editBookCategory: event.target.value})}}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="cover-image">Book Cover Image</label>
                <br/>
                <FileBase64
                    multiple={true} 
                    onDone={this.getEditFiles.bind(this)}
                />
            </div>
                <Button color="primary" type="submit" onClick={this.editBook}>Edit</Button>
                <Button className="ml-1" color="secondary" type="button" onClick={this.editBookModalStatus}>Cancel</Button>
                {/* <button type="submit" className="btn-primary" onClick={this.addNewBook()}>Add</button> */}
            </ModalBody>
        </Modal>
      </>
    );
  }

  render() { 
    return ( 
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            <ToastContainer />
            <div className="container d-flex justify-content-between">
                <h3 className="post-title">Books</h3>
                <button 
                className="btn btn-primary add-btn" 
                onClick={()=> this.addBookModalStatus()}>
                    Add Book
                </button>
            </div>
            {this.props.getBooksFromState && this.props.getBooksFromState.length === 0 &&
              <h3 className="text-center"> No data found</h3>
            }
            {this.props.getBooksFromState && this.props.getBooksFromState.map(books => 
              <Book 
                bookName={books.bookName} 
                bookAuthor={books.authorName} 
                bookPublisher={books.publisherName} 
                bookCategory={books.bookCategory} 
                bookImage={books.bookImage} 
                bookId={books.bookId} 
                bookLentedStatus={books.isBookLented}
                key={books.bookId} 
                deleteBookCallback={(isDeleted, message) => 
                  isDeleted ? this.invokeBookList(message) : ''
                }
                editBookCallBack={(isEditEnabled, data) => 
                  isEditEnabled && this.editBookDetails(data)
                }
                lendBookCallBack={(status, data) => 
                  this.lendBookForUser(status, data)
                }
              />
            )}

            {this.state.openAddBookModal ? this.renderAddBookModal() : ''}
            {this.state.openEditBookModal ? this.renderEditBookModal() : ''}
            {this.state.openLendBookModal ? this.renderLendBookModal() : ''}
        </>
     );
  }
}

const mapStatetoProps = (state) => {
  console.log(state)
  return {
    getBooksFromState: state.userReducer.booksList
  };
};
 
const mapDispatchToProps = (disaptch) => {
  return {
    getBookListApi: () => {
      disaptch(getBookListApi())
    },
    addNewBookApi: (data, callBack) => {
      disaptch(addNewBookApi(data, callBack))
    },
    editBookApi: (data, callBack) => {
      disaptch(editBookApi(data, callBack))
    },
    getActiveUsersListApi: (callBack) => {
      disaptch(getActiveUsersListApi(callBack))
    },
    lendBookApi: (data, callBack) => {
      disaptch(lendBookApi(data, callBack))
    },
  };
};

export default connect( mapStatetoProps, mapDispatchToProps )(Home);
