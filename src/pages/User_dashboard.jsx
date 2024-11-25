import React from 'react';
import Profile from '../pegawai/profile';
import Lengkap from '../pegawai/profilelengkap';


const styles = {
  spacer: {
    marginBottom: '1cm',
  },
};

function UserDashboard() {
  return (
    <div>
      <Profile />
      <div style={styles.spacer}></div>
      <Lengkap />
    </div>
  );
}

export default UserDashboard;