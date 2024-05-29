import React, { useState, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from '@mantine/core';
// import './animation.module.scss';
import animationStyles from './animation.module.scss';
import ItemTransition from './ItemTransition';

const cardAnimation = {
  enter: animationStyles.cardEnter,
  enterActive: animationStyles.cardEnterActive,
  exit: animationStyles.cardDelete,
  exitActive: animationStyles.cardDeleteActive,
};

export function ListTransGroupExample() {
  const [items, setItems] = useState(() => [
    {
      id: 1,
      text: 'Buy eggs',
      nodeRef: createRef<HTMLDivElement>(),
    },
    {
      id: 2,
      text: 'Pay bills',
      nodeRef: createRef<HTMLDivElement>(),
    },
    {
      id: 3,
      text: 'Invite friends over',
      nodeRef: createRef<HTMLDivElement>(),
    },
    {
      id: 4,
      text: 'Fix the TV',
      nodeRef: createRef<HTMLDivElement>(),
    },
  ]);

  const handleDelete = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className='container' style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <TransitionGroup>
          {items
            /*  .map((item) => ({ ...item, nodeRef: createRef() })) */
            .map((item) => (
              <CSSTransition key={item.id} nodeRef={item.nodeRef} timeout={500} classNames={cardAnimation}>
                <div ref={item.nodeRef}>
                  <ItemTransition handleDelete={handleDelete} item={item} />
                </div>
                {/* <div className='list-group-item' ref={item.nodeRef}>
                  <Button className='remove-btn' variant='danger' size='sm' onClick={() => handleDelete(item.id)}>
                    &times;
                  </Button>
                  {item.text}
                </div> */}
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
      <Button
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems((items) => [
              ...items,
              {
                id: 5,
                text,
                nodeRef: createRef(),
              },
            ]);
          }
        }}
      >
        Add Item
      </Button>
    </div>
  );
}
