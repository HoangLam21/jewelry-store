import { NextResponse } from "next/server";

// Định nghĩa các route cần bảo vệ
const isProtectedRoute = (url: any) => {
  return url.startsWith("/");
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Kiểm tra nếu là route bảo vệ, thực hiện các thao tác bảo vệ
  if (isProtectedRoute(pathname)) {
    // Bạn có thể thực hiện logic bảo vệ ở đây
    // Ví dụ, nếu không có token, trả về một lỗi hoặc chuyển hướng
    const token = req.cookies.get("auth_token"); // Kiểm tra cookie hoặc header auth
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url)); // Chuyển hướng nếu không có token
    }
  }

  // Nếu không phải route bảo vệ, cho phép tiếp tục
  return NextResponse.next();
}

// Cấu hình matcher cho middleware
export const config = {
  matcher: ["/ask-question/:path*", "/(api|trpc)(.*)"], // Định nghĩa các route được kiểm tra
};
