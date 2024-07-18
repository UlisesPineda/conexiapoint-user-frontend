import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './styles/EventCalendarContainer.css';
import { useAlertMessage } from '../hooks';
import { useEventData } from '../hooks/useEventData';
import { formatDateString, formatTimeString, formatMonthString } from '../helpers';

export const SelectedEventContainer = () => {

    const currentDay = formatDateString( new Date() );
    const currentMonth = formatMonthString( new Date() );

    const [idEvent, setIdEvent] = useState('');
    const [eventsUpdated, setEventsUpdated] = useState([]);

    const { events } = useSelector( state => state.eventData );
    const { eventType } = useSelector( state => state.eventData );
    const { isConfirm } = useSelector( state => state.alertMessage );

    const { startActivateMessage } = useAlertMessage();
    const { startEditEvent, deleteEvent } = useEventData();

    const handleEditEvent = (e) => {
        const id = e.target.getAttribute('data-event-id');
        const eventSelected = events.filter( event => event._id === id );
        setIdEvent( id );
        startEditEvent( eventSelected[0] );
    };

    const handleDeletEvent = (e) => {
        const id = e.target.getAttribute('data-event-id');
        const newEvents = events.filter( event => event._id !== id );
        setEventsUpdated( newEvents );
        setIdEvent( id );
        startActivateMessage({
            title: '¿Deseas eliminar el evento actual?',
            message: '',
            isHidenButton: false,
            activeConfirm: true,
        });
    };  

    const handleDeleteFunction = async() => {
        await deleteEvent( idEvent, eventsUpdated );
    };    

    const eventsHandler = () => {
        if( eventType === 'del día' ) {
            return events.filter( event => formatDateString( event.timeString ) === currentDay );
        }
        if( eventType === 'del mes' ) {
            return events.filter( event => formatMonthString( event.timeString ) === currentMonth );
        }
        if( eventType === 'completa' ) {
            return events;
        }
    };

    useEffect(() => {
        isConfirm && 
            handleDeleteFunction();
    }, [ isConfirm ]);

    const eventsArray = eventsHandler();


  return (
    <div className="events-container" key={ eventType }>
        <h1> { eventsArray.length ? `Tu agenda ${ eventType }` : `No tienes eventos agendados para hoy ${ currentDay }` } </h1>
        {
            eventsArray.map( ( event ) => {
                const mapURL = `https://www.google.com/maps?q=${encodeURIComponent( event.adressEvent )}`;
                return (
                    <article className='event-block' key={ event._id }>
                        <div className="event-title-container">
                            <big> { event.typeEvent } </big>
                            <big> { formatDateString( event.timeString ) } </big>
                            <big> { formatTimeString( event.timeString ) } </big>
                        </div>
                        <span className='line-block'></span>
                        <div className="event-data-container">
                            <div className="event-data-block">
                                <div className="event-data-text">
                                    <span> { event.personEvent } </span>
                                </div>
                                <div className="event-data-text">
                                    <span> { event.adressEvent } </span>
                                    <span>
                                        <a 
                                            href={ mapURL } 
                                            target='_blank'
                                            rel='noreferrer noopener nofollow'
                                            className='event-data-link'
                                            title='Consultar dirección en maps'
                                        >
                                            <span className="event-data-icon data-adress">
                                            </span>
                                        </a>
                                    </span>
                                </div>
                                <div className="event-data-text">
                                    <span> { event.emailEvent } </span>
                                    <span>
                                        <a 
                                            href={ `mailto:${ event.emailEvent }` } 
                                            className='event-data-link'
                                            title='Enviar correo'
                                        >
                                            <span className="event-data-icon data-email">
                                            </span>
                                        </a>
                                    </span>
                                </div>
                                <div className="event-data-text">
                                    <span> { event.phoneEvent } </span>
                                    <span className='event-icon-container'>
                                        <a
                                            href={ `tel:+52${ event.phoneEvent }` } 
                                            className='event-data-link'
                                            rel='noopener noreferrer nofollow'
                                            title='Realizar llamada'
                                        >
                                            <span className="event-data-icon data-phone">
                                            </span>
                                        </a>
                                        <a 
                                            href={ `https://wa.me/1${ event.phoneEvent }` } 
                                            target='_blank'
                                            rel='noopener noreferrer nofollow'
                                            className='event-data-link'
                                            title='Enviar whatsapp'
                                        >
                                            <span className="event-data-icon data-whatsapp">
                                            </span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div className="event-data-block">
                                <div className="event-data-note">
                                    { event.notesEvent }
                                </div>
                                <div className="event-data-buttons">
                                    <button
                                        data-event-id={ event._id }
                                        onClick={ handleDeletEvent }
                                    >eliminar</button>
                                    <button
                                        data-event-id={ event._id }
                                        onClick={ handleEditEvent }
                                    >editar</button>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            } )
        }
    </div>
  );
};
