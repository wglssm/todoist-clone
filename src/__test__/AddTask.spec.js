import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('TEST_ID')),
      })),
    })),
  },
}));
describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the add task component', () => {
    const { getByTestId } = render(<AddTask />);
    expect(getByTestId('add-task-comp')).toBeTruthy();
  });

  it('should render the <AddTask /> quick overlay ', () => {
    const setShowQuickAddTask = jest.fn();
    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain
        shouldShowMain={false}
        showQuickAddTask
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    expect(queryByTestId('quick-add-task')).toBeTruthy();
  });

  it('renders the <AddTask/> main showable when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();
  });

  it('renders the <AddTask/> main showable when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-project-overlay'));
    expect(queryByTestId('project-overlay')).toBeTruthy();
  });

  it('renders the <AddTask/> task date overlay when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('show-task-date-overlay'));
    expect(queryByTestId('show-task-date-overlay')).toBeTruthy();
  });

  it('hide the <AddTask/> when click cancel', () => {
    const { queryByTestId } = render(<AddTask showAddTaskMain />);
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-main-cancel'));
    expect(queryByTestId('show-task-date-overlay')).toBeFalsy();
  });

  it('render the <AddTask/> for quick task then clicks cancel', () => {
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId } = render(
      <AddTask showQuickAddTask setShowQuickAddTask={setShowQuickAddTask} />
    );
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruthy();

    fireEvent.click(queryByTestId('add-task-quick-cancel'));
    expect(setShowQuickAddTask).toHaveBeenCalled();
  });

  it('render the <AddTask/> and a task in today', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
    }));
    const showQuickAddTask = true;
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
    const { queryByTestId } = render(
      <AddTask
        showQuickAddTask={false}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    );
    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-content')).toBeTruthy();

    fireEvent.change(queryByTestId('add-task-content'), {
      target: { value: 'TEST_TASK' },
    });

    expect(queryByTestId('add-task-content').value).toBe('TEST_TASK');
  });
});
