import React from 'react';
import classes from './Steps.module.scss';
import Step from './Step';

const Steps = (props) => {

    return (
        <div className={classes.steps_wrapper}>

            {Object.keys(props.allSteps).map(step => (
                <Step
                stepData={props.allSteps[step]}
                currentStep={props.currentStep}
                key={step}
                getAnswer={props.getAnswer}
                />
            ))}

        </div>
    )
}

export default Steps;
