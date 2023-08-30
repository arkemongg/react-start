import { useEffect } from 'react';
import './styles/Home.css'
import { Title } from './templates.js';
import {Featured} from './homesubs/Featured.js'

const Profile = () => {
    Title("Profile")
    return (
      <>
      <section className="profile-section">
        <h1 className="text-4xl">Profile</h1>
      </section>
      </>
    );
  };
  
  export default Profile;