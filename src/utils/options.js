import { icons } from "lucide";

export const getCategories = () => {
  return [
    "Education and Learning",
    "Finance and Business",
    "Entertainment and Media",
    "Social and Networking",
    "Technology and Development",
    "Fashion and Lifestyle",
    "Food and Beverage",
    "Automotive and Transportation",
    "Science and Research",
    "Jobs and Careers",
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
export const getProfession = () => {
  return [
    "IT Student",
    "IT Professor",
    "Software Developer",
    "Data Scientist",
    "System Administrator",
    "UX/UI Designer",
    "Project Manager",
    "Business Analyst",
    "Marketing Specialist",
    "Human Resources Manager",
    "Graphic Designer",
    "Web Developer",
  ];
};
