import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import MovieRow from './MovieRow';

export default class Favourites extends Component {
    movie = [];

    constructor(props) {
        super(props);
        this.state = {favourites: []};
    }


    componentDidMount(){
        axios.get('http://localhost:4000/movies')
            .then(response => {
                console.log(response.data);
                this.setState({ favourites: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow(){
        //return this.state.business.map(function(object, i){
        //   return <TableRow obj={object} key={i} />;
        //});
    }
    movieRow(){
        // return movieService.getMovies(1).then(result=> {
        //  console.log(result);
        //    return <div>samir</div>

        // });
        console.log(this.movie);
        return this.state.favourites.map((object, i) => {
            console.log(object);
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">My favourite movies</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Vote Mark</th>
                        <th>Image</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.movieRow() }
                    </tbody>
                </table>
            </div>
        );
    }
}
