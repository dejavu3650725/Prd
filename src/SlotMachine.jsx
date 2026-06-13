import React, { useEffect, useState, useRef } from 'react';
import './SlotMachine.css';

// 개별 슬롯 컴포넌트
function Slot({ isDrawing, resultName, allStudents }) {
  const [displayNames, setDisplayNames] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isDrawing) {
      // 애니메이션을 위해 가짜 리스트 생성 (매우 긴 리스트)
      const shuffled = [...allStudents].sort(() => 0.5 - Math.random());
      const extendedList = [];
      // 30개 정도의 임의의 이름을 이어붙임
      for (let i = 0; i < 30; i++) {
        extendedList.push(shuffled[i % shuffled.length]);
      }
      setDisplayNames(extendedList);
    } else {
      if (resultName) {
        // 멈출 때, 마지막에 결과 이름이 오도록 설정
        setDisplayNames(prev => [...prev.slice(0, 29), resultName]);
      } else {
        // 대기 상태
        setDisplayNames(['❓']);
      }
    }
  }, [isDrawing, resultName, allStudents]);

  return (
    <div className="slot-container">
      <div 
        className={`slot-reel ${isDrawing ? 'spinning' : resultName ? 'stopped' : ''}`}
        ref={containerRef}
      >
        {displayNames.map((name, index) => (
          <div key={index} className="slot-item">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlotMachine({ isDrawing, selectedStudents, allStudents, onDraw }) {
  // 화면에 렌더링 할 슬롯 수 (아직 뽑기 전이면 1개 기본 표시)
  const renderCount = selectedStudents.length > 0 ? selectedStudents.length : 1;
  const slotsToRender = Array.from({ length: renderCount });

  return (
    <div className="slot-machine-wrapper">
      <div className="machine-header">
        <div className="lights">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <h2>럭키 드로우</h2>
      </div>

      <div className="slots-area">
        {slotsToRender.map((_, index) => (
          <Slot 
            key={index}
            isDrawing={isDrawing}
            resultName={selectedStudents[index]}
            allStudents={allStudents}
          />
        ))}
      </div>

      <button 
        className="draw-btn"
        onClick={onDraw} 
        disabled={isDrawing || allStudents.length === 0}
      >
        <span className="material-symbols-outlined">play_circle</span>
        {isDrawing ? '뽑는 중...' : '발표자 뽑기!'}
      </button>
    </div>
  );
}

export default SlotMachine;
