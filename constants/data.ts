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

interface ImageInfo {
  url: string;
  fileName: string;
}

interface Product {
  id: string;
  image: string;
  imageInfo: ImageInfo[];
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

interface Voucher {
  id: string;
  name: string;
  discount: number;
  expDate: Date;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  createAt: Date;
  productNamme: string;
  size: string;
  material: string;
  comment: string;
  image: string[];
}

interface OrderCustomer {
  id: string;
  createAt: string;
  createBy: string;
  cost: number;
}

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  avatar: string;
  point: number;
  sales: number;
  orders: OrderCustomer[];
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
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_wallet_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_wallet_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_wallet_2.jpg"
      }
    ],
    productName: "Leather Wallet",
    price: "$25.99",
    material: "Leather",
    description: "Elegant and Gorgeous design",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "12",
    color: "White",
    quantity: 2
  },
  {
    id: "2",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_tshirt_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_tshirt_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_tshirt_2.jpg"
      }
    ],
    productName: "Cotton T-Shirt",
    price: "$15.99",
    material: "Cotton",
    description: "Comfortable and stylish",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "M",
    color: "White",
    quantity: 5
  },
  {
    id: "3",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_steel_watch_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_steel_watch_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_steel_watch_2.jpg"
      }
    ],
    productName: "Stainless Steel Watch",
    price: "$199.99",
    material: "Stainless Steel",
    description: "Elegant design with precision",
    vouchers: "1",
    provider: "1",
    category: "1",
    size: "One Size",
    color: "Silver",
    quantity: 4
  },
  {
    id: "4",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "sports_shoes_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "sports_shoes_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "sports_shoes_2.jpg"
      }
    ],
    productName: "Sports Shoes",
    price: "$49.99",
    material: "Mesh & Rubber",
    description: "Perfect for running and sports activities",
    vouchers: "1",
    provider: "1",
    category: "2",
    size: "8",
    color: "Black",
    quantity: 3
  },
  {
    id: "5",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "wooden_chair_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "wooden_chair_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "wooden_chair_2.jpg"
      }
    ],
    productName: "Wooden Chair",
    price: "$89.99",
    material: "Wood",
    description: "Sturdy and comfortable",
    vouchers: "1",
    provider: "2",
    category: "3",
    size: "One Size",
    color: "Brown",
    quantity: 5
  },
  {
    id: "6",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "silk_scarf_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "silk_scarf_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "silk_scarf_2.jpg"
      }
    ],
    productName: "Silk Scarf",
    price: "$35.00",
    material: "Silk",
    description: "Luxury and comfort",
    vouchers: "1",
    provider: "2",
    category: "4",
    size: "One Size",
    color: "Red",
    quantity: 6
  },
  {
    id: "7",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_case_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_case_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_case_2.jpg"
      }
    ],
    productName: "Smartphone Case",
    price: "$9.99",
    material: "Polyurethane",
    description: "Protect your phone with style",
    vouchers: "1",
    provider: "1",
    category: "5",
    size: "One Size",
    color: "Black",
    quantity: 10
  },
  {
    id: "8",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_bag_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_bag_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "leather_bag_2.jpg"
      }
    ],
    productName: "Leather Bag",
    price: "$79.99",
    material: "Leather",
    description: "Stylish and durable",
    vouchers: "1",
    provider: "2",
    category: "2",
    size: "One Size",
    color: "Brown",
    quantity: 4
  },
  {
    id: "9",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "kitchen_knife_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "kitchen_knife_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "kitchen_knife_2.jpg"
      }
    ],
    productName: "Kitchen Knife",
    price: "$35.00",
    material: "Stainless Steel",
    description: "Sharp and precise for kitchen use",
    vouchers: "1",
    provider: "3",
    category: "6",
    size: "One Size",
    color: "Silver",
    quantity: 3
  },
  {
    id: "10",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_pot_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_pot_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "stainless_pot_2.jpg"
      }
    ],
    productName: "Stainless Steel Pot",
    price: "$59.99",
    material: "Stainless Steel",
    description: "Perfect for cooking",
    vouchers: "1",
    provider: "3",
    category: "6",
    size: "Medium",
    color: "Silver",
    quantity: 7
  },
  {
    id: "11",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_shirt_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_shirt_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "cotton_shirt_2.jpg"
      }
    ],
    productName: "Cotton Shirt",
    price: "$24.99",
    material: "Cotton",
    description: "Comfortable and soft",
    vouchers: "1",
    provider: "4",
    category: "1",
    size: "L",
    color: "Blue",
    quantity: 15
  },
  {
    id: "12",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smart_watch_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smart_watch_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smart_watch_2.jpg"
      }
    ],
    productName: "Smart Watch",
    price: "$199.99",
    material: "Plastic, Stainless Steel",
    description: "Track your health and fitness",
    vouchers: "2",
    provider: "5",
    category: "3",
    size: "One Size",
    color: "Black",
    quantity: 10
  },
  {
    id: "13",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "headphones_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "headphones_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "headphones_2.jpg"
      }
    ],
    productName: "Wireless Headphones",
    price: "$79.99",
    material: "Plastic, Metal",
    description: "Noise-cancelling, wireless convenience",
    vouchers: "1",
    provider: "5",
    category: "3",
    size: "One Size",
    color: "Black",
    quantity: 8
  },
  {
    id: "14",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "pillow_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "pillow_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "pillow_2.jpg"
      }
    ],
    productName: "Memory Foam Pillow",
    price: "$29.99",
    material: "Memory Foam",
    description: "Comfortable and supportive for a good night's sleep",
    vouchers: "2",
    provider: "6",
    category: "5",
    size: "Standard",
    color: "White",
    quantity: 25
  },
  {
    id: "15",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "air_conditioner_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "air_conditioner_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "air_conditioner_2.jpg"
      }
    ],
    productName: "Air Conditioner",
    price: "$499.99",
    material: "Plastic, Metal",
    description: "Cooling your home efficiently",
    vouchers: "3",
    provider: "7",
    category: "4",
    size: "Medium",
    color: "White",
    quantity: 12
  },
  {
    id: "16",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "coffee_machine_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "coffee_machine_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "coffee_machine_2.jpg"
      }
    ],
    productName: "Coffee Machine",
    price: "$120.00",
    material: "Plastic, Stainless Steel",
    description: "Brew your favorite coffee in minutes",
    vouchers: "1",
    provider: "8",
    category: "6",
    size: "One Size",
    color: "Black",
    quantity: 5
  },
  {
    id: "17",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "smartphone_2.jpg"
      }
    ],
    productName: "Smartphone",
    price: "$799.99",
    material: "Glass, Aluminum",
    description: "Latest model with advanced features",
    vouchers: "3",
    provider: "9",
    category: "3",
    size: "One Size",
    color: "Silver",
    quantity: 20
  },
  {
    id: "18",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "vacuum_cleaner_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "vacuum_cleaner_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "vacuum_cleaner_2.jpg"
      }
    ],
    productName: "Vacuum Cleaner",
    price: "$89.99",
    material: "Plastic, Metal",
    description: "Powerful suction for your home",
    vouchers: "1",
    provider: "10",
    category: "6",
    size: "One Size",
    color: "Red",
    quantity: 10
  },
  {
    id: "19",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "speaker_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "speaker_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "speaker_2.jpg"
      }
    ],
    productName: "Bluetooth Speaker",
    price: "$49.99",
    material: "Plastic",
    description: "Portable with great sound",
    vouchers: "2",
    provider: "11",
    category: "3",
    size: "One Size",
    color: "Black",
    quantity: 30
  },
  {
    id: "20",
    image:
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
    imageInfo: [
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "desk_lamp_main.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "desk_lamp_1.jpg"
      },
      {
        url: "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
        fileName: "desk_lamp_2.jpg"
      }
    ],
    productName: "Desk Lamp",
    price: "$29.99",
    material: "Plastic",
    description: "Adjustable and energy-efficient",
    vouchers: "1",
    provider: "12",
    category: "5",
    size: "One Size",
    color: "White",
    quantity: 12
  }
];

