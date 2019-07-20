import React from "react";
import { useRouter } from "next/router";

const OrderSuccess = props => {
  const router = useRouter();
  // const { tracking_id } = router.query;
  console.log(router)
  return (
    <div>
      <h3>Thank you for your purchase</h3>
      {/* <h2>{tracking_id ? tracking_id : "bad"}</h2> */}
    </div>
  );
};

export default OrderSuccess;
