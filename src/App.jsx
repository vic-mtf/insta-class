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
        //alignItems: "center",
        height: "100dvh",
        width: "100dvw",
        overflow: "auto",
        flexDirection: "column",
      }}>
      {<RouterProvider router={router(connected)} />}
    </div>
  );
}
