/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/link-passhref */
import Link from 'next/link'

import { useAppSelector } from '../app/hooks'

// Top navbar
export default function Navbar() {
  const username = useAppSelector(state => state.auth.user)
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button className='btn-logo'>FEED</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className='push-left'>
              <Link href='/admin'>
                <button className='btn-blue'>Write Posts</button>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href='/enter'>
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
