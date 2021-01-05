import React, { Component } from 'react';
import axios from 'axios';

class SendImage extends Component {

    state = {
        images: []
    };

    handleImageChange = (event) => {
        // this.setState({
        //     images: e.target.files
        // })

        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`

        console.log(images)
        this.setState({ images })
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        // const uploaders = this.state.images.map(async (image) => {
        //     const data2 = new FormData();
        //     data2.append("file", image, image.name);
        //     // Make an AJAX upload request using Axios
        //     const data = await axios.post('http://127.0.0.1:5000/trainModel', data2);

        //     return data;
        // });
        // // Once all the files are uploaded 
        // try {
        //     const data = await axios.all(uploaders);
        //     console.log("done", data);
        // } catch (ex) {
        //     alert(ex.message);
        // }


        // creating formdata
        let data = new FormData();
        this.state.images.map((image) => {
            // data.append("file", image, 'zahid');
            data.append(image.name, image);
        })

        let url = 'http://127.0.0.1:5000/trainModel';

        try {
            const res = await axios.post(url, data)
            console.log(res);
        } catch (error) {
            console.log("hi", error)
        }


        // // creating formdata
        // let data = new FormData();
        // data.append("file", this.state.image);

        // let url = 'http://127.0.0.1:5000/trainModel';

        // try {
        //     const res = await axios.post(url, data)
        //     console.log(res);
        // } catch (error) {
        //     console.log("hi", error)
        // }
    };

    render() {
        return (
            <div className="App">
                {/* method_1 */}
                <form encType="multipart/form-data" onSubmit={this.handleSubmit} >
                    <p>
                        <input type="file" multiple onChange={this.handleImageChange} required />
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