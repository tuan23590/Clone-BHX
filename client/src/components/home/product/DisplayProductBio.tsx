"use client";

import { useState } from "react";
import { Typography, Button, Box } from "@mui/joy";

export default function DisplayProductBio({ productBio }: { productBio: any }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const specifications = productBio.featureSpecification.split(/<br\s*\/?>/);

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: showFullContent ? "none" : 300,
          overflow: showFullContent ? "visible" : "hidden",
          position: "relative",
        }}
      >
        {productBio.shortDescription && (
          <div>
            <style>{`.product-description a { color: green }`}</style>
            <Typography level="h4">Thông tin sản phẩm</Typography>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: productBio.shortDescription }}
            />
          </div>
        )}

        {productBio.featureSpecification && (
          <table style={{ margin: "10px 0" }}>
            <tbody>
              {specifications.map((spec: any, index: number) => {
                const [title, value] = spec.split(":");
                return (
                  <tr key={index}>
                    <th
                      style={{
                        textAlign: "left",
                        paddingRight: "10px",
                        fontWeight: "bold",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        padding: "8px 16px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {title?.trim()}
                    </th>
                    <td
                      style={{
                        padding: "8px 16px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      {value?.trim()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {productBio.productArticle && (
          <div>
            <style>
              {`
              .product-description h3 {
                font-size: 1.25rem;
                color: #333;
                font-weight: bold;
                margin-top: 16px;
                margin-bottom: 8px;
              }

              .product-description ul {
                padding-left: 20px;
                list-style-type: disc;
              }

              .product-description li {
                margin-bottom: 8px;
                font-size: 1rem;
                color: #555;
                margin-left: 20px;
              }

              .product-description a {
                color: green;
                text-decoration: underline;
              }

              .product-description img {
                max-width: 100%;
                height: auto;
                margin-top: 16px;
                border-radius: 8px;
              }

              .product-description strong {
                color: #222;
                font-weight: 600;
              }
            `}
            </style>
            <Typography level="h4">Bài viết sản phẩm</Typography>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: productBio.productArticle }}
            />
          </div>
        )}
      </Box>
      <Typography
        onClick={toggleContent}
        sx={{
          color: "green",
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "5px 10px",
          borderRadius: "0 0 8px 8px",
          textAlign: "center",
        }}
      >
        {showFullContent ? "Thu gọn" : "Xem thêm"}
      </Typography>
    </>
  );
}
