import { NavLink } from 'react-router-dom';

import './styles/DashboardNavbar.css';
import { useAuthUser } from '../hooks';
import { useSelector } from 'react-redux';

export const DashboardNavbar = () => {

    const { onStartLogout } = useAuthUser();

    const { user } = useSelector( state => state.authUser );

    const handleLogout = () => {
        onStartLogout();
    };

  return (
    <nav>
        <div className="dashboard-background"></div>
        <div className="dashboard-navbar-container">
            <header className="first-container">
                <div className="avatar-container">
                    <img 
                        src={ user.urlUserImg } 
                        alt="Avatar del usuario" 
                    />
                </div>
                <div className="name-container">
                    <span className='enterprise-name'> { user.enterprise } </span>
                    <span className='user-name'> { user.user } </span>
                </div>
                <div className="dashboard-links-container">
                    <NavLink
                        to='/escritorio'
                    >
                        <span className='icon-dashboard desk'></span>
                        <span className='text-link'>Escritorio</span>
                    </NavLink>
                    <NavLink
                        to='/asistente'
                    >
                        <span className='icon-dashboard ai'></span>
                        <span className='text-link'>Asistente</span>
                    </NavLink>
                    <NavLink
                        to='/contactos'
                    >
                        <span className='icon-dashboard contact'></span>
                        <span className='text-link'>Contactos</span>
                    </NavLink>
                    <NavLink
                        to='/agenda'
                    >
                        <span className='icon-dashboard calendar'></span>
                        <span className='text-link'>Agenda</span>
                    </NavLink>
                    <NavLink
                        to='/configuracion'
                    >
                        <span className='icon-dashboard setting'></span>
                        <span className='text-link'>Ajustes</span>
                    </NavLink>
                    <NavLink
                        to='/feedback'
                        title='¡Tu opinión nos interesa!'
                    >
                        <span className='icon-dashboard feedback'></span>
                        <span className='text-link'>Feedback</span>
                    </NavLink>
                </div>
            </header>
            <footer className="second-container">
                <button
                    className='logout-button'
                    onClick={ handleLogout }
                >
                    <span className='icon-dashboard logout'></span>
                    <span className='text-logout-button'>SALIR</span>    
                </button>
            </footer>
        </div>
    </nav>
  );
};
