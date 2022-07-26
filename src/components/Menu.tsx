import React, {useState, useEffect} from 'react';

interface MainHeaderProps {
    profilePhoto: string
}

function MainHeader(){

    return (
        <div className="Menu">
            <div className="item">
                <a href="#">Espacios</a>
                <div className="item">
                    <div className="item"><a href="#">Propios</a></div>
                    <div className="item"><a href="#">De otros usuarios</a></div>
                </div>
            </div>
            <div className="item"><a href="#">Colecciones</a></div>
            <div className="item"><a href="#">Notificaciones</a></div>
            <div className="item"><a href="#">Cerrar sesión</a></div>
        </div>

    );
}

export default MainHeader;