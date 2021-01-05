import React, { Component } from 'react';
import axios from 'axios';

class SendImage extends Component {

    state = {
        image: null
    };

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        // creating formdata
        let data = new FormData();
        data.append("file", this.state.image);

        let url = 'http://127.0.0.1:5000/trainModel';

        try {
            const res = await axios.post(url, data)
            console.log(res);
        } catch (error) {
            console.log("hi", error)
        }
    };

    render() {
        return (
            <div className="App">
                {/* method_1 */}
                <form encType="multipart/form-data" onSubmit={this.handleSubmit} >
                    <p>
                        <input type="file" onChange={this.handleImageChange} required />
                    </p>
                    <input type="submit" value="Submit"></input>
                </form>

                {/* method_2 */}
                <form method="POST" encType="multipart/form-data" action="http://127.0.0.1:5000/trainModel">
                    <input type="file" name="file" />
                    <input type="submit" />
                </form>

            </div>
        );
    }
}

export default SendImage;