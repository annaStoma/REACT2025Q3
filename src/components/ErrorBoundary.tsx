import React, {Component, type ReactNode} from 'react';
import '../styles/ErrorBoundary.scss';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    timeoutId: any = null;

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, errorMessage: ''};
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, errorMessage: error.message};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.showToast();
    }

    showToast = () => {
        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            this.setState({hasError: false, errorMessage: ''});
        }, 2000);
    };

    renderToast() {
        console.log('renderToast', this.state)
        const {hasError, errorMessage} = this.state;

        if (!hasError) return null;

        return (
            <div className="toast">
                {errorMessage || 'Something went wrong.'}
            </div>
        );
    }

    render() {
        return (
            <>
                {this.renderToast()}
                {this.props.children}
            </>
        );
    }
}

export default ErrorBoundary;
