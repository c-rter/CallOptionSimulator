import  React  from  'react';
import { StateProvider } from  './src/providers/StateProvider';
import "./node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./src/styles/global.css"
import './node_modules/react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export  const  wrapRootElement = ({ element }) => {
  return <StateProvider>{element}</StateProvider>;
};