import { Component, type ReactNode } from 'react';
import '../styles/ErrorBoundary.scss';

interface Props {
  children: ReactNode;
}

interface State {
  message: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  timeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { message: null };
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

  render() {
    const { message } = this.state;

    return (
      <>
        {message && <div className="toast">{message}</div>}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
