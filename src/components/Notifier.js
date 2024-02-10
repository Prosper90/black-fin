import React from "react";

export default function Notifier({ notifyType, notifymsg }) {
  return (
    <div
      className={`fixed top-[29px] right-[73px] border ${
        notifyType === "success"
          ? "border-[#22bb33]"
          : notifyType === "warn"
          ? "border-[#cc3300]"
          : "border-[#bb2124]"
      } text-[#000] font-xs w-100 md:w-[400px] shadow-lg flex gap-3 items-center p-2 rounded z-[9999999999999999]`}
    >
      <div className="">
        {notifyType === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 36 36"
          >
            <path
              fill="#22bb33"
              d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Z"
              class="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#22bb33"
              d="M28 12.1a1 1 0 0 0-1.41 0l-11.1 11.05l-6-6A1 1 0 0 0 8 18.53L15.49 26L28 13.52a1 1 0 0 0 0-1.42Z"
              class="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        ) : notifyType === "warn" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path
              fill="#cc3300"
              d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm-6-82V80a6 6 0 0 1 12 0v56a6 6 0 0 1-12 0Zm16 36a10 10 0 1 1-10-10a10 10 0 0 1 10 10Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#bb2124"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
            />
          </svg>
        )}
      </div>
      <div className="text-[#fff] font-semibold text-xs">{notifymsg}</div>
    </div>
  );
}
