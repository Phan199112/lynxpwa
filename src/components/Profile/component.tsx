import * as React from 'react';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '../Button';
import { Card } from '../Card';
import Loader from '../Loader';
import Step1 from './Step1';
// import Step2 from './Step2';
import Step3 from './Step3';
import styles from './styles';

type StepType = { stepName: string, stepComponent: React.ComponentType<any>, stepId: string };

type ProfileProps = {
  name?: string,
  avatar?: string,
  picture?: string,
  street?: string,
  city?: string,
  zip?: string,
  state?: string,
};

type PropsType = {
  isLoading: boolean,
  color?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'orange',
  title?: string,
  subtitle?: string,
  previousButtonClasses?: string,
  previousButtonText?: string,
  nextButtonClasses?: string,
  nextButtonText?: string,
  finishButtonClasses?: string,
  finishButtonText?: string,
  finishButtonClick: (user: ProfileProps) => void,
  validate?: boolean,
} & ProfileProps & WithStyles<typeof styles>;

type StateType= {
  currentStepIndex: number,
  nextButton: boolean,
  previousButton: boolean,
  finishButton: boolean,
  width: string,
  movingTabStyle: React.CSSProperties,
  allStates: object[],
};

const steps: StepType[] = [
  { stepName: 'About', stepComponent: Step1, stepId: 'about' },
  // { stepName: 'Account', stepComponent: Step2, stepId: 'account' },
  { stepName: 'Address', stepComponent: Step3, stepId: 'address' },
];

class Wizard extends React.Component<PropsType, StateType> {
  wizard: HTMLDivElement;
  [key: string]: any;

  constructor(props: PropsType) {
    super(props);

    let width;

    if (steps.length === 1) {
      width = '100%';
    } else if (window.innerWidth < 600) {
      width = steps.length !== 3 ? '50%' : `${100 / 3}%`;
    } else {
      width = steps.length === 2 ? '50%' : `${100 / 3}%`;
    }

    this.state = {
      currentStepIndex: 0,
      // color: this.props.color,
      nextButton: steps.length > 1,
      previousButton: false,
      finishButton: steps.length === 1,
      width,
      movingTabStyle: { transition: 'transform 0s' },
      allStates: [],
    };
  }

  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth = () => this.refreshAnimation(this.state.currentStepIndex);

  navigationStepChange = (key: number) => {
    // console.log(this.state.allStates);
    const { currentStepIndex } = this.state;
    let validationState = true;

    if (key > currentStepIndex) {
      for (let i = currentStepIndex; i < key; i += 1) {
        const { stepId } = steps[i];
        // const step = this[stepId] as React.ComponentType<{ sendState: () => void }>;
        const step = this[stepId] as any;

        if (step.sendState) {
          this.setState(state => ({
            allStates: [...state.allStates, { [stepId]: step.sendState() }],
          }));
        }

        if (step.isValidated && !step.isValidated()) {
          validationState = false;
          break;
        }
      }
    }

    if (validationState) {
      this.setState({
        currentStepIndex: key,
        nextButton: steps.length > key + 1,
        previousButton: key > 0,
        finishButton: steps.length === key + 1,
      });
      this.refreshAnimation(key);
    }
  };

  nextButtonClick = () => {
    const { validate = true } = this.props;
    const { currentStepIndex } = this.state;
    const key = currentStepIndex + 1;
    const currentStepId = steps[currentStepIndex].stepId;
    const currentStep = this[currentStepId];
    const { isValidated } = currentStep;

    if ((validate && ((isValidated && isValidated()) || typeof isValidated === 'undefined'))
      || !validate
    ) {
      if (currentStep.sendState) {
        this.setState(state => ({
          allStates: [...state.allStates, { [currentStepId]: currentStep.sendState() }],
        }));
      }

      this.setState({
        currentStepIndex: key,
        nextButton: steps.length > key + 1,
        previousButton: key > 0,
        finishButton: steps.length === key + 1,
      });
      this.refreshAnimation(key);
    }
  };

