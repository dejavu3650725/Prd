import React, { useMemo, useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import './StudentGraph.css';

function StudentGraph({ students, selectedStudents = [] }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });
  const containerRef = useRef(null);
  const fgRef = useRef();

  // Vibrant color palette
  const colors = [
    '#ff6b6b', '#fca311', '#4ecdc4', '#1a535c', '#ffe66d',
    '#8338ec', '#3a86ff', '#ff006e', '#fb5607', '#2a9d8f'
  ];
  
  // Create graph data
  const graphData = useMemo(() => {
    const nodes = students.map((s, idx) => {
      const isSelected = selectedStudents.includes(s);
      return {
        id: s,
        name: s,
        color: colors[idx % colors.length],
        isSelected
      };
    });
    
    const links = [];
    const latestWinner = selectedStudents.length > 0 ? selectedStudents[0] : null;

    if (latestWinner && students.includes(latestWinner)) {
      // 발표자가 있으면 중앙(주인공)에 두고 나머지와 연결 (Star Graph 형태)
      students.forEach(s => {
        if (s !== latestWinner) {
          links.push({ source: s, target: latestWinner });
        }
      });
    } else {
      // 발표자가 없으면 꼬리물기
      for (let i = 0; i < students.length - 1; i++) {
        links.push({
          source: students[i],
          target: students[i + 1]
        });
      }
    }
    
    return { nodes, links };
  }, [students, selectedStudents]);

  useEffect(() => {
    if (selectedStudents.length > 0 && fgRef.current) {
      fgRef.current.d3ReheatSimulation(); // 발표자가 나오면 시뮬레이션 다시 가동해서 모이게 함
    }
  }, [selectedStudents]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 400
        });
      }
    };
    
    handleResize(); // Initial
    window.addEventListener('resize', handleResize);
    
    const timeoutId = setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="graph-container" ref={containerRef}>
      <div className="graph-overlay">
        <h3>
          <span className="material-symbols-outlined">hub</span>
          학생 연결망
        </h3>
      </div>
      
      {students.length === 0 ? (
        <div className="graph-empty">명단에 학생이 없습니다.</div>
      ) : (
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel="name"
          linkColor={() => '#a0c4ff'}
          linkWidth={3}
          nodeRelSize={8}
          d3VelocityDecay={0.3} // 좀 더 활발하게 움직이게
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = node.isSelected ? (20 / globalScale) : (14 / globalScale);
            ctx.font = `${node.isSelected ? 'bold' : '500'} ${fontSize}px Paperozi, Roboto, sans-serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.8);

            // Node Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 10;

            // Background pill
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.roundRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1], bckgDimensions[1]/2);
            ctx.fill();

            // Reset shadow for text
            ctx.shadowBlur = 0;
            
            // Text Highlight if selected
            if (node.isSelected) {
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 4 / globalScale;
              ctx.strokeRect(node.x - bckgDimensions[0] / 2 - 2, node.y - bckgDimensions[1] / 2 - 2, bckgDimensions[0] + 4, bckgDimensions[1] + 4);
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Determine text color based on background luminance roughly, or just use white since we picked vibrant colors
            ctx.fillStyle = '#ffffff'; 
            ctx.fillText(label, node.x, node.y);
            
            node.__bckgDimensions = bckgDimensions;
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
          }}
        />
      )}
    </div>
  );
}

export default StudentGraph;
