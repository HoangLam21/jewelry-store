"use client";
import MyButton from "@/components/shared/button/MyButton";
import CommentCard from "@/components/shared/card/CommentCard";
import { getReviewById } from "@/lib/services/rating.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateReview from "./CreateReview";
import { getOrderById } from "@/lib/actions/order.action";

export interface CommentData {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  productId: string;
  rating: number;
  createAt: Date;
  productName: string;
  size: string;
  material: string;
  comment: string;
  image: string[];
}

const Reviews = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [comments, setComments] = useState<CommentData[]>([]);
  const [openReview, setOpenReview] = useState(false);

  useEffect(() => {
    const getReview = async () => {
      const data = await getReviewById(id);
      const reviews: CommentData[] = data.map((item: any) => ({
        id: item._id,
        userId: item.userId ? item.userId._id : "",
        userName: item.userId ? item.userId.fullName : "Unknown Name",
        avatar:
          item.userId && item.userId.avatar
            ? item.userId.avatar
            : "/assets/images/avatar.jpg",
        productId: item.productId,
        rating: item.point,
        createAt: new Date(item.createAt),
        productName: "", // Sửa "productNamme" thành "productName"
        size: "",
        material: "",
        comment: item.content ? item.content : "No comment",
        image: item.images.map((image: any) => image.url)
      }));

      setComments(reviews);

      console.log(data);
    };
    getReview();
  }, [id]);

  // useEffect(() => {
  //   let userId = localStorage.getItem("userId");
  //   //if(!userId) return;
  //   if (!userId) userId = "676c26abbc53a1913f2c9581";
  //   const getDetailOrderById = async () => {
  //     const data = await ();
  //     const reviews: CommentData[] = data.map((item: any) => ({
  //       id: item._id,
  //       userId: item.userId ? item.userId._id : "",
  //       userName: item.userId ? item.userId.fullName : "Unknown Name",
  //       avatar:
  //         item.userId && item.userId.avatar
  //           ? item.userId.avatar
  //           : "/assets/images/avatar.jpg",
  //       productId: item.productId,
  //       rating: item.point,
  //       createAt: new Date(item.createAt),
  //       productName: "", // Sửa "productNamme" thành "productName"
  //       size: "",
  //       material: "",
  //       comment: item.content ? item.content : "No comment",
  //       image: item.images.map((image: any) => image.url)
  //     }));

  //     setComments(reviews);

  //     console.log(data);
  //   };
  //   getReview();
  // }, []);

  const handleCreateReview = () => {
    setOpenReview(true);
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        {comments && comments.length > 0 ? (
          comments.map((item) => <CommentCard key={item.id} item={item} />)
        ) : (
          <p>No reviews available for this product.</p>
        )}
      </div>
      {/* Footer */}
      <div className="w-full flex justify-end p-6 ">
        <MyButton
          event={handleCreateReview}
          width="w-28"
          background="bg-primary-100"
          text_color="text-white"
          title="Let's review"
        />
      </div>

      {openReview && (
        <CreateReview setOpenReview={setOpenReview} setComments={setComments} />
      )}
    </>
  );
};

export default Reviews;
