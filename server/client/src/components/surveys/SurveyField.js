//SurveyField contains logic to render a single Label + Text input
import React from 'react';

export default ({ input, label, meta : { error, touched } }) => {

    return(
        <div>
        <label>{label}</label>
            <input {...input} style= {{ marginBottom: '5px' }}/>
            {/* Si le bool touched est à true, et qu'error existe, on renvoie error  */}
            <div className="red-text" style={{ marginBottom : '20px' }}>
            {touched && error}
            </div>
        </div>
    )
}