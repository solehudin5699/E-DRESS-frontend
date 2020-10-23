import React from 'react';
import {StatusBar} from 'react-native';
import {Container} from 'native-base';
import AppRoutes from './routes/AppRoutes';
import ModalFilter from './components/ModalFilter';
import ModalConfirm from './components/ModalConfirm';
// import ModalEditDelete from './components/ModalEditDelete';
const App = () => {
  return (
    <Container>
      <StatusBar backgroundColor="#CBE15A" />
      <AppRoutes />
      {/* <ModalFilter /> */}
      <ModalConfirm />
    </Container>
  );
};

export default App;
