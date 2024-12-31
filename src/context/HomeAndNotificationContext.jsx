import PropTypes from "prop-types";
import React, { createContext, useMemo, useState } from "react";

const HomeAndNotificationContext = createContext({});

export function HomeAndNotificationContextProvider({ children }) {
  const [isHome, setIsHome] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const contextValue = useMemo(
    () => ({
      isHome,
      setIsHome,

      selectedIcon,
      setSelectedIcon,
    }),
    [isHome, selectedIcon]
  );

  return (
    <HomeAndNotificationContext.Provider value={contextValue}>
      {children}
    </HomeAndNotificationContext.Provider>
  );
}

export default HomeAndNotificationContext;

HomeAndNotificationContextProvider.propTypes = {
  children: PropTypes.node,
};
