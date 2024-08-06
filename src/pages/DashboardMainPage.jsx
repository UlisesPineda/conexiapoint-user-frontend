import { useSelector } from 'react-redux';

import './styles/DashboardMainPage.css';
import { formatDateString, formatMonthString } from '../helpers';

export const DashboardMainPage = () => {

  const { events } = useSelector( state => state.eventData );
  const { contacts } = useSelector( state => state.contactData );
  const { dayPhrase } = useSelector( state => state.authUser );

  const currentDay = formatDateString( new Date() );
  const currentMonth = formatMonthString( new Date() );
  const currentDayEvents = events.filter( event => formatDateString( event.timeString ) === currentDay );
  const currentMonthEvents = events.filter( event => formatMonthString( event.timeString ) === currentMonth );


  return (
    <main>
      <section className="dashboard-container">
        <h1>Tu escritorio</h1>
        <div className="dashboard-block-container">
          <div className="dashboard-block">
            <big>Frase del día</big>
            <span className='line-block'></span>
            <q className='day-phrase'> { dayPhrase.phrase } </q>
            <cite> { dayPhrase.author } </cite>
          </div>
          <div className="dashboard-block">
            <big>Resumen de Actividades</big>
            <span className='line-block'></span>
            <span className='text-line'> <span>Eventos del día:</span> <span> { currentDayEvents.length } </span> </span>
            <span className='text-line'> <span>Eventos del mes:</span> <span> { currentMonthEvents.length } </span> </span>
            <span className='text-line'> <span>Total de eventos:</span> <span> { events.length } </span> </span>
            <span className='text-line'> <span>Total de contactos</span> <span> { contacts.length } </span> </span>
          </div>
        </div>
      </section>
    </main>
  );
};
