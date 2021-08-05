import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './style.css';
import getInitialData from './get-initial-data';
import Column from './component/Column';

function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const DndPro = () => {
  const [state, setState] = useState(() => getInitialData());

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.type === 'column') {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index,
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index,
      );

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      setState(newState);
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId];
    const destinationColumn = state.columns[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    newDestinationColumn.items.splice(result.destination.index, 0, item);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    setState(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dnd-pro">
        <Droppable
          droppableId="all-droppables"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.columnOrder.map((columnId, index) => (
                <Column
                  key={columnId}
                  column={state.columns[columnId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DndPro;
