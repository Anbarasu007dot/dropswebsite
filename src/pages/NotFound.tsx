import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Drops Chemicals</h1>
        <p className="text-xl text-gray-600 mb-4">
          Oops! Page not found. It seems we can't find the page you're looking for
          in our water treatment website navigation.
        </p>
        <p className="text-xl text-gray-600 mb-4">
          You may have followed a broken link or entered a URL that doesn't
          exist.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Return to Home
        </a>
        <p className="text-md text-gray-500 mt-4">
          For industrial chemical solutions and eco-friendly water treatment
          options, explore our homepage or contact us for assistance.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
