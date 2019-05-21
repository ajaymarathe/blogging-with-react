import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = { post:'', }
    }
    render() { 
        let PostData = this.state.post;
        return ( 
            <div>
                <div className="container mt-5 mb-5">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                By AJay Marathe on {PostData.created_at}
                            </div>
                            <div className="card-body">
                                <h1>{PostData.title}</h1>
                                <div>{ReactHtmlParser(PostData.body)}</div>
                                <div className="d-flex justify-content-end">
                                    <i className="fa fa-ellipsis-h p-2"  id="dropdownMenuButton" data-toggle="dropdown" ></i>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <Link to={`/edit/${PostData.slug}`} className="dropdown-item">
                                            Edit
                                        </Link> 
                                        <a className="dropdown-item" >Delete</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="form-group">
                                    <input className="form-control" placeholder="Leave comment"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }

    componentDidMount(){
        this.Post();
    }

    Post(){
        const slug = this.props.match.params.id;
        console.log(slug);
        
        axios.get('http://127.0.0.1:8000/api/posts/'+slug)
        .then(res => {
            this.setState({
                post: res.data,
            });
            console.log(res);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}
 
export default Show;