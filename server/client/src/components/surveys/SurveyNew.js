//SurveyNew shows SurveyForm and SurveyFormReview
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
    //We will choose which form to show (form to be edited or form review) based on the following boolean
    state = {showFormReview : false};

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview 
                        onCancel={()=> this.setState({ showFormReview : false })}
                    />
        }
        
        //We introduce a callback function in order to set the boolean to true when the form is submitted
        return (<SurveyForm 
                onSurveySubmit ={() => this.setState({ showFormReview : true })}  
                />);
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form : 'surveyForm'
}) (SurveyNew);