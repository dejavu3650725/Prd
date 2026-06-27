import React, { useState } from 'react';
import TermsModal from './TermsModal';
import './Footer.css';

function Footer() {
  const [modalType, setModalType] = useState(null);

  const openTerms = (e) => {
    e.preventDefault();
    setModalType('terms');
  };

  const openPrivacy = (e) => {
    e.preventDefault();
    setModalType('privacy');
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <footer className="app-footer">
      <div className="footer-links">
        <a href="#" onClick={openTerms}>이용약관</a>
        <span className="footer-divider">|</span>
        <a href="#" onClick={openPrivacy} className="privacy-link">개인정보처리방침</a>
      </div>
      <div className="footer-info">
        <p>정보관리책임자: 금정민 (example@school.edu)</p>
        <p>Copyright &copy; 2026 금정민. All rights reserved.</p>
      </div>

      <TermsModal 
        isOpen={modalType !== null} 
        onClose={closeModal} 
        type={modalType} 
      />
    </footer>
  );
}

export default Footer;
