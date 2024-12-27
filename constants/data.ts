interface SaleInvoice {
  id: string;
  customer: string;
  createDate: Date;
  note: string;
  total: number;
  status: number;
}

interface Staff {
  id: string;
  gender: string;
  position: string;
  earning: number;
  phone: string;
  fullname: string;
  dob: Date;
  email: string;
  address: string;
  city: string;
  country: string;
  district: string;
  experience: string;
  kindOfJob: string;
  description: string;
  dow: Date;
  numberSaleInvoice: SaleInvoice[];
}

interface Import {
  id: string;

  suplier: {
    id: string;
    phoneNumber: string;
    fullname: string;
    address: string;
  };
  invoice: {
    id: string;
    productName: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    discount: number;
  }[];
  status: boolean;
  createAt: Date;
  createBy: string;
}

interface Product {
  id: string;
  image: string;
  subImage: string[];
  productName: string;
  price: string;
  material: string;
  description: string;
  vouchers: string;
  provider: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

export const StaffData: Staff[] = [
  {
    id: "1",
    gender: "male",
    position: "staff",
    earning: 1000000,
    phone: "0122222222",
    fullname: "Doh Kyung Soo",
    dob: new Date("2024-11-24"),
    email: "abc123@gmail.com",
    address: "1/111A Cau Xeo, Tan Son Nhi, Tan Phu",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "Teaching English 2 years in high school in Britain",
    kindOfJob: "Fulltime job",
    description:
      "The main teacher who directly follows to their students in the class / course",
    dow: new Date("2024-07-13"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Oohsehun",
        createDate: new Date("2024-08-24"),
        note: "aaaaaaaaaa",
        total: 1000000,
        status: 0
      },
      {
        id: "2",
        customer: "baoazhn",
        createDate: new Date("2024-08-24"),
        note: "aaaaaaaaaa",
        total: 2000000,
        status: 1
      },
      {
        id: "3",
        customer: "chopper",
        createDate: new Date("2024-08-24"),
        note: "aaaaaaaaaa",
        total: 2500000,
        status: 2
      }
    ]
  },
  {
    id: "2",
    gender: "female",
    position: "staff",
    earning: 2000000,
    phone: "0123333333",
    fullname: "Kim Ji Won",
    dob: new Date("2024-06-15"),
    email: "kimjiwon@gmail.com",
    address: "2/222B Le Duan, Ben Thanh, District 1",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "5 years as a software engineer in Korea",
    kindOfJob: "Fulltime job",
    description: "Responsible for developing and maintaining web applications",
    dow: new Date("2024-09-10"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Luhan",
        createDate: new Date("2024-09-20"),
        note: "good service",
        total: 1500000,
        status: 1
      },
      {
        id: "2",
        customer: "Sehun",
        createDate: new Date("2024-09-20"),
        note: "excellent product",
        total: 3000000,
        status: 0
      }
    ]
  },
  {
    id: "3",
    gender: "male",
    position: "staff",
    earning: 1500000,
    phone: "0124444444",
    fullname: "Park Seo Joon",
    dob: new Date("2024-04-30"),
    email: "parkseojun@gmail.com",
    address: "3/333C Nguyen Hue, District 1",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "3 years as a project manager in a multinational company",
    kindOfJob: "Fulltime job",
    description: "Oversees and manages projects from inception to completion",
    dow: new Date("2024-06-01"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Baekhyun",
        createDate: new Date("2024-07-15"),
        note: "Fast delivery",
        total: 1200000,
        status: 1
      },
      {
        id: "2",
        customer: "Chanyeol",
        createDate: new Date("2024-07-16"),
        note: "Great quality",
        total: 1800000,
        status: 2
      }
    ]
  },
  {
    id: "4",
    gender: "female",
    position: "staff",
    earning: 3000000,
    phone: "0125555555",
    fullname: "Jeon Ji Hyun",
    dob: new Date("2024-01-01"),
    email: "jeonjihyun@gmail.com",
    address: "4/444D Pham Hong Thai, Tan Binh",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "8 years in sales management",
    kindOfJob: "Part-time job",
    description:
      "Managing sales strategies and optimizing customer relationships",
    dow: new Date("2024-10-20"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Kai",
        createDate: new Date("2024-09-30"),
        note: "Happy with the service",
        total: 4000000,
        status: 0
      }
    ]
  },
  {
    id: "5",
    gender: "male",
    position: "staff",
    earning: 2500000,
    phone: "0126666666",
    fullname: "Jang Ki Yong",
    dob: new Date("2024-05-20"),
    email: "jangkiyong@gmail.com",
    address: "5/555E Le Lai, Tan Phu",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "2 years as a data analyst in Vietnam",
    kindOfJob: "Fulltime job",
    description:
      "Responsible for gathering and analyzing business data to help companies make informed decisions",
    dow: new Date("2024-08-25"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Suho",
        createDate: new Date("2024-09-05"),
        note: "Very satisfied",
        total: 2200000,
        status: 1
      },
      {
        id: "2",
        customer: "D.O",
        createDate: new Date("2024-09-06"),
        note: "Good experience",
        total: 2000000,
        status: 2
      }
    ]
  },
  {
    id: "6",
    gender: "female",
    position: "staff",
    earning: 1200000,
    phone: "0127777777",
    fullname: "Bae Suzy",
    dob: new Date("2024-02-18"),
    email: "baesuzy@gmail.com",
    address: "6/666F Cong Hoa, Tan Binh",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "1 year as a content writer",
    kindOfJob: "Fulltime job",
    description:
      "Writes engaging and informative content for websites and social media",
    dow: new Date("2024-09-13"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Taeyang",
        createDate: new Date("2024-09-25"),
        note: "Good product",
        total: 1000000,
        status: 0
      }
    ]
  },
  {
    id: "7",
    gender: "male",
    position: "staff",
    earning: 5000000,
    phone: "0128888888",
    fullname: "Lee Min Ho",
    dob: new Date("2024-08-10"),
    email: "leeminho@gmail.com",
    address: "7/777G Hai Ba Trung, District 3",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "10 years in IT consulting",
    kindOfJob: "Fulltime job",
    description:
      "Provides consultation and solutions to businesses on IT infrastructure",
    dow: new Date("2024-05-30"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "G-Dragon",
        createDate: new Date("2024-07-01"),
        note: "Excellent service",
        total: 6000000,
        status: 0
      }
    ]
  },
  {
    id: "8",
    gender: "female",
    position: "staff",
    earning: 1300000,
    phone: "0129999999",
    fullname: "Song Hye Kyo",
    dob: new Date("2024-03-12"),
    email: "songhyekyo@gmail.com",
    address: "8/888H Tran Hung Dao, District 5",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "4 years as a marketing coordinator",
    kindOfJob: "Part-time job",
    description: "Coordinates marketing campaigns and strategies",
    dow: new Date("2024-06-10"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Jisoo",
        createDate: new Date("2024-07-10"),
        note: "Very helpful",
        total: 1100000,
        status: 1
      }
    ]
  },
  {
    id: "9",
    gender: "male",
    position: "staff",
    earning: 3000000,
    phone: "0130000000",
    fullname: "Kang Ha Neul",
    dob: new Date("2024-07-25"),
    email: "kanghaneul@gmail.com",
    address: "9/999I Duong Quang Ham, Tan Binh",
    city: "Ho Chi Minh",
    country: "Viet Nam",
    district: "Q9",
    experience: "6 years as an accountant",
    kindOfJob: "Fulltime job",
    description:
      "Handles financial reporting and accounting tasks for the company",
    dow: new Date("2024-06-15"),
    numberSaleInvoice: [
      {
        id: "1",
        customer: "Jungkook",
        createDate: new Date("2024-08-15"),
        note: "Good product quality",
        total: 3500000,
        status: 1
      },
      {
        id: "2",
        customer: "V",
        createDate: new Date("2024-08-16"),
        note: "Great support",
        total: 4000000,
        status: 2
      }
    ]
  }
];

