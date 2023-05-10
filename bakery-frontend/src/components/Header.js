import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
      <a class="navbar-brand me-2" href="http://localhost:3000/">
      <img
        src="https://i.imgur.com/WnhNlqY_d.webp?maxwidth=760&fidelity=grand"
        height="36"
        alt="GG Logo"
        loading="lazy"
       
      />
    </a>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
         

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Recipes
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href='/Quick'>Quick</MDBDropdownItem>
                  <MDBDropdownItem link href='/Breakfast'>Breakfast</MDBDropdownItem>
                  <MDBDropdownItem link href='/Lunch'>Lunch</MDBDropdownItem>
                  <MDBDropdownItem link href='/Dinner'>Dinner</MDBDropdownItem>
                  <MDBDropdownItem link href='/Dessert'>Dessert</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/Culture'>Culture</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/about'>AboutUs</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/contact'>Contact</MDBNavbarLink>
            </MDBNavbarItem>
            
          </MDBNavbarNav>
         
        
          <a class="navbar-brand me-2" href="/favorite">
      <img
        src="https://i.imgur.com/lvcGbQi.png"
        height="36"
        alt="GG Logo"
        loading="lazy"
       
      />
    </a>
    <a class="navbar-brand me-2" href="/profile">
      <img
        src=" https://i.imgur.com/egDdRr4.png"
        height="36"
        alt="GG Logo"
        loading="lazy"
       
      />
    </a>
          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
      
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export {Header};