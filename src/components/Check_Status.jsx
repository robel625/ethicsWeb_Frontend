// import { MdOutlineCancel } from "react-icons/md";
// import { Button } from ".";
// import { chatData } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { GLOBALTYPES } from '../redux/actions/globalTypes';
// import { createPost, updatePost } from '../redux/actions/postAction';
// import pica from "pica";
import Modal from "./Modal.css/Modal";
import { useStateContext } from "../Contexts/ContextProvider";
import { postDataAPI } from "../utils/fetchData";
import Timeline from "./Timeline";
import close from "../assets/close.png"
import i18n from "../translation";
import { useTranslation } from "react-i18next";


const Check_Status = () => {
  const { t } = useTranslation();
  const {isClicked,setIsClicked, initialState } = useStateContext();

//   const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState([]);


  // Functions to open and close the modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

  const [ticketNumber, setTicketNumber] = useState(localStorage.getItem('ticket'));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Input validation
    if (!ticketNumber || !phoneNumber) {
      setError(t("Both fields are required!"));
      return;
    }

    if (phoneNumber !== "" &&
      !/^((0\d{9})|(7\d{8})|(9\d{8})|(251\d{9})|(\+251\d{9}))$/.test(phoneNumber) ||
      !/^(09|07|9|7|251|\+251)/.test(phoneNumber)
    ) {
      setError(t("Please Input a Valid Phone Number"));
      return;
    }

    try {
      setError("");
      setResponse(null);
      setAction([]);

      // Make a POST request to your backend
      // const res = await axios.post("https://your-backend-url.com/search", {
      //   ticketNumber,
      //   phoneNumber,
      // });
      const res = await postDataAPI(`mail/status/`, {
        ticketNumber,
        phoneNumber,
      });

      // console.log(res.data)
      const filteredActions = res.data.action?.filter(action => action.status !== null);
      const Received = {
        "id": 1,
        "category": null,
        "status": "Received",
        "priority": null,
        "remark": "New",
        "created_at":  res.data?.complain?.created_at,
        "updated_at": "2024-10-30T09:44:40.247693Z",
        "complain": 1,
        "user": 1,
        "assign_to": null
      }
      const filteredActions1 = res.data?.complain ? [...filteredActions, Received] : [];

      // console.log("filteredActions",filteredActions1)
      // Set the response from the backend
      setAction(filteredActions1);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response.data.error);
      // setError("An error occurred while searching. Please try again.");
    }
  };



  return (
    // <Modal isOpen={isClicked.check_status} onClose={setIsClicked(initialState)}>
        <div className="status_popup" id="status_popup">
          <div className="absolute right-2 top-2 cursor-pointer" onClick={() => setIsClicked(initialState)} >
            <img width={20} height={20} src={close} />
          </div>

          <div className="mt-10">
            <div className="font-bold text-2xl">{t("Track Case")}</div>


            <div className="ticketContainer">

            <form className="mt-6" onSubmit={handleSearch}>
              <div>
                <label htmlFor="ticketNumber" className="inboxTitle text-left text-lg mb-1">{t("Ticket Number")}</label>
                <div className="wrapper">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path
                          d="m448.678 128.219-10.607 10.608c-8.667 8.667-20.191 13.44-32.449 13.44s-23.78-4.773-32.448-13.44c-8.667-8.667-13.44-20.191-13.44-32.448s4.773-23.781 13.44-32.449l10.608-10.608L320.459 0 0 320.459l63.322 63.322 10.608-10.608c8.667-8.667 20.191-13.44 32.449-13.44s23.78 4.773 32.448 13.44c8.667 8.667 13.44 20.191 13.44 32.448s-4.773 23.781-13.44 32.449l-10.608 10.608L191.541 512 512 191.541l-63.322-63.322zM169.61 447.636c8.237-12.343 12.662-26.839 12.662-42.015 0-20.272-7.894-39.33-22.229-53.664-14.334-14.335-33.393-22.229-53.664-22.229-15.176 0-29.672 4.425-42.015 12.662l-21.932-21.931L320.459 42.432l21.931 21.932c-8.237 12.343-12.662 26.839-12.662 42.015 0 20.272 7.894 39.33 22.229 53.664 14.334 14.335 33.393 22.229 53.664 22.229 15.176 0 29.672-4.425 42.015-12.662l21.932 21.931-278.027 278.027-21.931-21.932z"
                          fill="#a19f9c"
                        />
                        <path
                          d="m277.741 212.96 21.216-21.216 21.3 21.3-21.215 21.217zM235.145 170.345l21.216-21.215 21.3 21.3-21.215 21.216zM320.346 255.561l21.216-21.216 21.3 21.301-21.215 21.216z"
                          fill="#a19f9c"
                        />
                      </g>
                    </svg>


                  </div>
                  <input
                    className={`input3 text-lg`}
                    type="number"
                    name="ticketNumber"
                    id="ticketNumber"
                    placeholder={t("Ticket Number")}
                    maxLength="10"
                    min="0"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="">
                <label htmlFor="yourName" className="inboxTitle text-left text-lg mb-1">{t("Your phone")}</label>
                <div className="wrapper">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>


                  </div>
                  <input
                    className={`input3 text-lg`}
                    type="number"
                    name="yourPhone"
                    id="yourPhone"
                    placeholder={t("Your Phone Number")}
                    maxLength={phoneNumber?.startsWith("7") || phoneNumber?.startsWith("9")
                      ? 9
                      : phoneNumber?.startsWith("251")
                        ? 12
                        : phoneNumber?.startsWith("+")
                          ? 13
                          : 10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
              </div>
              {error && <p className="mt-5 text-red-600">{error == "Case not found"? t("Case not found")   : error }</p>}

              <button type="submit" className="
               text-white font-bold text-base px-11 max-w-[180px] 
               border border-[#edf3f5] rounded-[30px] 
               py-[13px] cursor-pointer mt-[0.625rem] 
               transition-all duration-300 ease-in-out 
               shadow-[0_16px_30px_rgba(23,31,114,0.2)] 
               bg-[#F9A34C] hover:bg-[#FF825C]"             >
                {t("Search")}
              </button>

            </form>

             <div className="mt-6">
            {action?.length > 0 && !error && <Timeline action={action} />}
            {action?.length === 0 &&
           <svg
           xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           width={120}
           height={120}
           x={0}
           y={0}
           viewBox="0 0 512 512"
           style={{
             enableBackground: "new 0 0 512 512",
             marginLeft: 40
           }}
           xmlSpace="preserve"
           className=""
         >
           <g transform="matrix(0.8300000000000008,0,0,0.8300000000000008,43.519997081756344,43.520086898803356)">
             <path
               d="M494.933 255.467c-10.667 1.067-21.333-5.333-25.6-16-4.267-10.667-1.067-22.4 6.4-29.867l-5.333-11.733c-10.667 1.067-21.333-5.333-25.6-16-4.267-10.667-1.067-22.4 6.4-29.867l-5.333-11.733c-10.667 1.067-21.333-5.333-25.6-16-4.267-10.667-1.067-22.4 6.4-29.867l-4.267-9.6c-13.867 6.4-30.933 0-36.267-14.933l-371.2 160c6.4 13.867 0 30.933-14.933 36.267l4.267 9.6c10.667-1.067 21.333 5.333 25.6 16 4.267 10.667 1.067 22.4-6.4 29.867l5.333 11.733c10.667-1.067 21.333 5.333 25.6 16 4.267 10.667 1.067 22.4-6.4 29.867l5.333 11.733c10.667-1.067 21.333 5.333 25.6 16 4.267 10.667 1.067 22.4-6.4 29.867l4.267 9.6c13.867-6.4 30.933 0 36.267 14.933l371.2-158.933c-6.4-13.867 0-30.933 14.933-36.267l-4.267-10.667z"
               style={{}}
               fill="#468d50"
               data-original="#ff7058"
               className=""
               opacity={1}
             />
             <path
               d="M430.933 271.467 128 400.533l-59.733-140.8L371.2 129.6l59.733 141.867zM135.467 382.4 412.8 262.933 363.733 148.8 86.4 268.267 135.467 382.4z"
               style={{}}
               fill="#ffcc5c"
               data-original="#ffd15c"
               className=""
               opacity={1}
             />
             <path
               d="m125.867 299.2 14.933-7.467 18.133 42.667 9.6-3.2-18.133-42.667 14.933-7.466-3.2-8.534L121.6 289.6z"
               style={{}}
               fill="#ffffff"
               data-original="#ffffff"
               className=""
             />
             <path
               d="M176.176 266.566h10.666v56.532h-10.666z"
               style={{}}
               transform="rotate(-23.22 181.495 294.845)"
               fill="#ffffff"
               data-original="#ffffff"
               className=""
             />
             <path
               d="M235.733 285.333c-1.067 5.333-4.267 9.6-9.6 11.733-9.6 4.267-20.267 0-24.533-10.667-4.267-10.667-1.067-20.267 9.6-24.533 4.267-2.133 10.667-1.067 14.933 1.067L227.2 264l6.4-8.533-2.133-1.067c-7.467-4.267-16-5.333-24.533-2.133-14.933 6.4-21.333 22.4-14.933 38.4C198.4 305.6 214.4 312 230.4 305.6c8.533-3.2 12.8-9.6 14.933-19.2v-2.133l-10.667-1.067 1.067 2.133zM272 225.6l-11.733 4.267-9.6 29.866-9.6-21.333-8.534 4.267 21.334 51.2 9.6-4.267L256 272.533l2.133-4.266 25.6 12.8 12.8-5.334-35.2-17.066zM298.667 274.667l35.2-14.934-4.267-8.533-25.6 10.667-5.333-12.8L323.2 238.4l-3.2-8.533-25.6 10.666-4.267-12.8 25.6-10.666-4.266-8.534-35.2 14.934zM314.667 206.4l4.266 9.6 14.934-6.4L352 252.267l9.6-4.267-18.133-42.667 16-6.4-4.267-9.6z"
               style={{}}
               fill="#ffffff"
               data-original="#ffffff"
               className=""
             />
             <path
               d="M468.267 239.467c-4.267-10.667-1.067-22.4 6.4-29.867l-5.333-11.733c-10.667 1.067-21.333-5.333-25.6-16-4.267-10.667-1.067-22.4 6.4-29.867l-5.333-11.733c-10.667 1.067-21.333-5.333-25.6-16-4.267-10.667-1.067-22.4 6.4-29.867l-4.267-9.6c-13.867 6.4-30.933 0-36.267-14.933L36.267 219.2v5.333l10.667 3.2c3.2 1.067 7.467 4.267 7.467 9.6 0 5.333-3.2 8.533-7.467 9.6l-10.667 3.2v37.333h17.067c6.4 0 11.733 5.333 11.733 11.733v16h381.867l37.333-16c-6.4-13.867 0-30.933 14.933-36.267l-4.267-7.467c-10.666 1.068-21.333-5.332-26.666-15.998z"
               style={{
                 opacity: 0.1,
                 enableBackground: "new",
               }}
               fill="#231f20"
               data-original="#231f20"
               className=""
             />
             <path
               d="M512 262.933c-10.667-3.2-18.133-12.8-18.133-24.533s7.467-21.333 18.133-24.533V200c-10.667-3.2-18.133-12.8-18.133-24.533s7.467-21.333 18.133-24.533v-12.8c-10.667-3.2-18.133-12.8-18.133-24.533S501.333 92.267 512 89.067V78.4c-14.933 0-27.733-12.8-27.733-27.733h-403.2c0 14.933-12.8 27.733-27.733 27.733V88C64 91.2 71.467 100.8 71.467 112.533s-8.533 21.333-18.133 25.6V152c10.667 3.2 18.133 12.8 18.133 24.533S64 197.867 53.333 201.067v13.867c10.667 3.2 18.133 12.8 18.133 24.533C71.467 251.2 64 260.8 53.333 264v9.6c14.933 0 27.733 12.8 27.733 27.733h403.2c0-14.933 12.8-27.733 27.733-27.733l.001-10.667z"
               style={{}}
               fill="#468d50"
               data-original="#ff7058"
               className=""
               opacity={1}
             />
             <path
               d="M446.933 252.267h-329.6V99.733h329.6v152.534zM131.2 238.4h301.867V113.6H131.2v124.8z"
               style={{}}
               fill="#ffcc5c"
               data-original="#ffd15c"
               className=""
               opacity={1}
             />
             <path
               d="M155.733 157.333h16v46.934H182.4v-46.934h17.067v-9.6h-43.734zM203.733 147.733H214.4v56.533h-10.667zM262.4 188.267c-3.2 4.267-7.467 6.4-12.8 6.4-10.667 0-18.133-8.533-18.133-19.2s7.467-19.2 18.133-19.2c5.333 0 9.6 2.133 12.8 6.4l1.067 1.067L272 158.4l-1.067-2.133C265.6 148.8 258.133 145.6 249.6 145.6c-17.067 0-28.8 11.733-28.8 28.8s11.733 28.8 28.8 28.8c8.533 0 16-4.267 21.333-11.733l1.067-2.133-8.533-5.334-1.067 4.267zM320 147.733h-13.867L285.867 171.2v-23.467H275.2v56.534h10.667v-19.2l3.2-3.2 19.2 22.4h12.8L296.533 174.4zM324.267 204.267H361.6v-9.6h-27.733v-14.934H361.6v-9.6h-27.733v-12.8H361.6v-9.6h-37.333zM365.867 147.733v9.6h17.066v46.934h9.6v-46.934H409.6v-9.6z"
               style={{}}
               fill="#ffffff"
               data-original="#ffffff"
               className=""
             />
           </g>
         </svg>}
            </div>

            </div>
          </div>

        </div>
    //   </Modal> 
  );
};

export default Check_Status;
