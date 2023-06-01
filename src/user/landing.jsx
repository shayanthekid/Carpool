import React, { Component } from 'react'
import '../Landing.css'
export class Landing extends Component {
  render() {
    return (
        <div>
            {/* Hero section */}
            <section className="hero-section">
                <div className="container">
                    <h1>Find your dream car</h1>
                
                    <a href="/store" className="btn btn-primary">Visit Store</a>
                </div>
            </section>


            {/* Footer section */}
            <footer className="footer-section">
                <div className="container">
                    <p>&copy; 2023 My Car Storefront. All rights reserved.</p>
                    <p>Location: 123 Main Street, City</p>
                    <p>Business Hours: Mon-Fri: 9am-6pm, Sat-Sun: 10am-4pm</p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </footer>

        </div>
    )
  }
}

export default Landing