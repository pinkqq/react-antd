import { Route, useHistory, useLocation } from 'react-router-dom';
import { Steps, Button, Form } from 'antd';
import findIndex from 'lodash.findindex';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const { Step } = Steps;

export default function StepPage() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const getCurrentStep = () => {
    return findIndex(getSteps(), { path: pathname });
  };
  const getSteps = () => {
    return [
      { id: 0, title: '验证邮箱', path: '/step/1', component: Step1 },
      { id: 1, title: '账号信息', path: '/step/2', component: Step2 },
      { id: 2, title: '完成', path: '/step/3', component: Step3 },
    ];
  };
  const StepComponent = () => {
    const StepComponent = getSteps()[getCurrentStep()].component;
    return <StepComponent form={form} />;
  };
  const handleBack = () => {
    const currentStep = getCurrentStep();
    if (currentStep > 0) history.push(getSteps()[currentStep - 1].path);
  };
  const handleNext = () => {
    const currentStep = getCurrentStep();
    if (currentStep < getSteps().length - 1)
      history.push(getSteps()[currentStep + 1].path);
    else if (currentStep === getSteps().length - 1) alert('finish');
  };
  return (
    <div>
      <h1 style={{ marginBottom: '50px' }}>创建账号</h1>
      <Steps current={getCurrentStep()} style={{ marginBottom: '50px' }}>
        {getSteps().map((step) => (
          <Step key={step.id} title={step.title} />
        ))}
      </Steps>
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Route path="/step/:stepIndex">
          <StepComponent />
        </Route>
      </Form>
      <div style={{ padding: '50px' }}>
        <Button
          disabled={getCurrentStep() === 0}
          style={{ marginRight: '20px' }}
          onClick={handleBack}
        >
          上一步
        </Button>
        <Button onClick={handleNext}>
          {getCurrentStep() === getSteps().length - 1 ? '完成' : '下一步'}
        </Button>
      </div>
    </div>
  );
}
