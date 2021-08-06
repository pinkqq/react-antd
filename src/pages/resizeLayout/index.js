// import { Layout } from 'antd';
import { useState } from 'react';
import './style.css';

// const { Header, Content, Sider } = Layout;

export default function ResizeLayout() {
  const [siderWidth, setSiderWidth] = useState(
    parseInt(localStorage.getItem('siderWidth')) || 150,
  );
  const [dragging, setDragging] = useState(false);
  const [startPageX, setStartPageX] = useState(0);
  const pxWidth = `${siderWidth}px`;
  const handleMouseDown = (event) => {
    setStartPageX(event.pageX);
    setDragging(true);
  };
  const handleMouseMove = (event) => {
    const currentSiderWidth = siderWidth + event.pageX - startPageX;
    setSiderWidth(currentSiderWidth);
    setStartPageX(event.pageX);
  };
  const handleMouseUp = () => {
    setDragging(false);
    localStorage.setItem('siderWidth', siderWidth);
  };
  return (
    // <Layout>
    //   <Header>Header</Header>
    //   <Layout>
    //     <Sider style={{ backgroundColor: '#fff' }}>Sider</Sider>
    //     <Content>Content</Content>
    //   </Layout>
    // </Layout>
    <div className="layout" style={{ paddingLeft: pxWidth }}>
      <div className="sider" style={{ width: pxWidth }}>
        sider
      </div>
      <div className="header">header</div>
      <div className="content">content</div>
      <div
        className="sider-resizer"
        style={{ left: pxWidth }}
        onMouseDown={handleMouseDown}
      >
        {dragging && (
          <div
            className="resize-mask"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        )}
      </div>
    </div>
  );
}
