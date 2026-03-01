import { Link } from "@tanstack/react-router";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    /*
    you have to update state in response to an error and 
    return it inside this method
    */
    return { hasError: true };
  }

  // This method lets you log that error to an error reporting service in production
  componentDidCatch(error, info) {
    // send to TrackJS / Sentry or whatever
    console.log("ErrorBoundary caught some clever error", error, info);
  }

  /* Other class components life cicle methods */
  componentDidMount() {} // Called once immediately after a component is mounted
  componentWillUnmount() {} // Called once immediately before a component is destroyed
  componentDidUpdate() {} // Called immediately after state change occurs (but not on the initial render)

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
