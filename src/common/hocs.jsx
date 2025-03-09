import React from "react";

const hocs = {
  WithAuth: (PageComponent) => {
    const Component = (props) => {
      const [isAuthenticated, setIsAuthenticated] = React.useState(false);
      const [isLoading, setIsLoading] = React.useState(true);

      React.useEffect(() => {
        // run only once
        const user = localStorage.getItem("user.session");
        const userSession = JSON.parse(user);

        if (userSession && userSession.idToken && userSession.expiresIn) {
          const currentTime = new Date().getTime(); // e.g. 1741441474

          if (currentTime < userSession.expiresIn) {
            // Tip: authenticated and he has a valid token which is not expired
            // Improvement: you can check on backend side if the idToken is valid
            setIsAuthenticated(true);
          }
        }

        setIsLoading(false);
      }, []);

      // Tip: e.g. Show a circle loader in the center of the screen
      if (isLoading) {
        return <p>Loading...</p>;
      }

      // Tip: Show a message to login or not authenticated
      if (!isAuthenticated) {
        return <p>You are not authenticated.</p>;
      }

      // Tip: Show the page where authentication and authorisation is needed
      return <PageComponent {...props} />;
    };
    return <Component />;
  },
};

export default hocs;