export const Vouchers: Voucher[] = [
  {
    id: "1",
    name: "Discount 10%",
    discount: 10,
    expDate: new Date("2025-01-01")
  },
  {
    id: "2",
    name: "Flash Sale 20%",
    discount: 20,
    expDate: new Date("2025-01-02")
  },
  {
    id: "3",
    name: "Holiday Special 15%",
    discount: 15,
    expDate: new Date("2025-02-14")
  },
  {
    id: "4",
    name: "Free Shipping",
    discount: 10,
    expDate: new Date("2025-03-01")
  },
  {
    id: "5",
    name: "Black Friday 25%",
    discount: 25,
    expDate: new Date("2025-11-29")
  },
  {
    id: "6",
    name: "Cyber Monday 30%",
    discount: 30,
    expDate: new Date("2025-12-02")
  },
  {
    id: "7",
    name: "New Year 20%",
    discount: 20,
    expDate: new Date("2025-01-01")
  },
  {
    id: "8",
    name: "Valentine's Day 15%",
    discount: 15,
    expDate: new Date("2025-02-14")
  },
  {
    id: "9",
    name: "Summer Sale 10%",
    discount: 10,
    expDate: new Date("2025-07-01")
  },
  {
    id: "10",
    name: "Spring Special 12%",
    discount: 12,
    expDate: new Date("2025-04-01")
  },
  {
    id: "11",
    name: "Easter Special 18%",
    discount: 18,
    expDate: new Date("2025-04-20")
  },
  {
    id: "12",
    name: "Back to School 5%",
    discount: 5,
    expDate: new Date("2025-08-15")
  },
  {
    id: "13",
    name: "Birthday Bash 25%",
    discount: 25,
    expDate: new Date("2025-09-01")
  },
  {
    id: "14",
    name: "Shopping Festival 35%",
    discount: 35,
    expDate: new Date("2025-10-15")
  },
  {
    id: "15",
    name: "Anniversary 50%",
    discount: 50,
    expDate: new Date("2025-12-01")
  },
  {
    id: "16",
    name: "Lucky Day 22%",
    discount: 22,
    expDate: new Date("2025-05-13")
  },
  {
    id: "17",
    name: "Weekend Special 11%",
    discount: 11,
    expDate: new Date("2025-06-07")
  },
  {
    id: "18",
    name: "Winter Warm-Up 14%",
    discount: 14,
    expDate: new Date("2025-12-15")
  },
  {
    id: "19",
    name: "Festival of Lights 20%",
    discount: 20,
    expDate: new Date("2025-11-10")
  },
  {
    id: "20",
    name: "Year-End Clearance 40%",
    discount: 40,
    expDate: new Date("2025-12-31")
  }
];