  previousButtonClick = () => {
    const { currentStepIndex } = this.state;
    const key = currentStepIndex - 1;
    const currentStepId = steps[currentStepIndex].stepId;
    const currentStep = this[currentStepId];

    if (currentStep.sendState) {
      this.setState(state => ({
        allStates: [...state.allStates, { [currentStepId]: currentStep.sendState() }],
      }));
    }

    if (key >= 0) {
      this.setState({
        currentStepIndex: key,
        nextButton: steps.length > key + 1,
        previousButton: key > 0,
        finishButton: steps.length === key + 1,
      });
      this.refreshAnimation(key);
    }
  };

  finishButtonClick = () => {
    const { validate = true, finishButtonClick } = this.props;
    const { currentStepIndex } = this.state;
    const currentStepId = steps[currentStepIndex].stepId;
    const currentStep = this[currentStepId];
    const { isValidated } = currentStep;

    if (validate && ((isValidated && isValidated()) || typeof isValidated === 'undefined')) {
      const payload: ProfileProps = {};
      const states = steps.map(({ stepId }) => this[stepId].sendState())
        .reduce((states, state) => ({ ...states, ...state }), {});

      Object.keys(states).forEach((key: keyof ProfileProps) => {
        if (states[key] !== this.props[key]) payload[key] = states[key];
      });

      console.log(states, payload);
      if (Object.keys(payload).length) {
        finishButtonClick(payload);
      }
      // formData.append('picture', file);
    }
  };

  refreshAnimation = (index: number) => {
    const total = steps.length;
    const totalSteps = steps.length;
    const mobileDevice = window.innerWidth < 600 && total > 3;
    const current = index + 1;
    const { offsetWidth } = this.wizard.children[0] as HTMLElement;
    let liWidth = 100 / total;
    let moveDistance = offsetWidth / totalSteps;
    let indexTemp = index;
    let verticalLevel = 0;

    if (mobileDevice) {
      moveDistance = offsetWidth / 2;
      indexTemp = index % 2;
      liWidth = 50;
    }

    const stepWidth = moveDistance;

    this.setState({ width: `${liWidth}%` });

    moveDistance *= indexTemp;

    if (current === 1 || (mobileDevice === true && index % 2 === 0)) {
      moveDistance -= 8;
    } else if (current === totalSteps || (mobileDevice === true && index % 2 === 1)) {
      moveDistance += 8;
    }

    if (mobileDevice) {
      verticalLevel = Math.round(index / 2);
      verticalLevel *= 38;
    }

    const movingTabStyle = {
      width: stepWidth,
      transform: `translate3d(${moveDistance}px, ${verticalLevel}px, 0)`,
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    };

    this.setState({ movingTabStyle });
  };

  render() {
    const {
      classes,
      isLoading,
      title = 'Build Your Profile',
      subtitle = 'This information will let us know more about you.',
      color = 'orange',
      previousButtonClasses = '',
      previousButtonText = 'Previous',
      nextButtonClasses = '',
      nextButtonText = 'Next',
      finishButtonClasses = '',
      finishButtonText = 'Finish',
      ...props
    } = this.props;

    return (
      <div className={classes.wizardContainer} ref={(el) => { this.wizard = el; }}>
        <Card className={classes.card}>
          <Loader isVisible={isLoading} isFullHeight />
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map(({ stepName, stepId }, key) => (
                <li
                  key={stepId}
                  className={classes.steps}
                  style={{ width: this.state.width }}
                >
                  <span
                    className={classes.stepsAnchor}
                    onClick={() => this.navigationStepChange(key)}
                    onKeyUp={() => this.navigationStepChange(key)}
                  >
                    {stepName}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className={`${classes.movingTab} ${classes[color]}`}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStepIndex].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map(({ stepId, stepComponent: StepComponent }, key) => {
              const stepContentClasses = classnames({
                [classes.stepContentActive]: this.state.currentStepIndex === key,
                [classes.stepContent]: this.state.currentStepIndex !== key,
              });

              return (
                <div className={stepContentClasses} key={stepId}>
                  <StepComponent
                    innerRef={(node: React.ComponentType) => { this[stepId] = node; }}
                    {...props}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={previousButtonClasses}
                  onClick={this.previousButtonClick}
                >
                  {previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="orange"
                  className={nextButtonClasses}
                  onClick={this.nextButtonClick}
                >
                  {nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="orange"
                  className={finishButtonClasses}
                  onClick={this.finishButtonClick}
                >
                  {finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Wizard);