export const ImportData: Import[] = [
  {
    id: "1",
    suplier: {
      id: "SUP001",
      phoneNumber: "  +84 348775966",
      fullname: "Kim Hyuk-kyu",
      address: "123 Main Street, New York, USA"
    },
    invoice: [
      {
        id: "INV001",
        productName: "Laptop",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 1000,
        quantity: 5,
        discount: 10
      },
      {
        id: "INV002",
        productName: "Laptop",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 1000,
        quantity: 5,
        discount: 10
      },
      {
        id: "INV003",
        productName: "Laptop",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 1000,
        quantity: 5,
        discount: 10
      }
    ],
    status: true,
    createAt: new Date("2024-12-01"),
    createBy: "Admin001"
  },
  {
    id: "2",
    suplier: {
      id: "SUP002",
      phoneNumber: "  +84 348775966",
      fullname: "DEFT VIPPRO",
      address: "456 Oak Avenue, London, UK"
    },
    invoice: [
      {
        id: "INV002",
        productName: "Smartphone",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 500,
        quantity: 10,
        discount: 5
      }
    ],
    status: false,
    createAt: new Date("2024-12-02"),
    createBy: "Admin002"
  },
  {
    id: "3",
    suplier: {
      id: "SUP003",
      phoneNumber: "  +84 348775966",
      fullname: "8386 MÃI ĐỈNH MÃI ĐỈNH ĐỈNH",
      address: "789 Pine Street, Sydney, Australia"
    },
    invoice: [
      {
        id: "INV003",
        productName: "Keyboard",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 50,
        quantity: 20,
        discount: 0
      }
    ],
    status: true,
    createAt: new Date("2024-12-03"),
    createBy: "Admin003"
  },
  {
    id: "4",
    suplier: {
      id: "SUP004",
      phoneNumber: "  +84 348775966",
      fullname: "TONY TONY CHOPPER",
      address: "234 Elm Road, Berlin, Germany"
    },
    invoice: [
      {
        id: "INV004",
        productName: "Monitor",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 150,
        quantity: 8,
        discount: 15
      }
    ],
    status: true,
    createAt: new Date("2024-12-04"),
    createBy: "Admin004"
  },
  {
    id: "5",
    suplier: {
      id: "SUP005",
      phoneNumber: "  +84 348775966",
      fullname: "Global Gadgets",
      address: "567 Maple Boulevard, Toronto, Canada"
    },
    invoice: [
      {
        id: "INV005",
        productName: "Mouse",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 25,
        quantity: 50,
        discount: 5
      }
    ],
    status: false,
    createAt: new Date("2024-12-05"),
    createBy: "Admin005"
  },
  {
    id: "6",
    suplier: {
      id: "SUP006",
      phoneNumber: "  +84 348775966",
      fullname: "Gadget Store",
      address: "901 Birch Lane, Paris, France"
    },
    invoice: [
      {
        id: "INV006",
        productName: "Tablet",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 300,
        quantity: 12,
        discount: 8
      }
    ],
    status: true,
    createAt: new Date("2024-12-06"),
    createBy: "Admin006"
  },
  {
    id: "7",
    suplier: {
      id: "SUP007",
      phoneNumber: "  +84 348775966",
      fullname: "Mega Distributors",
      address: "321 Aspen Road, Dubai, UAE"
    },
    invoice: [
      {
        id: "INV007",
        productName: "Headphones",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 75,
        quantity: 30,
        discount: 10
      }
    ],
    status: false,
    createAt: new Date("2024-12-07"),
    createBy: "Admin007"
  },
  {
    id: "8",
    suplier: {
      id: "SUP008",
      phoneNumber: "  +84 348775966",
      fullname: "Tech World",
      address: "876 Spruce Avenue, Tokyo, Japan"
    },
    invoice: [
      {
        id: "INV008",
        productName: "Webcam",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 40,
        quantity: 25,
        discount: 0
      }
    ],
    status: true,
    createAt: new Date("2024-12-08"),
    createBy: "Admin008"
  },
  {
    id: "9",
    suplier: {
      id: "SUP009",
      phoneNumber: "  +84 348775966",
      fullname: "Electronic Mart",
      address: "654 Cedar Street, Mexico City, Mexico"
    },
    invoice: [
      {
        id: "INV009",
        productName: "Speaker",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 60,
        quantity: 15,
        discount: 5
      }
    ],
    status: false,
    createAt: new Date("2024-12-09"),
    createBy: "Admin009"
  },
  {
    id: "10",
    suplier: {
      id: "SUP010",
      phoneNumber: "  +84 348775966",
      fullname: "Alpha Electronics",
      address: "345 Willow Drive, Moscow, Russia"
    },
    invoice: [
      {
        id: "INV010",
        productName: "Power Bank",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 30,
        quantity: 40,
        discount: 7
      }
    ],
    status: true,
    createAt: new Date("2024-12-10"),
    createBy: "Admin010"
  },
  {
    id: "11",
    suplier: {
      id: "SUP011",
      phoneNumber: "  +84 348775966",
      fullname: "Techie Supplies",
      address: "678 Poplar Lane, Singapore"
    },
    invoice: [
      {
        id: "INV011",
        productName: "USB Drive",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 15,
        quantity: 100,
        discount: 0
      }
    ],
    status: true,
    createAt: new Date("2024-12-11"),
    createBy: "Admin011"
  },
  {
    id: "12",
    suplier: {
      id: "SUP012",
      phoneNumber: "  +84 348775966",
      fullname: "Smart Solutions",
      address: "987 Chestnut Road, Seoul, South Korea"
    },
    invoice: [
      {
        id: "INV012",
        productName: "Charger",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 20,
        quantity: 60,
        discount: 5
      }
    ],
    status: false,
    createAt: new Date("2024-12-12"),
    createBy: "Admin012"
  },
  {
    id: "13",
    suplier: {
      id: "SUP013",
      phoneNumber: "  +84 348775966",
      fullname: "NextGen Supplies",
      address: "432 Pineapple Street, Cape Town, South Africa"
    },
    invoice: [
      {
        id: "INV013",
        productName: "Hard Drive",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 120,
        quantity: 10,
        discount: 12
      }
    ],
    status: true,
    createAt: new Date("2024-12-13"),
    createBy: "Admin013"
  },
  {
    id: "14",
    suplier: {
      id: "SUP014",
      phoneNumber: "  +84 348775966",
      fullname: "Global Tech",
      address: "210 Banana Avenue, Rio de Janeiro, Brazil"
    },
    invoice: [
      {
        id: "INV014",
        productName: "Memory Card",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 10,
        quantity: 200,
        discount: 2
      }
    ],
    status: true,
    createAt: new Date("2024-12-14"),
    createBy: "Admin014"
  },
  {
    id: "15",
    suplier: {
      id: "SUP015",
      phoneNumber: "  +84 348775966",
      fullname: "Prime Tech",
      address: "765 Orange Blvd, Rome, Italy"
    },
    invoice: [
      {
        id: "INV015",
        productName: "Projector",
        productImage:
          "https://i.pinimg.com/736x/78/66/0b/78660b9da6a2a705a19167c698022af9.jpg",

        unitPrice: 500,
        quantity: 2,
        discount: 20
      }
    ],
    status: false,
    createAt: new Date("2024-12-15"),
    createBy: "Admin015"
  }
];

