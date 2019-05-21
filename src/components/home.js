import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { post:'Home', }
    }
    render() { 
        let PostData = this.state.post;
        return ( 
            <div>
                <div className="container mt-5 mb-5">
                    <div className="col-md-8">
                        { Object.keys(PostData).map(function (key) {
                            return ( 
                                <div className="card mb-3" key={key}>
                                    <div className="card-header">
                                        by AJay Marathe on {PostData[key].created_at}
                                    </div>
                                    <div className="card-body">
                                        <h1> {PostData[key].title}</h1>
                                        <div>
                                            {ReactHtmlParser(PostData[key].body)} 
                                        </div>   
                                        <Link  to={`show/${PostData[key].slug}`} className="btn btn-primary btn-sm" >Read More ></Link>
                                    </div>
                                </div>
                            )
                          })

                        }
                    </div>
                </div>
            </div>
         );
    }

    componentDidMount(){
        this.getPost();
    }

    getPost(){
        axios.get('http://localhost:8000/api/posts')
          .then(res => {
              this.setState({
                  post: res.data
              });
              console.log(res)
          })
          .catch(function (error) {
            console.log(error);
          })
    }
}
 
export default Home;