import React, { useState } from 'react';
import './SecretModal.css';

function SecretModal({ isOpen, onClose, allStudents, secretQueue, setSecretQueue }) {
  const [selectedStudent, setSelectedStudent] = useState('');

  if (!isOpen) return null;

  const handleAddSecret = () => {
    if (selectedStudent) {
      setSecretQueue([...secretQueue, selectedStudent]);
      setSelectedStudent('');
    }
  };

  const handleRemoveSecret = (index) => {
    setSecretQueue(secretQueue.filter((_, i) => i !== index));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2>
          <span className="material-symbols-outlined">visibility_off</span>
          비밀 설정
        </h2>
        <p>다음에 무조건 당첨될 학생을 미리 지정합니다.</p>

        <div className="secret-controls">
          <select 
            value={selectedStudent} 
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">학생을 선택하세요</option>
            {allStudents.map((student, idx) => (
              <option key={idx} value={student}>{student}</option>
            ))}
          </select>
          <button onClick={handleAddSecret} className="add-secret-btn">지정하기</button>
        </div>

        <div className="secret-queue-list">
          <h3>다음 당첨 대기열 (순서대로)</h3>
          {secretQueue.length === 0 ? (
            <p className="empty-q">대기열이 없습니다.</p>
          ) : (
            secretQueue.map((student, index) => (
              <div key={index} className="queue-item">
                <span>{index + 1}. {student}</span>
                <button onClick={() => handleRemoveSecret(index)}>
                  <span className="material-symbols-outlined">remove_circle_outline</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SecretModal;