export const Comments: Comment[] = [
  {
    id: "1",
    userId: "user01",
    userName: "Alice",
    productId: "1",
    rating: 5,
    createAt: new Date("2024-12-20T12:30:00"),
    productNamme: "Gold Necklace",
    size: "M",
    material: "Gold",
    comment: "Absolutely stunning piece! Highly recommend.",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "2",
    userId: "user02",
    userName: "Bob",
    productId: "1",
    rating: 4,
    createAt: new Date("2024-12-21T14:00:00"),
    productNamme: "Silver Bracelet",
    size: "L",
    material: "Silver",
    comment: "Great quality, but delivery was a bit late.",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "3",
    userId: "user03",
    userName: "Charlie",
    productId: "1",
    rating: 3,
    createAt: new Date("2024-12-18T16:00:00"),
    productNamme: "Diamond Ring",
    size: "S",
    material: "Gold",
    comment: "Looks good but smaller than expected.",
    image: []
  },
  {
    id: "4",
    userId: "user04",
    userName: "Diana",
    productId: "1",
    rating: 5,
    createAt: new Date("2024-12-15T10:30:00"),
    productNamme: "Pearl Earrings",
    size: "M",
    material: "Silver",
    comment: "Beautiful and well-made. Perfect gift!",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "5",
    userId: "user05",
    userName: "Eve",
    productId: "1",
    rating: 2,
    createAt: new Date("2024-12-14T08:45:00"),
    productNamme: "Platinum Ring",
    size: "L",
    material: "Platinum",
    comment: "Too expensive for the quality provided.",
    image: []
  },
  {
    id: "6",
    userId: "user06",
    userName: "Frank",
    productId: "1",
    rating: 4,
    createAt: new Date("2024-12-22T11:20:00"),
    productNamme: "Titanium Watch",
    size: "M",
    material: "Titanium",
    comment: "Looks stylish and durable.",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "7",
    userId: "user07",
    userName: "Grace",
    productId: "1",
    rating: 5,
    createAt: new Date("2024-12-19T09:15:00"),
    productNamme: "Gold Chain",
    size: "S",
    material: "Gold",
    comment: "Exactly what I was looking for. Perfect size!",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "8",
    userId: "user08",
    userName: "Hank",
    productId: "1",
    rating: 3,
    createAt: new Date("2024-12-17T14:10:00"),
    productNamme: "Ruby Pendant",
    size: "M",
    material: "Silver",
    comment: "Color not as vibrant as in the pictures.",
    image: []
  },
  {
    id: "9",
    userId: "user09",
    userName: "Ivy",
    productId: "1",
    rating: 5,
    createAt: new Date("2024-12-23T12:00:00"),
    productNamme: "Emerald Necklace",
    size: "L",
    material: "Gold",
    comment: "Very elegant. Got many compliments!",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg",
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  },
  {
    id: "10",
    userId: "user10",
    userName: "Jack",
    productId: "1",
    rating: 4,
    createAt: new Date("2024-12-16T13:50:00"),
    productNamme: "Silver Ring",
    size: "M",
    material: "Silver",
    comment: "Simple and classy. Good for daily wear.",
    image: [
      "https://i.pinimg.com/736x/40/64/d4/4064d49b6a79f57ee49f452655c895d3.jpg"
    ]
  }
];

