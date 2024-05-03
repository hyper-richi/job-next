import { Button } from '@mantine/core';
import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import './animation.module.scss';

const ItemTransition = ({
  item: { id, text },
  handleDelete,
}: {
  item: { id: number; text: string };
  handleDelete: (id: number) => void;
}) => {
  const [isInput, setIsInput] = useState(false);
  console.log('text: ', text);

  const handleSetIsInput = () => {
    setIsInput((prevIsInput) => !prevIsInput);
  };
  return (
    <div className='list-group-item'>
      <Button className='remove-btn' variant='danger' size='sm' onClick={() => handleDelete(id)}>
        &times;
      </Button>
      <button onClick={handleSetIsInput}>click</button>
      {isInput && text}
    </div>
  );
};

export default ItemTransition;
