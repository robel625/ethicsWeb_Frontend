import "./styles.css";
import React, { useEffect, useState, Suspense, lazy } from "react";
import 'antd/dist/antd.css';
import Modal from "./components/Modal.css/Modal";
import FormContext from "./Contexts/FormContext";
import success from "./assets/success.png";
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "./translation";
import { ContextProvider } from "./Contexts/ContextProvider";
import Loader from "./components/Loader"; // Create a Loader component for the animation

// const queryClient = new QueryClient();

// Lazy load components
const AccountBox = lazy(() => {
  const preloadPromise = import("./components/accountBox");
  // Mark this import as high priority
  preloadPromise.then = function(onfulfilled, onrejected) {
    return Promise.prototype.then.call(
      this,
      (value) => {
        // Schedule the onfulfilled callback with high priority
        return Promise.resolve().then(() => onfulfilled(value));
      },
      onrejected
    );
  };
  return preloadPromise;
});
const LeftSide = lazy(() => import("./components/LeftSide"));

const loadLibrary = async () => {
  const { QueryClient, QueryClientProvider } = await import('@tanstack/react-query');
  return { QueryClient, QueryClientProvider };
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const user = useSelector((state) => state.user);

  const [queryClient, setQueryClient] = React.useState(null);

  React.useEffect(() => {
    loadLibrary().then(({ QueryClient }) => {
      setQueryClient(new QueryClient());
    });
  }, []);

  
  useEffect(() => {
    if (upload) {
      setIsOpen(true);
      localStorage.setItem('ticket', user.ticket);
    }

    // Simulate some initialization logic or API calls
    const initializeApp = async () => {
      // Replace this with actual initialization logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
      setLoading(false); // Set loading to false once initialization is done
    };

    initializeApp();
  }, [upload, user]);

  // if (loading) {
  //   // Render the loading animation while the app initializes
  //   return (
  //     <div
  //       style={{
  //         width: "100%",
  //         height: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "#f5f5f5",
  //       }}
  //     >
  //       <Loader />
  //     </div>
  //   );
  // }

  if (!queryClient) return <Loader />;


  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <FormContext.Provider value={{ upload, setUpload }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              backgroundColor: "#69bf70",
            }}
          >
            {/* <div className="signUp-container" style={{ display: "flex" }}>
              <Suspense fallback={<Loader />}>
                <LeftSide />
                <div className="signUp-right signUp-column">
                  <AccountBox />
                </div>
              </Suspense>
              <Modal
                isOpen={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
              >
                {i18n.language === "en" ? (
                  <div className="popup" id="popup">
                    <img src={success} alt="success" />
                    <h2>Thank You!</h2>
                    <p className="mt-1 text-xl">
                      Ticket Number :{" "}
                      <span style={{ color: "#f9a34c" }}>{user.ticket}</span>
                    </p>
                    <p className="mt-2">
                      Your Report has been successfully submitted. Thanks!
                    </p>
                    <p style={{ color: "#f9a34c" }}>
                      Save your Ticket Number. You'll need it to check the status
                      of your report.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="popup" id="popup">
                    <img src={success} alt="success" />
                    <h2>እናመሰግናለን!</h2>
                    <p className="text-xl">
                      የትኬት ቁጥር :{" "}
                      <span style={{ color: "#f9a34c" }}>{user.ticket}</span>
                    </p>
                    <p className="mt-4 text-lg">ጥቆማዎትን ተቀብለናል. እናመሰግናለን!</p>
                    <p className="text-base" style={{ color: "#f9a34c" }}>
                      የትኬት ቁጥር መዝግበው ይያዙ ያቀረቡትን ጥቆማ ለመከታተል ይጠቅሞታል፡፡
                    </p>
                    <button
                      type="button"
                      className="text-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      እሺ
                    </button>
                  </div>
                )}
              </Modal>
            </div> */}

<div className="signUp-container" style={{ display: "flex" }}>
              {/* Each component has its own Suspense boundary */}
              {/* <Suspense fallback={<div className="left-side-loader"><Loader /></div>}> */}
                <LeftSide />
              {/* </Suspense> */}
              
              <div className="signUp-right signUp-column">
                <Suspense fallback={<div className="account-box-loader"><Loader /></div>}>
                  <AccountBox />
                </Suspense>
              </div>
              
              <Suspense fallback={<div style={{ display: isOpen ? 'block' : 'none' }}><Loader /></div>}>
                <Modal
                  isOpen={isOpen}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                >
                  {i18n.language === "en" ? (
                    <div className="popup" id="popup">
                      <img src={success} alt="success" />
                      <h2>Thank You!</h2>
                      <p className="mt-1 text-xl">
                        Ticket Number :{" "}
                        <span style={{ color: "#f9a34c" }}>{user.ticket}</span>
                      </p>
                      <p className="mt-2">
                        Your Report has been successfully submitted. Thanks!
                      </p>
                      <p style={{ color: "#f9a34c" }}>
                        Save your Ticket Number. You'll need it to check the status
                        of your report.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <div className="popup" id="popup">
                      <img src={success} alt="success" />
                      <h2>እናመሰግናለን!</h2>
                      <p className="text-xl">
                        የትኬት ቁጥር :{" "}
                        <span style={{ color: "#f9a34c" }}>{user.ticket}</span>
                      </p>
                      <p className="mt-4 text-lg">ጥቆማዎትን ተቀብለናል. እናመሰግናለን!</p>
                      <p className="text-base" style={{ color: "#f9a34c" }}>
                        የትኬት ቁጥር መዝግበው ይያዙ ያቀረቡትን ጥቆማ ለመከታተል ይጠቅሞታል፡፡
                      </p>
                      <button
                        type="button"
                        className="text-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        እሺ
                      </button>
                    </div>
                  )}
                </Modal>
              </Suspense>
            </div>
          </div>
        </FormContext.Provider>
      </ContextProvider>
    </QueryClientProvider>
  );
}

