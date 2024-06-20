import React from 'react'
import { Navbar, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import financeTracker from '../assets/removebg-preview.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const navigate = useNavigate();
    function logout() {
        secureLocalStorage.removeItem('user_id');
        navigate('/');
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <Image style={{ width: '65px' }} src={financeTracker} />
                    Finance Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Button onClick={logout} variant='danger'><FontAwesomeIcon icon={faSignOut} /></Button>
            </Container>
        </Navbar>
    )
}

export default Header
