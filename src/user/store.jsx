import React, { Component } from 'react'
import CarList from '../admin/CarList';
import '../Store.css';

export class Store extends Component {
  render() {
    return (
    

            <div className="store-page">
                <CarList layout="list" />
            </div>

    )
  }
}

export default Store