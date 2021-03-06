import React, {Component} from 'react';
import { GitHub, Twitter } from 'react-feather';
import './LandingFooterContainer.css'
import { Link } from "react-router-dom";
import AppContext from '../../contexts/AppContext';
import discord from '../../assets/images/discord_icon.png';

export default class LandingFooterContainer extends Component { 
  static contextType = AppContext;
  constructor(props) {
    super(props);    
    this.state = {

    }

  }

  render() {
    return (
        <footer-landing style={{background: "#2D2F3A"}}>
            <h6 className="copyright-landing">&copy; 2020 Greenwood Labs, Inc.</h6>
            <div>
                <ul className="footer__landing__nav__links">
                    {this.context.isDesktop && <li className="va-middle-bg-transparent filled-footer-landing-icon"><Link to="/terms" title="Terms" style={{color: "#66676F"}}>Terms</Link></li>}
                    {this.context.isDesktop && <li className="va-middle-bg-transparent filled-footer-landing-icon"><Link to="/privacy" title="Privacy" style={{color: "#66676F"}}>Privacy</Link></li>}
                    <li><a href="https://github.com/greenwood-finance" title="Greenwood GitHub"><span><GitHub className="va-middle-bg-transparent filled-footer-landing-icon"/></span></a></li>
                    <li><a href="https://twitter.com/GreenwoodLabs" title="Greenwood Twitter"><span><Twitter className="va-middle-bg-transparent filled-footer-landing-icon" /></span></a></li>
                    <li className="footer-last-li"><a href="https://discord.com/invite/dxejH7fAxr" title="Greenwood Discord"><span><img className="va-middle-bg-transparent filled-footer-landing-image" src={discord} alt="discord"/></span></a></li>
                </ul>
            </div>
        </footer-landing>
    )
  }
}
