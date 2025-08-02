import { Component, type ReactNode } from 'react';
import '../styles/ErrorBoundary.scss';

interface Props {
  children: ReactNode;
}

interface State {
  message: string | null;
  error?: unknown;
}

class ErrorBoundary extends Component<Props, State> {
  timeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { message: null, error: null };
  }

  componentDidMount() {
    window.addEventListener('GlobalError', this.handleGlobalError);
  }

  componentWillUnmount() {
    window.removeEventListener('GlobalError', this.handleGlobalError);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  handleGlobalError = (e: Event) => {
    const customEvent = e as CustomEvent;
    const message = customEvent.detail?.message || 'Unknown error occurred';
    this.setState({ message });

    this.timeoutId = window.setTimeout(() => {
      this.setState({ message: null });
    }, 5000);
  };

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    this.setState({ error, message });
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.message}</p>
          <button onClick={() => this.setState({ message: null, error: null })}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
