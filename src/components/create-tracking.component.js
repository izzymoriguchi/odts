// SJSU CS 218 Spring 2019 TEAM4
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTracking extends Component {
    constructor(props) {
        super(props);

        this.onChangeDestinationAddress = this.onChangeDestinationAddress.bind(this);
        this.onChangeOriginAddress = this.onChangeOriginAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            destination_address: '',
            origin_address: '',
            tracking_num: ''
        }
    }

    onChangeDestinationAddress(e) {
        this.setState({
            destination_address: e.target.value
        });
    }

    onChangeOriginAddress(e) {
        this.setState({
            origin_address: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newTracking = {
            destination_address: this.state.destination_address,
            origin_address: this.state.origin_address
        };

        axios.post('http://localhost:4001/tracking/add', newTracking)
            .then(res => {
                console.log(res.data.origin);
                console.log(res.data.destination);
                this.setState({tracking_num: res.data._id})
            });

        this.setState({
            destination_address: '',
            origin_address: ''
        })
    }

    render() {
        if (this.state.tracking_num != '') {
            return (
                <div style={{marginTop: 10}}>
                    <h3>Your tracking number: {this.state.tracking_num}</h3>
                </div>
            )
            this.setState({tracking_num: ''})
        } else {
            return (
                <div style={{marginTop: 10}}>
                    <h3>Create your package</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Destination address</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.destination_address}
                                    onChange={this.onChangeDestinationAddress}
                            />
                        </div>
                        <div className="form-group">
                            <label>Origin address: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.origin_address}
                                onChange={this.onChangeOriginAddress}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Track" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            )
        }
    }
}