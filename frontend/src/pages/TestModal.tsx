import React from 'react';
import { useModal } from '../contextAPI/ModalContext';

const TestModal: React.FC = () => {
  const { openModal, closeModal } = useModal();

  const handleTest = () => {
    openModal(
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#4CAF50' }}>Test Successful!</h2>
        <p>The Context API is broadcasting correctly.</p>
        <button 
          onClick={closeModal}
          style={{ padding: '8px 16px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Close Modal
        </button>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1>Modal Task Verification</h1>
      <button 
        onClick={handleTest}
        style={{ padding: '15px 30px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Click to Test Reusable Modal
      </button>
    </div>
  );
};

export default TestModal;