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
        status: 0,
      },
      {
        id: "2",
        customer: "baoazhn",
        createDate: new Date("2024-08-24"),
        note: "aaaaaaaaaa",
        total: 2000000,
        status: 1,
      },
      {
        id: "3",
        customer: "chopper",
        createDate: new Date("2024-08-24"),
        note: "aaaaaaaaaa",
        total: 2500000,
        status: 2,
      },
    ],
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
        status: 1,
      },
      {
        id: "2",
        customer: "Sehun",
        createDate: new Date("2024-09-20"),
        note: "excellent product",
        total: 3000000,
        status: 0,
      },
    ],
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
        status: 1,
      },
      {
        id: "2",
        customer: "Chanyeol",
        createDate: new Date("2024-07-16"),
        note: "Great quality",
        total: 1800000,
        status: 2,
      },
    ],
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
        status: 0,
      },
    ],
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
        status: 1,
      },
      {
        id: "2",
        customer: "D.O",
        createDate: new Date("2024-09-06"),
        note: "Good experience",
        total: 2000000,
        status: 2,
      },
    ],
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
        status: 0,
      },
    ],
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
        status: 0,
      },
    ],
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
        status: 1,
      },
    ],
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
        status: 1,
      },
      {
        id: "2",
        customer: "V",
        createDate: new Date("2024-08-16"),
        note: "Great support",
        total: 4000000,
        status: 2,
      },
    ],
  },
];
