import './Header.scss';
import zooLogo from '../image/zooLogo.png'
import { NavLink } from 'react-router-dom';
import {useRef} from 'react'
import lang from '../Localization/lang';

function Header() {
  const headerRef = useRef()
  const checkRef = useRef()
  const langData = window.localStorage.getItem('select_value');
  return (
  <>
    <header ref={headerRef} className='header'>
     <img src={zooLogo} alt="img"/>
     <ul className='header_list'>
     <li className='header_item'>
     <select className='input_title_more_select' defaultValue={langData} type="text" onChange={(e) => {
        window.localStorage.setItem('select_value', e.target.value)
     }}>
<option required value='all'>{lang.all}</option>
<option required value='FAST'>{lang.fast}</option>
<option required value='MILLIY'>{lang.milliy}</option>
</select>
     </li>
     <li className='header_item'>
     <NavLink className='header_link' to="/">{lang.home}</NavLink>
     </li>
     <li className='header_item'>
     <NavLink className='header_link' to="/order">{lang.order}</NavLink>
     </li>
     <li className='header_item'>
     <div>
	<input ref={checkRef} type="checkbox" id="toggle" onClick={(e) => {
      e.target.classList.toggle('toggle')
      if(e.target.classList.contains('toggle')) {
        headerRef.current.classList.add('dark')
        document.body.classList.add('light')
      }else {
        headerRef.current.classList.remove('dark')
        document.body.classList.remove('light')
      }
  }}/>
	<label for="toggle"></label>
</div>
     </li>
     <li className='header_item'>
     </li>
     </ul>
    </header>
  </>
  )
}

export default Header