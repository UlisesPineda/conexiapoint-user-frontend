import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles/DashboardEventsPage.css';

import { FormEvent, SelectedEventContainer } from '../components';
import { useEventData } from '../hooks/useEventData';
import { useAuthUser } from '../hooks';

export const DashboardEventsPage = () => {

  const { startSelectEvent, startAddEvent } = useEventData();
  const { onRenewToken } = useAuthUser();

  const { isFormEventActive, eventType } = useSelector( state => state.eventData );

  const getDayEvents = () => {
    startSelectEvent( 'del día' );
  };
  
  const getMonthEvents = () => {
    startSelectEvent( 'del mes' );
  };
  
  const getAllEvents = () => {
    startSelectEvent( 'completa' );
  };

  const handleAddEvent = () => {
    startAddEvent();
  };

  useEffect(() => {
    onRenewToken();
  }, []);


  return (
    <main>
      <section className="calendar-container">
        <SelectedEventContainer />
        <button
          className={`calendar-event-button day-events ${ eventType === 'del día' && 'calendar-event-button-active' }`}
          onClick={ getDayEvents }
          title='Eventos del día'
        >
          <span className="event-calendar-icon day-events-icon"></span>
        </button>
        <button
          className={`calendar-event-button month-events ${ eventType === 'del mes' && 'calendar-event-button-active' }`}
          onClick={ getMonthEvents }
          title='Eventos del mes'
        >
          <span className="event-calendar-icon month-events-icon"></span>
        </button>
        <button
          className={`calendar-event-button all-events ${ eventType === 'completa' && 'calendar-event-button-active' }`}
          onClick={ getAllEvents }
          title='Todos los eventos'
        >
          <span className="event-calendar-icon all-events-icon"></span>
        </button>
        <button
          className='add-event-button add-event'
          onClick={ handleAddEvent }
          title='Agregar nuev evento'
        >
          +
        </button>
      </section>
      {
        isFormEventActive && 
          <FormEvent />
      }
    </main>
  );
};
