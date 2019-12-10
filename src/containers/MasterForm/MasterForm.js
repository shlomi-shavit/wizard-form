import React, {Component} from 'react';
import Aux from '../../components/hoc/Aux';
import Steps from '../Steps/Steps';
import Popup from '../../components/UI/Popup/Popup';
import FormSummary from '../../components/formSummary/formSummary';
import classes from './MasterForm.module.scss';
import StepCounter from '../../components/UI/StepCounter/StepCounter';

class BurgerBuilder extends Component {

    state = {
        steps: [
            {
                step: 1,
                stepInfo: [
                    {
                        question: 'The location of the apartment',
                        answer: '',
                        placeholder: 'type location',
                        tag: 'input',
                        inputType: 'text',
                        id: 'location'
                    },
                    {
                        question: 'What is the price of the apartment',
                        answer: '',
                        placeholder: 'apartment price',
                        tag: 'input',
                        inputType: 'number',
                        id: 'price',
                    }
                ]
            },
            {
                step: 2,
                stepInfo: [
                    {
                        question: 'What do you want to buy',
                        answerOption: [
                            'select you answer',
                            'New apartment',
                            'Second-hand apartment'
                        ],
                        answer: '',
                        tag: 'select',
                        inputType: 'select',
                        id: 'which-apartment'
                    }
                ]
            },
            {
                step: 3,
                stepInfo: [
                    {
                        question: 'Please type your full name',
                        answer: '',
                        placeholder: 'your full name',
                        tag: 'input',
                        inputType: 'text',
                        id: 'name'
                    },
                    {
                        question: 'Please type your mail',
                        answer: '',
                        placeholder: 'your mail',
                        tag: 'input',
                        inputType: 'mail',
                        id: 'mail'
                    },
                    {
                        question: 'Please type your phone',
                        answer: '',
                        placeholder: 'your phone',
                        tag: 'input',
                        inputType: 'phone',
                        id: 'phone'
                    }
                ]
            }
        ],
        allDataArray: [],
        currentStep: 1,
        maxSteps: 0,
        totalState: 1,
        formFilled: false
    };

    componentDidMount(){
        //this.maxStepsCalc();
    }

    static getDerivedStateFromProps(props, state){
        const maxSteps = Object.keys(state.steps).length;
        //console.log(maxSteps);
        state.maxSteps = maxSteps;
        return maxSteps
    };

    // static getDerivedStateFromProps(prevProps, prevState){
    //     this.maxStepsCalc();
    // }

    maxStepsCalc = () => {
        const maxSteps = Object.keys(this.state.steps).length;
        this.setState({maxSteps: maxSteps});
    }

    nextStepHandler = () => {
        let currentStep = this.state.currentStep;
        const maxSteps = this.state.maxSteps;
        if(currentStep < maxSteps){
            currentStep++;
            this.setState({currentStep: currentStep});
        }
    }

    prevStepHandler = () => {
        let currentStep = this.state.currentStep;
        if(currentStep > 1){
            currentStep--;
            this.setState({currentStep: currentStep})
        }
    }

    setAnswerHandler = (event, id) => {

        const steps = this.state.steps;
        const stepsDataArray = [];

        // creating steps data array
        steps.map(step => {
            return step.stepInfo.map(info => {
                return stepsDataArray.push(info)
            })
        });

        //console.log(stepsDataArray);
        const stepIdIndex = stepsDataArray.findIndex(stepData => stepData.id === id);

        const currentStep = stepsDataArray[stepIdIndex];

        currentStep.answer = event.target.value;

        this.setState({
                steps: steps,
                allDataArray: stepsDataArray
        });
        //console.log(this.state.allDataArray)
    };

    formFilledHandler = () => {
        const formFilled = this.state.formFilled;
        this.setState({formFilled: !formFilled});
    }

    render(){

        // let navPoint = [];
        // let stepLenght = this.state.maxSteps ? this.state.maxSteps.map(nav => {
        //     navPoint.push(<div>x</div>)
        // }) : null;

        return (
            <Aux>

                <Steps
                    allSteps={this.state.steps}
                    currentStep={this.state.currentStep}
                    getAnswer={this.setAnswerHandler}
                />

                {this.state.formFilled ?
                    <Popup
                        formFilled={this.formFilledHandler}
                        show={this.state.purchasing}>
                        <FormSummary
                            formData={this.state.allDataArray}
                        />
                    </Popup>
                    : null}

                <div className={classes.step_navigation}>

                    <StepCounter currentStep={this.state.currentStep} stepsNumber={this.state.maxSteps}/>

                    <div className={classes.navigation_btn}>
                    {this.state.currentStep > 1 ? <button className={[classes.btn, classes.prev_btn].join(' ')} onClick={this.prevStepHandler}>prev step</button> : null}
                    {this.state.currentStep === this.state.maxSteps ?
                        <button className={[classes.btn, classes.end_btn].join(' ')} onClick={this.formFilledHandler}>that's it!</button>
                        :
                        <button className={[classes.btn, classes.next_btn].join(' ')} onClick={this.nextStepHandler}>next step</button>}
                    </div>

                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder;