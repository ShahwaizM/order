import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL; // Read from .env

function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const goBack = () => navigate(-1);

  if (!order) return <div>Loading...</div>;

  return (
    <div
      className="container-fluid"
      style={{ background: "rgb(247, 247, 247)", paddingTop: "50px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Back Button */}
          <Button
            type="link"
            onClick={goBack}
            style={{
              padding: "12px 12px",
              fontSize: "20px",
              background: "#02335f",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <ArrowLeftOutlined
              style={{ marginRight: "10px", fontSize: "20px" }}
            />
            Back to Orders
          </Button>

          {/* Order Details Card */}
          <Card
            title={`Order ID: ${order.orderId}`}
            style={{
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "30px",
            }}
          >
            <h3
              className="text-center"
              style={{ fontSize: "28px", marginBottom: "20px" }}
            >
              Order Details
            </h3>

            <div style={{ paddingBottom: "20px", fontSize: "18px" }}>
              <p>
                <strong>Customer Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Tracking ID:</strong> {order.trackingId}
              </p>

              <p>
                <strong>Part Numbers:</strong>
              </p>
              <ul>
                {order.entries.flatMap((entry, entryIndex) => (
                  <li key={entryIndex}>
                    <strong>Entry {entryIndex + 1}:</strong>
                    <ul>
                      {entry.partNumbers.map((pn, index) => (
                        <li key={index}>
                          <strong>Part {index + 1}:</strong> {pn}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <p>
                <strong>Status: </strong>
                <span
                  style={{
                    fontWeight: "bold",
                    color: order.status === "Dispatched" ? "green" : "orange",
                  }}
                >
                  {order.status}
                </span>
              </p>

              {/* Display dispatched date if order is dispatched */}
              {order.status === "Dispatched" && order.dispatchedAt && (
                <p>
                  <strong>Dispatched At: </strong>
                  {new Date(order.dispatchedAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Dispatch Button - Uncomment if you want to add functionality */}
            {/* {order.status !== "Dispatched" && (
              <div className="text-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleDispatch}
                  style={{
                    borderRadius: "8px",
                    fontSize: "18px",
                    padding: "10px 30px",
                    backgroundColor: "green",
                    borderColor: "green",
                    color: "white",
                  }}
                >
                  Dispatch Order
                </Button>
              </div>
            )} */}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
