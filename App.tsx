import AppNavigation from "./src/navigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigation />
            
        </GestureHandlerRootView>
  );
};