export const CustomerData: Customer[] = [
  {
    id: "1",
    fullName: "Phạm Thị D",
    phoneNumber: "0945678901",
    email: "phamthid@example.com",
    address: "12 Đường KLM, Phường STU, Quận 4, TP.HCM",
    avatar: "https://example.com/avatar4.jpg",
    point: 220,
    sales: 320.5,
    orders: [
      {
        id: "order006",
        createAt: new Date("2024-11-30").toISOString(),
        createBy: "admin006",
        cost: 320.5
      }
    ]
  },
  {
    id: "2",
    fullName: "Võ Văn E",
    phoneNumber: "0976543210",
    email: "vovane@example.com",
    address: "34 Đường VWX, Phường YZ, Quận 5, TP.HCM",
    avatar: "https://example.com/avatar5.jpg",
    point: 90,
    sales: 230.25,
    orders: [
      {
        id: "order007",
        createAt: new Date("2024-11-15").toISOString(),
        createBy: "admin007",
        cost: 150.25
      },
      {
        id: "order008",
        createAt: new Date("2024-11-22").toISOString(),
        createBy: "admin008",
        cost: 80.0
      }
    ]
  },
  {
    id: "3",
    fullName: "Đặng Thị F",
    phoneNumber: "0923456789",
    email: "dangthif@example.com",
    address: "56 Đường XYZ, Phường OPQ, Quận 6, TP.HCM",
    avatar: "https://example.com/avatar6.jpg",
    point: 110,
    sales: 300.0,
    orders: [
      {
        id: "order009",
        createAt: new Date("2024-12-01").toISOString(),
        createBy: "admin009",
        cost: 300.0
      }
    ]
  },
  {
    id: "4",
    fullName: "Ngô Văn G",
    phoneNumber: "0967890123",
    email: "ngovang@example.com",
    address: "78 Đường ABC, Phường DEF, Quận 7, TP.HCM",
    avatar: "https://example.com/avatar7.jpg",
    point: 250,
    sales: 650.5,
    orders: [
      {
        id: "order010",
        createAt: new Date("2024-11-25").toISOString(),
        createBy: "admin010",
        cost: 450.5
      },
      {
        id: "order011",
        createAt: new Date("2024-11-28").toISOString(),
        createBy: "admin011",
        cost: 200.0
      }
    ]
  },
  {
    id: "5",
    fullName: "Bùi Thị H",
    phoneNumber: "0932109876",
    email: "buithih@example.com",
    address: "90 Đường GHI, Phường JKL, Quận 8, TP.HCM",
    avatar: "https://example.com/avatar8.jpg",
    point: 170,
    sales: 180.0,
    orders: [
      {
        id: "order012",
        createAt: new Date("2024-12-10").toISOString(),
        createBy: "admin012",
        cost: 180.0
      }
    ]
  }
];
