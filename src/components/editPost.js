import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editData: '',

            title: '',
            newCategory: '',
            body: '',

            category: ''
         }
    }

    onChangeTitle(){

    }

    onChangeCategory(){

    }

    handleSubmit(){
        
    }

    render() { 
        let postData = this.state;
        return ( 
            <div>
                <div className="container mt-5 mb-5">
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
        this.getPost();
        this.getCategories();
    }

    getPost(){
        const slug = this.props.match.params.id;
        console.log(slug);

        axios.get('http://127.0.0.1:8000/api/posts/'+slug)
        .then(res =>{
            console.log(res);
        })
    }

    getCategories(){
        axios.get('http://127.0.0.1:8000/api/category')
        .then(res =>{
            console.log(res);
        })
    }
}
 
export default EditPost;