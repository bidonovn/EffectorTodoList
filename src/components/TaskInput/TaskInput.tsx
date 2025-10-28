import React, { useState } from 'react';
import { Input } from '@ornament-ui/kit/Input';
import { Button } from '@ornament-ui/kit/Button';
import { IconButton } from '@ornament-ui/kit/IconButton';
import { CloseIcon } from '@ornament-ui/icons';
import { Grid, GridItem } from '@ornament-ui/kit/Grid';
import { useUnit } from 'effector-react';
import { taskAdded } from 'store/todo';
import { capitalize } from 'utils/index';

const TaskInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const addTask = useUnit(taskAdded);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputError('');
  };

  const onReset = () => {
    setInputValue('');
  };

  const onAdd = () => {
    if (inputValue) {
      addTask({
        id: Math.random().toString(),
        title: capitalize(inputValue),
        isFinished: false,
        createdAt: new Date().valueOf(),
      });
      onReset();
    } else {
      setInputError('Заполните поле');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') {
      onAdd();
    }
  };

  return (
    <Grid columnGap="m">
      <GridItem col={{ xs: 8, m: 10 }}>
        <Input
          size="s"
          placeholder="Что нужно сделать?"
          onKeyDown={onKeyDown}
          name="taskInput"
          error={Boolean(inputError)}
          hint={inputError || ' '}
          onChange={onChangeInput}
          value={inputValue}
          fullWidth
          renderRight={() => (
            <IconButton
              variant="function"
              size="s"
              icon={CloseIcon}
              onClick={onReset}
            />
          )}
        />
      </GridItem>
      <GridItem col={{ xs: 4, m: 2 }}>
        <Button size="s" onClick={onAdd} fullWidth>
          Добавить
        </Button>
      </GridItem>
    </Grid>
  );
};

export default TaskInput;
