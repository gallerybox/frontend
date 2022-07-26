import React, {useState, useEffect} from 'react';

interface MainHeaderProps {
    profilePhoto: string
}

function MainHeader({profilePhoto}: MainHeaderProps){

    return (
        <header className="MainHeader">
            <div className="photo-container">
                <div className="profile-photo" style={{backgroundImage: `url(${profilePhoto})`}}></div>
            </div>
            <span className="gallery-box">GalleryBox</span>
        </header>
    );
}

export default MainHeader;