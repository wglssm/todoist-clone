import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue, useSetselectedProjectValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useSetselectedProjectValue: jest.fn(() => {
    setSelectedProject = jest.fn(() => 'INBOX');
  }),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: '123456',
        docId: 'will-wei',
      },
    ],
  })),
}));

describe('Project ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the project overlay', () => {
    const showProjectOverlay = true;
    const setProject = jest.fn();
    const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

    const { queryByTestId } = render(
      <ProjectOverlay
        showProjectOverlay
        setProject={setProject}
        setShowProjectOverlay={setShowProjectOverlay}
      />
    );
    expect(queryByTestId('project-overlay')).toBeTruthy();
    fireEvent.click(queryByTestId('project-overlay-action'));
    expect(setProject).toHaveBeenCalled();
  });
  it('should render the project overlay on key down', () => {
    const showProjectOverlay = true;
    const setProject = jest.fn();
    const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

    const { queryByTestId } = render(
      <ProjectOverlay
        showProjectOverlay
        setProject={setProject}
        setShowProjectOverlay={setShowProjectOverlay}
      />
    );
    expect(queryByTestId('project-overlay')).toBeTruthy();
    fireEvent.keyDown(queryByTestId('project-overlay-action'));
  });
});
