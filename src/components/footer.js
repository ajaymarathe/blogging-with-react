import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid bg-primary text-white">
                <div className="py-3 ">
                    <p className="mb-0">Copyright by bootcatch.com 2019</p>
                </div>
            </div>
         );
    }
}
 
export default Footer;