import React from 'react';
import './TermsModal.css';

const TermsContent = () => (
  <div className="terms-content">
    <h2>랜덤 발표자 추출 웹앱 이용약관</h2>
    
    <h3>제1조 (목적)</h3>
    <p>본 약관은 사용자가 '랜덤 발표자 추출 웹앱'(이하 '서비스')을 이용함에 있어 필요한 조건 및 절차, 사용자와 서비스 제공자의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>

    <h3>제2조 (서비스의 성격)</h3>
    <p>1. 본 서비스는 교육 및 발표 진행의 편의를 위해 무작위로 발표자를 선정해 주는 유틸리티 프로그램입니다.</p>
    <p>2. 본 서비스는 웹 브라우저 상에서 동작하는 프론트엔드 전용 애플리케이션으로, 별도의 서버에 사용자 데이터를 저장하거나 전송하지 않습니다.</p>

    <h3>제3조 (사용자의 의무)</h3>
    <p>1. 사용자는 본 서비스를 교육적, 긍정적인 목적으로 사용해야 합니다.</p>
    <p>2. 사용자는 서비스에 입력하는 이름 등 정보와 관련하여 제3자의 권리를 침해하거나 불쾌감을 주는 단어를 사용하지 않아야 합니다.</p>
    <p>3. 생성형 AI 윤리 핵심 가이드를 준수하며, 안전하고 책임감 있는 자세로 서비스를 이용해야 합니다.</p>

    <h3>제4조 (책임의 한계)</h3>
    <p>1. 본 서비스는 무작위 추출 알고리즘을 사용하며, 추출 결과에 대해 서비스 제공자는 어떠한 책임도 지지 않습니다.</p>
    <p>2. 서비스 이용 중 발생하는 브라우저 오류, 데이터 유실(입력한 학생 명단 초기화 등)에 대해 서비스 제공자는 책임지지 않습니다. (명단은 브라우저의 로컬 환경에만 임시 저장됩니다.)</p>

    <h3>제5조 (약관의 변경)</h3>
    <p>서비스 제공자는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.</p>

    <p className="terms-date"><strong>시행일자</strong>: 2026년 6월 27일</p>
  </div>
);

const PrivacyContent = () => (
  <div className="terms-content">
    <h2>랜덤 발표자 추출 웹앱 개인정보처리방침</h2>
    
    <p>본 서비스(랜덤 발표자 추출 웹앱)는 사용자의 개인정보 보호를 매우 중요하게 생각하며, 다음과 같이 개인정보처리방침을 수립하여 운영하고 있습니다.</p>

    <h3>1. 개인정보의 수집 및 이용 목적</h3>
    <p>본 서비스는 발표자 선정을 위해 사용자가 입력하는 '학생 이름(또는 참가자 이름)'을 입력받습니다. 이 정보는 오직 화면상에서 랜덤 추첨을 진행하기 위한 목적으로만 사용됩니다.</p>

    <h3>2. 수집하는 개인정보 항목</h3>
    <p>- 수집 항목: 참가자 이름 또는 닉네임 (사용자가 직접 입력하는 텍스트)</p>
    <p>- 본 서비스는 회원가입, 로그인 등을 요구하지 않으며, 이메일이나 전화번호 등 고유 식별 정보를 수집하지 않습니다.</p>

    <h3>3. 개인정보의 보유 및 이용 기간</h3>
    <p>- 본 서비스는 <strong>서버리스(Serverless) 형태의 프론트엔드 애플리케이션</strong>입니다.</p>
    <p>- 사용자가 입력한 이름 데이터는 외부 서버로 전송되거나 저장되지 않으며, 오로지 사용자의 웹 브라우저 내 메모리(로컬 환경)에만 일시적으로 존재합니다.</p>
    <p>- 사용자가 웹 브라우저 창을 닫거나 새로고침할 경우, 입력된 데이터는 즉시 파기(소멸)됩니다.</p>

    <h3>4. 개인정보의 제3자 제공</h3>
    <p>본 서비스는 수집된 어떠한 정보도 외부 서버로 전송하지 않으므로, 제3자에게 제공할 수 있는 데이터 자체가 존재하지 않습니다.</p>

    <h3>5. 사용자의 권리</h3>
    <p>사용자는 언제든지 브라우저를 종료함으로써 데이터 이용을 즉시 중단하고 모든 정보를 파기할 수 있습니다.</p>

    <h3>6. 문의사항</h3>
    <p>본 개인정보처리방침에 대한 문의는 서비스 운영자(선생님)에게 직접 문의해 주시기 바랍니다.</p>

    <p className="terms-date"><strong>시행일자</strong>: 2026년 6월 27일</p>
  </div>
);

function TermsModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="terms-close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="terms-scroll-area">
          {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
        </div>
        
        <div className="terms-modal-actions">
          <button className="terms-confirm-btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
