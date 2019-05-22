import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { 
            title: '',
            category: '',
            body: '',

            newCategory: '',
         }
    }

    onChange(e){
        this.setState({
            body: e.target.value
        });
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeCategory(e){
        this.setState({
            newCategory: e.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let postData = [this.state.title, this.state.newCategory, this.state.body];
        console.log(postData);

        axios.post('http://localhost:8000/api/posts',{
            title: postData[0],
            category: postData[1],
            body: postData[2],
        })
        .then(res =>{
            this.props.history.push('/')
            console.log(res)
        })
    }

    render() { 
        let postData = this.state;
        return ( 
            <div>
                <div className="container mt-5 mb-5">
                    <h1>Create Post...</h1>

                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={this.handleSubmit}> 
                                <div className="form-group">
                                    <label >Title: </label>
                                    <input type="text"  value={postData.title || ''} onChange={this.onChangeTitle} className="form-control"  placeholder="Enter Title" />
                                </div>
                                <div className='form-group'>
                                    <label>Category: </label>
                                    <select  value={postData.newCategory || ''} onChange={this.onChangeCategory} className="custom-select" >
                                        { 
                                            Object.keys(postData.category).map(function (key) {
                                                return ( 
                                                    <option key={key}>{postData.category[key].category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                   <label> Body:</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            this.setState({
                                                body: data
                                            });
                                        } }
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Publish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }


    componentDidMount(){
        this.getCategories();
    }

    getCategories(){
        axios.get( 'http://127.0.0.1:8000/api/category' )
        .then(res=>{
            this.setState({
                category: res.data
            })
            // console.log(res.data)
        })
    }
}
 
export default CreatePost;