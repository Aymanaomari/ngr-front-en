import Project from "../../model/project";

export const getProjects = () => {
  return [
    new Project({
      nom_long: "Sustainable Urban Development Initiative",
      nom_court: "SUDI",
      description:
        "A project focused on creating sustainable solutions for urban development, including energy-efficient buildings and green transportation.",
      theme: "Urban Planning",
      type: "Research",
      visibilite: "public",
      created_date: "2024-03-15",
    }),
    new Project({
      nom_long: "teamA",
      nom_court: "AI-REO",
      description:
        "Leveraging artificial intelligence to optimize renewable energy production and distribution.",
      theme: "Renewable Energy",
      type: "Innovation",
      visibilite: "public",
      created_date: "2023-12-01",
    }),
    new Project({
      nom_long: "Community Solar Installation Program",
      nom_court: "SolarCom",
      description:
        "Encouraging local communities to install and maintain solar panels for shared use.",
      theme: "Solar Energy",
      type: "Community",
      visibilite: "prive",
      created_date: "2023-10-10",
    }),
    new Project({
      nom_long: "Efficient Building Insulation Research",
      nom_court: "InsulTech",
      description:
        "Developing and testing advanced materials for more efficient building insulation.",
      theme: "Building Efficiency",
      type: "Research",
      visibilite: "prive",
      created_date: "2024-02-20",
    }),
    new Project({
      nom_long: "Industrial Cold Storage Optimization",
      nom_court: "ColdChainOpt",
      description:
        "Analyzing and optimizing energy use in industrial cold storage facilities.",
      theme: "Industrial Efficiency",
      type: "Optimization",
      visibilite: "public",
      created_date: "2023-08-15",
    }),
    new Project({
      nom_long: "Smart Grid Energy Distribution",
      nom_court: "SmartGrid",
      description:
        "Implementing smart grid technologies to enhance energy distribution efficiency.",
      theme: "Energy Distribution",
      type: "Technology",
      visibilite: "prive",
      created_date: "2024-01-05",
    }),
    new Project({
      nom_long: "GreenTech Innovation Lab",
      nom_court: "GreenLab",
      description:
        "A collaborative space for developing green technologies and sustainable practices.",
      theme: "Green Technology",
      type: "Innovation",
      visibilite: "public",
      created_date: "2023-09-25",
    }),
    new Project({
      nom_long: "Waste Management and Recycling Solutions",
      nom_court: "RecycSol",
      description:
        "Developing innovative waste management and recycling strategies for urban areas.",
      theme: "Waste Management",
      type: "Research",
      visibilite: "public",
      created_date: "2023-11-18",
    }),
    new Project({
      nom_long: "Climate Action Education Network",
      nom_court: "ClimateEd",
      description:
        "Building a global network to educate communities on climate action and sustainable practices.",
      theme: "Climate Change",
      type: "Community",
      visibilite: "prive",
      created_date: "2024-04-02",
    }),
    new Project({
      nom_long: "Electric Vehicle Charging Infrastructure",
      nom_court: "EV-Charge",
      description:
        "Designing and implementing scalable electric vehicle charging networks.",
      theme: "Transportation",
      type: "Technology",
      visibilite: "public",
      created_date: "2023-07-14",
    }),
  ];
};