export const ProductsData: Product[] = [
  {
    id: "1",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Leather Wallet",
    price: "$25.99",
    material: "Leather",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "2",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Cotton T-Shirt",
    price: "$15.99",
    material: "Cotton",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "3",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Stainless Steel Watch",
    price: "$199.99",
    material: "Stainless Steel",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "4",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Sports Shoes",
    price: "$49.99",
    material: "Mesh & Rubber",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "5",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Wooden Chair",
    price: "$89.99",
    material: "Wood",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "6",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Silk Scarf",
    price: "$35.00",
    material: "Silk",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "7",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Smartphone Case",
    price: "$9.99",
    material: "Polyurethane",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "8",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Ceramic Mug",
    price: "$12.50",
    material: "Ceramic",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "9",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Guitar",
    price: "$299.99",
    material: "Wood",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "10",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Bluetooth Speaker",
    price: "$89.99",
    material: "Plastic & Metal",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "11",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Canvas Backpack",
    price: "$45.00",
    material: "Canvas",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "12",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "LED Lamp",
    price: "$18.99",
    material: "Plastic & LED",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "13",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Electric Kettle",
    price: "$25.50",
    material: "Stainless Steel",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "14",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Yoga Mat",
    price: "$20.00",
    material: "PVC",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    size: "12",
    color: "white",
    category: "1",
    quantity: 2
  },
  {
    id: "15",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Frying Pan",
    price: "$22.00",
    material: "Cast Iron",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    size: "12",
    color: "white",
    category: "1",
    quantity: 2
  },
  {
    id: "16",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Water Bottle",
    price: "$10.99",
    material: "BPA-Free Plastic",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    size: "12",
    color: "white",
    category: "1",
    quantity: 2
  },
  {
    id: "17",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Handmade Necklace",
    price: "$30.00",
    material: "Silver & Gemstones",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "18",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Wool Blanket",
    price: "$40.00",
    material: "Wool",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "19",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Bluetooth Earbuds",
    price: "$49.99",
    material: "Plastic & Silicone",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "white",
    quantity: 2
  },
  {
    id: "20",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    subImage: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ],
    productName: "Winter Jacket",
    price: "$99.99",
    material: "Polyester & Nylon",
    description: "Elegant Georgous",
    vouchers: "1",
    provider: "1",
    size: "12",
    color: "white",
    category: "1",
    quantity: 2
  }
];
