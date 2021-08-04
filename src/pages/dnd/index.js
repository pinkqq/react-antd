import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//初始化列表数据
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + 1}`,
    content: `this is content ${k + 1}`,
  }));

// 元素移动
const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
};

// 设置样式
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // 拖拽的时候背景变化
  background: isDragging ? 'lightgreen' : '#ffffff',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const grid = 8;

const getListStyle = (isDraggingOver) => {
  return {
    background: isDraggingOver ? 'darkgreen' : 'gray',
    padding: grid,
    width: 250,
  };
};

const Dnd = () => {
  const [items, setItems] = useState(getItems(11));

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    setItems((pre) => move(pre, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <center>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => {
            return (
              <div
                //provided.droppableProps应用的相同元素.
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </center>
    </DragDropContext>
  );
};

export default Dnd;
