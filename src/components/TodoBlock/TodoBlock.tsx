import { Card } from '@ornament-ui/kit/__inner__/esm/components/Card';
import { Typography } from '@ornament-ui/kit/__inner__/esm/components/Typography';
import React from 'react';
import type { TodoBlockProps } from './TodoBlock.types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@ornament-ui/kit/__inner__/esm/components/List';
import { DeleteIcon, TickIcon } from '@ornament-ui/icons';
import { useUnit } from 'effector-react';
import { markedAsFinished, taskRemoved } from 'store/todo';
import { IconButton } from '@ornament-ui/kit/__inner__/esm/components/IconButton';

const TodoBlock = ({ title, tasksList }: TodoBlockProps) => {
  const { markedAsFinished: finishTask, taskRemoved: removeTask } = useUnit({
    markedAsFinished,
    taskRemoved,
  });

  return (
    <Card borderWidth="s">
      <Typography variant="text-s" align="center">
        {title}
      </Typography>
      <List size="s">
        {tasksList.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} />
            <ListItemIcon>
              <IconButton
                size="xs"
                icon={TickIcon}
                variant="contained"
                color="primary"
                onClick={() => finishTask(item.id)}
              />
            </ListItemIcon>
            <ListItemIcon>
              <IconButton
                size="xs"
                icon={DeleteIcon}
                variant="outlined"
                color="primary"
                onClick={() => removeTask(item.id)}
              />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default TodoBlock;
