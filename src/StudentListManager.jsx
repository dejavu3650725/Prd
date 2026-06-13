import React, { useState } from 'react';
import './StudentListManager.css';

function StudentListManager({ students, setStudents }) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    const newStudents = inputText
      .split(/[\n,]+/)
      .map(name => name.trim())
      .filter(name => name !== '');
      
    if (newStudents.length > 0) {
      // Remove duplicates
      const uniqueNewStudents = newStudents.filter(name => !students.includes(name));
      setStudents([...students, ...uniqueNewStudents]);
      setInputText('');
    }
  };

  const handleRemove = (indexToRemove) => {
    setStudents(students.filter((_, index) => index !== indexToRemove));
  };

  const handleClearAll = () => {
    if (confirm('모든 학생을 삭제하시겠습니까?')) {
      setStudents([]);
    }
  };

  return (
    <div className="student-manager">
      <h2>
        <span className="material-symbols-outlined">group</span>
        학생 명단 관리
      </h2>
      
      <div className="input-group">
        <textarea 
          placeholder="이름을 입력하세요 (엔터나 쉼표로 구분하여 여러 명 동시 입력 가능)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="3"
        />
        <button onClick={handleAdd} className="add-btn">
          <span className="material-symbols-outlined">person_add</span>
          추가하기
        </button>
      </div>

      <div className="list-header">
        <span>총 {students.length}명</span>
        {students.length > 0 && (
          <button onClick={handleClearAll} className="clear-btn">
            전체 삭제
          </button>
        )}
      </div>

      <div className="student-list">
        {students.length === 0 ? (
          <p className="empty-msg">학생을 추가해주세요!</p>
        ) : (
          students.map((student, index) => (
            <div key={index} className="student-item">
              <span>{student}</span>
              <button onClick={() => handleRemove(index)} className="remove-btn">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentListManager;
