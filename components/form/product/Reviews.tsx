import CommentCard from "@/components/shared/card/CommentCard";
import { Comments } from "@/constants/data";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const Reviews = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [comments, setComments] = useState<Comment[] | null>([]);

  useEffect(() => {
    if (id) {
      const filteredComments =
        Comments?.filter((item) => item.productId === id) || [];
      setComments(filteredComments);
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {comments && comments.length > 0 ? (
        comments.map((item) => <CommentCard key={item.id} item={item} />)
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default Reviews;
