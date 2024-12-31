import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MainLogo from "../../assets/images/svg/MainLayout/MainLogo";
import { ConfigProvider, Input, Popover, Tooltip, Typography } from "antd";
import HomeIcon from "../../assets/images/svg/MainLayout/HomeIcon";
import HomeAndNotificationContext from "../../context/HomeAndNotificationContext";
import DashboardDropdownIcon from "../../assets/images/svg/MainLayout/DashboardDropdownIcon";
import CartIcon from "../../assets/images/svg/MainLayout/CartIcon";
import HelpIconNew from "../../assets/images/svg/MainLayout/HelpIconNew";
import UserColorProfile from "../../components/ColorProfile/UserColorProfile";
import { AuthContext } from "../../context/AuthContext";
const { Text } = Typography;
const DashboardLayout = () => {
  const { isHome, selectedIcon, setSelectedIcon } = useContext(
    HomeAndNotificationContext
  );
  const { block } = useContext(AuthContext);
  const [user, setUser] = useState("Lahiru ");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSearch = (value) => {
    console.log(value);
    //  if (value) {
    //    setSearchValue(value);
    //    handlePopoverVisibleChange("searchBar", true);
    //  } else {
    //    setSearchValue(""); // Clear the search value
    //    handlePopoverVisibleChange("searchBar", false); // Close the popover
    //  }
  };

  const handleClearSearch = () => {
    // setSearchValue(""); // Clear the search field value
    // setPopoverVisible(false); // Optionally close the popover after clearing
  };
  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col">
      {/* dashboard header */}
      <div className="bg-white fixed z-50 flex h-[60px] w-full flex-row items-center justify-between border-b-[0.2px] border-secondarySix px-2 sm:px-4">
        {/* logo */}
        <div
          className="hidden h-10 w-fit items-center justify-start lg:flex"
          onClick={() => {}}
        >
          <Link to="/">
            {/* <MainLogo className="h-[25px] w-[100px] md:h-[30px] md:w-[120px] lg:h-[40px] lg:w-[140px]" /> */}
            <Text className="text-2xl font-bold text-Blue-500">BOOK STORE</Text>
          </Link>
        </div>

        {/* search books */}
        <div className="">
          <Popover
            open={popoverVisible}
            content={
              <div className="h-auto w-[200px] md:h-[440px] md:w-[360px]">
                {/* <SearchPopoverContent
                  setIsClosePopover={() => setPopoverVisible(false)}
                  handlePopoverVisibleChange={handlePopoverVisibleChange}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onClose={handleClearSearch} // Clear search field and close popover
                /> */}
              </div>
            }
            trigger="click"
            arrow={false}
            //onOpenChange={handlePopoverVisibleChange}
          >
            <div
              className=""
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "inherit")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "inherit")
              }
              onClick={() => {
                if (block) {
                  navigate("/subscription-expired"); // Redirect to subscription page if user is blocked
                }
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: "#FFFFFF",
                    borderRadius: "9999px",
                    itemColor: "#FFFFFF",
                  },
                  components: {
                    Input: {
                      activeBorderColor: "primary",
                    },
                  },
                }}
              >
                <div className="flex flex-row rounded-full border-2 border-primary">
                  <Input.Search
                    allowClear
                    size="normal"
                    className="custom-search w-36 items-center text-2xl placeholder:text-3xl placeholder:font-semibold md:w-60 xl:w-96"
                    variant="borderless"
                    placeholder="Search Books by book's name"
                    maxLength={60}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    enterButton
                  />
                </div>
              </ConfigProvider>
            </div>
          </Popover>
        </div>
        {/* support icons */}
        <div className="flex flex-row items-center gap-8">
          <Tooltip title="Home">
            <Link
              className="cursor-pointer"
              to="/"
              onClick={() => handleIconClick("home")}
            >
              <HomeIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "home" ? "#0d7cff" : "#939292"}
              />
            </Link>
          </Tooltip>

          <Tooltip title="All Books">
            <div
              className="cursor-pointer"
              onClick={async () => {
                //await navigateToDashboard();
                handleIconClick("All_books");
              }}
            >
              <DashboardDropdownIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "All_books" ? "#0d7cff" : "#939292"}
              />
            </div>
          </Tooltip>

          <Tooltip title="Cart">
            <div
              className="cursor-pointer"
              onClick={async () => {
                //await navigateToDashboard();
                handleIconClick("Cart");
              }}
            >
              <CartIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "Cart" ? "#0d7cff" : "#939292"}
              />
            </div>
          </Tooltip>

          <Tooltip title="Help">
            <Link
              className="cursor-pointer"
              to="/support"
              onClick={() => handleIconClick("help")}
            >
              <HelpIconNew
                className="h-6 w-6 sm:h-8 sm:w-8"
                color={selectedIcon === "help" ? "#0d7cff" : "#FFA234"}
              />
            </Link>
          </Tooltip>

          <UserColorProfile
            name={user?.userName || "N Z"}
            color={user?.profileColor}
            size="32px"
            textSize="14px"
            onClick={() => handleIconClick("profile")}
          />
        </div>
      </div>
      {/* outlet */}
      <div
        className="mt-[60px] w-full flex-1"
        style={{ backgroundColor: "themeColor" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
