import React from 'react';
import './RoayaTeam.css';
import Navbar from '../NavBar/Nav';
import Footer from '../Footer/Footer';

function importAll(r) {
  return r.keys().map(r);
}

const teamImages = importAll(require.context('./TeamImages/', false, /\.(png|jpe?g|svg)$/));

const RoayaTeam = () => {
  const teamMembers = teamImages.map((imageUrl, index) => {
    const fileName = imageUrl.split('/').pop().split('.')[0];
    
    const title = fileName.split('-').slice(1).join(' ');

    return {
      id: index + 1,
      imageUrl,
      title: `${title}`,
    };
  });

  return (
    <div className="roaya-team-container">
        <Navbar showCategories={false}/>
        <div className='all-members'>
      {teamMembers.map((member) => (
        <div key={member.id} className="team-member">
          <img src={member.imageUrl} alt={`Team Member ${member.id}`} />
          <p className="member-title">{member.title}</p>
        </div>
      ))}
      </div>
      <Footer/>
    </div>
  );
};

export default RoayaTeam;
