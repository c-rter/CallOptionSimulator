import  React  from  'react';
import { StateProvider } from  './src/providers/StateProvider';

export const wrapRootElement = ({ element }) => {
  return (
    <StateProvider>
      {element}
    </StateProvider>
  )
}