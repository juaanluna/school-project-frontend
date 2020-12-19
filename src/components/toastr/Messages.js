import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import '../../../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css'


export default props => (
    <ReduxToastr timeOut={4000} //quanto tempo ele fica
    newestOnTop={false}         // msg nova sempre no tovo
    preventDuplicates={true}    //previnir duplicata
    position={"top-right"}        // local aonde aparece
    transitionIn={"fadeIn"}         //  FADE IN
    transitionOut={"fadeOut"}        // FADE OUT
    progressBar />              // PARA VER TEMPO BARRA DE PROGRESSO
)