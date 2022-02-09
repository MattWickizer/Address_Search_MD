import axios from 'axios' 
import {useState, useEffect, useRef} from 'react'



const Address_Field = () => {

/*ARRAY OF SUGGESTED ADDRESSES*/
const [options, setOptions] = useState([])
/*INPUT ADDRESS VALUE*/
const [userAddress, setUserAddress] = useState('')
/*ALLOW OR BLOCK GEOCODE*/
const [allow, setAllow] = useState(false)
/*DISPLAY OPTIONS*/
const [display, setDisplay] = useState(false)
/*WRAPPER*/
const wrapperRef = useRef(null)


/*MD GEOCODER ADDRESS LOOKUP*/
const geocodeUrl = 'https://geodata.md.gov/imap/rest/services/GeocodeServices/MD_CompositeLocator/GeocodeServer/findAddressCandidates'
const userParams = {'Street': userAddress,'maxLocations':5, 'outSR':'4326','f':'json'}
const geocode =() =>{axios.get(geocodeUrl, {params: userParams}).then(res=>{setOptions(res.data.candidates); console.log(res.data)})}


/*OPTION SELECTION*/
const onSelection = address => {
    setUserAddress(address)
    setDisplay(false)
    setAllow(false)
}


/*CALL GEOCODE FUNCTION */
useEffect(()=> {allow && geocode()}, [userAddress])

/*OFF CLICK FUNCTIONALITY*/
useEffect(() =>{
    document.addEventListener('mousedown', handleClickOutside)
    return (()=> {document.removeEventListener('mousedown',handleClickOutside)})}, []);

const handleClickOutside = e => {
    const {current: wrap} = wrapperRef
    if (wrap && !wrap.contains(e.target)) setDisplay(false)}


return (
     <div className= 'form' ref = {wrapperRef}>
        <input
            className = "form__input" 
            type='text'
            id = 'address'
            value = {userAddress}
            onChange = {(e)=>{setUserAddress(e.target.value)}}
            onClick = {(() =>{setDisplay(true); setAllow(true)})}
            autoComplete = 'off'
            placeholder = ' '
            >
        </input>
        <label className = 'form__label'>
            Address
        </label>
        {display &&(
        <div className = 'suggestions'>
            {options.map((v, i)=>{
                return (
                <div className = 'suggestion' key = {i} onClick = {()=>onSelection(v.address)}>
                    <img/>
                    <span>{v.address}</span>
                </div>)
            })}
        </div>)}
    </div>
    )
};

export default Address_Field;
