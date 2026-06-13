import React, { useState, useEffect } from 'react';
import './App.css';
import StudentListManager from './StudentListManager';
import SlotMachine from './SlotMachine';
import SecretModal from './SecretModal';
import StudentGraph from './StudentGraph';

function App() {
  // 상태 관리 (localStorage 초기화 연동)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('randomPresenter_students');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [secretQueue, setSecretQueue] = useState(() => {
    const saved = localStorage.getItem('randomPresenter_secretQueue');
    return saved ? JSON.parse(saved) : [];
  });

  const [drawCount, setDrawCount] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // 비밀 모달 관련 상태
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  // 로컬 스토리지 자동 저장
  useEffect(() => {
    localStorage.setItem('randomPresenter_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('randomPresenter_secretQueue', JSON.stringify(secretQueue));
  }, [secretQueue]);

  // 비밀 트리거 클릭 핸들러 (연속 3번 클릭)
  const handleSecretTrigger = () => {
    setSecretClickCount(prev => prev + 1);
    
    if (clickTimer) clearTimeout(clickTimer);
    
    const newTimer = setTimeout(() => {
      setSecretClickCount(0); // 1초 내에 3번을 안 누르면 초기화
    }, 1000);
    
    setClickTimer(newTimer);
  };

  useEffect(() => {
    if (secretClickCount >= 3) {
      setIsSecretModalOpen(true);
      setSecretClickCount(0);
      if (clickTimer) clearTimeout(clickTimer);
    }
  }, [secretClickCount, clickTimer]);

  // 뽑기 실행 로직
  const handleDraw = () => {
    if (students.length === 0) {
      alert("학생 명단이 비어있습니다. 학생을 먼저 추가해주세요!");
      return;
    }
    
    if (drawCount > students.length) {
      alert(`명단에 있는 학생 수(${students.length}명)보다 많이 뽑을 수 없습니다.`);
      return;
    }

    setIsDrawing(true);
    setSelectedStudents([]); // 기존 결과 초기화

    setTimeout(() => {
      let results = [];
      let tempQueue = [...secretQueue];
      
      // 뽑을 인원만큼 반복
      for (let i = 0; i < drawCount; i++) {
        let picked = null;
        
        // 1. 비밀 대기열에 학생이 있고, 전체 명단에도 존재하며, 이미 뽑힌 학생이 아닌 경우
        while (tempQueue.length > 0) {
          const secretCandidate = tempQueue.shift(); // 큐에서 꺼냄
          if (students.includes(secretCandidate) && !results.includes(secretCandidate)) {
            picked = secretCandidate;
            break;
          }
        }
        
        // 2. 비밀 대기열로 결정되지 않은 경우, 일반 랜덤 추출
        if (!picked) {
          const availableStudents = students.filter(s => !results.includes(s));
          if (availableStudents.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableStudents.length);
            picked = availableStudents[randomIndex];
          }
        }
        
        if (picked) {
          results.push(picked);
        }
      }

      setSecretQueue(tempQueue); // 사용된 비밀 큐 갱신
      setSelectedStudents(results);
      setIsDrawing(false);
    }, 3000); // 3초간 슬롯머신 돌아감
  };

  return (
    <div className="app-container">
      <h1>
        <span className="material-symbols-outlined" style={{ fontSize: '1.2em' }}>school</span>
        랜덤 발표자 뽑기
      </h1>
      
      <div className="top-controls">
        <label>뽑을 인원 수:</label>
        <input 
          type="number" 
          min="1" 
          max={Math.max(1, students.length)}
          value={drawCount}
          onChange={(e) => setDrawCount(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <label>명</label>
      </div>

      <StudentGraph students={students} selectedStudents={selectedStudents} />

      <div className="main-content">
        <SlotMachine 
          isDrawing={isDrawing} 
          selectedStudents={selectedStudents}
          allStudents={students}
          onDraw={handleDraw}
        />
        
        <StudentListManager 
          students={students} 
          setStudents={setStudents} 
        />
      </div>

      {/* 비밀 모달 트리거 영역 (우측 하단) */}
      <div 
        className="secret-trigger" 
        onClick={handleSecretTrigger}
        title="" // 툴팁 숨김
      />

      <SecretModal 
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        allStudents={students}
        secretQueue={secretQueue}
        setSecretQueue={setSecretQueue}
      />
    </div>
  );
}

export default App;
