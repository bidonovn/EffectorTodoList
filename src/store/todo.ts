import { createStore, createEvent, sample, createEffect } from 'effector';

export type TodoTask = {
  id: string;
  title: string;
  isFinished: boolean;
  createdAt: number;
};

export const $todoList = createStore<TodoTask[]>([]);

export const taskAdded = createEvent<TodoTask>();
export const taskRemoved = createEvent<string>();
export const markedAsFinished = createEvent<string>();
export const listFetched = createEvent();

const saveListFx = createEffect((todoList: TodoTask[]) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
});

const getListFx = createEffect(() => {
  const listFromLocalStorage = localStorage.getItem('todoList') || '';
  return JSON.parse(listFromLocalStorage);
});

sample({
  clock: listFetched,
  target: getListFx,
});

sample({
  clock: taskAdded,
  source: $todoList,
  fn: (todoList: TodoTask[], newTask: TodoTask) => [...todoList, newTask],
  target: $todoList,
});

sample({
  clock: [taskAdded, taskRemoved, markedAsFinished],
  source: $todoList,
  target: saveListFx,
});

$todoList.on(getListFx.done, (_, { params, result }) => result);

$todoList.on(markedAsFinished, (todoList, taskId: string) => {
  const newTodoList = [...todoList];
  const markedTaskIndex = newTodoList.findIndex(({ id }) => id === taskId);
  newTodoList[markedTaskIndex] = {
    ...newTodoList[markedTaskIndex],
    isFinished: true,
  };
  return newTodoList;
});

$todoList.on(taskRemoved, (todoList, taskId: string) =>
  todoList.filter(({ id }) => id !== taskId)
);

export const $finishedTasks = $todoList.map((todoTasks) =>
  todoTasks
    .filter(({ isFinished }) => isFinished)
    .sort((a, b) => b.createdAt - a.createdAt)
);
export const $unFinishedTasks = $todoList.map((todoTasks) =>
  todoTasks
    .filter(({ isFinished }) => !isFinished)
    .sort((a, b) => b.createdAt - a.createdAt)
);
