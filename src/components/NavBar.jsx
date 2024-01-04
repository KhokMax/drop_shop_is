import React, { useContext} from 'react';
import '../styles/NavBar.css'
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function NavBar() {

  const {auth} = useContext(Context)
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return null
  }

  return (
    <nav class='navbar'>
      <ul class='navbarul'>
        <li class="namepage">
          <a href="/mainpage" class='bartext'>DROP SHOP</a>
        </li>
        <li class="links">
          { user ?
            (<a href="/account" class='bartext'>Account</a>)
            
            :
            (<a href="/login" class='bartext'>Log in</a>)
          }
        </li>
      </ul>
    </nav>
  );
}
