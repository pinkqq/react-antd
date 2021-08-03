import { useState } from 'react';
require('./style.css');

const DragDrop = () => {
  const [list, setList] = useState(initList);
  const [dragging, setDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [startPageY, setStartPageY] = useState(0);
  const [offsetPageY, setOffsetPageY] = useState(0);
  const lineHeight = 42;

  function initList() {
    const list = [];
    for (let i = 0; i < 10; i++) {
      list.push(`Item ${i + 1}`);
    }
    return list;
  }
  const move = (arr, startIndex, toIndex) => {
    arr = arr.slice();
    arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
    return arr;
  };

  const handleMounseDown = (evt, index) => {
    setDragging(true);
    setStartPageY(evt.pageY);
    setDraggingIndex(index);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartPageY(0);
    setDraggingIndex(-1);
  };

  const handleMouseMove = (evt) => {
    let offset = evt.pageY - startPageY;
    if (offset > lineHeight && draggingIndex < list.length - 1) {
      // move down
      offset -= lineHeight;
      setList((pre) => move(pre, draggingIndex, draggingIndex + 1));
      setDraggingIndex((pre) => pre + 1);
      setStartPageY((pre) => pre + lineHeight);
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // move up
      offset += lineHeight;
      setList((pre) => move(pre, draggingIndex, draggingIndex - 1));
      setDraggingIndex((pre) => pre - 1);
      setStartPageY((pre) => pre - lineHeight);
    }
    setOffsetPageY(offset);
  };

  const getDraggingStyle = (index) => {
    if (index !== draggingIndex) return {};
    return {
      backgroundColor: 'lightsteelblue',
      transform: `translate(10px, ${offsetPageY}px)`,
    };
  };

  return (
    <div className="my-dnd">
      <ul>
        {list.map((text, i) => (
          <li
            key={text}
            onMouseDown={(evt) => handleMounseDown(evt, i)}
            style={getDraggingStyle(i)}
          >
            {text}
          </li>
        ))}
      </ul>
      {dragging && (
        <div
          className="my-dnd-mask"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      )}
    </div>
  );
};
export default DragDrop;
