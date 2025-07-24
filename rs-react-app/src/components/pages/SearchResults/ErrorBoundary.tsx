import { Component, type ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log('ErrorBoundary', error, info);
  }
  render() {
    if (this.state.hasError) {
      return <p>ErrorRender</p>;
    }
    return this.props.children;
  }
}
