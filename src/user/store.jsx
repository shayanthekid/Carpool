import React, { Component } from 'react'
import CarList from '../admin/CarList';

export class Store extends Component {
  render() {
    return (
      <div>


            <CarList layout="list"  />

      </div>
    )
  }
}

export default Store