/*import React from "react";

import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Roles from "../../components/Roles/Roles";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
//import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      
      <Hero />
      <Features />
      <Roles />
      <CTA />
      <Footer />
    </>
  );
};

export default HomePage;*/
import React from "react";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Roles from "../../components/Roles/Roles";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

// 1. Import the hook from your context file
import { useModal } from "../../contextAPI/ModalContext";
import LoginPage from "../LoginPage/LoginPage";

const HomePage = () => {
  // 2. Initialize the hook
  const { openModal } = useModal();

  return (
    <>
      <Hero />
      
      {/* 3. Add this test button in a visible spot (e.g., between Hero and Features) */}
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <button 
          onClick={() => openModal(
          

            <LoginPage/>
          )}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px' }}
        >
          Verify Reusable Modal
        </button>
      </div>

      <Features />
      <Roles />
      <CTA />
      <Footer />
    </>
  );
};

export default HomePage;