import React, { Component } from 'react';
import bookCover from '../assets/cover.jfif';
import { connect } from "react-redux";

import { deleteBookApi } from "../actions/UserAction";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    removeBook = (bookId) => {
        // alert(bookId)
        this.props.deleteBookApi(bookId, (res) => {
            if(res.response_code === 0){
                this.props.deleteBookCallback(true, res.response)
            } else {
                this.props.deleteBookCallback(false, res.response)
            }
        })
    }

    editBook = (bookId, bookName, bookCategory, bookAuthor, bookPublisher, bookImage) => {
        let data = {
            bookId, 
            bookName, 
            bookCategory, 
            bookAuthor, 
            bookPublisher,
            bookImage
        }
        // console.log(data)
        this.props.editBookCallBack(true, data)
    }

    render() { 
        const { bookName, bookAuthor, bookPublisher, bookCategory, bookImage, bookId} = this.props;
        return ( 
            <React.Fragment>
                <div className="card post-card bg-light">
                    <div className="card-body">
                        <span className="book-label">{bookCategory}</span>
                        <div className="d-flex justify-content-start">
                            <div>
                                <img  src={bookImage === null || bookImage === "" ? bookCover : bookImage} width='250' height='200' alt="_bookCover" />
                            </div>
                            <div className="m-auto">
                                <h3 className="card-title">{bookName}</h3>
                                <p className="card-subtitle text-muted">By {bookAuthor}</p>
                                <p className="card-text">{bookPublisher}</p>
                            </div>
                            
                        </div>
                        <div className="d-flex justify-content-end">
                            <div>
                                <button
                                    className="btn btn-outline-primary btn-edit"
                                    onClick={() => 
                                        this.editBook(
                                            bookId, 
                                            bookName, 
                                            bookCategory, 
                                            bookAuthor, 
                                            bookPublisher,
                                            bookImage)
                                    }
                                >
                                    edit
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => this.removeBook(bookId)}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      deleteBookApi: (data, callBack) => {
        dispatch(deleteBookApi(data, callBack))
      }
    };
};
 
export default connect(null, mapDispatchToProps)(Book);