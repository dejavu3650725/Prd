import React, { useState } from 'react';
import Footer from './Footer';
import './Gateway.css';

function Gateway({ onPass }) {
  const [isChecked, setIsChecked] = useState(false);

  const guidelines = [
    { title: "활용 목적", desc: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요." },
    { title: "주도적 학습", desc: "생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요." },
    { title: "비판적 검증", desc: "생성형 AI가 틀릴 수 있다는 점을 알아요." },
    { title: "사고의 확장", desc: "생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요." },
    { title: "안전과 관계", desc: "나의 정보와 비밀을 말하지 않아요." },
    { title: "투명성·윤리", desc: "생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요." },
  ];

  return (
    <div className="gateway-container">
      <div className="gateway-card">
        <h1>🚨 생성형 AI 윤리 핵심 가이드</h1>
        <p className="subtitle">본 게임에 입장하기 전, 아래 가이드를 꼭 읽고 약속해주세요!</p>

        <div className="guidelines-list">
          {guidelines.map((item, idx) => (
            <div key={idx} className="guideline-item">
              <span className="guideline-badge">가이드 {idx + 1}</span>
              <div className="guideline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="agreement-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>사진에 있는 윤리 핵심 가이드를 빠짐없이 읽고 이를 지키겠습니다.</span>
          </label>
        </div>

        <button
          className={`start-btn ${isChecked ? 'active' : 'disabled'}`}
          disabled={!isChecked}
          onClick={onPass}
        >
          시작 하기 🚀
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Gateway;
