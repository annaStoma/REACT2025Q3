import { render, screen } from '@testing-library/react';
import { act, Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.useFakeTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

class ProblemChild extends Component {
  componentDidMount(): void {
    throw new Error('Test error');
  }

  render() {
    return <div>Problem Child</div>;
  }
}

describe('ErrorBoundary', () => {
  it('catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('resets error state when Reset button is clicked', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong')).toBeInTheDocument();
  });

  it('handles GlobalError event (does not show message if no error)', () => {
    const NormalChild = () => <div>Normal Child</div>;

    render(
      <ErrorBoundary>
        <NormalChild />
      </ErrorBoundary>
    );

    act(() => {
      window.dispatchEvent(
        new CustomEvent('GlobalError', {
          detail: { message: 'Global error occurred' },
        })
      );
    });

    expect(screen.queryByText('Global error occurred')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Global error occurred')).not.toBeInTheDocument();
  });
});
