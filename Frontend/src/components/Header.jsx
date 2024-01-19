import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav>
    <NavLink to={'/'}>Home</NavLink>
    {'  |  '}
    <NavLink to={'/login'}>Login</NavLink>
    {'  |  '}
    <NavLink to={'/register'}>Register</NavLink>
    {'  |  '}
    <NavLink to={'/newEntry'}>Nuevo post</NavLink>
      </nav>
    </>
  )
}
export default Header;