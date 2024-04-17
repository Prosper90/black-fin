import React, { useEffect, useRef } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'


export default function Head() {

    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const buttonAction = isConnected ? disconnect : open;
    const buttonRef = useRef(null);

    useEffect(() => {
      if(buttonRef.current) {      
        const shadowRoot = buttonRef.current.shadowRoot;
        if(shadowRoot) {
          const innerButton = shadowRoot.querySelector('w3m-connect-button');
          if(innerButton) {
            const innerShadow = innerButton.shadowRoot;
            if(innerShadow) {
              const connectButton = innerShadow.querySelector('wui-connect-button');
              if(connectButton) {
                const finalShadow = connectButton.shadowRoot;
                if(finalShadow) {
                  const targetButton = finalShadow.querySelector('button');
                  if(targetButton) {
                    targetButton.style.backgroundColor = 'black';
                    targetButton.style.whiteSpace = 'nowrap';
                  }
                }
              }
            }
          }
        }
      }
    }, [])

  return (
    <div className='flex justify-between items-center pt-3'>
        <div className="text-center text-2xl font-bold flex gap-1 items-center">
          <img src="/mainlogo.png" className='w-[12%] h-auto rounded-full' alt="" /> 
          <span>BlackFin</span>
        </div>
        <w3m-button ref={buttonRef} />
        {/* <button onClick={buttonAction} className="outline-none py-2 px-7 hover:border hover:border-[#fff] text-sm rounded cursor-pointer">Connect</button> */}
    </div>
  )
}
