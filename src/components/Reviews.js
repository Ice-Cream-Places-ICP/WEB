import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link as MuiLink,
  IconButton,
  TextField,
  Rating,
  Button,
} from "@mui/material";
import { useUser } from "../context/UserContext";

import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { CreateReview, DeleteReview } from "../services/review";
import { GetShopById } from "../services/shop";
import Loading from "./Loading";

const Reviews = ({ reviews, shopId, setShop }) => {
  const [addReview, setAddReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewContent, setReviewContent] = useState({
    rate: 5,
    content: "",
  });

  const userContext = useUser();

  const handleShopUpdate = async (shopId) => {
    const getShopByIdData = await GetShopById(shopId);
    if (!getShopByIdData.status) {
      setError(getShopByIdData.message);
      setLoading(false);
      return;
    }
    setShop(getShopByIdData.content);
  };

  const handleCreateReview = async (shopId) => {
    setError("");

    setLoading(true);

    const createReviewData = await CreateReview(shopId, reviewContent);
    if (!createReviewData.status) {
      setError(createReviewData.message);
      setLoading(false);
      return;
    }

    handleShopUpdate(shopId);
    setAddReview(false);
    setReviewContent({ rate: 5, content: "" });
    setLoading(false);
  };

  const handleDeleteRewiev = async (e, shopId, rewievId) => {
    setError("");

    setLoading(true);
    e.preventDefault();

    const deleteReviewData = await DeleteReview(shopId, rewievId);
    if (!deleteReviewData.status) {
      setError(deleteReviewData.message);
      setLoading(false);
      return;
    }

    handleShopUpdate(shopId);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={
          <div className="flex-row flex-space-between">
            <div>Oceny i komentarze</div>
            {userContext.user && (
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setAddReview(() => !addReview);
                }}
              >
                {!addReview && <AiOutlinePlus />}
                {addReview && <AiOutlineMinus />}
              </IconButton>
            )}
          </div>
        }
      />
      <CardContent className="card-content">
        {error && <div className="error">{error}</div>}

        {addReview && (
          <>
            <Rating
              name="simple-controlled"
              value={reviewContent.rate}
              onChange={(event, newValue) => {
                setReviewContent({ ...reviewContent, rate: newValue });
              }}
            />
            <TextField
              fullWidth
              type="text"
              id="name"
              value={reviewContent.content}
              onChange={(e) => {
                setReviewContent({
                  ...reviewContent,
                  content: e.target.value,
                });
              }}
            />
            <Button
              disabled={!reviewContent.content}
              fullWidth
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleCreateReview(shopId);
              }}
            >
              Dodaj
            </Button>
          </>
        )}
        {reviews
          .map((review) => {
            return (
              <Card key={review._id} className="card">
                <CardHeader
                  className="card-header"
                  title={
                    <div className="flex-row flex-space-between">
                      <div>
                        <Rating name="read-only" value={review.rate} readOnly />
                      </div>
                      <Typography variant="body2">
                        {review.updatedAt.slice(0, 10)}{" "}
                      </Typography>
                    </div>
                  }
                />
                <CardContent className="card-content">
                  <div className="flex-row flex-space-between">
                    <Typography variant="body1">{review.content}</Typography>
                    {userContext.user &&
                      (review.user === userContext.user._id ||
                        userContext.user.roles.includes("admin")) && (
                        <IconButton
                          onClick={(e) =>
                            handleDeleteRewiev(e, shopId, review._id)
                          }
                          color="primary"
                          component="label"
                        >
                          <CiTrash />
                        </IconButton>
                      )}
                  </div>
                </CardContent>
              </Card>
            );
          })
          .reverse()}
      </CardContent>
    </Card>
  );
};

export default Reviews;
