import React from "react";
import {Facebook, Instagram, Mail, Twitter} from "react-feather";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="https://https://www.softvessel.com">Web design</a></li>
                                <li><a href="https://https://www.softvessel.com">Development</a></li>
                                <li><a href="https://https://www.softvessel.com">Hosting</a></li>
                                <li><a href="https://https://www.softvessel.com">Training</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="https://https://www.softvessel.com">KF</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="https://https://www.softvessel.com">Contact US</a></li>
                                <li><a href="https://www.instagram.com">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>KF </h3>
                            <p>Provide By Softvessel</p>
                        </div>
                        <div className="col item-social">
                            <i><a href="https://www.facebook.com"> <Facebook/> </a></i>
                            <i><a href="https://www.twitter.com"> <Twitter/></a> </i>
                            <i><a href="https://www.instagram.com"> <Mail/></a> </i>
                            <i><a href="https://www.instagram.com"> <Instagram/></a> </i>
                        </div>
                    </div>
                    <p className="copyright">KF © 2021</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;