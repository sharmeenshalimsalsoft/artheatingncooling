import { MotionConfig } from "motion/react";
import "antd/dist/reset.css";
import "./App.css";
import AppRoutes from "./Routes.tsx";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppRoutes />
    </MotionConfig>
  );
}

export default App;
