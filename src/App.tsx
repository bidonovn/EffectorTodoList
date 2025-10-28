import React from 'react';
import {
  ThemeProvider,
  themeOrnamentDefault,
} from '@ornament-ui/kit/ThemeProvider';
import { Container } from '@ornament-ui/kit/Container';
import Body from './components/Body';

const App = () => (
  <ThemeProvider theme={themeOrnamentDefault}>
    <Container gutters="m">
      <Body />
    </Container>
  </ThemeProvider>
);

export default App;
