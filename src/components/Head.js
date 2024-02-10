import React from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'


export default function Head() {

    // 4. Use modal hook
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const buttonAction = isConnected ? disconnect : open;


  return (
    <div className='flex justify-between items-center pt-3'>
        <div className="text-center text-md font-bold flex gap-1 items-center">
          <img src="/mainlogo.png" className='w-[5%] h-auto' alt="" /> 
          <span>BlackFin</span>
        </div>
        <w3m-button />
        {/* <button onClick={buttonAction} className="outline-none py-2 px-7 hover:border hover:border-[#fff] text-sm rounded cursor-pointer">Connect</button> */}
    </div>
  )
}
