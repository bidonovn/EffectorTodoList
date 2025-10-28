import React, { useEffect } from 'react';
import { Grid, GridItem } from '@ornament-ui/kit/Grid';
import { useUnit } from 'effector-react';
import {
  $finishedTasks,
  $unFinishedTasks,
  listFetched,
} from '../../store/todo';
import TodoBlock from '../TodoBlock';

const TodoList = () => {
  const {
    $finishedTasks: finishedTasks,
    $unFinishedTasks: unfinishedTasks,
    listFetched: getTodoList,
  } = useUnit({
    $finishedTasks,
    $unFinishedTasks,
    listFetched,
  });

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Grid columnGap="m">
      <GridItem col={{ xs: 12, s: 6 }}>
        <TodoBlock title="Нужно сделать" tasksList={unfinishedTasks} />
      </GridItem>
      <GridItem col={{ xs: 12, s: 6 }}>
        <TodoBlock title="Сделано" tasksList={finishedTasks} />
      </GridItem>
    </Grid>
  );
};

export default TodoList;
