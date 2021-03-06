import React from 'react';
import LandingNavbarContainer from "../../components/LandingNavbarContainer/LandingNavbarContainer.jsx"
import LandingContainer from "../../components/LandingContainer/LandingContainer.jsx"
import LandingFooterContainer from "../../components/LandingFooterContainer/LandingFooterContainer.jsx"
import './LandingView.css';

export default class PoolView extends React.Component {  
    render() {
        return (
            <div>
                <LandingNavbarContainer></LandingNavbarContainer>
                <LandingContainer></LandingContainer>
                <LandingFooterContainer></LandingFooterContainer>
            </div>
        )
    } 
}