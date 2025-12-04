import React, { useEffect } from "react";
import Mainroutes from "./routes/Mainroutes";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/actions/userActions";
import { initializePushNotifications } from "./utils/pushNotifications";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Initialize push notifications when user is logged in
  useEffect(() => {
    if (user) {
      console.log("User logged in, initializing push notifications...");
      initializePushNotifications()
        .then((result) => {
          if (result.success) {
            console.log('Push notifications initialized successfully');
          } else {
            console.log('Push notifications setup:', result.message);
          }
        })
        .catch((err) => console.error('Push notification error:', err));
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen">
      <Mainroutes />
    </div>
  );
};

export default App;
