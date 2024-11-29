import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState('');
 

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(charsAllowed) str += '!@#$%^&*()-_=+\|{};:/?.'
    if(numsAllowed)  str += '1234567890'
    for(let i=1; i<=length; i++){ 
      let index = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(index);
    }
    setPassword(pass);
  },[length, numsAllowed, charsAllowed, setPassword]);
   

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = () =>{
        passwordRef.current?.select()
      //  passwordRef.current?.setSelectionRange(0,3);
         window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    passwordGenerator()
  },[length, charsAllowed, numsAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h2 className='text-white text-center my-3'>Password generator</h2>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          value={password}
          ref={passwordRef}
          readOnly
      />
       <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >copy</button> 
      
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
      min={6}
      max={100}
      value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
    <input
        type="checkbox"
        defaultChecked={numsAllowed}
        id="numberInput"
        onChange={() => {
            setNumsAllowed((prev) => !prev);
        }}
    />
    <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={charsAllowed}
            id="characterInput"
            onChange={() => {
                setCharsAllowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
</div> 
  )
}

export default App
