import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardLayout, AlertMessage } from "../components";
import { 
  DashboardContactsPage, 
  DashboardFeedbackPage, 
  DashboardMainPage, 
  DashboardSettingsPage, 
  DashboardEventsPage,
  LoadingPage,
  DashboardAiPage, 
} from "../pages";
import { useAuthUser, useContactData, useEventData, usePhraseData } from "../hooks";
import { getCookie } from "../helpers";


export const AppRouter = () => {
  
  const { isActiveMessage } = useSelector( state => state.alertMessage );
  const { isLoading } = useSelector( state => state.authUser );
  
  const { onStartLoadUserPage } = useAuthUser();
  const { startGetContacts } = useContactData();
  const { startGetEvents } = useEventData();
  const { getDayPhrase } = usePhraseData();

  const token = getCookie( 'auth-token' );

  const initRequests = async() => {
    await onStartLoadUserPage( token );
    await startGetContacts();
    await startGetEvents();
    await getDayPhrase();
  };
  
  useEffect(() => {
    initRequests();
  }, []);

  return (
    <>
      {
        isLoading 
          ? 
          <LoadingPage />
          :
          <DashboardLayout>
            <Routes>
              <Route path="/escritorio" element={ <DashboardMainPage /> } />
              <Route path="/contactos" element={ <DashboardContactsPage /> } />
              <Route path="/agenda" element={ <DashboardEventsPage /> } />
              <Route path="/configuracion" element={ <DashboardSettingsPage /> } />
              <Route path="/feedback" element={ <DashboardFeedbackPage /> } />
              <Route path="/asistente" element={ <DashboardAiPage /> } />
              <Route path="/*" element={ <Navigate to="/escritorio" /> } />
            </Routes>
          </DashboardLayout> 
      }
      {
        isActiveMessage && 
          <AlertMessage />
      }
    </>
  );
};
