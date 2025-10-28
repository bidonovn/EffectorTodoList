import React from 'react';
import TaskInput from '../TaskInput';
import ProgressBar from '../ProgressBar';
import TodoList from '../TodoList';
import styles from './Body.module.scss';
import { Typography } from '@ornament-ui/kit/__inner__/esm/components/Typography';

const Body = () => (
  <div className={styles.bodyContainer}>
    <Typography variant="heading-xl" align="center">
      Список дел
    </Typography>
    <TaskInput />
    <ProgressBar />
    <TodoList />
  </div>
);

export default Body;
