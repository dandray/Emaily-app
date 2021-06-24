//SurveyNew shows a form for the user to add an input
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component{

    renderFields (){
        return _.map(FIELDS, field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
                    {this.renderFields()}

                    <button class="teal btn-flat right white-text" type="submit">
                        Next <i className="material-icons right">done</i>
                    </button>

                    <Link class="red btn-flat white-text" to="/surveys">Cancel</Link>
                </form>
                
            </div>
        )
    }
}

function validate(values) {
    console.log('Values :' +values);
    const errors = {};

    //Lors de la 1ere validation du form, l'objet values n'est pas encore défini, 
    //donc la fonction ne peut pas prendre ce paramètre
    errors.recipients = validateEmails(values.recipients || '');

    _.each(FIELDS, ({ name }) => {
        if(!values[name]){
            errors[name] = 'You must provide a ' + name;
        }
    });

    return errors;
}

//We export here the Form Reducer, which will be called 'surveyForm'
export default reduxForm({
    validate,
    form: 'surveyForm',
    //Destroys/saves the form values when we go from a page to the other
    destroyOnUnmount : false
})(SurveyForm);