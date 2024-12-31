import React, { useEffect, useRef, useState } from "react";
import DashBoardImageOne from "../../assets/images/svg/dashboard/DashBoardImageOne";
import { motion } from "framer-motion";
import { ConfigProvider, Image, Rate, Tabs, Typography } from "antd";
import {
  AwardWinners,
  BestSellers,
  CommingSoon,
  NewRelease,
} from "../../utils/constent/BookDetails";
import DashBoardImageTwo from "../../assets/images/svg/dashboard/DashBoardImageTwo";
import { UserDetails } from "../../utils/constent/UserDetails";
const { Text } = Typography;
const Dashboard = () => {
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: -10 },
  };
  const quotes = [
    "Opportunities don’t happen. You create them. Opportunities are not random occurrences but are the result of proactive effort, planning, and taking initiative to shape your future.",
    "Success is not the key to happiness. Happiness is the key to success. True success comes from pursuing what makes you genuinely happy, as happiness drives motivation and passion in achieving your goals.",
    "The only way to do great work is to love what you do. When you are passionate about your work, you are naturally driven to put in effort, creativity, and dedication, leading to outstanding results.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. Confidence and self-belief empower you to overcome challenges, helping you realize your potential and achieve greatness.",
  ];

  const [quote, setQuote] = useState(quotes[0]);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const intervalRef = useRef(null);
  useEffect(() => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      setQuote(quotes[index]);
      index = (index + 1) % quotes.length;
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const [activeTab, setActiveTab] = useState("1");
  const getTextColor = (value) => (activeTab === value ? "#0d7cff" : "gray");
  const tabItems = [
    {
      key: "1",
      label: <Text style={{ color: getTextColor("1") }}>New Releases</Text>,
      content: (
        <div className="h-[50vh] w-full flex flex-row gap-4 items-center justify-between mt-5 py-2 px-4">
          {NewRelease.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly h-[100%] w-[20%]"
            >
              <Image src={item?.source} height={"250px"} />
              <Text>{item?.name}</Text>
              <Rate defaultValue={item?.rating} disabled />
              <Text>$ {item?.price}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: <Text style={{ color: getTextColor("2") }}>Award Winners</Text>,
      content: (
        <div className="h-[50vh] w-full flex flex-row gap-4 items-center justify-between mt-5 py-2 px-4">
          {AwardWinners.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly h-[100%] w-[20%]"
            >
              <Image src={item?.source} height={"250px"} />
              <Text>{item?.name}</Text>
              <Rate defaultValue={item?.rating} disabled />
              <Text>$ {item?.price}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: <Text style={{ color: getTextColor("3") }}>Best Sellers</Text>,
      content: (
        <div className="h-[50vh] w-full flex flex-row gap-4 items-center justify-between mt-5 py-2 px-4">
          {BestSellers.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly h-[100%] w-[20%]"
            >
              <Image src={item?.source} height={"250px"} />
              <Text>{item?.name}</Text>
              <Rate defaultValue={item?.rating} disabled />
              <Text>$ {item?.price}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: <Text style={{ color: getTextColor("4") }}>Coming Soon</Text>,
      content: (
        <div className="h-[50vh] w-full flex flex-row gap-4 items-center justify-between mt-5 py-2 px-4">
          {CommingSoon.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly h-[100%] w-[20%]"
            >
              <Image src={item?.source} height={"250px"} />
              <Text>{item?.name}</Text>
              <Rate defaultValue={item?.rating} disabled />
              <Text>$ {item?.price}</Text>
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      {/* section one */}
      <div className="relative h-[92vh] w-[100%] bg-red-400 flex items-center justify-center">
        <DashBoardImageOne />
        <div className="absolute top-0 top-32 left-24 flex gap-5 flex-col items-center justify-center">
          <Text className="text-lg font-bold text-gray-700">
            Choose Your Book!
          </Text>
          <Text className="text-5xl text-gray-700 w-[80%] text-center">
            Meet Favorite Authors
          </Text>

          <div className="w-[70%] bg-cardGray cursor-pointer h-[10%] text-white flex items-center justify-center p-2 mt-10">
            DISCOVER YOUR NEXT BOOK
          </div>
        </div>
      </div>
      {/* section two */}
      <div className="h-[90vh] w-[100%] bg-white flex flex-col gap-2 items-center justify-start pt-10">
        <Text className="text-5xl font-normal text-black">
          Discover Your Next Book
        </Text>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#FFFFFF",
              borderRadius: 8,
              itemColor: "#FFFFFF",
              colorBorderSecondary: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            centered
            size="large"
            tabBarGutter={30}
            className="w-[80%] max-w-[1200px] mt-10"
            tabBarStyle={{
              height: "40px",
              margin: 0,
              padding: "5px 5px 0px 5px",
              paddingTop: "5px",
              paddingLeft: "8px",
              borderStartStartRadius: "7px",
              borderStartEndRadius: "7px",
            }}
            items={tabItems.map((e, i) => {
              const id = String(i + 1);
              return {
                label: e.label,
                key: id,
                children: e.content,
              };
            })}
          />
        </ConfigProvider>
      </div>
      {/* section three */}
      <div className="relative h-[90vh] w-[100%] bg-yellow-400 flex items-center justify-center">
        <DashBoardImageTwo />
        <div className=" absolute top-1 bottom-0 left-40 w-[600px] flex items-center justify-center sm:bottom-5">
          <motion.div
            key={quote}
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 2 }}
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full text-center font-bold"
          >
            <div className="z-10 w-full text-center">
              <Text className="text-center text-lg font-semibold text-black">
                {quote}{" "}
              </Text>
              <Text className="text-center text-lg font-normal italic text-black">
                – Chris Grosser
              </Text>
            </div>
          </motion.div>
        </div>
      </div>
      {/* section four */}
      <div className="h-[80vh] w-[100%] flex flex-col items-center justify-start pt-10">
        <Text className="text-5xl font-normal text-black">
          Most Popular Authors
        </Text>
        <div className="h-[50vh] w-[90%] flex flex-row gap-4 items-center justify-between py-2 px-4 mt-10">
          {UserDetails.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly h-[100%] w-[20%]"
            >
              <Image src={item?.source} height={"250px"} width={"200px"} />
              <Text className="text-lg font-semibold">{item?.name}</Text>
              <Rate defaultValue={item?.rating} disabled />
              <Text>{item?.role}</Text>
            </div>
          ))}
        </div>
      </div>
      {/* section five */}
      <div className="h-[60vh] w-[100%] flex flex-col items-center justify-center">
        <div className="h-[95%] bg-gray-100 w-full flex items-center justify-start px-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="flex items-start justify-start h-[200px] gap-4 flex-col">
            <Text className="text-lg font-semibold text-primary">
              Contact Us
            </Text>
            <ul className=" text-black mt-4 space-y-2">
              <li>Phone: +1 234 567 890</li>
              <li>Email: contact@bookstore.com</li>
              <li>Address: 123 Book Street, NY, USA</li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="flex items-start justify-start h-[200px] flex-col">
            <Text className="text-lg font-semibold text-primary">
              Quick Links
            </Text>
            <ul className=" text-black mt-4 space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex items-start justify-start h-[200px] flex-col">
            <Text className="text-lg font-semibold text-primary">
              Follow Us
            </Text>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
                className="hover:opacity-75 transition-opacity duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-blue-500"
                  title="Twitter"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.18 4.18 0 001.85-2.31 8.39 8.39 0 01-2.66 1.02 4.16 4.16 0 00-7.1 3.79A11.8 11.8 0 013 5.82a4.16 4.16 0 001.29 5.55 4.11 4.11 0 01-1.88-.52v.05a4.16 4.16 0 003.34 4.08 4.18 4.18 0 01-1.88.07 4.16 4.16 0 003.89 2.89A8.37 8.37 0 012 19.54 11.78 11.78 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54a8.35 8.35 0 002.05-2.12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="h-[5%] w-full flex items-center justify-center">
          <Text className="text-xxs font-semibold text-gray-500">
            &copy; 2025 Online Bookstore. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
