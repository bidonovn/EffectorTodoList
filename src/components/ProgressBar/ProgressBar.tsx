import React from 'react';
import styles from './ProgressBar.module.scss';
import { useUnit } from 'effector-react';
import { $finishedTasks, $todoList } from 'store/todo';

const ProgressBar = () => {
  const { $todoList: todoList, $finishedTasks: finishedTasks } = useUnit({
    $todoList,
    $finishedTasks,
  });

  const finishedTasksLength = finishedTasks.length;
  const todoTasksLength = todoList.length;

  const finishedTasksPercent =
    finishedTasksLength && todoTasksLength
      ? (finishedTasks.length / todoList.length) * 100
      : 0;

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${finishedTasksPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
