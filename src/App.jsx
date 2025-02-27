import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useSelector } from "react-redux";

export default function App() {
  const connected = useSelector((store) => store.user.connected);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        flex: 1,
        overflow: "hidden",
        flexDirection: "column",
        width: "100%",
        height: "100dvh",
      }}>
      {<RouterProvider router={router(connected)} />}
    </div>
  );
}
