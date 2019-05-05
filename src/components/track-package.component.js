// SJSU CS 218 Spring 2019 TEAM4
import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'red',
        padding: '2px 2px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);


export default class TrackPackage extends Component {

    constructor(props) {
        super(props);

        this.onChangeTrackingNumber = this.onChangeTrackingNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tracking_num: '',
            current_location: []
        }
    }

    onChangeTrackingNumber(e) {
        this.setState({
            tracking_num: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:4001/tracking/' + this.state.tracking_num)
            .then(response => {
                console.log(response.data);
                this.setState({current_location: response.data})
            });
    }

    render() {
        if (this.state.current_location.length > 0) {
            var center = {
                lat: this.state.current_location[0],
                lng: this.state.current_location[1]
            };
            return (
                // Important! Always set the container height explicitly
                <div style={{ height: '100vh', width: '100%' }}>
                    <h3>Track package</h3>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBCZT-thH-GtdhosGuLzXBrWCCbuLf707A' }}
                        defaultCenter={center}
                        defaultZoom={11}
                    >
                        <AnyReactComponent
                            lat={center.lat}
                            lng={center.lng}
                            text="Current Location"
                        />
                    </GoogleMapReact>
                </div>
            );
            this.setState({current_location: []});
        } else {
            return (
                <div style={{marginTop: 10}}>
                    <h3>Track package</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tracking number</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.tracking_num}
                                    onChange={this.onChangeTrackingNumber}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Track" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}