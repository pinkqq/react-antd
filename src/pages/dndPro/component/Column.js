import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ItemList from './ItemList';

const Column = React.memo(function Column({ column, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="column-title" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <ItemList column={column} index={index} />
        </div>
      )}
    </Draggable>
  );
});

export default Column;
