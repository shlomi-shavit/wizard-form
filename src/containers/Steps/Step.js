import React, {Component} from 'react';
import classes from './Step.module.scss';

//import Aux from '../../components/hoc/Aux';

class Step extends Component {

    render() {

        return (
            this.props.currentStep === this.props.stepData.step ?
                this.props.stepData.stepInfo.map((formData, index) => {

                    return (
                        <div key={formData.id} className={classes.step_wrap}>

                            <div>{formData.question}</div>

                            {formData.tag === 'input' ?
                                <input
                                    type={formData.inputType}
                                    id={formData.id}
                                    value={formData.answer}
                                    placeholder={formData.placeholder}
                                    onChange={(event) => this.props.getAnswer(event, formData.id)}
                                />
                            : null}

                            {formData.tag === 'select' ?
                                <select
                                    className='select'
                                    type={formData.inputType}
                                    id={formData.id}
                                    value={formData.answer}
                                    onChange={(event) => this.props.getAnswer(event, formData.id)}>
                                    {formData.answerOption.map((option, index) => {
                                        return <option key={index}>{option}</option>
                                    })}
                                </select>
                            : null}

                        </div>
                    )
                })
                : null
        )

    }
}

export default Step;