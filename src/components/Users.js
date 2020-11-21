import React, { Component } from 'react';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUsersListApi, editUserStatusApi } from "../actions/UserAction";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.props.getUsersListApi();
    }

    changeUserStatus = (userId) => {
        this.props.editUserStatusApi(userId, (res) => {
            if(res.response_code === 0){
                toast.success(res.response, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else {
                toast.error(res.response, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            this.props.getUsersListApi();
        })
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
                <table className="table table-bordered users-table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">User Email</th> 
                            <th scope="col">User Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.getUsersFromState.length > 0 && this.props.getUsersFromState.map(element => 
                        <tr key={element.userId}>
                            <td>{element.userName}</td>
                            <td>{element.userEmail}</td>
                            <td>
                                {element.userIsActive === 0 ? 
                                <button className="badge badge-pill badge-success" onClick={
                                    () => this.changeUserStatus(element.userId)}>
                                    Active
                                </button> : 
                                <button className="badge badge-pill badge-danger" onClick={
                                    () => this.changeUserStatus(element.userId)}>
                                    In-Active
                                </button> }
                            </td>
                        </tr>)
                        }
                        { this.props.getUsersFromState.length === 0  &&
                            <tr>
                                <td className="text-center" colSpan="3">No User data found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </>
         );
    }
}

const mapStatetoProps = (state) => {
    console.log(state)
    return {
      getUsersFromState: state.userReducer.usersList
    };
};
   
const mapDispatchToProps = (disaptch) => {
    return {
    getUsersListApi: () => {
        disaptch(getUsersListApi())
    },
    //   addNewBookApi: (data, callBack) => {
    //     disaptch(addNewBookApi(data, callBack))
    //   },
    editUserStatusApi: (data, callBack) => {
        disaptch(editUserStatusApi(data, callBack))
      },
    //   editBookApi: (data, callBack) => {
    //     disaptch(editBookApi(data, callBack))
    //   },
    };
};
 
export default connect( mapStatetoProps,mapDispatchToProps )(Users);