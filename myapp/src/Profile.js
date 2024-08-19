import React, { useContext } from 'react'
import MyContext from './MyContext';

const Profile = () => {
    const { userName, setuserName } = useContext(MyContext)
    return (
        <div style={{backgroundColor:"gray"}}>Profile
            {userName}
        </div>
    )
}

export default Profile