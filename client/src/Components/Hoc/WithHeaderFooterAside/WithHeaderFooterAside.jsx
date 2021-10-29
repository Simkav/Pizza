import Footer from '../../Footer/Footer';
import Aside from '../../AsideForms/Aside/Aside';
import cl from './WithHeaderFooterAside.module.css';
import Header from '../../HeaderForms/Header/Header';
import { useState } from 'react';

const WithHeaderFooterAside = (Component) => {
  return function Comp (props) {
    const [hamburgerMenuState, setHamburgerMenuState] = useState(false);
    return (
      <>
        <Header
          hamburgerMenuState={hamburgerMenuState}
          setHamburgerMenuState={setHamburgerMenuState}
        />
        <Aside
          hamburgerMenuState={hamburgerMenuState}
          setHamburgerMenuState={setHamburgerMenuState}
        />
        <div className={cl.content_container}>
          <Component />
        </div>
        <Footer />
      </>
    );
  };
};
export default WithHeaderFooterAside;
