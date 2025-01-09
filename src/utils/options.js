import { icons } from "lucide";

export const getCategories = () => {
  return [
    "E-Commerce",
    "Education and Learning",
    "Creative Portfolios and Showcases",
    "Health and Fitness",
    "Finance and Business",
    "Entertainment and Media",
    "Social and Networking",
    "Real Estate and Property",
    "Travel and Hospitality",
    "Technology and Development",
    "Charity and Non-Profit",
    "Fashion and Lifestyle",
    "Food and Beverage",
    "Automotive and Transportation",
    "Home and Garden",
    "Science and Research",
    "Sports and Recreation",
    "Jobs and Careers",
    "Government and Civic Engagement",
    "Personal and Productivity Tools",
    "Other Niche Categories",
  ];
};

export const getProjectTypes = () => {
  return ["LOGICIEL", "NON_LOGICIEL"];
};

export const getProjectVisibility = () => {
  return [
    {
      name: "PUBLIC",
      icon: "GlobIcon",
    },
    {
      name: "PRIVATE",
      icon: "LockIcon",
    },
  ];
};
