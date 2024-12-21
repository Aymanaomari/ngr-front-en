export const getfakeUsersProjects = () => {
  return {
    nom_long: "Renewable Energy Initiative",
    nom_court: "REI",
    description:
      "A project focused on developing sustainable energy solutions.",
    theme: "Energy and Environment",
    type: "Public",
    visibilite: "Open",
    created_date: "2024-12-20T00:00:00Z",
    groupMembers: [
      {
        id: 1,
        first_name: "Alice",
        last_name: "Johnson",
        username: "alicej",
        email: "alicej@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["member"], // Relevant group
          },
        ],
      },
      {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        username: "bobsmith",
        email: "bobsmith@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["group admin"], // Relevant group
          },
        ],
      },
      {
        id: 7,
        first_name: "Ayman",
        last_name: "Aomari",
        username: "ayman123",
        email: "ayman@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["group admin", "member"], // Relevant to main project group
          },
        ],
      },
      {
        id: 3,
        first_name: "Charlie",
        last_name: "Brown",
        username: "charlieb",
        email: "charlieb@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["member"], // Relevant group
          },
        ],
      },
      {
        id: 4,
        first_name: "Diana",
        last_name: "Prince",
        username: "dianap",
        email: "dianap@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["member"], // Relevant group
          },
        ],
      },
      {
        id: 5,
        first_name: "Eve",
        last_name: "Adams",
        username: "eveadams",
        email: "eveadams@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["member"], // Relevant group
          },
        ],
      },
      {
        id: 6,
        first_name: "Frank",
        last_name: "White",
        username: "frankw",
        email: "frankw@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["member"], // Relevant group
          },
        ],
      },
    ],
    groupAdmins: [
      {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        username: "bobsmith",
        email: "bobsmith@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["group admin"], // Relevant group
          },
        ],
      },
      {
        id: 7,
        first_name: "Ayman",
        last_name: "Aomari",
        username: "ayman123",
        email: "ayman@example.com",
        rolesPergroups: [
          {
            group: "REI",
            roles: ["group admin"], // Relevant group
          },
        ],
      },
    ],
    globalMessages: [
      {
        content: "Welcome to the Renewable Energy Initiative!",
        date: "2024-12-20T08:00:00Z",
        sender: {
          id: 2,
          first_name: "Bob",
          last_name: "Smith",
        },
      },
      {
        content: "Let's collaborate to make this project a success!",
        date: "2024-12-21T10:30:00Z",
        sender: {
          id: 1,
          first_name: "Alice",
          last_name: "Johnson",
        },
      },
      {
        content: "Does anyone have updates on their tasks?",
        date: "2024-12-22T14:15:00Z",
        sender: {
          id: 7,
          first_name: "Ayman",
          last_name: "Aomari",
        },
      },
    ],
    subGroups: [
      {
        id: 1,
        name: "Solar Panel Design Team",
        members: [
          {
            id: 3,
            first_name: "Charlie",
            last_name: "Brown",
            username: "charlieb",
            email: "charlieb@example.com",
          },
          {
            id: 4,
            first_name: "Diana",
            last_name: "Prince",
            username: "dianap",
            email: "dianap@example.com",
          },
          {
            id: 7,
            first_name: "Ayman",
            last_name: "Aomari",
            username: "ayman123",
            email: "ayman@example.com",
          },
        ],
        messages: [
          {
            content:
              "Remember to finalize the solar panel designs by next week.",
            date: "2024-12-15T09:00:00Z",
            sender: {
              id: 3,
              first_name: "Charlie",
              last_name: "Brown",
            },
          },
          {
            content: "I’ll start testing the materials tomorrow.",
            date: "2024-12-16T11:45:00Z",
            sender: {
              id: 4,
              first_name: "Diana",
              last_name: "Prince",
            },
          },
          {
            content: "Can we have a quick meeting today to review progress?",
            date: "2024-12-18T14:20:00Z",
            sender: {
              id: 7,
              first_name: "Ayman",
              last_name: "Aomari",
            },
          },
        ],
      },
      {
        id: 2,
        name: "Wind Turbine Analysis Team",
        members: [
          {
            id: 5,
            first_name: "Eve",
            last_name: "Adams",
            username: "eveadams",
            email: "eveadams@example.com",
          },
          {
            id: 6,
            first_name: "Frank",
            last_name: "White",
            username: "frankw",
            email: "frankw@example.com",
          },
        ],
        messages: [
          {
            content: "I’ve collected the initial wind speed data.",
            date: "2024-12-12T13:30:00Z",
            sender: {
              id: 5,
              first_name: "Eve",
              last_name: "Adams",
            },
          },
          {
            content: "The blade optimization results look promising!",
            date: "2024-12-14T16:00:00Z",
            sender: {
              id: 6,
              first_name: "Frank",
              last_name: "White",
            },
          },
          {
            content: "Let’s discuss the next steps for data analysis.",
            date: "2024-12-19T10:15:00Z",
            sender: {
              id: 5,
              first_name: "Eve",
              last_name: "Adams",
            },
          },
        ],
      },
    ],
    tasks: [
      {
        id: 1,
        subGroupId: 1,
        title: "Design Solar Panel Prototypes",
        description: "Create initial designs for solar panel prototypes.",
        assignedMembers: ["Charlie Brown", "Diana Prince"],
        status: "in-progress",
        createdDate: "2024-12-01T00:00:00Z",
        dueDate: "2025-01-15T00:00:00Z",
      },
      {
        id: 2,
        subGroupId: 1,
        title: "Material Testing",
        description: "Test materials for efficiency and durability.",
        assignedMembers: ["Charlie Brown"],
        status: "pending",
        createdDate: "2024-12-05T00:00:00Z",
        dueDate: "2025-02-01T00:00:00Z",
      },
      {
        id: 3,
        subGroupId: 2,
        title: "Analyze Wind Speeds",
        description:
          "Collect and analyze wind speed data for turbine placement.",
        assignedMembers: ["Eve Adams", "Frank White"],
        status: "in-progress",
        createdDate: "2024-11-15T00:00:00Z",
        dueDate: "2025-01-01T00:00:00Z",
      },
      {
        id: 4,
        subGroupId: 2,
        title: "Optimize Blade Design",
        description: "Improve blade design for better efficiency.",
        assignedMembers: ["Eve Adams"],
        status: "pending",
        createdDate: "2024-12-10T00:00:00Z",
        dueDate: "2025-02-15T00:00:00Z",
      },
    ],
    personalMessages: [
      {
        discussionBetween: [1, 7], // Alice and Ayman
        messages: [
          {
            from: 1,
            to: 7,
            content: "Hey Ayman, can you review the solar panel designs?",
            sendTime: "2024-12-19T08:30:00Z",
            status: "unread",
          },
          {
            from: 1,
            to: 7,
            content: "Let me know your thoughts by tomorrow.",
            sendTime: "2024-12-19T09:00:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 1,
            content: "Hi Alice, I'll review the designs today.",
            sendTime: "2024-12-19T10:00:00Z",
            status: "read",
          },
          {
            from: 1,
            to: 7,
            content: "Also, check the new budget proposal I shared.",
            sendTime: "2024-12-19T14:45:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 1,
            content: "Budget proposal looks great. Just one minor suggestion.",
            sendTime: "2024-12-19T17:00:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 1,
            content: "Check the comments I added to the document.",
            sendTime: "2024-12-19T17:30:00Z",
            status: "read",
          },
          {
            from: 7,
            to: 1,
            content: "Let me know if you need anything else!",
            sendTime: "2024-12-19T18:00:00Z",
            status: "read",
          },
          {
            from: 1,
            to: 7,
            content: "Looking forward to your feedback.",
            sendTime: "2024-12-19T16:20:00Z",
            status: "unread",
          },
        ],
      },
      {
        discussionBetween: [2, 7], // Bob and Ayman
        messages: [
          {
            from: 2,
            to: 7,
            content: "Ayman, can you attend tomorrow's meeting?",
            sendTime: "2024-12-18T10:30:00Z",
            status: "unread",
          },
          {
            from: 2,
            to: 7,
            content: "It's crucial to finalize the turbine analysis.",
            sendTime: "2024-12-18T12:00:00Z",
            status: "unread",
          },
          {
            from: 2,
            to: 7,
            content: "Please confirm your availability.",
            sendTime: "2024-12-18T15:15:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 2,
            content: "Hi Bob, I'll be there at 10 AM.",
            sendTime: "2024-12-18T16:00:00Z",
            status: "read",
          },
          {
            from: 7,
            to: 2,
            content: "Let me prepare the required data beforehand.",
            sendTime: "2024-12-18T16:45:00Z",
            status: "read",
          },
          {
            from: 7,
            to: 2,
            content: "Thanks for reminding me about the meeting.",
            sendTime: "2024-12-18T17:30:00Z",
            status: "read",
          },
        ],
      },
      {
        discussionBetween: [3, 7], // Charlie and Ayman
        messages: [
          {
            from: 3,
            to: 7,
            content: "Ayman, are you available for a quick discussion?",
            sendTime: "2024-12-17T09:00:00Z",
            status: "unread",
          },
          {
            from: 3,
            to: 7,
            content: "I need help with the solar efficiency calculation.",
            sendTime: "2024-12-17T09:30:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 3,
            content: "Hi Charlie, I can join you at 3 PM.",
            sendTime: "2024-12-17T12:30:00Z",
            status: "read",
          },
          {
            from: 3,
            to: 7,
            content: "Let me know when you're free.",
            sendTime: "2024-12-17T10:00:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 3,
            content: "Send me the data you have so far.",
            sendTime: "2024-12-17T13:00:00Z",
            status: "read",
          },
          {
            from: 7,
            to: 3,
            content: "I'll check the calculations before our call.",
            sendTime: "2024-12-17T14:00:00Z",
            status: "read",
          },
        ],
      },
      {
        discussionBetween: [4, 7], // Diana and Ayman
        messages: [
          {
            from: 4,
            to: 7,
            content: "Hey Ayman, great job on the last presentation!",
            sendTime: "2024-12-16T15:00:00Z",
            status: "unread",
          },
          {
            from: 4,
            to: 7,
            content: "Can you share the slides with the team?",
            sendTime: "2024-12-16T15:30:00Z",
            status: "unread",
          },
          {
            from: 4,
            to: 7,
            content: "Thanks in advance.",
            sendTime: "2024-12-16T16:00:00Z",
            status: "unread",
          },
          {
            from: 7,
            to: 4,
            content: "Hi Diana, thank you! I'll share the slides now.",
            sendTime: "2024-12-16T17:00:00Z",
            status: "read",
          },
          {
            from: 7,
            to: 4,
            content: "Let me know if there's anything to improve.",
            sendTime: "2024-12-16T17:15:00Z",
            status: "read",
          },
        ],
      },
    ],
  };
};
