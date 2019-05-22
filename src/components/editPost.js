import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newCategory: '',
            body: '',

            editPost: {
                title: '',
                
            },
            category: ''
         }


         this.onChangeTitle = this.onChangeTitle.bind(this);
         this.onChangeCategory = this.onChangeCategory.bind(this);
         this.updateContent = this.updateContent.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeTitle(e){
        this.setState({
            editPost:{
                title : e.target.value
            }
        });
    }

    onChangeCategory(e){
        this.setState({
            newCategory: e.target.value
        });
    }

    // onChange(e){
    //     this.setState({
    //         body: e.target.value
    //     });
    // }
    updateContent(e){
        this.setState({
            body: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        let postData = [this.state.editPost.title, this.state.newCategory, this.state.body];
        console.log(postData);
    }

    render() { 
        let categoryData = this.state.category;
        return ( 
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}> 
                                <div className="form-group">
                                    <label >Title: </label>
                                    <input type="text"  value={this.state.editPost.title || ''} onChange={this.onChangeTitle} className="form-control"  placeholder="Enter Title" />
                                </div>
                                <div className='form-group'>
                                    <label>Category: </label>
                                    <select  value={this.state.newCategory || ''} onChange={this.onChangeCategory} className="custom-select" >
                                        { 
                                            Object.keys(categoryData).map(function (key) {
                                                return ( 
                                                    <option key={key}>{ categoryData[key].category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                   <label> Body:</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        value={this.state.editPost.body}
                                        // onChange={this.updateContent}
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            this.setState({
                                                body: data
                                            });
                                        }
                                     }
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
            this.setState({
                editPost: res.data
            });
            // console.log(res);
        })
    }

    getCategories(){
        axios.get('http://127.0.0.1:8000/api/category')
        .then(res =>{
            this.setState({
                category: res.data
            });
            // console.log(res);
        })
    }
}
 
export default EditPost;